package com.example.Loginpj.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import com.example.Loginpj.model.UserDesign;
import com.example.Loginpj.service.UserDesignService;

import jakarta.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/designs")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // ✅ React 요청 허용
public class UserDesignController {
    private final UserDesignService userDesignService;

    public UserDesignController(UserDesignService userDesignService) {
        this.userDesignService = userDesignService;
    }

    @PostMapping("/add")
    public ResponseEntity<Object> addUserDesign(@RequestBody UserDesign userDesign, HttpSession session) {
        String username = (String) session.getAttribute("username");
        System.out.println("🔍 세션에서 가져온 username: " + username);

        System.out.println("📸 프론트에서 전달된 designImageBase64: " + userDesign.getDesignImageBase64());

        if (username == null || username.isEmpty()) {
            return ResponseEntity.status(401).body(Map.of("message", "❌ 로그인 후 이용해주세요."));
        }

        if (userDesign.getDesignName() == null || userDesign.getDesignName().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "❌ 디자인 이름이 없습니다."));
        }

        // ⭐ clothingType 검증 추가:
        if (userDesign.getClothingType() == null || userDesign.getClothingType().isEmpty()) {
            System.err.println("❌ 에러: clothingType이 NULL이거나 비어있습니다. 받은 값: " + userDesign.getClothingType());
            return ResponseEntity.badRequest().body(Map.of("message", "❌ 의류 종류(Clothing Type)가 없습니다."));
        }

        if (userDesign.getColorsInsertJson() == null || userDesign.getColorsInsertJson().isEmpty()) { // getColor**sInsertJson** 사용
            System.err.println("❌ 에러: colorsJson이 NULL이거나 비어있습니다.");
            return ResponseEntity.badRequest().body(Map.of("message", "❌ 색상 데이터가 없습니다."));
        }
        // ⭐ fabricJson 추가 검증 (선택 사항이지만 안전을 위해):
        if (userDesign.getFabricInsertJson() == null || userDesign.getFabricInsertJson().isEmpty()) { // getFabric**InsertJson** 사용
            System.err.println("❌ 에러: fabricJson이 NULL이거나 비어있습니다.");
            // 필수적이지 않다면 이 라인을 주석 처리하거나, 다른 메시지를 반환하세요.
            return ResponseEntity.badRequest().body(Map.of("message", "❌ 원단 데이터가 없습니다."));
        }

        userDesign.setUsername(username);

        try {
            userDesignService.saveUserDesign(userDesign);
            return ResponseEntity.ok(Map.of("message", "✅ 디자인 저장 완료!"));
        } catch (Exception e) {
            System.err.println("❌ 디자인 저장 중 오류 발생: " + e.getMessage());
            e.printStackTrace(); // 전체 스택 트레이스 출력
            return ResponseEntity.status(500).body(Map.of("message", "❌ 디자인 저장 실패: " + e.getMessage()));
        }
    }

    @GetMapping("/{id}") // 이 경로는 username 대신 id로 되어 있어서 혼란을 줄 수 있습니다.
    public ResponseEntity<List<UserDesign>> getUserDesigns(@PathVariable String id) {
        List<UserDesign> designs = userDesignService.getUserDesignsById(id);
        return ResponseEntity.ok(designs);
    }
    
    @PostMapping("/mydesigns")
    public ResponseEntity<List<UserDesign>> getMyDesigns(@RequestBody Map<String, String> request) {
        String username = request.get("username");

        if (username == null || username.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        List<UserDesign> designs = userDesignService.getUserDesignsById(username);
        return ResponseEntity.ok(designs);
    }


}