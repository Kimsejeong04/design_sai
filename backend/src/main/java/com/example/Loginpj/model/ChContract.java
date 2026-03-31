package com.example.Loginpj.model;

public class ChContract {
	private Long contractId;
    private String status;

    // 생성자
    public ChContract() {}

    public ChContract(Long contractId, String status) {
        this.contractId = contractId;
        this.status = status;
    }

    // Getter / Setter
    public Long getContractId() {
        return contractId;
    }

    public void setContractId(Long contractId) {
        this.contractId = contractId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
