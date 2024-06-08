package com.elias.springboot.restcrud.dto.departmentdto;


public class UpdatePermissionDto {
    private int roleId;
    private int[] permissions;

    //getters
    public int getRoleId() {
        return roleId;
    }

    public int[] getPermissions() {
        return permissions;
    }

}

