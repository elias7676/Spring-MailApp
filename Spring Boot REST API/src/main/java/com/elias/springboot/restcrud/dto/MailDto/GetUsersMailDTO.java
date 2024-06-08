package com.elias.springboot.restcrud.dto.MailDto;

import java.time.LocalDateTime;

public class GetUsersMailDTO {
    private int id;
    private String lastMessage;
    private String lastMessageSender;
    private Integer lastMessageSenderId;
    private LocalDateTime lastMessageDate;
    private String subject;
    private LocalDateTime readTime;

    // getters and setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLastMessage() {
        return lastMessage;
    }

    public void setLastMessage(String lastMessage) {
        this.lastMessage = lastMessage;
    }

    public String getLastMessageSender() {
        return lastMessageSender;
    }

    public void setLastMessageSender(String lastMessageSender) {
        this.lastMessageSender = lastMessageSender;
    }

    public Integer getLastMessageSenderId() {
        return lastMessageSenderId;
    }

    public void setLastMessageSenderId(Integer lastMessageSenderId) {
        this.lastMessageSenderId = lastMessageSenderId;
    }

    public LocalDateTime getLastMessageDate() {
        return lastMessageDate;
    }

    public void setLastMessageDate(LocalDateTime lastMessageDate) {
        this.lastMessageDate = lastMessageDate;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public LocalDateTime getReadTime() {
        return readTime;
    }

    public void setReadTime(LocalDateTime readTime) {
        this.readTime = readTime;
    }
}