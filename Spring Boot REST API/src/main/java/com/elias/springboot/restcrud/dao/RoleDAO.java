package com.elias.springboot.restcrud.dao;

import com.elias.springboot.restcrud.dto.departmentdto.UpdatePermissionDto;
import com.elias.springboot.restcrud.dto.departmentdto.UpdateRoleDto;
import com.elias.springboot.restcrud.entity.Employee;
import com.elias.springboot.restcrud.entity.Role;
import com.elias.springboot.restcrud.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface RoleDAO  {

    public Role findRoleByName(String roleName);
    List<Role> findAll();
    Role save(Role user);
    String updateRole(UpdateRoleDto updateRoleDto);
    String UpdatePermissions(UpdatePermissionDto updatePermissionDto);

}
