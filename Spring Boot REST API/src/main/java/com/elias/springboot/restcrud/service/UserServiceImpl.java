package com.elias.springboot.restcrud.service;

import com.elias.springboot.restcrud.dao.RoleDAO;
import com.elias.springboot.restcrud.dao.UserDAO;
import com.elias.springboot.restcrud.dto.UserDto;
import com.elias.springboot.restcrud.entity.Users;
import com.elias.springboot.restcrud.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Component
public class UserServiceImpl implements UserService{

    private UserDAO userDAO;

    private RoleDAO roleDAO;

    @Autowired
    public UserServiceImpl(UserDAO userDAO, RoleDAO roleDAO) {
        this.userDAO = userDAO;
        this.roleDAO = roleDAO;
    }

    @Override
    public Users findByUserName(String userName) {
        return userDAO.findByUserName(userName);
    }

    @Override
    public List<Users> findAll() {

            return userDAO.findAll();

    }

    @Override
    public Users saveUser(Users newUser) {
        return userDAO.save(newUser);
    }


    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        Users user = userDAO.findByUserName(userName);
        if (user == null) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                mapRolesToAuthorities(user.getRoles()));
    }
    @Override
    public UserDetails getOneUser(String userName) throws UsernameNotFoundException {
        Users user = userDAO.findByUserName(userName);
        if (user == null) {
            return null;
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                mapRolesToAuthorities(user.getRoles()));
    }

    @Override
    public Users findById(int id) {
        Users user = userDAO.findById(id);
        return user;
    }

    private Collection<? extends GrantedAuthority> mapRolesToAuthorities(Collection<Role> roles) {
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
    }
}
