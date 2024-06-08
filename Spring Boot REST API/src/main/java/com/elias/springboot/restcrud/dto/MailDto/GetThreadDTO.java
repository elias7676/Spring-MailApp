package com.elias.springboot.restcrud.dto.MailDto;

import com.elias.springboot.restcrud.entity.MailThread;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

public class GetThreadDTO {
    private List<ThreadDTO> threads;
    @JsonIgnoreProperties("mails")
    private MailThread users;

    // getters and setters
    public List<ThreadDTO> getThreads() {
        return threads;
    }
    public void setThreads(List<ThreadDTO> threads) {
        this.threads = threads;
    }
    public MailThread getUsers() {
        return users;
    }
    public void setUsers(MailThread users) {
        this.users = users;
    }
}