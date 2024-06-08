package com.elias.springboot.restcrud.dao;

import com.elias.springboot.restcrud.dto.departmentdto.AddDepartmentDTO;
import com.elias.springboot.restcrud.dto.departmentdto.EditDepartmentDTO;
import com.elias.springboot.restcrud.dto.departmentdto.UpdateDepartmentDTO;
import com.elias.springboot.restcrud.entity.Department;
import com.elias.springboot.restcrud.entity.Employee;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.stereotype.Component;

import java.sql.SQLException;
import java.util.List;

@Component
public interface DepartmentDAO {

    List<Department> findAll();

    Department findById(int id);

    Department save(AddDepartmentDTO addDepartmentDTO);

    Department update(UpdateDepartmentDTO updateDepartmentDTO);
    int updateUserDepartment(List<EditDepartmentDTO> editDepartmentDTO) throws JsonProcessingException;

    void deleteById(int id);
}
