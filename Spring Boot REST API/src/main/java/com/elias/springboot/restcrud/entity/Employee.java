package com.elias.springboot.restcrud.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.stereotype.Component;




@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Component
@Table(name = "employee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String photoPath;

    private String firstName;

    private String middleName;

    private String lastName;

    private String gender;

    private String phone;

    private String city;

    private String subCity;
    private String email;

    private String addressInfo;

    private String educationLevel;

    private String jobPosition;

    private String status;

    @ManyToOne
    @JoinColumn(name = "department_id")
    @JsonIgnoreProperties("employees")
    private Department department;


    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    @JsonIgnoreProperties("employees")
    private Users user;
    @Column(name = "user_id")
    private Long userId;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    // getters and setters

}
