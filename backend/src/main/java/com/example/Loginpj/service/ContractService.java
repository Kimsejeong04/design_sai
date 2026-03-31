package com.example.Loginpj.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.example.Loginpj.mapper.ContractMapper;
import com.example.Loginpj.model.Contract;

//ContractService.java
@Service
public class ContractService {
 private final ContractMapper contractMapper;

 public ContractService(ContractMapper contractMapper) {
     this.contractMapper = contractMapper;
 }

 public List<Contract> getAllContracts() {
	 List<Contract> contracts = contractMapper.selectAllContracts();
     System.out.println("서비스에서 받은 계약 데이터: " + contracts);  // 추가된 로그
     return contracts;
 }
 
 public Contract getContractById(Long id) {
     Contract contract = contractMapper.selectContractById(id);
     System.out.println("서비스에서 받은 계약 데이터 (ID: " + id + "): " + contract);  // 추가된 로그
     return contract; 
 }
 
 public boolean updateStarStatus(Long id, boolean starredStatus) {
	    // 계약의 중요 표시 상태를 업데이트하는 쿼리 실행
	    return contractMapper.updateStarStatus(id, starredStatus);
	}
 
 public void createContract(Contract contract) {
     contractMapper.insertContract(contract);
 }
 
 
 public List<Contract> getContractsByDesigner(String designerId) {
	    List<Contract> contracts = contractMapper.selectContractsByDesigner(designerId);
	    System.out.println("서비스에서 받은 디자이너 계약 데이터: " + contracts);
	    return contracts;
	}

 public void save(Contract contract) {
	    contractMapper.updateContractStatus(contract.getContractId(), contract.getStatus());
	}

}

