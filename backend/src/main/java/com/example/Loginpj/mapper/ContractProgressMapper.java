package com.example.Loginpj.mapper;

import java.util.List;

import com.example.Loginpj.model.Contract;
import com.example.Loginpj.model.ContractProgress;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ContractProgressMapper {

    // 진행 내역 삽입
    public void insertProgress(ContractProgress progress);

    // 계약 ID로 진행 내역 가져오기
    public List<ContractProgress> getProgressByContractId(Long contractId);

    int mergeProgress(@Param("contractId") Long contractId, @Param("step") int step);

    List<Contract> getContractsWithLatestProgressByClientId(String clientId);
}
