import { cn } from "../../lib/utils";
import { Button } from "../ui/button";

interface HeaderProps {
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  return (
    <header className={cn("bg-white shadow-sm border-b", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900">민ONE</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-2">
            <Button variant="ghost" size="sm">
              홈
            </Button>
            <Button variant="ghost" size="sm">
              서비스
            </Button>
            <Button variant="ghost" size="sm">
              소개
            </Button>
            <Button variant="ghost" size="sm">
              연락처
            </Button>
          </nav>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              로그인
            </Button>
            <Button variant="default" size="sm">
              회원가입
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
