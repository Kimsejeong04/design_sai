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
        
//    	  System.out.println("=== [DEBUG] 프론트에서 넘어온 데이터 ===");
//        System.out.println("디자인명: " + userDesign.getDesignName());
//        System.out.println("의류종류: " + userDesign.getClothingType());
//        System.out.println("이미지데이터(Base64): " + userDesign.getDesignImageUrl()); 
//        System.out.println("원단데이터: " + userDesign.getFabricInsertJson());
//        System.out.println("색상데이터: " + userDesign.getColorsInsertJson());
//        System.out.println("======================================");
    	
    	String username = (String) session.getAttribute("username");
        System.out.println("🔍 세션에서 가져온 username: " + username);

        System.out.println("📸 프론트에서 전달된 designImageUrl: " + userDesign.getDesignImageUrl());

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
        
        
        String base64Image = userDesign.getDesignImageUrl(); 

        if (base64Image != null && base64Image.contains(",")) {
            try {
                // Base64 텍스트 디코딩
                String base64Data = base64Image.split(",")[1];
                byte[] imageBytes = java.util.Base64.getDecoder().decode(base64Data);
                
                // 랜덤 파일명 생성 및 C드라이브 저장
                String fileName = java.util.UUID.randomUUID().toString() + ".png";
                java.nio.file.Path uploadPath = java.nio.file.Paths.get("C:/capstone_images/");
                
                if (!java.nio.file.Files.exists(uploadPath)) {
                    java.nio.file.Files.createDirectories(uploadPath);
                }
                java.nio.file.Files.write(uploadPath.resolve(fileName), imageBytes);
                
                // DB에는 짧은 URL 경로명으로 세팅
                userDesign.setDesignImageUrl("/images/" + fileName);
                
            } catch (Exception e) {
                System.err.println("❌ 이미지 폴더 저장 중 오류 발생");
                e.printStackTrace();
            }
        }
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
    
    @GetMapping("/mydesigns")
    public ResponseEntity<List<UserDesign>> getMyDesigns(@RequestBody Map<String, String> request) {
        String username = request.get("username");

        if (username == null || username.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        List<UserDesign> designs = userDesignService.getUserDesignsById(username);
        
        if (!designs.isEmpty()) {
            System.out.println("불러온 첫 번째 디자인 이미지: " + designs.get(0).getDesignImageUrl());
        }
        
        return ResponseEntity.ok(designs);
    }


}