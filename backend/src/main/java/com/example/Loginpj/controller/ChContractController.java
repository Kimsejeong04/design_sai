package com.example.Loginpj.controller;

import com.example.Loginpj.service.ChContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class ChContractController {

    @Autowired
    private ChContractService contractService;
    
    
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    
    @PostMapping("/StatusChange")
    public String changeContractStatus(@RequestBody Map<String, Object> payload) {
        Long contractId = Long.valueOf(payload.get("contractId").toString());
        String status = payload.get("status").toString();

        contractService.changeStatus(contractId, status);
        
     // ✅ WebSocket 메시지 전송 (프론트 알림용)
        String messageContent = "계약 ID " + contractId + "의 상태가 '" + status + "'로 변경되었습니다.";
        messagingTemplate.convertAndSend("/topic/chat/" + contractId, Map.of(
            "type", "proceed",
            "content", messageContent
        ));
        System.out.println("이 코드가 동작하고있습니다");
        return "Status updated successfully.";
    }
}
