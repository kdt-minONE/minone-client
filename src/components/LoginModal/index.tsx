import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { LogIn, Eye, EyeOff } from "lucide-react";
import { useLogin } from "../../hooks/auth";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleModal: () => void;
}

export interface LoginFormData {
  email: string;
  password: string;
}

const LoginModal: React.FC<LoginModalProps> = ({
  open,
  onOpenChange,
  handleModal,
}) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [req, res] = useLogin();

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};

    if (!formData.email.trim()) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식을 입력해주세요.";
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      req(formData.email, formData.password);
    }
  };

  useEffect(() => {
    if (res.data && res.called) {
      alert("로그인이 완료되었습니다.");
      window.location.reload();
    }
  }, [res]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />

      {/* 모달 컨테이너 */}
      <div className="relative z-10 w-full max-w-md mx-4 bg-white rounded-lg shadow-xl">
        {/* 닫기 버튼 */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 z-20 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
              <LogIn className="w-8 h-8 text-blue-500" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">로그인</h2>
              <p className="text-gray-600">스마트 민원 서비스에 로그인하세요</p>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">
                이메일 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">
                비밀번호 <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className={`pr-10 ${errors.password ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* 비밀번호 찾기 링크 */}
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-blue-500 hover:underline"
                onClick={() => {
                  console.log("비밀번호 찾기");
                }}
              >
                비밀번호를 잊으셨나요?
              </button>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-full bg-blue-500 hover:bg-blue-600"
                disabled={res.loading}
              >
                {res.loading ? "로그인 중..." : "로그인"}
              </Button>

              <div className="text-center text-sm text-gray-500">
                계정이 없으신가요?{" "}
                <button
                  type="button"
                  className="text-blue-500 font-semibold hover:underline"
                  onClick={handleModal}
                >
                  회원가입
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
