package com.example.Loginpj.service;

import com.example.Loginpj.mapper.DesignViewMapper;
import com.example.Loginpj.model.UserDesign;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DesignViewService {

    @Autowired
    private DesignViewMapper designViewMapper;

    public List<UserDesign> getDesignsByUser(String username) {
        return designViewMapper.getDesignsByUser(username);
    }
}
