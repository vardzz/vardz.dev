"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ChatContextType {
  isChatActive: boolean;
  setIsChatActive: (value: boolean) => void;
  chatHistory: { role: 'user' | 'ai', content: string }[];
  addMessage: (role: 'user' | 'ai', content: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isChatActive, setIsChatActive] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai', content: string }[]>([]);

  const addMessage = (role: 'user' | 'ai', content: string) => {
    setChatHistory((prev) => [...prev, { role, content }]);
  };

  return (
    <ChatContext.Provider value={{ isChatActive, setIsChatActive, chatHistory, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within a ChatProvider");
  return context;
}
