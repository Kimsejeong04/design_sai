package com.example.Loginpj.service;

import com.example.Loginpj.mapper.ChContractMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChContractService {
	 @Autowired
	    private ChContractMapper contractMapper;

	    public void changeStatus(Long contractId, String status) {
	        contractMapper.updateStatus(contractId, status);
	    }
}
