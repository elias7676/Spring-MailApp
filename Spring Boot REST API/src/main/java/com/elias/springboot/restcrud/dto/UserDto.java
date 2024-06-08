package com.elias.springboot.restcrud.dto;
import com.elias.springboot.restcrud.entity.Department;
import com.elias.springboot.restcrud.entity.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;
import java.util.Set;

@Getter
@Setter
public class UserDto
{
    private Long id;
    @NotEmpty
    private String username;
    @NotEmpty(message = "Password should not be empty")
    private String password;
    @NotEmpty
    private String gender;
    @NotEmpty
    private String fullName;
    private String newPassword;
    private String mailFooter;
    private String photoPath;
    @JsonIgnoreProperties({"users", "authorities"})
    private Set<Role> roles;
    @JsonIgnoreProperties("users")
    private Set<Department> departments;

    public UserDto(Long id, String username, String password, String gender, String fullName
            ,Set<Role> roles, Set<Department> departments, String newPassword, String photoPath)
    {
        this.id = id;
        this.username = username;
        this.password = password;
        this.gender = gender;
        this.fullName = fullName;
        this.roles = roles;
        this.departments = departments;
        this.newPassword = newPassword;
        this.photoPath = photoPath;
    }
    // getters
    public String getUsername() {
        return username;
    }
    public String getPassword() { return password; }
    public String getGender() { return gender; }
    public String getFullName() { return fullName; }
    public String getNewPassword() { return newPassword; }
    public String getPhotoPath() { return photoPath; }
    public Set<Department>  getDepartments() { return departments; }
    public Set<Role> getRoles() { return roles; }
    public String getMailFooter() { return mailFooter; }
    // setters
}
