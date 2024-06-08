package com.elias.springboot.restcrud.service;

import com.elias.springboot.restcrud.dao.EmployeeDAO;
import com.elias.springboot.restcrud.dto.employee.CreateEmployeeDTO;
import com.elias.springboot.restcrud.dto.employee.DisplayEmployeeDTO;
import com.elias.springboot.restcrud.dto.employee.EditEmployeeDTO;
import com.elias.springboot.restcrud.entity.Employee;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService{

    private EmployeeDAO employeeDAO;

    public EmployeeServiceImpl(EmployeeDAO employeeDAO) {
        this.employeeDAO = employeeDAO;
    }

    @Override
    public List<Employee> findAll() {
        return employeeDAO.findAll();
    }

    @Override
    public Employee findById(int id) {
        return employeeDAO.findById(id);
    }

    @Override
    public List<DisplayEmployeeDTO> findEmployees(int id) {
        return employeeDAO.findEmployees(id);
    }

    @Transactional
    @Override
    public Employee save(CreateEmployeeDTO employee) {
        Employee dbEmployee = employeeDAO.save(employee);
        return dbEmployee;
    }

    @Override
    public Employee update(EditEmployeeDTO employee) {
        return employeeDAO.update(employee);
    }

    @Transactional
    @Override
    public void deleteById(int id) {
        employeeDAO.deleteById(id);
    }
}
