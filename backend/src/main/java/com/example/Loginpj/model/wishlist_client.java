package com.example.Loginpj.model;

import java.sql.Date;

public class wishlist_client {
    private Long wishId;
    private String clientId;
    private Long postnum;
    private Date createdAt;
    private String designerId;

    // 기본 생성자
    public wishlist_client() {}

    // getter/setter
    public Long getWishId() { return wishId; }
    public void setWishId(Long wishId) { this.wishId = wishId; }

    public String getClientId() { return clientId; }
    public void setClientId(String clientId) { this.clientId = clientId; }

    public Long getPostnum() { return postnum; }
    public void setPostnum(Long postnum) { this.postnum = postnum; }

    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }

    public String getDesignerId() {
        return designerId;
    }

    public void setDesignerId(String designerId) {
        this.designerId = designerId;
    }
}
