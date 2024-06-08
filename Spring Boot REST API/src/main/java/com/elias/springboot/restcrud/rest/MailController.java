package com.elias.springboot.restcrud.rest;


import com.elias.springboot.restcrud.dao.MailDAO;
import com.elias.springboot.restcrud.dto.MailDto.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mail")
public class MailController {
    private MailDAO mailDAO;

    @Autowired
    public MailController(MailDAO mailDAO) {
        this.mailDAO = mailDAO;
    }
    @GetMapping("/thread/{threadId}/{userId}")
    public GetThreadDTO getThread(@PathVariable int threadId, @PathVariable int userId) {
        return mailDAO.getThread(threadId, userId);
    }
    @GetMapping("/conversations/{id}")
    public List<GetUsersMailDTO> getConversations(@PathVariable int id) {
        return mailDAO.getMail(id);
    }

    @PostMapping("/mail")
    public void sendMail(@RequestBody SendMessageProcDTO sendMessageProcDTO) throws JsonProcessingException {
        mailDAO.sendMail(sendMessageProcDTO);
    }
    @GetMapping("/user/{id}")
    public UsersMailDTO getUser(@PathVariable int id) {
        return mailDAO.getUser(id);
    }
}
