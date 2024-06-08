package com.elias.springboot.restcrud.dto.documentation;

public class UpdateDocumentationDTO {
    private int id;
    private String name = "";
    private String attachment = "";
    private Integer parentId;

    // getters
    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getAttachment() {
        return attachment;
    }

    public Integer getParentId() {
        return parentId;
    }
}
