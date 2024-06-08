package com.elias.springboot.restcrud.dao;

import com.elias.springboot.restcrud.entity.Employee;
import com.elias.springboot.restcrud.entity.Users;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@Repository
public class UserDAOImpl implements UserDAO{

    private EntityManager entityManager;


    @Autowired
    public UserDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public Users findByUserName(String username) {

        TypedQuery<Users> theQuery = entityManager.createQuery("FROM Users WHERE username=:username AND enabled=true", Users.class);
        theQuery.setParameter("username", username);

        Users user = null;

        try{
            user = theQuery.getSingleResult();
        } catch (Exception e){
            user = null;
        }

        return  user;
    }

    @Override
    public Users findById(int id) {
        TypedQuery<Users> theQuery = entityManager.createQuery("FROM Users WHERE id=:id", Users.class);
        theQuery.setParameter("id", id);

        Users user = null;

        try{
            user = theQuery.getSingleResult();
        } catch (Exception e){
            user = null;
        }

        return  user;
    }

    @Override
    public List<Users> findAll() {
        TypedQuery<Users> theQuery = entityManager.createQuery("FROM Users", Users.class);
        List<Users> users = theQuery.getResultList();
        return users;
    }
    @Override
    @Transactional
    public Users save(Users newUser) {
        entityManager.persist(newUser);
        return newUser;
    }
}
