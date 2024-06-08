package com.elias.springboot.restcrud.rest;

import com.elias.springboot.restcrud.dao.DepartmentDAO;
import com.elias.springboot.restcrud.dao.EmployeeDAO;
import com.elias.springboot.restcrud.dto.departmentdto.AddDepartmentDTO;
import com.elias.springboot.restcrud.dto.departmentdto.EditDepartmentDTO;
import com.elias.springboot.restcrud.dto.departmentdto.UpdateDepartmentDTO;
import com.elias.springboot.restcrud.entity.Department;
import com.elias.springboot.restcrud.entity.Employee;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Component
@RequestMapping("/api")
public class DepartmentController {

    private DepartmentDAO departmentDAO;

    public DepartmentController(DepartmentDAO departmentDAO) {
        this.departmentDAO = departmentDAO;
    }
    @GetMapping("/department")
    public List<Department> findAll(){
        return departmentDAO.findAll();
    }


    @GetMapping("/department/{departmentId}")
    public Department findById(int departmentId){
        Department department = departmentDAO.findById(departmentId);
        if(department == null) {
            throw new RuntimeException("Department not found. ID: " + departmentId);
        }
        return department;
    }
    @PostMapping("/department")
    public Department saveDepartment(@RequestBody AddDepartmentDTO department){
        Department dbDepartment = departmentDAO.save(department);
        return dbDepartment;
    }
    @PutMapping("/department")
    public Department updateDepartment(@RequestBody UpdateDepartmentDTO department){
        return departmentDAO.update(department);
    }
    @PutMapping("/department/user")
    // pass List<EditDepartmentDTO>
    public int updateUserDepartment(@RequestBody List<EditDepartmentDTO> department) throws JsonProcessingException {
        return departmentDAO.updateUserDepartment(department);
    }
    @DeleteMapping("/department/{departmentId}")
    public String deleteDepartment(@PathVariable int departmentId){
        Department department = departmentDAO.findById(departmentId);
        if(department == null) {
            throw new RuntimeException("Department not found. ID: " + departmentId);
        }
        departmentDAO.deleteById(departmentId);
        return "Deleted department with ID: " + departmentId;
    }
}
