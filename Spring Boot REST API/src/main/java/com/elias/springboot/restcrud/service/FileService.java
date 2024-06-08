package com.elias.springboot.restcrud.service;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public interface FileService {
    public String uploadFile(MultipartFile file);
    public ResponseEntity<byte[]> getFile(String fileName);
}
