package com.example.Loginpj.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Loginpj.model.RequestMessage;
import com.example.Loginpj.service.RequestMessageService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/request-messages")
public class RequestMessageController {

    private final RequestMessageService service;

    public RequestMessageController(RequestMessageService service) {
        this.service = service;
    }

    // 보낸 메시지 조회
    @GetMapping("/sent")
    public List<RequestMessage> getSentMessages(HttpSession session) {
        String clientId = (String) session.getAttribute("username");

        if (clientId == null) {
            throw new RuntimeException("로그인이 필요합니다."); // 혹은 401 Unauthorized 반환
        }

        return service.getMessagesByClientId(clientId);
    }

    // 새 메시지 전송
    @PostMapping("/send")
    public void sendMessage(@RequestBody Map<String, Object> payload) {
        Long contractId = Long.valueOf(payload.get("contractId").toString());
        String clientId = payload.get("clientId").toString();
        String content = payload.get("content").toString();
        
        service.saveMessageByContract(contractId, clientId, content);
    }
    
    @GetMapping("/{messageId}")
    public RequestMessage getMessageDetail(@PathVariable Long messageId) {
//        System.out.println("[Controller] getMessageDetail 호출 - messageId: " + messageId);
        return service.getMessageById(messageId);
    }

}
