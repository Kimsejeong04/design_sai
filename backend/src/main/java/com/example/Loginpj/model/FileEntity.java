package com.example.Loginpj.model;

import java.time.LocalDateTime;

public class FileEntity {
    private int id;
    private String fileName;
    private String filePath;
    private LocalDateTime uploadedAt;
    private String userId;  // 추가된 user_id 필드

    // 생성자
    public FileEntity() {}

    public FileEntity(String fileName, String filePath) {
        this.fileName = fileName;
        this.filePath = filePath;
        this.uploadedAt = LocalDateTime.now();
    }

    // Getter & Setter
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }

    public String getFilePath() { return filePath; }
    public void setFilePath(String filePath) { this.filePath = filePath; }

    public LocalDateTime getUploadedAt() { return uploadedAt; }
    public void setUploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; }

    public String getUserId() { return userId; }  // 추가된 getter
    public void setUserId(String userId) { this.userId = userId; }  // 추가된 setter
}
