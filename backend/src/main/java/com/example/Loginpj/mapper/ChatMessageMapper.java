package com.example.Loginpj.mapper;

import com.example.Loginpj.model.ChatMessage;
import com.example.Loginpj.model.ChatRoom;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ChatMessageMapper {

  
    // 메시지 저장
    void insertMessage(ChatMessage message);

    // 메시지 조회 (roomId 기준)
    List<ChatMessage> getMessagesByRoomId(Long roomId);
}
