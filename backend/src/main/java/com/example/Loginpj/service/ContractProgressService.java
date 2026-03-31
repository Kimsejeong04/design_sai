package com.example.Loginpj.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.Loginpj.mapper.ContractProgressMapper;
import com.example.Loginpj.model.Contract;
import com.example.Loginpj.model.ContractProgress;

@Service
public class ContractProgressService {
    private final ContractProgressMapper mapper;

    public ContractProgressService(ContractProgressMapper mapper) {
        this.mapper = mapper;
    }

    // 진행 내역 추가 또는 수정
    public void addOrUpdateProgress(ContractProgress progress) {
        // contract_id로 진행 내역이 있는지 확인
        List<ContractProgress> existing = mapper.getProgressByContractId(progress.getContractId());
        
        if (existing != null && !existing.isEmpty()) {
            // 이미 진행 내역이 있으면 mergeProgress 호출 (업데이트)
            mapper.mergeProgress(progress.getContractId(), progress.getStep());
        } else {
            // 없으면 새로 삽입
            mapper.insertProgress(progress);
        }
    }

    public List<ContractProgress> getProgressByContractId(Long contractId) {
        return mapper.getProgressByContractId(contractId);
    }
    
    public List<Contract> getContractsByClientId(String clientId) {
        return mapper.getContractsWithLatestProgressByClientId(clientId);
    }
}
