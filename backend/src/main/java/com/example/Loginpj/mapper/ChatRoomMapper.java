package com.example.Loginpj.mapper;

import com.example.Loginpj.model.ChatRoom;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface ChatRoomMapper {
    void createChatRoom(ChatRoom room);
    List<ChatRoom> getAllChatRooms();
    ChatRoom getChatRoomById(Long id);
    void deleteMessagesByRoomId(Long id);
    void deleteChatRoom(Long id);
    ChatRoom findByCreator(String creator); // creator로 채팅방 조회
}