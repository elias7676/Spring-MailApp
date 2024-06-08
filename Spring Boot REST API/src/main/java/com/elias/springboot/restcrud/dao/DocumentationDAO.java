package com.elias.springboot.restcrud.dao;

import com.elias.springboot.restcrud.dto.documentation.CreateDocumentationDTO;
import com.elias.springboot.restcrud.dto.documentation.UpdateDocumentationDTO;
import com.elias.springboot.restcrud.entity.Documentation;

import java.util.List;

public interface DocumentationDAO {
    public List<Documentation> getDocumentation();
    public Documentation getOneDocumentation(int id);
    public void saveDocumentation(CreateDocumentationDTO documentation);
    public void updateDocumentation(UpdateDocumentationDTO documentation);
    public void deleteDocumentation(int id);
}
