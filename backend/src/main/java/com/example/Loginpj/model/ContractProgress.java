package com.example.Loginpj.model;

import java.util.Date;

public class ContractProgress {

    private Long id;             // 진행 내역 ID (PK)
    private Long contractId;     // 계약 ID (FK)
    private int step;            // 현재 단계 (예: 0~4)
    private Date createdAt;      // 생성 시각

    // contracts 테이블에서 조인된 컬럼 (선택적으로 포함)
    private String contractTitle;
    private String designerId;
    private String clientId;

    public ContractProgress() {}

    public ContractProgress(Long id, Long contractId, int step, Date createdAt,
                            String contractTitle, String designerId, String clientId) {
        this.id = id;
        this.contractId = contractId;
        this.step = step;
        this.createdAt = createdAt;
        this.contractTitle = contractTitle;
        this.designerId = designerId;
        this.clientId = clientId;
    }

    // 기본 필드 getter/setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getContractId() {
        return contractId;
    }

    public void setContractId(Long contractId) {
        this.contractId = contractId;
    }

    public int getStep() {
        return step;
    }

    public void setStep(int step) {
        this.step = step;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    // 조인된 필드 getter/setter
    public String getContractTitle() {
        return contractTitle;
    }

    public void setContractTitle(String contractTitle) {
        this.contractTitle = contractTitle;
    }

    public String getDesignerId() {
        return designerId;
    }

    public void setDesignerId(String designerId) {
        this.designerId = designerId;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    @Override
    public String toString() {
        return "ContractProgress{" +
                "id=" + id +
                ", contractId=" + contractId +
                ", step=" + step +
                ", createdAt=" + createdAt +
                ", contractTitle='" + contractTitle + '\'' +
                ", designerId='" + designerId + '\'' +
                ", clientId='" + clientId + '\'' +
                '}';
    }
}
