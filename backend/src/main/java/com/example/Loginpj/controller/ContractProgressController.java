package com.example.Loginpj.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Loginpj.model.Contract;
import com.example.Loginpj.model.ContractProgress;
import com.example.Loginpj.service.ContractProgressService;
import com.example.Loginpj.service.ContractService;


@RestController
@RequestMapping("/api/progress")
public class ContractProgressController {

	private final ContractProgressService service;
    private final ContractService contractService; // ✅ 추가

    public ContractProgressController(
        ContractProgressService service,
        ContractService contractService // ✅ 생성자 주입
    ) {
        this.service = service;
        this.contractService = contractService;
    }
   
    @PostMapping
    public void addOrUpdateProgress(@RequestBody ContractProgress progress) {
        service.addOrUpdateProgress(progress);
    }

    @GetMapping("/{contractId}")
    public List<ContractProgress> getProgress(@PathVariable Long contractId) {
        return service.getProgressByContractId(contractId);
    }
    
    @GetMapping("/client/contracts/{clientId}")
    public ResponseEntity<List<Contract>> getContractsByClient(@PathVariable String clientId) {
        List<Contract> contracts = service.getContractsByClientId(clientId);
        System.out.println("clientId로 가져오는 계약 목록: " + clientId);
        return ResponseEntity.ok(contracts);
    }


}

