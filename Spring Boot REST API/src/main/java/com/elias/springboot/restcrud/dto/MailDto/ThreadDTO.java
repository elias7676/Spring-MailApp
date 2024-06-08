package com.elias.springboot.restcrud.dto.MailDto;

import com.elias.springboot.restcrud.entity.MailAttachments;
import com.elias.springboot.restcrud.entity.MailThread;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

public class ThreadDTO {
    private int id;
    private String message;
    private String senderPhotoPath;
    private String senderName;
    private LocalDateTime receiveTime;
    private int threadId;
    private LocalDateTime readTime;
    private boolean isEdited;
    private Integer senderUserAccountId;
    private Integer receiverUserAccountId;
    private Integer forwardedFromId;
    private String forwardedFrom;
    private String attachment1;
    private String attachment2;
    private String attachment3;
    private String MailFooter;
    private String SenderUserName;
    @JsonIgnoreProperties({"mail","mailThread"})
    private List<MailAttachments> attachments;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean isLastMessage;


    // getters and setters
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public String getSenderPhotoPath() {
        return senderPhotoPath;
    }
    public void setSenderPhotoPath(String senderPhotoPath) {
        this.senderPhotoPath = senderPhotoPath;
    }
    public String getSenderName() {
        return senderName;
    }
    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }
    public LocalDateTime getReceiveTime() {
        return receiveTime;
    }
    public void setReceiveTime(LocalDateTime receiveTime) {
        this.receiveTime = receiveTime;
    }
    public int getThreadId() {
        return threadId;
    }
    public void setThreadId(int threadId) {
        this.threadId = threadId;
    }
    public LocalDateTime getReadTime() {
        return readTime;
    }
    public void setReadTime(LocalDateTime readTime) {
        this.readTime = readTime;
    }
    public boolean isEdited() {
        return isEdited;
    }
    public void setEdited(boolean edited) {
        isEdited = edited;
    }
    public Integer getSenderUserAccountId() {
        return senderUserAccountId;
    }
    public void setSenderUserAccountId(Integer senderUserAccountId) {
        this.senderUserAccountId = senderUserAccountId;
    }
    public Integer getReceiverUserAccountId() {
        return receiverUserAccountId;
    }
    public void setReceiverUserAccountId(Integer receiverUserAccountId) {
        this.receiverUserAccountId = receiverUserAccountId;
    }
    public Integer getForwardedFromId() {
        return forwardedFromId;
    }
    public void setForwardedFromId(Integer forwardedFromId) {
        this.forwardedFromId = forwardedFromId;
    }
    public String getForwardedFrom() {
        return forwardedFrom;
    }
    public void setForwardedFrom(String forwardedFrom) {
        this.forwardedFrom = forwardedFrom;
    }
    public String getAttachment1() {
        return attachment1;
    }
    public void setAttachment1(String attachment1) {
        this.attachment1 = attachment1;
    }
    public String getAttachment2() {
        return attachment2;
    }
    public void setAttachment2(String attachment2) {
        this.attachment2 = attachment2;
    }
    public String getAttachment3() {
        return attachment3;
    }
    public void setAttachment3(String attachment3) {
        this.attachment3 = attachment3;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    public boolean isLastMessage() {
        return isLastMessage;
    }
    public void setLastMessage(boolean lastMessage) {
        isLastMessage = lastMessage;
    }
    public String getMailFooter() {
        return MailFooter;
    }
    public void setMailFooter(String mailFooter) {
        MailFooter = mailFooter;
    }
    public List<MailAttachments> getAttachments() {
        return attachments;
    }
    public void setAttachments(List<MailAttachments> attachments) {
        this.attachments = attachments;
    }
    public String getSenderUserName() {
        return SenderUserName;
    }
    public void setSenderUserName(String senderUserName) {
        SenderUserName = senderUserName;
    }

}
