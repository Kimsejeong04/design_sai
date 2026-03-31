package com.example.Loginpj.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.Loginpj.mapper.RequestMessageMapper;
import com.example.Loginpj.model.RequestMessage;

@Service
public class RequestMessageService {

    private final RequestMessageMapper mapper;

    public RequestMessageService(RequestMessageMapper mapper) {
        this.mapper = mapper;
    }

    public List<RequestMessage> getMessagesByClientId(String clientId) {
        return mapper.getMessagesByClientId(clientId);
    }
    
    public void saveMessage(RequestMessage message) {
        mapper.insertMessage(message);
    }
    
    public RequestMessage getMessageById(Long id) {
        return mapper.getMessageById(id);
    }
    public void saveMessageByContract(Long contractId, String clientId, String content) {
        mapper.insertMessageByContract(contractId, clientId, content);
    }

}
