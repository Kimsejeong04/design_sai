package com.example.Loginpj.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.example.Loginpj.model.Request;

import java.util.List;
import java.util.Map;

@Mapper
public interface RequestMapper {
    List<Request> findAll();
    Request findById(Long requestId);
    int insert(Request request);
    int update(Request request);
    int deleteById(Long requestId);
    
    List<Request> findByUsername(String username);
    void updateDescription(Map<String, Object> params);
}
