package com.elias.springboot.restcrud.service;

import com.elias.springboot.restcrud.entity.Authority;
import org.springframework.data.jpa.repository.JpaRepository;


public interface AuthorityRepository extends JpaRepository<Authority, Integer> {
}

