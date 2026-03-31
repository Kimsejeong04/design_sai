package com.example.Loginpj.controller;

import com.example.Loginpj.model.Request;
import com.example.Loginpj.service.RequestService;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/requests")
public class RequestController {

    private final RequestService service;
    private static final String UPLOAD_DIR = System.getProperty("user.home") + "/upload/images/";

    public RequestController(RequestService service) {
        this.service = service;
    }

    @GetMapping
    public List<Request> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Request> getById(@PathVariable Long id) {
        Request request = service.getById(id);
        if (request == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(request);
    }

    @PostMapping
    public ResponseEntity<String> create(@RequestBody Request request) {
    	System.out.println("image1Url: " + request.getImage1Url());
        System.out.println("image2Url: " + request.getImage2Url());
        System.out.println("image3Url: " + request.getImage3Url());

    	
    	int result = service.create(request);
        if (result == 1) return ResponseEntity.ok("Request created successfully");
        else return ResponseEntity.status(500).body("Failed to create request");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> update(@PathVariable Long id, @RequestBody Request request) {
        request.setRequestId(id);
        int result = service.update(request);
        if (result == 1) return ResponseEntity.ok("Request updated successfully");
        else return ResponseEntity.status(500).body("Failed to update request");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        int result = service.delete(id);
        if (result == 1) return ResponseEntity.ok("Request deleted successfully");
        else return ResponseEntity.status(500).body("Failed to delete request");
    }

    @GetMapping("/user")
    public ResponseEntity<List<Request>> getByUsername(@RequestParam String username) {
        List<Request> requests = service.getByUsername(username);
        if (requests.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(requests);
    }

    @PatchMapping("/{id}/description")
    public ResponseEntity<String> updateDescription(@PathVariable Long id, @RequestBody Map<String, String> requestBody) {
        String description = requestBody.get("description");
        if (description == null || description.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Description cannot be empty");
        }
        int result = service.updateDescription(id, description);
        if (result == 1) {
            return ResponseEntity.ok("Description updated successfully");
        } else {
            return ResponseEntity.status(500).body("Failed to update description");
        }
    }
    
    
    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("파일이 없습니다.");
        }

        try {
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) uploadDir.mkdirs();

            String originalFilename = file.getOriginalFilename();
            String extension = "";

            int dotIndex = originalFilename.lastIndexOf('.');
            if (dotIndex >= 0) {
                extension = originalFilename.substring(dotIndex);
            }

            String savedFileName = System.currentTimeMillis() + extension;
            Path filePath = Paths.get(UPLOAD_DIR + savedFileName);

            Files.write(filePath, file.getBytes());

            String imageUrl = "/files/view/" + savedFileName;

            return ResponseEntity.ok(Map.of("imageUrl", imageUrl));

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("파일 저장 실패");
        }
    }
    
    @GetMapping("/files/view/{filename:.+}")
    public ResponseEntity<Resource> viewImage(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(UPLOAD_DIR, filename);
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            // 파일의 MIME 타입 추정
            String contentType = Files.probeContentType(filePath);
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(resource);

        } catch (MalformedURLException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(null);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }
}