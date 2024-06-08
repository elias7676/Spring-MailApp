package com.elias.springboot.restcrud.rest;


import com.elias.springboot.restcrud.dao.DepartmentDAO;
import com.elias.springboot.restcrud.dao.DocumentationDAO;
import com.elias.springboot.restcrud.dto.departmentdto.EditDepartmentDTO;
import com.elias.springboot.restcrud.dto.documentation.CreateDocumentationDTO;
import com.elias.springboot.restcrud.dto.documentation.UpdateDocumentationDTO;
import com.elias.springboot.restcrud.entity.Documentation;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Component
@RequestMapping("/api")
public class DocumentationController {
    private DocumentationDAO documentationService;

    public DocumentationController(DocumentationDAO documentationService) {
        this.documentationService = documentationService;
    }
    @GetMapping("/documentation")
    public List<Documentation> getDocumentation(){
        return documentationService.getDocumentation();
    }
    @GetMapping("/documentation/{id}")
    public Documentation getOneDocumentation(@PathVariable int id){
        return documentationService.getOneDocumentation(id);
    }
    @PostMapping("/documentation")
    public void saveDocumentation(@RequestBody CreateDocumentationDTO documentation){
        documentationService.saveDocumentation(documentation);
    }
    @PutMapping("/documentation")
    public void updateDocumentation(@RequestBody UpdateDocumentationDTO documentation){
        documentationService.updateDocumentation(documentation);
    }
    @DeleteMapping("/documentation/{id}")
    public void deleteDocumentation(@PathVariable int id){
        documentationService.deleteDocumentation(id);
    }
}
