package com.elias.springboot.restcrud.dto.MailDto;

public class UsersMailDTO {
    private  int id;
    private  String userName;
    private  int userRoleId;
    private  String roleName;
    private  String fullName;
    private  String photoPath;
    private int unreadMessageCount;



    public int getId() {
        return id;
    }

    public String getUserName() {
        return userName;
    }

    public int getUserRoleId() {
        return userRoleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public String getFullName() {
        return fullName;
    }

    public String getPhotoPath() {
        return photoPath;
    }

    public int getUnreadMessageCount() {
        return unreadMessageCount;
    }

    public void setUnreadMessageCount(int unreadMessageCount) {
        this.unreadMessageCount = unreadMessageCount;
    }
    public void setPhotoPath(String photoPath) {
        this.photoPath = photoPath;
    }
    public void setId(int id) {
        this.id = id;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }


}
