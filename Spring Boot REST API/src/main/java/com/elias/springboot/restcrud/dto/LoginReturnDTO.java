package com.elias.springboot.restcrud.dto;

import com.elias.springboot.restcrud.entity.Authority;
import com.elias.springboot.restcrud.entity.Department;
import org.springframework.security.core.GrantedAuthority;

import java.util.Date;
import java.util.List;
import java.util.Set;

public class LoginReturnDTO {

    private Long userId;
    private String token;
    private String username;
    private Date expiresOn;
    private Object user;
    private String fullName;
    private String gender;
    private String photoPath;
    private String phone;
    private String email;
    private String status;
    public String mailFooter;
    private List<Department> departments;
    private Set<GrantedAuthority> authorities;

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Date getExpiresOn() {
        return expiresOn;
    }

    public void setExpiresOn(Date expiresOn) {
        this.expiresOn = expiresOn;
    }

    public Object getUser() {
        return user;
    }

    public void setUser(Object user) {
        this.user = user;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getPhotoPath() {
        return photoPath;
    }

    public void setPhotoPath(String photoPath) {
        this.photoPath = photoPath;
    }
    public String getMailFooter() {
        return mailFooter;
    }
    public void setMailFooter(String mailFooter) {
        this.mailFooter = mailFooter;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<Department> getDepartments() {
        return departments;
    }

    public void setDepartments(List<Department> departments) {
        this.departments = departments;
    }
    public void setAuthorities(Set<GrantedAuthority> authorities) {this.authorities = authorities;}
    public Set<GrantedAuthority> getAuthorities() { return authorities; }
}