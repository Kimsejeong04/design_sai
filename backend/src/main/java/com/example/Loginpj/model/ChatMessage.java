package com.example.Loginpj.model;

public class ChatMessage {
    private String sender;
    private String content;
    private MessageType type;
    private long id;
    private long roomId;
    private String fileName;   // 파일 또는 이미지 URL

    public enum MessageType {
        CHAT, JOIN, LEAVE, IMAGE, FILE
    }

    public ChatMessage() {}

    public ChatMessage(String sender, String content, MessageType type) {
        this.sender = sender;
        this.content = content;
        this.type = type;
    }

    // Getter & Setter
    public String getSender() { return sender; }
    public void setSender(String sender) { this.sender = sender; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public MessageType getType() { return type; }
    public void setType(MessageType type) { this.type = type; }
    
    public long getId() { return id; }
    public void setId(long id) { this.id = id; }
    
    public long getRoomId() { return roomId; }
    public void setRoomId(long roomId) { this.roomId = roomId; }
    
    public String getFileName() { return fileName; }
    public void setFileName(String fileUrl) { this.fileName = fileUrl; }
}
