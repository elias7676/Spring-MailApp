package com.elias.springboot.restcrud.service;

import com.elias.springboot.restcrud.dto.UserDto;
import com.elias.springboot.restcrud.entity.Users;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface UserService extends UserDetailsService {

    public Users findByUserName(String userName);
    public UserDetails getOneUser(String userName);
    public Users findById(int id);


    List<Users> findAll();
    Users saveUser(Users user);

}
