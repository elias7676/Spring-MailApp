package com.elias.springboot.restcrud.dto.departmentdto;



public class UpdateDepartmentDTO {

    private int id;
    private String name;
    private String description;
    private String contactPersonPhone;
    private String contactPersonName;

    // Getters and Setters
    public int getId() {
        return id;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getContactPersonPhone() {
        return contactPersonPhone;
    }

    public void setContactPersonPhone(String contactPersonPhone) {
        this.contactPersonPhone = contactPersonPhone;
    }

    public String getContactPersonName() {
        return contactPersonName;
    }
    public void setId(int id) {
        this.id = id;
    }

    public void setContactPersonName(String contactPersonName) {
        this.contactPersonName = contactPersonName;
    }
}
