package com.example.Loginpj.controller;

import com.example.Loginpj.service.DesignViewService;

import jakarta.servlet.http.HttpSession;

import com.example.Loginpj.model.UserDesign;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/designs")
@CrossOrigin(origins = "http://localhost:3000")
public class DesignViewController {

    @Autowired
    private DesignViewService designService;

    @PostMapping("/mydesigns")
    public List<UserDesign> getMyDesigns(@RequestBody Map<String, String> request) {
        String username = request.get("username"); // "id" 대신 "username"으로 받기
        
        System.out.println("💡 전달받은 username: " + username);
        if (username == null) {
            return new ArrayList<>();
        }
        List<UserDesign> result = designService.getDesignsByUser(username); // service 메서드에 username 전달
        System.out.println("🎯 불러온 디자인 수: " + result.size());
        
        return result;
    }
}