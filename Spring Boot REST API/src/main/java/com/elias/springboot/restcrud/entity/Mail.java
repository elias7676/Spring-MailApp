package com.elias.springboot.restcrud.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "mail")
public class Mail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String message = "";
    private LocalDateTime receiveTime;
    private LocalDateTime readTime;
    private boolean isEdited = false;
    @ManyToOne
    private Users senderUserAccount;
    @ManyToOne
    private Users receiverUserAccount;
    @ManyToOne
    private MailThread thread;
    private String attachment1;
    private String attachment2;
    private String attachment3;
    @ManyToOne
    private Users forwardedFrom;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}

