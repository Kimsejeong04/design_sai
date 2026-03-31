package com.example.Loginpj.service;

import com.example.Loginpj.mapper.RequestMapper;
import com.example.Loginpj.model.Request;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RequestService {

    private final RequestMapper mapper;

    public RequestService(RequestMapper mapper) {
        this.mapper = mapper;
    }

    public List<Request> getAll() {
        return mapper.findAll();
    }

    public Request getById(Long id) {
        return mapper.findById(id);
    }

    public int create(Request request) {
        return mapper.insert(request);
    }

    public int update(Request request) {
        return mapper.update(request);
    }

    public int delete(Long id) {
        return mapper.deleteById(id);
    }

    public List<Request> getByUsername(String username) {
        return mapper.findByUsername(username);
    }

    public int updateDescription(Long requestId, String description) {
        Map<String, Object> params = new HashMap<>();
        params.put("requestId", requestId);
        params.put("description", description);
        mapper.updateDescription(params);
        return 1; // MyBatis의 update는 영향을 받은 행 수를 반환하므로, 실제 구현에서는 이를 반환하도록 수정 가능
    }
}