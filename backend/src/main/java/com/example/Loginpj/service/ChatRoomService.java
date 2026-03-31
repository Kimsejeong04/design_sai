package com.example.Loginpj.service;

import com.example.Loginpj.model.ChatRoom;
import com.example.Loginpj.mapper.ChatRoomMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ChatRoomService {
    private final ChatRoomMapper chatRoomMapper;

    public ChatRoomService(ChatRoomMapper chatRoomMapper) {
        this.chatRoomMapper = chatRoomMapper;
    }

    public List<ChatRoom> getAllChatRooms() {
        return chatRoomMapper.getAllChatRooms();
    }

    public ChatRoom createChatRoom(ChatRoom chatRoom) {
        // creator로 기존 채팅방 확인
        ChatRoom existingRoom = chatRoomMapper.findByCreator(chatRoom.getCreator());
        if (existingRoom != null) {
            return existingRoom; // 기존 채팅방 반환
        }
        // name이 null이면 기본값 설정
        if (chatRoom.getName() == null || chatRoom.getName().isEmpty()) {
            chatRoom.setName("Default Chat Room");
        }
        chatRoomMapper.createChatRoom(chatRoom);
        return chatRoom; // 새 채팅방 반환
    }

    public ChatRoom getChatRoomById(Long id) {
        return chatRoomMapper.getChatRoomById(id);
    }

    @Transactional
    public void deleteChatRoom(Long id) {
        chatRoomMapper.deleteMessagesByRoomId(id);
        chatRoomMapper.deleteChatRoom(id);
    }
}