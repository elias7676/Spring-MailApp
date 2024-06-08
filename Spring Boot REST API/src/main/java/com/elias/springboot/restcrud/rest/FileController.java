package com.elias.springboot.restcrud.rest;

import com.elias.springboot.restcrud.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@Component
@RequestMapping("/api/file")
public class FileController {
    private final FileService fileService;

    @Autowired
    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @GetMapping("/{fileName}")
    public ResponseEntity<byte[]>  getFile(@PathVariable String fileName){
        return fileService.getFile(fileName);
    }

    @PostMapping
    public String getFile(@RequestBody MultipartFile fileName){
        return fileService.uploadFile(fileName);
    }
}
