package com.elias.springboot.restcrud.dto.departmentdto;

public class UpdateRoleDto {
    private int roleId;
    private int[] users;

    //getters
    public int getRoleId() {
        return roleId;
    }

    public int[] getUsers() {
        return users;
    }
    
}
