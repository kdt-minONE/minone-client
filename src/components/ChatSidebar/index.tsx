import React from "react";
import { Button } from "../ui/button";
import {
  Plus,
  X,
  MessageCircle,
  Clock,
} from "lucide-react";

interface ChatRoom {
  id: number;
  title: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastMessage?: string;
  lastMessageTime?: Date;
}

interface ChatSidebarProps {
  isOpen: boolean;
  chatRooms: ChatRoom[];
  currentChatRoomId: number | null;
  isAuthenticated: boolean;
  onClose: () => void;
  onNewChat: () => void;
  onChatRoomSelect: (chatRoomId: number) => void;
}

const formatRelativeTime = (date: Date) => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return "방금 전";
  if (diffMins < 60) return `${diffMins}분 전`;
  if (diffHours < 24) return `${diffHours}시간 전`;
  return `${diffDays}일 전`;
};

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  isOpen,
  chatRooms,
  currentChatRoomId,
  isAuthenticated,
  onClose,
  onNewChat,
  onChatRoomSelect,
}) => {
  if (!isOpen) return null;

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* 사이드바 헤더 */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">채팅방</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="p-1"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* 새 채팅 버튼 */}
      <div className="p-4 border-b border-gray-200">
        <Button
          onClick={onNewChat}
          className="w-full bg-primary-500 hover:bg-primary-600"
          disabled={!isAuthenticated}
        >
          <Plus className="w-4 h-4 mr-2" />
          새 채팅 시작하기
        </Button>
      </div>

      {/* 채팅방 리스트 */}
      <div className="flex-1 overflow-y-auto">
        {chatRooms.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <MessageCircle className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p>아직 채팅방이 없습니다</p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {chatRooms.map((room) => (
              <div
                key={room.id}
                onClick={() => onChatRoomSelect(room.id)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  currentChatRoomId === room.id
                    ? "bg-primary-50 border border-primary-200"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">
                      {room.title}
                    </h3>
                    {room.lastMessage && (
                      <p className="text-sm text-gray-500 truncate mt-1">
                        {room.lastMessage}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end ml-2">
                    {room.lastMessageTime && (
                      <span className="text-xs text-gray-400 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatRelativeTime(room.lastMessageTime)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;