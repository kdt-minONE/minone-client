import React, { useState, useRef, useEffect } from "react";
import { Button } from "../../components/ui/button";
import LoginModal from "../../components/LoginModal";
import SignupModal from "../../components/SignupModal";
import ChatSidebar from "../../components/ChatSidebar";
import ChatMessage from "../../components/ChatMessage";
import ChatInput from "../../components/ChatInput";
import {
  Bot,
  ArrowLeft,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

interface ChatHistory {
  id: number;
  content: string;
  isAi: boolean;
  createdAt: Date;
}

interface ChatRoom {
  id: number;
  title: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastMessage?: string;
  lastMessageTime?: Date;
}

// 더미 채팅방 데이터
const dummyChatRooms: ChatRoom[] = [
  {
    id: 1,
    title: "도로 파손 신고",
    isDeleted: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1일 전
    updatedAt: new Date(Date.now() - 1000 * 60 * 30), // 30분 전
    lastMessage: "해당 도로 파손 문제는 담당 부서에 접수되었습니다.",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: 2,
    title: "소음 피해 신고",
    isDeleted: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2일 전
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2시간 전
    lastMessage: "소음 측정을 위한 방문 일정을 안내해 드리겠습니다.",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: 3,
    title: "주차 위반 신고",
    isDeleted: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3일 전
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1일 전
    lastMessage: "신고해주신 내용을 확인하고 조치하겠습니다.",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
];

const Chat = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
    {
      id: 1,
      content:
        "안녕하세요! 민ONE AI 상담원입니다. 어떤 민원에 대해 도움을 드릴까요? 자연스럽게 상황을 설명해 주시면 됩니다.",
      isAi: true,
      createdAt: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>(dummyChatRooms);
  const [currentChatRoomId, setCurrentChatRoomId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  useEffect(() => {
    // 로그아웃 상태라면 로그인 모달 표시
    if (!isAuthenticated) {
      setLoginModalOpen(true);
    }
  }, [isAuthenticated]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || !isAuthenticated) return;

    const userMessage: ChatHistory = {
      id: Date.now(),
      content: inputValue,
      isAi: false,
      createdAt: new Date(),
    };

    setChatHistory((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsLoading(true);

    // 실제 API 호출 대신 시뮬레이션
    setTimeout(() => {
      const botResponse: ChatHistory = {
        id: Date.now() + 1,
        content: generateBotResponse(currentInput),
        isAi: true,
        createdAt: new Date(),
      };

      setChatHistory((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const generateBotResponse = (userInput: string): string => {
    const responses = [
      "말씀해주신 내용을 잘 이해했습니다. 이런 경우에는 보통 다음과 같은 절차를 따르시면 됩니다...",
      "해당 민원과 관련해서 즉시 해결할 수 있는 방법이 있는지 확인해보겠습니다. 추가로 필요한 정보가 있다면 알려주세요.",
      "관련 법규와 절차를 검토한 결과, 다음과 같은 해결방안을 제안드립니다...",
      "더 구체적인 도움을 위해 몇 가지 질문을 드릴게요. 언제부터 이런 문제가 발생했나요?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };


  const handleModalToggle = () => {
    setLoginModalOpen(false);
    setSignupModalOpen(true);
  };

  const handleSignupModalToggle = () => {
    setSignupModalOpen(false);
    setLoginModalOpen(true);
  };

  const handleNewChat = () => {
    // 새 채팅방 생성 로직
    const newChatRoom: ChatRoom = {
      id: Date.now(),
      title: "새 민원 상담",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setChatRooms(prev => [newChatRoom, ...prev]);
    setCurrentChatRoomId(newChatRoom.id);
    setChatHistory([
      {
        id: 1,
        content: "안녕하세요! 민ONE AI 상담원입니다. 어떤 민원에 대해 도움을 드릴까요?",
        isAi: true,
        createdAt: new Date(),
      },
    ]);
    setSidebarOpen(false);
  };

  const handleChatRoomSelect = (chatRoomId: number) => {
    setCurrentChatRoomId(chatRoomId);
    // 실제로는 API로 해당 채팅방의 히스토리를 가져와야 함
    setChatHistory([
      {
        id: 1,
        content: "이전 대화 내용을 불러오는 중...",
        isAi: true,
        createdAt: new Date(),
      },
    ]);
    // 채팅방 선택 시 사이드바를 닫지 않음
  };


  return (
    <div className="h-screen bg-gray-50 flex">
      {/* 사이드바 */}
      <ChatSidebar
        isOpen={sidebarOpen}
        chatRooms={chatRooms}
        currentChatRoomId={currentChatRoomId}
        isAuthenticated={isAuthenticated}
        onClose={() => setSidebarOpen(false)}
        onNewChat={handleNewChat}
        onChatRoomSelect={handleChatRoomSelect}
      />

      {/* 메인 채팅 영역 */}
      <div className="flex-1 flex flex-col">
        {/* 헤더 - 화면 전체 너비 */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex-shrink-0">
          <div className="flex items-center justify-between w-full">
            {/* 좌측 버튼들 */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-2"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <MessageSquare className="w-5 h-5" />
              </Button>
            </div>

            {/* 중앙 타이틀 */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  민ONE AI 상담
                </h1>
                <p className="text-sm text-gray-500">온라인</p>
              </div>
            </div>

            {/* 우측 공간 (균형을 위해) */}
            <div className="w-20"></div>
          </div>
        </div>

        {/* 로그인 필요 공지 */}
        {!isAuthenticated && (
          <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3 flex-shrink-0">
            <div className="text-center">
              <p className="text-yellow-800 font-medium">
                민원 상담 서비스를 이용하려면 로그인이 필요합니다.
              </p>
              <Button
                onClick={() => setLoginModalOpen(true)}
                className="mt-2 bg-primary-500 hover:bg-primary-600"
                size="sm"
              >
                로그인하기
              </Button>
            </div>
          </div>
        )}

        {/* Messages */}
        <ChatMessage
          messages={chatHistory}
          isLoading={isLoading}
          messagesEndRef={messagesEndRef}
        />

        {/* Input */}
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSendMessage}
          onKeyPress={handleKeyPress}
          isLoading={isLoading}
          isAuthenticated={isAuthenticated}
        />
      </div>

      {/* 로그인 모달 */}
      <LoginModal
        open={loginModalOpen}
        onOpenChange={setLoginModalOpen}
        handleModal={handleModalToggle}
      />

      {/* 회원가입 모달 */}
      <SignupModal
        open={signupModalOpen}
        onOpenChange={setSignupModalOpen}
        handleModal={handleSignupModalToggle}
      />
    </div>
  );
};

export { Chat };