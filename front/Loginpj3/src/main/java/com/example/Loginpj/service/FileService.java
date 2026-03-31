package com.example.Loginpj.service;

import com.example.Loginpj.mapper.FileMapper;
import com.example.Loginpj.model.FileEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class FileService {

    private final FileMapper fileMapper;

    @Value("${file.upload-dir}") // application.properties에서 값 가져오기
    private String uploadDir;

    public FileService(FileMapper fileMapper) {
        this.fileMapper = fileMapper;
    }

    public String uploadFile(MultipartFile file) {
        try {
            // 고유한 파일명 생성
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            String filePath = uploadDir + File.separator + fileName;

            // 폴더 없으면 생성
            File dir = new File(uploadDir);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            // 파일 저장
            file.transferTo(new File(filePath));

            // DB에 파일 정보 저장
            FileEntity fileEntity = new FileEntity(fileName, filePath);
            fileMapper.insertFile(fileEntity);

            return "파일 업로드 성공: " + fileName;
        } catch (IOException e) {
            return "파일 업로드 실패: " + e.getMessage();
        }
    }

    public List<FileEntity> getUploadedFiles() {
    	 List<FileEntity> files = fileMapper.getAllFiles();
    	    // 결과 확인용 로그 추가
    	    files.forEach(file -> System.out.println(file.getFileName() + ", " + file.getFilePath()));
    	    return files;
    }
}
