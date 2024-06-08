package com.elias.springboot.restcrud.dto;

import org.springframework.stereotype.Component;

@Component
public class LoginRequest {
    private String username;
    private String password;

    // Getter for userName
    public String getUserName() {
        return username;
    }

    // Setter for userName
    public void setUserName(String userName) {
        this.username = userName;
    }

    // Getter for password
    public String getPassword() {
        return password;
    }

    // Setter for password
    public void setPassword(String password) {
        this.password = password;
    }
}
