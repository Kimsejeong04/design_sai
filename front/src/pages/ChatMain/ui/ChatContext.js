import React, { createContext } from "react";
import { useChat } from "./useChat";
import contractData from '../../../contract.js'

export const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  // 기본 대화 상대를 "Cody Fisher"로 설정
  const chat = useChat(contractData, "Cody Fisher");
  return (
    <ChatContext.Provider value={chat}>
      {children}
    </ChatContext.Provider>
  );
}
