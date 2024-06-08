package com.elias.springboot.restcrud.service;

import com.elias.springboot.restcrud.dto.employee.CreateEmployeeDTO;
import com.elias.springboot.restcrud.dto.employee.DisplayEmployeeDTO;
import com.elias.springboot.restcrud.dto.employee.EditEmployeeDTO;
import com.elias.springboot.restcrud.entity.Employee;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public interface EmployeeService {

    List<Employee> findAll();
    Employee findById(int id);
    List<DisplayEmployeeDTO> findEmployees(int id);

    Employee save(CreateEmployeeDTO employee);
    Employee update(EditEmployeeDTO employee);

    void deleteById(int id);
}
