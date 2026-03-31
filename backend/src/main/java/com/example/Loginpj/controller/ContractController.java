package com.example.Loginpj.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.Loginpj.model.Contract;
import com.example.Loginpj.service.ContractService;

@RestController
@RequestMapping("/client")
@CrossOrigin(origins = "http://localhost:3000")
public class ContractController {

    private final ContractService contractService;

    public ContractController(ContractService contractService) {
        this.contractService = contractService;
    }

    @GetMapping("/contract")
    public List<Contract> getContracts() {
        return contractService.getAllContracts();
    }

    @GetMapping("/contract/{id}")
    public Contract getContractById(@PathVariable("id") Long id) {
        Contract contract = contractService.getContractById(id);
        System.out.println("받은 계약 데이터 (ID: " + id + "): " + contract);
        return contract;
    }

    @PutMapping("/contract/{id}/star")
    public ResponseEntity<?> updateStarStatus(@PathVariable("id") Long id, @RequestBody Map<String, Boolean> request) {
        boolean isStarred = request.get("isStarred");
        boolean updated = contractService.updateStarStatus(id, isStarred);

        if (updated) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/contract")
    public ResponseEntity<?> createContract(@RequestBody Contract contract) {
    	 System.out.println("받은 계약 객체: " + contract + ", designerId=" + contract.getDesignerId());
    	try {
            contractService.createContract(contract);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/contract/send")
    public ResponseEntity<?> sendContract(@RequestBody Map<String, Long> request) {
        try {
            Long contractId = request.get("contractId");
            Contract contract = contractService.getContractById(contractId);

            if (contract == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("계약서를 찾을 수 없습니다.");
            }

            contract.setStatus("미수신");
            contractService.save(contract);
            return ResponseEntity.ok("계약서 송신 완료");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("계약서 송신 중 오류 발생");
        }
    }

    @PutMapping("/contract/approve")
    public ResponseEntity<?> approveContract(@RequestBody Map<String, String> request) {
        try {
            Long contractId = Long.parseLong(request.get("contractId"));
            String agreeMessage = request.get("agreeMessage");

            final String REQUIRED_CONFIRMATION = "계약 내용을 확인하였으며 동의합니다.";

            if (!REQUIRED_CONFIRMATION.equals(agreeMessage.trim())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("동의 문구가 정확하지 않습니다.");
            }

            Contract contract = contractService.getContractById(contractId);
            contract.setStatus("진행중");

            contractService.save(contract);
            return ResponseEntity.ok("계약 승인 완료");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("승인 처리 중 오류 발생");
        }
    }
}
