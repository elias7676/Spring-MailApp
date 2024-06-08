package com.elias.springboot.restcrud.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;


@Entity
@Table(name = "mail_thread_user_accounts")
public class MailThreadUserAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "mail_thread_id")
    private MailThread mailThread;

    @ManyToOne
    @JoinColumn(name = "user_accounts_id")
    private Users userAccount;

    private Timestamp readTime;

    // Constructors, getters, and setters
}
