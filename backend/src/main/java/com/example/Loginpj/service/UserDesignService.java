package com.example.Loginpj.service;

import com.example.Loginpj.mapper.UserDesignMapper;
import com.example.Loginpj.model.UserDesign;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserDesignService {
    private final UserDesignMapper userDesignMapper;

    public UserDesignService(UserDesignMapper userDesignMapper) {
        this.userDesignMapper = userDesignMapper;
    }

    public void saveUserDesign(UserDesign userDesign) {
        userDesignMapper.insertUserDesign(userDesign);
    }

    public List<UserDesign> getUserDesignsById(String username) {
        return userDesignMapper.findByUserId(username);
    }

    public boolean updateUserDesignSize(String username, String size) {
        int updatedRows = userDesignMapper.updateSizeByUserId(username, size);
        return updatedRows > 0;
    }
    
    public UserDesign getDesignById(Long designId) {
        return userDesignMapper.findById(designId);
    }

}
