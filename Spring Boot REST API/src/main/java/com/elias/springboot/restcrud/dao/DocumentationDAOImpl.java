package com.elias.springboot.restcrud.dao;


import com.elias.springboot.restcrud.dto.documentation.CreateDocumentationDTO;
import com.elias.springboot.restcrud.dto.documentation.UpdateDocumentationDTO;
import com.elias.springboot.restcrud.entity.Documentation;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@Component
public class DocumentationDAOImpl implements DocumentationDAO{
    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public DocumentationDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public List<Documentation> getDocumentation() {
        TypedQuery<Documentation> theQuery = entityManager.createQuery("FROM Documentation where isDeleted in (NULL, false) order by Id desc", Documentation.class);
        List<Documentation> documentations = theQuery.getResultList();
        if(documentations.isEmpty())
        {
            Documentation newDoc = new Documentation();
            newDoc.setId(0);
            newDoc.setName("Root");
            newDoc.setIsDirectory(true);
            documentations.add(newDoc);
            entityManager.persist(newDoc);
        }
        return documentations;
    }

    @Override
    public Documentation getOneDocumentation(int id) {
        Documentation documentation = entityManager.find(Documentation.class, id);
        return documentation;
    }

    @Override
    @Transactional
    public void saveDocumentation(CreateDocumentationDTO documentationDTO) {
        List<Documentation> existingInDir = entityManager.createQuery("FROM Documentation d WHERE d.parent.id = :parentId AND LOWER(d.name) = LOWER(:name)", Documentation.class)
                .setParameter("parentId", documentationDTO.getParentId())
                .setParameter("name", documentationDTO.getName())
                .getResultList();

        if (!existingInDir.isEmpty()) {
            throw new IllegalStateException("'" + documentationDTO.getName() + "' Already Exists In '" + existingInDir.get(0).getParent().getName() + "'.");
        }

        Documentation parentDoc = getOneDocumentation(documentationDTO.getParentId());
        Documentation documentation = new Documentation();
        documentation.setId(0);
        documentation.setName(documentationDTO.getName());
        documentation.setAttachment(documentationDTO.getAttachment());
        documentation.setIsDirectory(documentationDTO.getIsDirectory());
        documentation.setParentId(parentDoc.getId());

        entityManager.persist(documentation);

    }

    @Override
    @Transactional
    public void updateDocumentation(UpdateDocumentationDTO documentationDTO) {
        List<Documentation> existingInDir = entityManager.createQuery("FROM Documentation d WHERE d.parent.id = :parentId AND LOWER(d.name) = LOWER(:name)", Documentation.class)
                .setParameter("parentId", documentationDTO.getParentId())
                .setParameter("name", documentationDTO.getName())
                .getResultList();

        if (!existingInDir.isEmpty()) {
            throw new IllegalStateException("'" + documentationDTO.getName() + "' Already Exists In '" + existingInDir.get(0).getParent().getName() + "'.");
        }

        Documentation documentation = entityManager.find(Documentation.class, documentationDTO.getId());

        if (documentation == null) {
            throw new IllegalStateException("Documentation Not Found.");
        }

        documentation.setName(documentationDTO.getName());
        documentation.setAttachment(documentationDTO.getAttachment());
        documentation.setParent(entityManager.find(Documentation.class, documentationDTO.getParentId()));

        entityManager.merge(documentation);

    }

    @Override
    @Transactional
    public void deleteDocumentation(int id) {
        List<Documentation> documentations = entityManager.createQuery("FROM Documentation d ORDER BY d.id DESC", Documentation.class).getResultList();

        if (documentations.get(documentations.size() - 1).getId() == id) {
            throw new IllegalStateException("Root Documentation Can Not Be Deleted.");
        }

        Optional<Documentation> documentation = documentations.stream().filter(d -> d.getId() == id).findFirst();

        if (!documentation.isPresent()) {
            throw new IllegalStateException("Documentation Not Found.");
        }

//        if (!documentation.get().getChildren().isEmpty()) {
//            throw new IllegalStateException("Directory With Children Can Not Be Deleted.");
//        }
        documentation.get().setIsDeleted(true);
        documentation.get().setName(documentation.get().getName() + " (Deleted)");
        entityManager.merge(documentation.get());


    }
}
