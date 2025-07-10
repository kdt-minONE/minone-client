import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { UserPlus, Eye, EyeOff, ChevronRight } from "lucide-react";
import { useSignup } from "../../hooks/auth";

interface SignupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface SignupFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface AgreementState {
  allAgree: boolean;
  serviceTerms: boolean;
  privacy: boolean;
  marketing: boolean;
}

const SignupModal: React.FC<SignupModalProps> = ({ open, onOpenChange }) => {
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [agreement, setAgreement] = useState<AgreementState>({
    allAgree: false,
    serviceTerms: false,
    privacy: false,
    marketing: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<SignupFormData>>({});
  const [request, response] = useSignup();

  const handleInputChange = (field: keyof SignupFormData, value: string) => {
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

  const handleAgreementChange = (
    field: keyof AgreementState,
    checked: boolean
  ) => {
    if (field === "allAgree") {
      setAgreement({
        allAgree: checked,
        serviceTerms: checked,
        privacy: checked,
        marketing: checked,
      });
    } else {
      const newAgreement = {
        ...agreement,
        [field]: checked,
      };

      // Update allAgree based on other checkboxes
      newAgreement.allAgree =
        newAgreement.serviceTerms &&
        newAgreement.privacy &&
        newAgreement.marketing;

      setAgreement(newAgreement);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<SignupFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식을 입력해주세요.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "휴대폰 번호를 입력해주세요.";
    } else if (!/^010-\d{4}-\d{4}$/.test(formData.phone)) {
      newErrors.phone =
        "올바른 휴대폰 번호 형식을 입력해주세요. (010-0000-0000)";
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (formData.password.length < 8) {
      newErrors.password = "비밀번호는 8자 이상이어야 합니다.";
    } else if (
      !/(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
        formData.password
      )
    ) {
      newErrors.password = "영문, 숫자, 특수문자를 포함해주세요.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호 확인을 입력해주세요.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreement.serviceTerms || !agreement.privacy) {
      alert("필수 약관에 동의해주세요.");
      return;
    }

    if (validateForm()) {
      // 회원가입 로직 구현
      console.log("회원가입 데이터:", formData, agreement);
      request(formData);
    }
  };

  useEffect(() => {
    if (response.called && response.data) {
      console.log(response.data);
      alert("회원가입이 완료되었습니다!");
    }
  }, [response]);

  const handlePhoneChange = (value: string) => {
    // 자동 하이픈 추가
    const numbers = value.replace(/\D/g, "");
    let formatted = numbers;

    if (numbers.length >= 3) {
      formatted = numbers.slice(0, 3) + "-" + numbers.slice(3);
    }
    if (numbers.length >= 7) {
      formatted =
        numbers.slice(0, 3) +
        "-" +
        numbers.slice(3, 7) +
        "-" +
        numbers.slice(7, 11);
    }

    handleInputChange("phone", formatted);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />

      {/* 모달 컨테이너 */}
      <div className="relative z-10 w-full max-w-lg mx-4 bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto scrollbar-hide">
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
              <UserPlus className="w-8 h-8 text-blue-500" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">회원가입</h2>
              <p className="text-gray-600">
                스마트 민원 서비스 이용을 위해 회원가입을 해주세요
              </p>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name">
                이름 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="홍길동"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

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

            {/* Phone Field */}
            <div className="space-y-2">
              <Label htmlFor="phone">
                휴대폰 번호 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="010-0000-0000"
                value={formData.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                className={errors.phone ? "border-red-500" : ""}
                maxLength={13}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone}</p>
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
              <p className="text-xs text-gray-500">
                8자 이상, 영문/숫자/특수문자 포함
              </p>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                비밀번호 확인 <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  className={`pr-10 ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Agreement Section */}
            <div className="space-y-4">
              {/* All Agree */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="allAgree"
                    checked={agreement.allAgree}
                    onCheckedChange={(checked) =>
                      handleAgreementChange("allAgree", checked as boolean)
                    }
                  />
                  <Label htmlFor="allAgree" className="font-semibold">
                    전체 동의
                  </Label>
                </div>
              </div>

              {/* Individual Terms */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="serviceTerms"
                      checked={agreement.serviceTerms}
                      onCheckedChange={(checked) =>
                        handleAgreementChange(
                          "serviceTerms",
                          checked as boolean
                        )
                      }
                    />
                    <Label htmlFor="serviceTerms" className="font-medium">
                      서비스 이용약관 동의{" "}
                      <span className="text-red-500 text-xs">(필수)</span>
                    </Label>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="privacy"
                      checked={agreement.privacy}
                      onCheckedChange={(checked) =>
                        handleAgreementChange("privacy", checked as boolean)
                      }
                    />
                    <Label htmlFor="privacy" className="font-medium">
                      개인정보 수집·이용 동의{" "}
                      <span className="text-red-500 text-xs">(필수)</span>
                    </Label>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="marketing"
                      checked={agreement.marketing}
                      onCheckedChange={(checked) =>
                        handleAgreementChange("marketing", checked as boolean)
                      }
                    />
                    <Label htmlFor="marketing" className="font-medium">
                      마케팅 정보 수신 동의{" "}
                      <span className="text-gray-500 text-xs">(선택)</span>
                    </Label>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                회원가입
              </Button>

              <div className="text-center text-sm text-gray-500">
                이미 계정이 있으신가요?{" "}
                <button
                  type="button"
                  className="text-blue-500 font-semibold hover:underline"
                  onClick={() => {
                    // 로그인 모달로 전환 로직
                    console.log("로그인 모달 열기");
                  }}
                >
                  로그인
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
