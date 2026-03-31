package com.example.Loginpj.mapper;

import com.example.Loginpj.model.FileEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FileMapper {
    void insertFile(FileEntity file);
    List<FileEntity> getAllFiles();
    
    
    List<FileEntity> getUserFiles(String username);
}
