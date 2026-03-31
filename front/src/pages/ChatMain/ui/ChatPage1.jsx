import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const RoomInput = styled.input`
  width: 70%;
  height: 70%;
  border: none;
  background-color: #ebebeb;
  border-radius: 20px;
  padding: 10px;
`;

const SendButton = styled.button`
  margin-left: 10px;
  padding: 10px 20px;
  background-color: #799fc4;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;

const ChatPage1 = ({ roomId, messages, setMessages, client, username, connected }) => {
  const [message, setMessage] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const messageEndRef = useRef(null);

  // 메시지 전송
  const sendMessage = () => {
    if (!message.trim() || !connected || !client) return;

    const newMessage = {
      id: `msg-${Date.now()}`, // 고유 ID 생성
      sender: username,
      content: message.trim(),
      type: "CHAT",
      time: new Date().toLocaleTimeString(),
    };

    // WebSocket으로 메시지 전송
    client.publish({
      destination: `/app/chat.sendMessage/${roomId}`,
      body: JSON.stringify(newMessage),
    });

    // 로컬 상태 즉시 업데이트
    setMessages((prev) => {
      if (prev.some((m) => m.id === newMessage.id)) {
        return prev;
      }
      return [...prev, newMessage];
    });

    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isComposing && message.trim()) {
      sendMessage();
    }
  };

  // 메시지 스크롤
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
      <RoomInput
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        placeholder="메시지를 입력하세요..."
      />
      <SendButton onClick={sendMessage}>전송</SendButton>
      <div ref={messageEndRef} />
    </div>
  );
};

export default ChatPage1;