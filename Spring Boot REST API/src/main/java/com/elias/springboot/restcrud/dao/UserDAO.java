package com.elias.springboot.restcrud.dao;


import com.elias.springboot.restcrud.entity.Employee;
import com.elias.springboot.restcrud.entity.Users;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface UserDAO {

    public Users findByUserName(String username);
    public Users findById(int id);

    List<Users> findAll();
    Users save(Users user);


}
