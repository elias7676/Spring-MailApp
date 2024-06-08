package com.elias.springboot.restcrud.dao;

import com.elias.springboot.restcrud.dto.employee.CreateEmployeeDTO;
import com.elias.springboot.restcrud.dto.employee.DisplayEmployeeDTO;
import com.elias.springboot.restcrud.dto.employee.EditEmployeeDTO;
import com.elias.springboot.restcrud.entity.Employee;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public interface EmployeeDAO {

    List<Employee> findAll();
    List<DisplayEmployeeDTO> findEmployees(int id);

    Employee findById(int id);

    Employee save(CreateEmployeeDTO employee);
    Employee update(EditEmployeeDTO employee);

    void deleteById(int id);
}
