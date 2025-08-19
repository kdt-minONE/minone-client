import React, { useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  User,
  FileText,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Edit,
  Save,
  X,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { useGetUser, useUpdateUserPassword, useDeleteUser } from "../../hooks/auth";

// 민원 상태 타입 정의
type ComplaintStatus = "PENDING" | "IN_PROGRESS" | "RESOLVED" | "REJECTED";

// 민원 조회 응답 인터페이스 (일반적인 구조)
interface Complaint {
  id: number;
  title: string;
  content: string;
  status: ComplaintStatus;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  citizenId: number;
  adminResponse?: string;
  attachments?: ComplaintAttachment[];
}

interface ComplaintAttachment {
  id: number;
  fileName: string;
  fileUrl: string;
  uploadedAt: Date;
}

// Citizen 엔티티 기반 사용자 정보 인터페이스
interface CitizenProfile {
  id: number;
  email: string;
  name: string;
  phone: string;
  createdAt: string;
}

// API 응답 인터페이스
interface UserApiResponse {
  message: string;
  data: CitizenProfile;
}

// 더미 데이터
const dummyComplaints: Complaint[] = [
  {
    id: 1,
    title: "도로 파손 신고",
    content: "아파트 앞 도로에 큰 구멍이 생겼습니다. 차량 통행에 위험합니다.",
    status: "RESOLVED",
    category: "도로/교통",
    createdAt: new Date(2024, 0, 15),
    updatedAt: new Date(2024, 0, 20),
    citizenId: 1,
    adminResponse: "신고해주신 도로 파손 문제가 수리 완료되었습니다. 감사합니다.",
  },
  {
    id: 2,
    title: "소음 피해 신고",
    content: "옆 건물 공사로 인한 새벽 소음이 심각합니다.",
    status: "IN_PROGRESS",
    category: "환경/소음",
    createdAt: new Date(2024, 0, 25),
    updatedAt: new Date(2024, 0, 26),
    citizenId: 1,
  },
  {
    id: 3,
    title: "불법 주차 신고",
    content: "아파트 단지 내 소방차 길목에 불법 주차된 차량이 있습니다.",
    status: "PENDING",
    category: "도로/교통",
    createdAt: new Date(2024, 1, 1),
    updatedAt: new Date(2024, 1, 1),
    citizenId: 1,
  },
];

const MyPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState<"profile" | "complaints">("profile");
  const [complaints, setComplaints] = useState<Complaint[]>(dummyComplaints);
  const [userProfile, setUserProfile] = useState<CitizenProfile | null>(null);
  
  // API hooks
  const [getUserRequest, getUserResponse] = useGetUser();
  const [updatePasswordRequest, updatePasswordResponse] = useUpdateUserPassword();
  const [deleteUserRequest, deleteUserResponse] = useDeleteUser();
  
  // 비밀번호 변경 상태
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // 로그인하지 않은 경우 메인페이지로 리다이렉트
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    // 사용자 정보 API 호출
    getUserRequest();
  }, [isAuthenticated, navigate, getUserRequest]);

  // 사용자 정보 조회 응답 처리
  useEffect(() => {
    if (getUserResponse.data && getUserResponse.called) {
      const responseData = getUserResponse.data as UserApiResponse;
      setUserProfile(responseData.data);
    }
  }, [getUserResponse]);

  // 비밀번호 변경 응답 처리
  useEffect(() => {
    if (updatePasswordResponse.data && updatePasswordResponse.called) {
      alert("비밀번호가 성공적으로 변경되었습니다.");
      setIsEditingPassword(false);
      setPasswordForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
    if (updatePasswordResponse.error) {
      alert("비밀번호 변경에 실패했습니다.");
    }
  }, [updatePasswordResponse]);

  // 계정 삭제 응답 처리
  useEffect(() => {
    if (deleteUserResponse.data && deleteUserResponse.called) {
      logout();
      alert("계정이 삭제되었습니다.");
      window.location.replace("/");
    }
  }, [deleteUserResponse, logout]);

  const getStatusIcon = (status: ComplaintStatus) => {
    switch (status) {
      case "RESOLVED":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "IN_PROGRESS":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "REJECTED":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: ComplaintStatus) => {
    switch (status) {
      case "RESOLVED":
        return "처리완료";
      case "IN_PROGRESS":
        return "처리중";
      case "REJECTED":
        return "반려";
      default:
        return "접수";
    }
  };

  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === "string" ? new Date(dateString) : dateString;
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  };

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      alert("비밀번호는 6자 이상이어야 합니다.");
      return;
    }
    updatePasswordRequest(passwordForm.oldPassword, passwordForm.newPassword);
  };

  const handleAccountDelete = () => {
    if (window.confirm("정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
      deleteUserRequest();
    }
  };

  const resetPasswordForm = () => {
    setPasswordForm({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setIsEditingPassword(false);
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto py-8 px-4">
          {/* 페이지 헤더 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">마이페이지</h1>
            <p className="text-gray-600">내 정보와 민원 처리 현황을 확인하세요</p>
          </div>

          {/* 탭 네비게이션 */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`flex-1 py-4 px-6 text-sm font-medium text-center border-b-2 transition-colors ${
                    activeTab === "profile"
                      ? "border-primary-500 text-primary-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <User className="w-5 h-5 mx-auto mb-1" />
                  내 정보
                </button>
                <button
                  onClick={() => setActiveTab("complaints")}
                  className={`flex-1 py-4 px-6 text-sm font-medium text-center border-b-2 transition-colors ${
                    activeTab === "complaints"
                      ? "border-primary-500 text-primary-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <FileText className="w-5 h-5 mx-auto mb-1" />
                  내 민원 조회
                </button>
              </nav>
            </div>
          </div>

          {/* 내용 영역 */}
          <div className="bg-white rounded-lg shadow-sm">
            {activeTab === "profile" && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">개인정보</h2>
                
                {getUserResponse.loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto"></div>
                    <p className="mt-2 text-gray-500">정보를 불러오는 중...</p>
                  </div>
                ) : userProfile ? (
                  <>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name" className="flex items-center space-x-2 mb-2">
                            <User className="w-4 h-4" />
                            <span>이름</span>
                          </Label>
                          <Input
                            id="name"
                            value={userProfile.name}
                            disabled
                            className="bg-gray-50"
                          />
                        </div>

                        <div>
                          <Label htmlFor="email" className="flex items-center space-x-2 mb-2">
                            <Mail className="w-4 h-4" />
                            <span>이메일</span>
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={userProfile.email}
                            disabled
                            className="bg-gray-50"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="phone" className="flex items-center space-x-2 mb-2">
                            <Phone className="w-4 h-4" />
                            <span>전화번호</span>
                          </Label>
                          <Input
                            id="phone"
                            value={userProfile.phone}
                            disabled
                            className="bg-gray-50"
                          />
                        </div>

                        <div>
                          <Label htmlFor="createdAt" className="flex items-center space-x-2 mb-2">
                            <Clock className="w-4 h-4" />
                            <span>가입일</span>
                          </Label>
                          <Input
                            id="createdAt"
                            value={formatDate(userProfile.createdAt)}
                            disabled
                            className="bg-gray-50"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 비밀번호 변경 섹션 */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">비밀번호 변경</h3>
                      
                      {!isEditingPassword ? (
                        <Button 
                          variant="outline" 
                          onClick={() => setIsEditingPassword(true)}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          비밀번호 변경
                        </Button>
                      ) : (
                        <div className="space-y-4 max-w-md">
                          <div>
                            <Label htmlFor="oldPassword">현재 비밀번호</Label>
                            <Input
                              id="oldPassword"
                              type="password"
                              value={passwordForm.oldPassword}
                              onChange={(e) =>
                                setPasswordForm(prev => ({
                                  ...prev,
                                  oldPassword: e.target.value
                                }))
                              }
                              placeholder="현재 비밀번호를 입력하세요"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="newPassword">새 비밀번호</Label>
                            <Input
                              id="newPassword"
                              type="password"
                              value={passwordForm.newPassword}
                              onChange={(e) =>
                                setPasswordForm(prev => ({
                                  ...prev,
                                  newPassword: e.target.value
                                }))
                              }
                              placeholder="새 비밀번호를 입력하세요 (6자 이상)"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="confirmPassword">새 비밀번호 확인</Label>
                            <Input
                              id="confirmPassword"
                              type="password"
                              value={passwordForm.confirmPassword}
                              onChange={(e) =>
                                setPasswordForm(prev => ({
                                  ...prev,
                                  confirmPassword: e.target.value
                                }))
                              }
                              placeholder="새 비밀번호를 다시 입력하세요"
                            />
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button 
                              onClick={handlePasswordChange}
                              disabled={updatePasswordResponse.loading}
                            >
                              <Save className="w-4 h-4 mr-2" />
                              {updatePasswordResponse.loading ? "변경 중..." : "변경"}
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={resetPasswordForm}
                            >
                              <X className="w-4 h-4 mr-2" />
                              취소
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 계정 삭제 섹션 */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">위험 구역</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다. 이 작업은 되돌릴 수 없습니다.
                      </p>
                      <Button 
                        variant="destructive" 
                        onClick={handleAccountDelete}
                        disabled={deleteUserResponse.loading}
                      >
                        {deleteUserResponse.loading ? "삭제 중..." : "계정 삭제"}
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">정보를 불러올 수 없습니다.</p>
                    <Button 
                      variant="outline" 
                      onClick={getUserRequest}
                      className="mt-4"
                    >
                      다시 시도
                    </Button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "complaints" && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">내 민원 현황</h2>
                  <div className="text-sm text-gray-500">
                    총 {complaints.length}건
                  </div>
                </div>

                <div className="space-y-4">
                  {complaints.map((complaint) => (
                    <div
                      key={complaint.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            {getStatusIcon(complaint.status)}
                            <h3 className="font-medium text-gray-900">
                              {complaint.title}
                            </h3>
                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                              {complaint.category}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {complaint.content}
                          </p>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>신청일: {formatDate(complaint.createdAt)}</span>
                            <span>상태: {getStatusText(complaint.status)}</span>
                            <span>처리일: {formatDate(complaint.updatedAt)}</span>
                          </div>

                          {complaint.adminResponse && (
                            <div className="mt-3 p-3 bg-green-50 rounded-md">
                              <p className="text-sm text-green-800">
                                <strong>관리자 답변:</strong> {complaint.adminResponse}
                              </p>
                            </div>
                          )}
                        </div>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="ml-4"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          상세보기
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {complaints.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 mb-4">등록된 민원이 없습니다</p>
                    <Button onClick={() => navigate("/chat")}>
                      새 민원 등록하기
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export { MyPage };