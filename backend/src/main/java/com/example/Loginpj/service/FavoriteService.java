package com.example.Loginpj.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.Loginpj.mapper.FavoriteMapper;
import com.example.Loginpj.model.Favorite;
import com.example.Loginpj.model.Request;

@Service
public class FavoriteService {
    private final FavoriteMapper favoriteMapper;

    public FavoriteService(FavoriteMapper favoriteMapper) {
        this.favoriteMapper = favoriteMapper;
    }

    public void addFavorite(Favorite favorite) {
        favoriteMapper.insertFavorite(favorite);
    }

    public List<Request> getFavoritesByDesignerId(String designerId) {
        return favoriteMapper.getFavoritesByDesignerId(designerId);
    }

    public void removeFavorite(String designerId, Long requestId) {
        Map<String, Object> params = new HashMap<>();
        params.put("designerId", designerId);
        params.put("requestId", requestId);
        favoriteMapper.deleteFavorite(params);
    }
}
