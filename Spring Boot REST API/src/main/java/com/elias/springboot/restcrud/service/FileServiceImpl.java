package com.elias.springboot.restcrud.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class FileServiceImpl implements FileService {


    private String uploadDir = System.getProperty("user.dir");;
    private final ResourceLoader resourceLoader;

    public FileServiceImpl(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    @Override
    public String uploadFile(MultipartFile file) {
        String fileName = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS_"))+ file.getOriginalFilename() ;
        Path savePath = Paths.get(uploadDir + "/UploadedFiles", fileName);

        try (FileOutputStream fileOutputStream = new FileOutputStream(new File(savePath.toString()))) {
            fileOutputStream.write(file.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }

        return  fileName;
    }

    @Override
    public ResponseEntity<byte[]> getFile(String fileName) {
        try {
            // Construct the file path
            String filePath = Paths.get(uploadDir+ "/UploadedFiles", fileName).toString();
            Resource resource = resourceLoader.getResource("file:" + filePath);

            // Read the file content
            byte[] fileContent = Files.readAllBytes(resource.getFile().toPath());

            // Set response headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", fileName);

            // Return the file content as ResponseEntity
            return new ResponseEntity<>(fileContent, headers, HttpStatus.OK);
        }
        catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}