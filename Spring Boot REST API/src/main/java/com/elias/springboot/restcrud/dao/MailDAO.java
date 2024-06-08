package com.elias.springboot.restcrud.dao;

import com.elias.springboot.restcrud.dto.MailDto.GetThreadDTO;
import com.elias.springboot.restcrud.dto.MailDto.GetUsersMailDTO;
import com.elias.springboot.restcrud.dto.MailDto.SendMessageProcDTO;
import com.elias.springboot.restcrud.dto.MailDto.UsersMailDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MailDAO {
    public void sendMail (SendMessageProcDTO sendMessageProcDTO) throws JsonProcessingException;
    public GetThreadDTO getThread(int threadId, int userId);
    public List<GetUsersMailDTO> getMail(int userId);
    public UsersMailDTO getUser(int userId);

}
