package com.elias.springboot.restcrud.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "documentation")
public class Documentation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name = "";
    private String attachment = "";
    private boolean isDirectory = false;

    @Column(name = "is_deleted")
    private boolean isDeleted = false;
    @ManyToOne
    @JoinColumn(name = "parent_id", insertable = false, updatable = false)
    @JsonIgnoreProperties("children")
    private Documentation parent;

    @Column(name = "parent_id")
    private Integer parentId;

    @OneToMany(mappedBy = "parent")
    @JsonIgnoreProperties("parent")
    private List<Documentation> children;
    private Date createdAt = new Date();
    private Date updatedAt = new Date();

    // getters and setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAttachment() {
        return attachment;
    }

    public void setAttachment(String attachment) {
        this.attachment = attachment;
    }

    public boolean getIsDirectory() {
        return isDirectory;
    }

    public void setIsDirectory(boolean isDirectory) {
        this.isDirectory = isDirectory;
    }

    public boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    public Documentation getParent() {
        return parent;
    }

    public void setParent(Documentation parent) {
        this.parent = parent;
    }

    public List<Documentation> getChildren() {
        return children;
    }

    public void setChildren(List<Documentation> children) {
        this.children = children;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
    public Integer getParentId() {
        return parentId;
    }
    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }
}