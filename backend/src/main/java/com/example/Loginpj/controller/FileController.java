package com.example.Loginpj.controller;

import com.example.Loginpj.model.FileEntity;
import com.example.Loginpj.service.FileService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import jakarta.servlet.http.HttpSession;


import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/files")
public class FileController {

    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    // 파일 업로드 API
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file, HttpSession session) {
        System.out.println("세션:" + session);

    	String userId = (String) session.getAttribute("username");
        System.out.println("유저네임: " + userId);

    	 if (userId == null) {
             return ResponseEntity.status(401).body("로그인이 필요합니다!!");
         }
    	 String responseMessage = fileService.uploadFile(file, userId);
    	
    	 return ResponseEntity.ok(responseMessage);
    }
    
    // 업로드된 파일 목록 조회 API
    @GetMapping("/list")
    public ResponseEntity<List<FileEntity>> getAllFiles() {
        return ResponseEntity.ok(fileService.getUploadedFiles());
    }

    // 특정 이미지 제공 API
    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewFile(@PathVariable String fileName) {
        try {
            Path filePath = Paths.get("C:/SavedFolder").resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                // 확장자를 기반으로 Content-Type 결정
                String contentType = Files.probeContentType(filePath);
                if (contentType == null) {
                    contentType = "application/octet-stream"; // 기본값
                }

                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"") // 다운로드 강제
                        .body(resource);
            } else {
                return ResponseEntity.badRequest().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    /*
    public ResponseEntity<Resource> viewFile(@PathVariable String fileName) {
        try {
            Path filePath = Paths.get("C:/SavedFolder").resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG) // 필요시 확장자에 따라 변경
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.badRequest().build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().build();
        }
    }*/
    //데베에서 로그인한 유저만 가져오는기능
    @GetMapping("/userimg")
    public ResponseEntity<List<FileEntity>> getUserFiles(@RequestParam("username") String username) {
        List<FileEntity> files = fileService.getFilesByUser(username);
        return ResponseEntity.ok(files);
    }
}
