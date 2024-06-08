package com.elias.springboot.restcrud.dao;

import com.elias.springboot.restcrud.dto.departmentdto.UpdatePermissionDto;
import com.elias.springboot.restcrud.dto.departmentdto.UpdateRoleDto;
import com.elias.springboot.restcrud.entity.Employee;
import com.elias.springboot.restcrud.entity.Role;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureQuery;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Repository
@Component
public class RoleDAOImpl implements RoleDAO{

    private EntityManager entityManager;

    @Autowired
    public RoleDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public Role findRoleByName(String roleName) {

        TypedQuery<Role> theQuery = entityManager.createQuery("FROM Role WHERE name=:roleName", Role.class);
        theQuery.setParameter("roleName", roleName);

        Role role = null;

        try{
            role = theQuery.getSingleResult();
        } catch (Exception e){
            role = null;
        }

        return role;
    }

    @Override
    public List<Role> findAll() {
        TypedQuery<Role> theQuery = entityManager.createQuery("FROM Role", Role.class);
        List<Role> roles = theQuery.getResultList();
        return roles;
    }

    @Override
    @Transactional
    public Role save(Role role) {
        entityManager.persist(role);
        return role;
    }

    @Override
    public String updateRole(UpdateRoleDto updateRoleDto) {
        String json = Arrays.toString(updateRoleDto.getUsers());
        json = json.substring(1, json.length() - 1);
        StoredProcedureQuery spQuery = entityManager.createStoredProcedureQuery("dbo.UpdateUserRole")
                .registerStoredProcedureParameter("Users", String.class, ParameterMode.IN)
                .registerStoredProcedureParameter("RoleId", Integer.class, ParameterMode.IN)
                .registerStoredProcedureParameter("Ret", Integer.class, ParameterMode.OUT)
                .setParameter("Users", json)
                .setParameter("RoleId", updateRoleDto.getRoleId())
                .setParameter("Ret", 1);

        spQuery.execute();

        return "1";
    }

    @Override
    public String UpdatePermissions(UpdatePermissionDto updatePermissionDto) {
        String json = Arrays.toString(updatePermissionDto.getPermissions());
        json = json.substring(1, json.length() - 1);
        StoredProcedureQuery spQuery = entityManager.createStoredProcedureQuery("dbo.UpdateUserPermission")
                .registerStoredProcedureParameter("Permissions", String.class, ParameterMode.IN)
                .registerStoredProcedureParameter("RoleId", Integer.class, ParameterMode.IN)
                .registerStoredProcedureParameter("Ret", Integer.class, ParameterMode.OUT)
                .setParameter("Permissions", json)
                .setParameter("RoleId", updatePermissionDto.getRoleId())
                .setParameter("Ret", 1);

        spQuery.execute();
        return "";
    }
}
