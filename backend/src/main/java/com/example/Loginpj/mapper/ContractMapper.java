package com.example.Loginpj.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.Loginpj.model.Contract;

@Mapper
public interface ContractMapper {
    List<Contract> selectAllContracts();
    
    Contract selectContractById(Long id);
    
    boolean updateStarStatus(@Param("id") Long id, @Param("starredStatus") boolean starredStatus);

    void insertContract(Contract contract);

    List<Contract> selectContractsByDesigner(String designerId);

    void updateContractStatus(int contractId, String status);
    
    List<Contract> getContractsWithLatestProgressByClientId(@Param("clientId") String clientId);
}