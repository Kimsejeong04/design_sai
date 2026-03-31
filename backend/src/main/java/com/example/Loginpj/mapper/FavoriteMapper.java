// com.example.Loginpj.mapper.FavoriteMapper.java
package com.example.Loginpj.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param; // @Param은 필요에 따라 유지하거나 제거

import com.example.Loginpj.model.Favorite; // Favorite 모델 import
import com.example.Loginpj.model.Request;

@Mapper
public interface FavoriteMapper {
    void insertFavorite(Favorite favorite);

    List<Request> getFavoritesByDesignerId(@Param("designerId") String designerId);

    void deleteFavorite(Map<String, Object> params);
}