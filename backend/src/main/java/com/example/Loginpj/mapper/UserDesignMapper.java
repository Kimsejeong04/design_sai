package com.example.Loginpj.mapper;

import com.example.Loginpj.model.UserDesign;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserDesignMapper {
    // 데이터 삽입 (INSERT)
    void insertUserDesign(UserDesign userDesign);

    // 특정 사용자 디자인 조회 (SELECT)
    List<UserDesign> findByUserId(String username);

    // 특정 사용자의 사이즈 업데이트 (XML에서 관리)
    int updateSizeByUserId(@Param("username") String username, @Param("size") String size);
    
    UserDesign findById(Long designId);
}

