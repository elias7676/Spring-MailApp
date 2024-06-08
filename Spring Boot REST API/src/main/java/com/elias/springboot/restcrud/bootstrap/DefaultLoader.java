//package com.elias.springboot.restcrud.bootstrap;
//
//import com.elias.springboot.restcrud.dao.RoleDAO;
//import com.elias.springboot.restcrud.dao.UserDAO;
//import com.elias.springboot.restcrud.entity.Authority;
//import com.elias.springboot.restcrud.entity.Department;
//import com.elias.springboot.restcrud.entity.Role;
//import com.elias.springboot.restcrud.entity.Users;
//import com.elias.springboot.restcrud.service.AuthorityRepository;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Component;
//
//import java.util.Arrays;
//import java.util.HashSet;
//import java.util.Set;
//
//
///**
// * Created by jt on 2019-01-26.
// */
//@Slf4j
//@RequiredArgsConstructor
//@Component
//public class DefaultLoader implements CommandLineRunner {
//
//    private final AuthorityRepository authorityRepository;
//    private final RoleDAO roleRepository;
//    private final PasswordEncoder passwordEncoder;
//    private final UserDAO userService;
//    //// https://github.com/springframeworkguru/ssc-brewery/tree/cors-spring-sec-config
//
//    @Override
//    public void run(String... args) {
//        loadSecurityData();
//    }
//
//    private void loadSecurityData() {
//        //department auths
//        Authority createDepartment = authorityRepository.save(Authority.builder().permission("department.create").build());
//        Authority readDepartment = authorityRepository.save(Authority.builder().permission("department.read").build());
//        Authority updateDepartment = authorityRepository.save(Authority.builder().permission("department.update").build());
//        Authority deleteDepartment = authorityRepository.save(Authority.builder().permission("department.delete").build());
//
//        //user auths
//        Authority createUser = authorityRepository.save(Authority.builder().permission("user.create").build());
//        Authority readUser = authorityRepository.save(Authority.builder().permission("user.read").build());
//        Authority updateUser = authorityRepository.save(Authority.builder().permission("user.update").build());
//        Authority deleteUser = authorityRepository.save(Authority.builder().permission("user.delete").build());
//
//        //employee auths
//        Authority createEmployee = authorityRepository.save(Authority.builder().permission("employee.create").build());
//        Authority readEmployee = authorityRepository.save(Authority.builder().permission("employee.read").build());
//        Authority updateEmployee = authorityRepository.save(Authority.builder().permission("employee.update").build());
//        Authority deleteEmployee = authorityRepository.save(Authority.builder().permission("employee.delete").build());
//
//
//
//        Role employeeRole = roleRepository.save(Role.builder().name("ROLE_EMPLOYEE").build());
//        Role managerRole = roleRepository.save(Role.builder().name("ROLE_MANAGER").build());
//        Role adminRole = roleRepository.save(Role.builder().name("ROLE_ADMIN").build());
//
//        // new users add full name, mail footer,
//        userService.save(Users.builder().username("admin@digitalequb.com").fullName("admin").password(passwordEncoder.encode("admin")).roles(new HashSet<>(Arrays.asList(adminRole))).build());
//        userService.save(Users.builder().username("manager@digitalequb.com").fullName("manager")password(passwordEncoder.encode("manager")).roles(new HashSet<>(Arrays.asList(managerRole))).build());
//        userService.save(Users.builder().username("employee@digitalequb.com").fullName("employee").password(passwordEncoder.encode("employee")).roles(new HashSet<>(Arrays.asList(employeeRole))).build());
//        Department.builder().name("IT").contactPersonName("John Doe").contactPersonPhone("123456789").description("IT Department").build();
//
//
////        adminRole.setAuthorities(new HashSet<>(Arrays.asList(createDepartment, readDepartment, updateDepartment, deleteDepartment)));
////        roleRepository.saveAll(Arrays.asList(adminRole, managerRole, employeeRole));
//
//
//
//
//
//
//
//    }
//
//}
//
