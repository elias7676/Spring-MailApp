package com.elias.springboot.restcrud.dao;

import com.elias.springboot.restcrud.dto.employee.CreateEmployeeDTO;
import com.elias.springboot.restcrud.dto.employee.DisplayEmployeeDTO;
import com.elias.springboot.restcrud.dto.employee.EditEmployeeDTO;
import com.elias.springboot.restcrud.entity.*;
import com.elias.springboot.restcrud.service.AuthorityRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

@Repository
@Component
public class EmployeeDAOImpl implements EmployeeDAO{

    private EntityManager entityManager;
    private final AuthorityRepository authorityRepository;
    private final RoleDAO roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserDAO userService;

    @Autowired
    public EmployeeDAOImpl(EntityManager entityManager, AuthorityRepository authorityRepository, RoleDAO roleRepository, PasswordEncoder passwordEncoder, UserDAO userService) {
        this.entityManager = entityManager;
        this.authorityRepository = authorityRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
    }

    @Override
    public List<Employee> findAll() {
        TypedQuery<Employee> theQuery = entityManager.createQuery("FROM Employee", Employee.class);
        List<Employee> employees = theQuery.getResultList();
        return employees;
    }

    @Override
    public List<DisplayEmployeeDTO> findEmployees(int id) {
        TypedQuery<DisplayEmployeeDTO> theQuery = entityManager.createQuery("FROM Employee Where department.id = :id", DisplayEmployeeDTO.class);
        theQuery.setParameter("id", id);
        List<DisplayEmployeeDTO> employees = theQuery.getResultList();

        return employees;
    }

    @Override
    public Employee findById(int id) {
        Employee employee = entityManager.find(Employee.class, id);
        return employee;
    }


    @Override
    public Employee save(CreateEmployeeDTO employee) {
        Logger logger = LoggerFactory.getLogger(getClass());

        Department department = entityManager.find(Department.class, employee.getBranchId());
        Role employeeRole = roleRepository.findRoleByName("ROLE_EMPLOYEE");

        // Create and save the user
        Users user = Users.builder()
                .username(employee.getUsername() + "@digitalequb.com")
                .fullName(employee.getFirstName() + " " + employee.getLastName())
                .password(passwordEncoder.encode("12345678"))
                .gender(employee.getGender())
                .photoPath(employee.getPhoto())
                .roles(new HashSet<>(Arrays.asList(employeeRole)))
                .build();

        Users savedUser = null;
        try {
            savedUser = userService.save(user);
            logger.info("User saved successfully: " + savedUser.getUsername());
        } catch (Exception e) {
            logger.error("Error saving user: ", e);
            throw new RuntimeException("Error saving user", e);
        }

        // Retrieve the newly created user
        Users newUser = null;
        try {
            newUser = userService.findByUserName(employee.getUsername() + "@digitalequb.com");
            if (newUser == null) {
                throw new RuntimeException("User not found after save");
            }
            logger.info("User found: " + newUser.getUsername());
        } catch (Exception e) {
            logger.error("Error finding user by username: ", e);
            throw new RuntimeException("Error finding user by username", e);
        }

        // Create and persist the new employee
        Employee newEmployee = new Employee();
        newEmployee.setFirstName(employee.getFirstName());
        newEmployee.setMiddleName(employee.getMiddleName());
        newEmployee.setPhotoPath(employee.getPhoto());
        newEmployee.setLastName(employee.getLastName());
        newEmployee.setGender(employee.getGender());
        newEmployee.setPhone(employee.getPhone());
        newEmployee.setCity(employee.getCity());
        newEmployee.setSubCity(employee.getSubCity());
        newEmployee.setEmail(employee.getEmail());
        newEmployee.setAddressInfo(employee.getAddressInfo());
        newEmployee.setEducationLevel(employee.getEducationLevel());
        newEmployee.setJobPosition(employee.getJobPosition());
        newEmployee.setStatus(employee.getStatus());
        newEmployee.setDepartment(department);
        newEmployee.setUserId(newUser.getId());

        entityManager.persist(newEmployee);
        logger.info("Employee saved successfully with ID: " + newEmployee.getId());
        return newEmployee;
    }


    @Override
    @Transactional
    public Employee update(EditEmployeeDTO employee) {
        Department department = entityManager.find(Department.class, employee.getDepartmentId());
        Employee newEmployee = entityManager.find(Employee.class, employee.getId());
        newEmployee.setFirstName(employee.getFirstName());
        newEmployee.setMiddleName(employee.getMiddleName());
        newEmployee.setLastName(employee.getLastName());
        newEmployee.setPhone(employee.getPhone());
        newEmployee.setCity(employee.getCity());
        newEmployee.setSubCity(employee.getSubCity());
        newEmployee.setPhotoPath(employee.getPhoto());
        newEmployee.setEmail(employee.getEmail());
        newEmployee.setAddressInfo(employee.getAddressInfo());
        newEmployee.setEducationLevel(employee.getEducationLevel());
        newEmployee.setJobPosition(employee.getJobPosition());
        newEmployee.setStatus(employee.getStatus());

        newEmployee.setDepartment(department);
        entityManager.merge(newEmployee);
        return newEmployee;
    }

    @Override
    public void deleteById(int id) {
        Employee employee = entityManager.find(Employee.class, id);
        entityManager.remove(employee);
    }
}
