package com.elias.springboot.restcrud.rest;

import com.elias.springboot.restcrud.dao.EmployeeDAO;
import com.elias.springboot.restcrud.dto.employee.CreateEmployeeDTO;
import com.elias.springboot.restcrud.dto.employee.DisplayEmployeeDTO;
import com.elias.springboot.restcrud.dto.employee.EditEmployeeDTO;
import com.elias.springboot.restcrud.entity.Employee;
import com.elias.springboot.restcrud.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Component
@RequestMapping("/api")
class EmployeeController {

    private EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/employees")
    public List<Employee> findAll(){
        return employeeService.findAll();
    }

    @GetMapping("/employees/department/{id}")
    public List<DisplayEmployeeDTO> findEmployees(@PathVariable int id){
        return employeeService.findEmployees(id);
    }

    @GetMapping("/employees/{employeeId}")
    public Employee findById(@PathVariable int employeeId){
        Employee employee = employeeService.findById(employeeId);
        if(employee == null) {
            throw new RuntimeException("Employee not found. ID: " + employeeId);
        }
        return employee;
    }

    @PostMapping("/employees")
    public Employee saveEmployee(@RequestBody CreateEmployeeDTO employee){

        Employee dbEmployee = employeeService.save(employee);
        return dbEmployee;
    }

    @PutMapping("/employees")
    public Employee updateEmployee(@RequestBody EditEmployeeDTO employee){
        return employeeService.update(employee);
    }

    @DeleteMapping("/employees/{employeeID}")
    public String delete(@PathVariable int employeeID){
        employeeService.deleteById(employeeID);
        return "employee with ID: " + employeeID + " is deleted.";
    }
}
