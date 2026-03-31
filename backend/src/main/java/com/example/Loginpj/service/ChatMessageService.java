package com.example.Loginpj.service;

import com.example.Loginpj.mapper.ChatMessageMapper;
import com.example.Loginpj.model.ChatMessage;
import com.example.Loginpj.model.ChatRoom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatMessageService {
    private final ChatMessageMapper chatMapper;

    public ChatMessageService(ChatMessageMapper chatMapper) {
        this.chatMapper = chatMapper;
    }

    public void saveMessage(ChatMessage message) {
        System.out.println("메씨지: " + message.getRoomId());
        System.out.println(">> 메시지 content: " + message.getContent());
        System.out.println(">> 메시지 filename: " + message.getFileName());

        chatMapper.insertMessage(message);
    }

    public List<ChatMessage> getMessagesByRoomId(Long roomId) {
        return chatMapper.getMessagesByRoomId(roomId);
    }
}
/*@Service
public class ChatService {
	
    @Autowired
    private ChatMessageMapper chatMapper;

    public void createRoom(ChatRoom room) {
        chatMapper.createRoom(room);
    }

    public List<ChatRoom> getAllRooms() {
        return chatMapper.getAllRooms();
    }

    public ChatRoom getRoomById(Long id) {
        return chatMapper.getRoomById(id);
    }

    public void deleteRoom(Long id) {
        chatMapper.deleteRoom(id);
    }

    public void saveMessage(ChatMessage message) {
        chatMapper.saveMessage(message);
    }

    public List<ChatMessage> getMessagesByRoomId(Long roomId) {
        return chatMapper.getMessagesByRoomId(roomId);
    }
}*/
