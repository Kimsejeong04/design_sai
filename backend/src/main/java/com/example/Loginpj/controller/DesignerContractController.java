package com.example.Loginpj.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Loginpj.model.Contract;
import com.example.Loginpj.service.ContractService;

@RestController
@RequestMapping("/designer")
@CrossOrigin(origins = "http://localhost:3000")

public class DesignerContractController {

	private final ContractService contractService;

    public DesignerContractController(ContractService contractService) {
        this.contractService = contractService;
    }

    @GetMapping("/contract")
    public List<Contract> getContracts() {
        List<Contract> contracts = contractService.getAllContracts();
        System.out.println("받은 계약 데이터: " + contracts);
        return contracts;
    }


}
