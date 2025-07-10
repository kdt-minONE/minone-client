import { useState } from "react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import SignupModal from "../SignupModal";

interface HeaderProps {
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <header className="minone-header px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold" style={{ color: "#3366cc" }}>
            민ONE
          </h1>
          <span className="text-gray-500 ml-1.5 flex items-center">
            AI와 함께하는 스마트 민원
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            로그인
          </Button>
          <Button variant="default" size="sm" onClick={() => setIsSignup(true)}>
            회원가입
          </Button>
        </div>
      </div>
      {isSignup && (
        <SignupModal
          open={isSignup}
          onOpenChange={() => setIsSignup(!isSignup)}
        />
      )}
    </header>
  );
};
