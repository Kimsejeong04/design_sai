package com.example.Loginpj.model;

import java.sql.Date;

public class Contract {
    private int contractId;
    private int requestId;
    private String designerId;
    private Date dueDate;
    private Date createdAt;
	private int requestFee;
    private String status;
    private String clientId;
    private String contractTitle;
    private Integer starredStatus;
    private String contractContent;

    // --- 진행도(step) 필드 추가 ---
    private Integer step; // contract_progress 테이블의 STEP 컬럼과 매핑

    // --- step 필드의 Getter와 Setter ---
    public Integer getStep() {
        return step;
    }

    public void setStep(Integer step) {
        this.step = step;
    }

    // --- 기존 필드들의 Getter와 Setter ---
    public int getContractId() {
        return contractId;
    }
    public void setContractId(int contractId) {
        this.contractId = contractId;
    }

    public int getRequestId() {
        return requestId;
    }
    public void setRequestId(int requestId) {
        this.requestId = requestId;
    }

    public String getDesignerId() {
        return designerId;
    }
    public void setDesignerId(String designerId) {
        this.designerId = designerId;
    }

    public Date getDueDate() {
        return dueDate;
    }
    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }
    
    public Date getCreatedAt() {
  		return createdAt;
  	}

  	public void setCreatedAt(Date createdAt) {
  		this.createdAt = createdAt;
  	}
  	
    public int getRequestFee() {
        return requestFee;
    }
    public void setRequestFee(int requestFee) {
        this.requestFee = requestFee;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public String getClientId() {
        return clientId;
    }
    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getContractTitle() {
        return contractTitle;
    }
    public void setContractTitle(String contractTitle) {
        this.contractTitle = contractTitle;
    }

    public Integer getStarredStatus() {
        return starredStatus;
    }

    public void setStarredStatus(Integer starredStatus) {
        this.starredStatus = starredStatus;
    }

    public String getContractContent() {
        return contractContent;
    }

    public void setContractContent(String contractContent) {
        this.contractContent = contractContent;
    }
}