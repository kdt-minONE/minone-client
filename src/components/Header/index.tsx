import { useState } from "react";
import { Button } from "../ui/button";
import SignupModal from "../SignupModal";
import LoginModal from "../LoginModal";
import { useAuthStore } from "../../store/authStore";
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  
  // Zustand store
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleModalNavigate = () => {
    setIsLogin(!isLogin);
    setIsSignup(!isSignup);
  };

  const handleLogout = () => {
    logout();
    alert("로그아웃되었습니다.");
    window.location.replace("/");
  };

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
          {isAuthenticated && user ? (
            <>
              <button 
                onClick={() => navigate("/mypage")}
                className="flex items-center space-x-2 mr-4 hover:text-primary-600 transition-colors"
              >
                <User className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">{user.name}님</span>
              </button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="flex items-center space-x-1"
              >
                <LogOut className="w-4 h-4" />
                <span>로그아웃</span>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => setIsLogin(true)}>
                로그인
              </Button>
              <Button variant="default" size="sm" onClick={() => setIsSignup(true)}>
                회원가입
              </Button>
            </>
          )}
        </div>
      </div>
      {isSignup && (
        <SignupModal
          open={isSignup}
          onOpenChange={() => setIsSignup(!isSignup)}
          handleModal={handleModalNavigate}
        />
      )}
      {isLogin && (
        <LoginModal
          open={isLogin}
          onOpenChange={() => setIsLogin(!isLogin)}
          handleModal={handleModalNavigate}
        />
      )}
    </header>
  );
};
