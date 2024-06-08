package com.elias.springboot.restcrud.dto.employee;



public class EditEmployeeDTO {
    private int id;
    private String photo;
    private String firstName;
    private String middleName;
    private String lastName;
    private String phone;
    private String city;
    private String subCity;
    private String email;
    private String addressInfo;
    private String educationLevel;
    private String jobPosition;
    private String status;
    private Integer departmentId;
    private int userId;
    private int branchId;

    // getters
    public int getId() {
        return id;
    }

    public String getPhoto() {
        return photo;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getPhone() {
        return phone;
    }

    public String getCity() {
        return city;
    }

    public String getSubCity() {
        return subCity;
    }

    public String getEmail() {
        return email;
    }

    public String getAddressInfo() {
        return addressInfo;
    }

    public String getEducationLevel() {
        return educationLevel;
    }

    public String getJobPosition() {
        return jobPosition;
    }

    public String getStatus() {
        return status;
    }

    public Integer getDepartmentId() {
        return departmentId;
    }

    public int getUserId() {
        return userId;
    }

    public int getBranchId() {
        return branchId;
    }
}