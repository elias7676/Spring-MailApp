package com.elias.springboot.restcrud.dto.documentation;

public class CreateDocumentationDTO {
    private String name = "";
    private String attachment = "";
    private boolean isDirectory = false;
    private Integer parentId;



    // getters
    public String getName() {
        return name;
    }

    public String getAttachment() {
        return attachment;
    }

    public boolean getIsDirectory() {
        return isDirectory;
    }

    public Integer getParentId() {
        return parentId;
    }
}
