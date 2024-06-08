package com.elias.springboot.restcrud.rest;

import com.elias.springboot.restcrud.dao.RoleDAO;
import com.elias.springboot.restcrud.dto.departmentdto.UpdatePermissionDto;
import com.elias.springboot.restcrud.dto.departmentdto.UpdateRoleDto;
import com.elias.springboot.restcrud.entity.Authority;
import com.elias.springboot.restcrud.entity.Role;
import com.elias.springboot.restcrud.security.JwtService;
import com.elias.springboot.restcrud.service.AuthorityRepository;
import com.elias.springboot.restcrud.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/role")
public class RoleController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final AuthorityRepository authorityRepository;
    private RoleDAO roleDAO;

    @Autowired
    public RoleController(AuthenticationManager authenticationManager, JwtService jwtService, UserService userService,
                          PasswordEncoder passwordEncoder, AuthorityRepository authorityRepository, RoleDAO roleDAO) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.authorityRepository = authorityRepository;
        this.roleDAO = roleDAO;
    }
    @GetMapping
    public List<Role> findAllRoles(){
        return roleDAO.findAll();
    }
    @PostMapping("/{role}")
    public Role saveRole(@PathVariable String role){
        Role adminRole = roleDAO.save(Role.builder().name(role).build());
        return adminRole;
    }
    @PutMapping
    public String updateRole(@RequestBody UpdateRoleDto role){
        return roleDAO.updateRole(role);
    }
    @PutMapping("/permissions")
    public String updatePermissions(@RequestBody UpdatePermissionDto role){
        return roleDAO.UpdatePermissions(role);
    }
    @GetMapping("/authorities")
    public List<Authority> findAllAuthorities(){
        return authorityRepository.findAll();
    }
}
