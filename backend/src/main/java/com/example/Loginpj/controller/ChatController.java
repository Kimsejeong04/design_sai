package com.example.Loginpj.controller;

import com.example.Loginpj.model.ChatMessage;
import com.example.Loginpj.service.ChatMessageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private ChatMessageService chatService;

    @MessageMapping("/chat.sendMessage/{roomId}")
    public void sendMessage(@DestinationVariable String roomId, @Payload ChatMessage message) {
        message.setRoomId(Long.parseLong(roomId)); // ✅ 이게 진짜 해야 할 일
        chatService.saveMessage(message);
        messagingTemplate.convertAndSend("/topic/chat/" + roomId, message);
    }

    @MessageMapping("/chat.addUser/{roomId}")
    public void addUser(@DestinationVariable String roomId, @Payload ChatMessage message) {
        message.setRoomId(Long.parseLong(roomId)); // ✅ 여기도!
        message.setType(ChatMessage.MessageType.JOIN);
        chatService.saveMessage(message);
        messagingTemplate.convertAndSend("/topic/chat/" + roomId, message);
    }

}


