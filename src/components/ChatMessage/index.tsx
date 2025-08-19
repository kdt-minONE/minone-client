import React from "react";
import {
  Bot,
  User,
  Loader2,
} from "lucide-react";

interface ChatHistory {
  id: number;
  content: string;
  isAi: boolean;
  createdAt: Date;
}

interface ChatMessageProps {
  messages: ChatHistory[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const ChatMessage: React.FC<ChatMessageProps> = ({
  messages,
  isLoading,
  messagesEndRef,
}) => {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      <div className="h-full space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              !message.isAi ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex max-w-xs lg:max-w-2xl ${
                !message.isAi ? "flex-row-reverse" : "flex-row"
              } space-x-3`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  !message.isAi
                    ? "bg-primary-500 ml-3"
                    : "bg-gray-300 mr-3"
                }`}
              >
                {!message.isAi ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-gray-600" />
                )}
              </div>
              <div>
                <div
                  className={`px-4 py-3 rounded-lg ${
                    !message.isAi
                      ? "bg-primary-500 text-white"
                      : "bg-white border border-gray-200 text-gray-900"
                  }`}
                >
                  <p className="text-sm leading-relaxed">
                    {message.content}
                  </p>
                </div>
                <p
                  className={`text-xs text-gray-400 mt-1 ${
                    !message.isAi ? "text-right" : "text-left"
                  }`}
                >
                  {formatTime(message.createdAt)}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex space-x-3 max-w-xs lg:max-w-2xl">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-gray-600" />
              </div>
              <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                  <span className="text-sm text-gray-500">
                    응답을 준비 중입니다...
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatMessage;