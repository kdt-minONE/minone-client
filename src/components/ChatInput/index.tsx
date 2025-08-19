import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Send } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSend,
  onKeyPress,
  isLoading,
  isAuthenticated,
  disabled = false,
}) => {
  return (
    <div className="bg-white border-t border-gray-200 px-4 py-4 flex-shrink-0">
      <div className="flex items-end space-x-3">
        <div className="flex-1">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder={
              isAuthenticated 
                ? "민원 내용을 자세히 설명해 주세요..."
                : "로그인 후 이용 가능합니다"
            }
            className="min-h-[48px] resize-none"
            disabled={isLoading || !isAuthenticated || disabled}
          />
        </div>
        <Button
          onClick={onSend}
          disabled={!value.trim() || isLoading || !isAuthenticated || disabled}
          className="bg-primary-500 hover:bg-primary-600 h-[48px] px-4"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
      <p className="text-xs text-gray-400 mt-2 text-center">
        {isAuthenticated 
          ? "Enter를 누르면 메시지가 전송됩니다."
          : "채팅을 시작하려면 로그인이 필요합니다."
        }
      </p>
    </div>
  );
};

export default ChatInput;