package com.elias.springboot.restcrud.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "mailThread")
public class MailThread {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String subject = "";
    @JsonIgnoreProperties("mailThread")
    @OneToMany(mappedBy = "thread")
    private List<Mail> mails;
    private String lastMessage = "";
    private String lastMessageSender = "";
    private Integer lastMessageSenderId;
    private Timestamp lastMessageDate;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "mail_thread_user_accounts",
            joinColumns = @JoinColumn(name = "mail_thread_id"),
            inverseJoinColumns = @JoinColumn(name = "user_accounts_id"))
    @JsonIgnoreProperties({"mailThreads", "users.authorities"})
    private Collection<Users> users;

    // getters and setters
}


