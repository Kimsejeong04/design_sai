package com.example.Loginpj.model;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

public class UserDesign {
    private Long designId;
    private String username;
    private String clothingType;

    // DB에서 JSON 문자열로 받아올 필드
    private String fabricJson;
    private String colorsJson;

    private String size;
    private String designName;
    private Date createdAt;
    private String category;
    
    private String designImageBase64;

    // 실제로 프론트에서 사용할 List 형태의 getter
    @JsonIgnore
    public List<String> getFabric() {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(fabricJson, new TypeReference<List<String>>() {});
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }

    @JsonIgnore
    public List<Map<String, String>> getColors() {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(colorsJson, new TypeReference<List<Map<String, String>>>() {});
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }
    
    @JsonIgnore
    public List<String> getColorNames() {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            List<Map<String, String>> rawColors = objectMapper.readValue(colorsJson, new TypeReference<List<Map<String, String>>>() {});
            List<String> names = new ArrayList<>();
            for (Map<String, String> color : rawColors) {
                names.add(color.get("name")); // 혹은 "code"로 바꿔도 됨
            }
            return names;
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }


    // Getters and Setters
    public Long getDesignId() {
        return designId;
    }

    public void setDesignId(Long designId) {
        this.designId = designId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getClothingType() {
        return clothingType;
    }

    public void setClothingType(String clothingType) {
        this.clothingType = clothingType;
    }

    public String getFabricJson() {
        return fabricJson;
    }

    public void setFabricJson(String fabricJson) {
        this.fabricJson = fabricJson;
    }

    public String getColorsJson() {
        return colorsJson;
    }

    public void setColorsJson(String colorsJson) {
        this.colorsJson = colorsJson;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getDesignName() {
        return designName;
    }

    public void setDesignName(String designName) {
        this.designName = designName;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDesignImageBase64() {
        return designImageBase64;
    }
    
    public void setDesignImageBase64(String designImageBase64) {
        this.designImageBase64 = designImageBase64;
    }
    
    // 저장용 JSON 문자열 반환 (insert 시 사용)
    @JsonIgnore
    public String getFabricInsertJson() {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.writeValueAsString(getFabric());
        } catch (Exception e) {
            return "[]";
        }
    }

    @JsonIgnore
    public String getColorsInsertJson() {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.writeValueAsString(getColors());
        } catch (Exception e) {
            return "[]";
        }
    }
}
