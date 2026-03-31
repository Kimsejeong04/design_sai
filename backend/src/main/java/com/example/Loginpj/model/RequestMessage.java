package com.example.Loginpj.model;

import java.util.Date;

public class RequestMessage {
    private Long id;
    private Long contractId;
    private String clientId;
    private String designerId;
    private String content;
    private Date sentTime;
    private String isRead;

    private String contractTitle;  // 💡 조인 결과로 받은 계약 제목

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getContractId() { return contractId; }
    public void setContractId(Long contractId) { this.contractId = contractId; }

    public String getClientId() { return clientId; }
    public void setClientId(String clientId) { this.clientId = clientId; }

    public String getDesignerId() { return designerId; }
    public void setDesignerId(String designerId) { this.designerId = designerId; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public Date getSentTime() { return sentTime; }
    public void setSentTime(Date sentTime) { this.sentTime = sentTime; }

    public String getIsRead() { return isRead; }
    public void setIsRead(String isRead) { this.isRead = isRead; }

    public String getContractTitle() { return contractTitle; }
    public void setContractTitle(String contractTitle) { this.contractTitle = contractTitle; }
}
