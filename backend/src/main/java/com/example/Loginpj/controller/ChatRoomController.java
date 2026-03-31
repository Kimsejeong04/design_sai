package com.example.Loginpj.controller;

import com.example.Loginpj.model.ChatRoom;
import com.example.Loginpj.service.ChatRoomService;
import com.example.Loginpj.mapper.ChatRoomMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rooms")
public class ChatRoomController {
    @Autowired
    private ChatRoomMapper chatRoomMapper;
    @Autowired
    private ChatRoomService chatRoomService;

    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createRoom(@RequestBody ChatRoom room, HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        try {
            String username = (String) session.getAttribute("username");
            if (username == null) {
                response.put("status", "error");
                response.put("message", "로그인이 필요합니다.");
                return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
            }
            room.setCreator(username);
            ChatRoom createdOrExistingRoom = chatRoomService.createChatRoom(room);
            response.put("status", "success");
            response.put("message", createdOrExistingRoom.getId() != null ? "채팅방 연결 완료" : "채팅방 생성 완료");
            response.put("roomId", createdOrExistingRoom.getId());
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "채팅방 생성/연결 실패: " + e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/list")
    public List<ChatRoom> getAllRooms() {
        return chatRoomMapper.getAllChatRooms();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, String>> deleteRoom(@PathVariable Long id, HttpSession session) {
        Map<String, String> response = new HashMap<>();
        try {
            String username = (String) session.getAttribute("username");
            if (username == null) {
                response.put("status", "error");
                response.put("message", "로그인이 필요합니다.");
                return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
            }
            ChatRoom room = chatRoomMapper.getChatRoomById(id);
            if (room == null) {
                response.put("status", "error");
                response.put("message", "채팅방을 찾을 수 없습니다.");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
            if (!room.getCreator().equals(username)) {
                response.put("status", "error");
                response.put("message", "삭제 권한이 없습니다.");
                return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
            }
            chatRoomService.deleteChatRoom(id);
            response.put("status", "success");
            response.put("message", "삭제 완료");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "삭제 실패: " + e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRoom(@PathVariable Long id) {
        try {
            ChatRoom room = chatRoomMapper.getChatRoomById(id);
            if (room == null) {
                Map<String, String> response = new HashMap<>();
                response.put("status", "error");
                response.put("message", "채팅방을 찾을 수 없습니다.");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(room, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", "조회 실패: " + e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}