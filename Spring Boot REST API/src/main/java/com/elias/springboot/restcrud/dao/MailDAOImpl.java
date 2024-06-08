package com.elias.springboot.restcrud.dao;

import com.elias.springboot.restcrud.dto.MailDto.*;
import com.elias.springboot.restcrud.entity.Employee;
import com.elias.springboot.restcrud.entity.MailAttachments;
import com.elias.springboot.restcrud.entity.MailThread;
import com.elias.springboot.restcrud.entity.Users;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureQuery;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.sql.Types;
import java.time.LocalDateTime;
import java.util.*;

@Repository
@Component
public class MailDAOImpl implements MailDAO {

    private EntityManager entityManager;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public MailDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void sendMail(SendMessageProcDTO sendMessageProcDTO) throws JsonProcessingException {
        String json = Arrays.toString(sendMessageProcDTO.getReceiverUserAccountId());
        json = json.substring(1, json.length() - 1);

        ObjectMapper objectMapper = new ObjectMapper();
        String jsonAttachment = objectMapper.writeValueAsString(sendMessageProcDTO.getAttachment());
        StoredProcedureQuery spQuery = entityManager.createStoredProcedureQuery("dbo.SendMessage")
                .registerStoredProcedureParameter("SenderUserId", Integer.class, ParameterMode.IN)
                .registerStoredProcedureParameter("ReceiverUserAccountId", String.class, ParameterMode.IN)
                .registerStoredProcedureParameter("MessageBody", String.class, ParameterMode.IN)
                .registerStoredProcedureParameter("Subject", String.class, ParameterMode.IN)
                .registerStoredProcedureParameter("ForwardedFromId", Integer.class, ParameterMode.IN)
                .registerStoredProcedureParameter("ExThreadId", Integer.class, ParameterMode.IN)
                .registerStoredProcedureParameter("Attachment", String.class, ParameterMode.IN)
                .registerStoredProcedureParameter("Attachment1", String.class, ParameterMode.IN)
                .registerStoredProcedureParameter("Attachment2", String.class, ParameterMode.IN)
                .registerStoredProcedureParameter("Attachment3", String.class, ParameterMode.IN)
                .setParameter("SenderUserId", sendMessageProcDTO.getSenderUserId())
                .setParameter("ReceiverUserAccountId", json)
                .setParameter("MessageBody", sendMessageProcDTO.getMessageBody())
                .setParameter("Subject", sendMessageProcDTO.getSubject())
                .setParameter("ForwardedFromId", sendMessageProcDTO.getForwardedFromId() == 0 ? null : sendMessageProcDTO.getForwardedFromId())
                .setParameter("ExThreadId", sendMessageProcDTO.getThreadId() == 0 ? null : sendMessageProcDTO.getThreadId())
                .setParameter("Attachment", jsonAttachment)
                .setParameter("Attachment1", Objects.equals(sendMessageProcDTO.getAttachment1(), "") ? null : sendMessageProcDTO.getAttachment1())
                .setParameter("Attachment2", Objects.equals(sendMessageProcDTO.getAttachment2(), "") ? null : sendMessageProcDTO.getAttachment2())
                .setParameter("Attachment3", Objects.equals(sendMessageProcDTO.getAttachment3(), "") ? null : sendMessageProcDTO.getAttachment3());

        spQuery.execute();

        return;

    }

