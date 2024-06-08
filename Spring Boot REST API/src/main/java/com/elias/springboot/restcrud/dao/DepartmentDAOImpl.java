package com.elias.springboot.restcrud.dao;

import com.elias.springboot.restcrud.dto.departmentdto.AddDepartmentDTO;
import com.elias.springboot.restcrud.dto.departmentdto.EditDepartmentDTO;
import com.elias.springboot.restcrud.dto.departmentdto.UpdateDepartmentDTO;
import com.elias.springboot.restcrud.entity.Department;
import com.elias.springboot.restcrud.entity.Employee;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.procedure.ProcedureCall;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import java.sql.*;

import java.util.List;

@Repository
@Component
public class DepartmentDAOImpl implements DepartmentDAO{
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private SessionFactory sessionFactory;

    @Autowired
    public DepartmentDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<Department> findAll() {
        TypedQuery<Department> theQuery = entityManager.createQuery("FROM Department", Department.class);
        List<Department> departments = theQuery.getResultList();
        return departments;
    }

    @Override
    public Department findById(int id) {
        Department department = entityManager.find(Department.class, id);
        return department;
    }

    @Override
    @Transactional
    public Department save(AddDepartmentDTO addDepartmentDTO) {
        // No EntityManager with actual transaction available for current thread - cannot reliably process 'merge' call

        Department department = new Department();
        department.setName(addDepartmentDTO.getName());
        department.setDescription(addDepartmentDTO.getDescription());
        department.setContactPersonName(addDepartmentDTO.getContactPersonName());
        department.setContactPersonPhone(addDepartmentDTO.getContactPersonPhone());
        Department savedDepartment = entityManager.merge(department);
        return savedDepartment;
    }

    @Override
    @Transactional
    public Department update(UpdateDepartmentDTO updateDepartmentDTO) {
        Department department = entityManager.find(Department.class, updateDepartmentDTO.getId());
        department.setDescription(updateDepartmentDTO.getDescription());
        department.setName(updateDepartmentDTO.getName());
        department.setContactPersonName(updateDepartmentDTO.getContactPersonName());
        department.setContactPersonPhone(updateDepartmentDTO.getContactPersonPhone());
        Department updatedDepartment = entityManager.merge(department);
        return updatedDepartment;
    }

    @Override
    @Transactional
    public void deleteById(int id) {
        Department department = entityManager.find(Department.class, id);
        entityManager.remove(department);
    }

    @Override
    @Transactional
    public int updateUserDepartment(List<EditDepartmentDTO> editDepartmentDTO) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(editDepartmentDTO);
        StoredProcedureQuery spQuery = entityManager.createStoredProcedureQuery("dbo.UpdateUserDepartment")
                .registerStoredProcedureParameter("UserDetails", String.class, ParameterMode.IN)
                .registerStoredProcedureParameter("Ret", Integer.class, ParameterMode.OUT)
                .setParameter("UserDetails", json)
               .setParameter("Ret", 1);

        spQuery.execute();

        return 1;
    }



}
