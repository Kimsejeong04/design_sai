package com.example.Loginpj.controller;

import java.util.List;

import org.springframework.http.HttpStatus; // ResponseEntity 사용을 위해 추가
import org.springframework.http.ResponseEntity; // ResponseEntity 사용을 위해 추가
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Loginpj.model.Favorite;
import com.example.Loginpj.model.Request;
import com.example.Loginpj.service.FavoriteService;

import jakarta.servlet.http.HttpSession; // HttpSession import는 그대로 유지

@RestController
@RequestMapping("/designer")
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @PostMapping("/favorite")
    public ResponseEntity<?> addFavorite(@RequestBody Favorite favorite, HttpSession session) {
        String designerUsernameFromSession = (String) session.getAttribute("username"); 

        if (designerUsernameFromSession == null || designerUsernameFromSession.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        favorite.setDesignerId(designerUsernameFromSession); // ⭐ Favorite 모델의 designerId 타입이 String인지 확인 필요

        // 요청 ID가 있는지 확인
        if (favorite.getRequestId() == null) {
            return ResponseEntity.badRequest().body("requestId가 필요합니다.");
        }

        try {
            favoriteService.addFavorite(favorite);
            return ResponseEntity.ok("찜하기 성공!");
        } catch (Exception e) {
            e.printStackTrace(); 
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("찜하기 실패: " + e.getMessage());
        }
    }

    @GetMapping("/favorites/{designerId}")
    public List<Request> getFavorites(@PathVariable String designerId) {
        return favoriteService.getFavoritesByDesignerId(designerId);
    }

    @DeleteMapping("/favorite")
    public void deleteFavorite(@RequestParam String designerId, @RequestParam Long requestId) {
        favoriteService.removeFavorite(designerId, requestId);
    }

}