    @Override
    public GetThreadDTO getThread(int threadId, int userId) {
          SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                 .withProcedureName("GetMailThread")
                  .withCatalogName("dbTest")
                  .withSchemaName("dbo")
                 .returningResultSet("threads", (rs, rowNum) -> {
                      ThreadDTO threadDTO = new ThreadDTO();
                     threadDTO.setId(rs.getInt("Id"));
                     threadDTO.setMessage(rs.getString("Message"));
//                     threadDTO.setReceiveTime(LocalDateTime.parse(rs.getString("ReceiveTime")));
                      threadDTO.setThreadId(rs.getInt("ThreadId"));
                     threadDTO.setCreatedAt(rs.getObject("CreatedAt", LocalDateTime.class));
                     threadDTO.setUpdatedAt(rs.getObject("UpdatedAt", LocalDateTime.class));
                        threadDTO.setReadTime(rs.getObject("ReadTime", LocalDateTime.class));
                        threadDTO.setReceiveTime(rs.getObject("ReceiveTime", LocalDateTime.class));
                      threadDTO.setReceiverUserAccountId(rs.getInt("ReceiverUserAccountId"));
                     threadDTO.setSenderUserAccountId(rs.getInt("SenderUserAccountId"));
                     threadDTO.setEdited(rs.getBoolean("IsEdited"));
                      threadDTO.setAttachment1(rs.getString("Attachment1"));
                      threadDTO.setAttachment2(rs.getString("Attachment2"));
                      threadDTO.setAttachment3(rs.getString("Attachment3"));
                     threadDTO.setForwardedFromId(rs.getInt("ForwardedFromId"));
                     threadDTO.setForwardedFrom(rs.getString("ForwardedFrom"));
                     threadDTO.setSenderPhotoPath(rs.getString("SenderPhotoPath"));
                     threadDTO.setSenderName(rs.getString("SenderName"));
                     threadDTO.setMailFooter(rs.getString("MailFooter"));
                     threadDTO.setSenderUserName(rs.getString("SenderUserName"));
                     threadDTO.setLastMessage(rs.getBoolean("IsLastMessage"));

                      return threadDTO;
                 });
        SqlParameterSource in = new MapSqlParameterSource()
                .addValue("ThreadId", threadId)
                .addValue("UserAccountId", userId);
        Map<String, Object> out = simpleJdbcCall.execute(in);
        List<ThreadDTO> threadDTO = (List<ThreadDTO>) out.get("threads");
        for (ThreadDTO thread : threadDTO) {
            // find mail attachments by mail_id
            TypedQuery<MailAttachments> theQuery = entityManager.createQuery("FROM MailAttachments WHERE mail.id = :mail_id", MailAttachments.class);
            theQuery.setParameter("mail_id", thread.getId());

            List<MailAttachments> att = null;

            try{
                att = theQuery.getResultList();
            } catch (Exception e){
                att = null;
            }
                thread.setAttachments(att);
        }

        MailThread employee = entityManager.find(MailThread.class, threadId);
        GetThreadDTO getThreadDTO = new GetThreadDTO();
        getThreadDTO.setUsers(employee);
     getThreadDTO.setThreads(threadDTO);
        return getThreadDTO;

    }


    @Override
    public List<GetUsersMailDTO> getMail(int userId) {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("GetConversations")
                .withCatalogName("dbTest")
                .withSchemaName("dbo")
                .returningResultSet("threads", (rs, rowNum) -> {
                    GetUsersMailDTO threadDTO = new GetUsersMailDTO();
                    threadDTO.setId(rs.getInt("Id"));
                    threadDTO.setLastMessage(rs.getString("LastMessage"));
                    threadDTO.setLastMessageSender(rs.getString("LastMessageSender"));
                    threadDTO.setLastMessageSenderId(rs.getInt("LastMessageSenderId"));
                    threadDTO.setLastMessageDate(rs.getObject("LastMessageDate", LocalDateTime.class));
                    threadDTO.setReadTime(rs.getObject("ReadTime", LocalDateTime.class));
                    threadDTO.setSubject(rs.getString("Subject"));

                    return threadDTO;
                });
        SqlParameterSource in = new MapSqlParameterSource()
                .addValue("Id", userId);
        Map<String, Object> out = simpleJdbcCall.execute(in);
        List<GetUsersMailDTO> threadDTO = (List<GetUsersMailDTO>) out.get("threads");
        return threadDTO;
    }

    @Override
    public UsersMailDTO getUser(int userId) {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("GetUsers")
                .withCatalogName("dbTest")
                .withSchemaName("dbo")
                .returningResultSet("threads", (rs, rowNum) -> {
                    UsersMailDTO threadDTO = new UsersMailDTO();
                    threadDTO.setId(rs.getInt("Id"));
                    threadDTO.setUserName(rs.getString("Username"));
                    threadDTO.setFullName(rs.getString("FullName"));
                    threadDTO.setPhotoPath(rs.getString("PhotoPath"));
                    threadDTO.setUnreadMessageCount(rs.getInt("UnreadMessageCount"));

                    return threadDTO;
                });
        SqlParameterSource in = new MapSqlParameterSource()
                .addValue("Id", userId);
        Map<String, Object> out = simpleJdbcCall.execute(in);
        List<UsersMailDTO> threads = (List<UsersMailDTO>) out.get("threads");
        UsersMailDTO threadDTO = null;
        if (threads != null && !threads.isEmpty()) {

            threadDTO = threads.get(0);
        }

        return threadDTO;
    }
}
