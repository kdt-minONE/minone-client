import React, { useState } from 'react';
import { Button } from './ui/button';
import { useTheme } from '../lib/theme';
import SignupModal from './SignupModal';

const ThemeDemo: React.FC = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-minone-main transition-colors">
      {/* Header */}
      <header className="minone-header px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-1">
            <h1 className="text-2xl font-bold text-primary-500">민ONE</h1>
            <span className="text-gray-500 ml-1.5 flex items-center">AI와 함께하는 스마트 민원</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="success"
              size="sm"
              onClick={() => setIsSignupModalOpen(true)}
            >
              회원가입
            </Button>
            <Button
              variant={theme === 'light' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTheme('light')}
            >
              ☀️ Light
            </Button>
            <Button
              variant={theme === 'dark' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTheme('dark')}
            >
              🌙 Dark
            </Button>
            <Button
              variant={theme === 'system' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTheme('system')}
            >
              🖥️ System
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* Modal Demo Section */}
        <section className="minone-card p-6">
          <h2 className="text-xl font-semibold mb-6">📋 회원가입 모달 데모</h2>
          
          <div className="space-y-4">
            <p className="text-gray-600">피그마 디자인을 기반으로 한 회원가입 모달을 확인해보세요.</p>
            
            <div className="flex space-x-4">
              <Button
                variant="minone"
                onClick={() => setIsSignupModalOpen(true)}
              >
                🔐 회원가입 모달 열기
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsSignupModalOpen(true)}
              >
                👤 사용자 등록
              </Button>
            </div>
          </div>
        </section>

        {/* Status Cards */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="minone-card p-6">
            <h3 className="text-sm text-gray-500 mb-2">📊 오늘 접수된 민원</h3>
            <p className="text-3xl font-bold text-primary-500">247</p>
            <p className="text-sm text-success-500 mt-2">▲ 12% (전일 대비)</p>
          </div>
          
          <div className="minone-card p-6">
            <h3 className="text-sm text-gray-500 mb-2">⏳ 처리 중인 민원</h3>
            <p className="text-3xl font-bold text-info-500">89</p>
            <p className="text-sm text-gray-500 mt-2">▼ 5% (전일 대비)</p>
          </div>
          
          <div className="minone-card p-6">
            <h3 className="text-sm text-gray-500 mb-2">⚡ 평균 처리 시간</h3>
            <p className="text-3xl font-bold text-warning-500">2.4일</p>
            <p className="text-sm text-success-500 mt-2">▲ 18% 개선</p>
          </div>
          
          <div className="minone-card p-6">
            <h3 className="text-sm text-gray-500 mb-2">🤖 AI 분류 정확도</h3>
            <p className="text-3xl font-bold text-primary-500">94.2%</p>
            <p className="text-sm text-success-500 mt-2">▲ 2.1% 개선</p>
          </div>
        </section>

        {/* Chat Interface Preview */}
        <section className="minone-card p-6">
          <h2 className="text-xl font-semibold mb-6">🤖 AI 민원 접수 어시스턴트</h2>
          
          <div className="space-y-4 max-w-2xl">
            {/* AI Message */}
            <div className="minone-chat-ai max-w-md">
              <p className="text-sm font-semibold text-primary-500 mb-2">🤖 AI 어시스턴트</p>
              <p className="text-gray-800">
                안녕하세요! 민원 접수를 도와드리겠습니다. 
                어떤 불편사항이나 건의사항이 있으신지 자연스럽게 말씀해 주세요.
              </p>
            </div>
            
            {/* User Message */}
            <div className="flex justify-end">
              <div className="minone-chat-user max-w-md">
                <p>윗집에서 새벽에 층간 소음이 너무 심해서 잠을 잘 수가 없어요</p>
              </div>
            </div>
            
            {/* AI Response */}
            <div className="minone-chat-ai max-w-md">
              <p className="text-sm font-semibold text-primary-500 mb-2">🤖 AI 어시스턴트</p>
              <p className="text-gray-800">
                층간 소음으로 불편하시군요. 정확한 처리를 위해 몇 가지 정보가 더 필요합니다:
              </p>
              <ul className="mt-2 text-sm text-gray-600 space-y-1">
                <li>📍 정확한 주소 (동/호수)</li>
                <li>⏰ 주로 발생하는 시간대</li>
                <li>🔊 소음의 종류</li>
                <li>📅 언제부터 시작되었는지</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Button Examples */}
        <section className="minone-card p-6">
          <h2 className="text-xl font-semibold mb-6">Button 스타일 예시</h2>
          
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button variant="default">기본 버튼</Button>
              <Button variant="minone">민ONE 버튼</Button>
              <Button variant="success">완료</Button>
              <Button variant="warning">처리중</Button>
              <Button variant="info">접수</Button>
              <Button variant="urgent">긴급</Button>
              <Button variant="outline">외곽선</Button>
              <Button variant="ghost">고스트</Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button size="xs">XS</Button>
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">XL</Button>
            </div>
          </div>
        </section>

        {/* Status Badges */}
        <section className="minone-card p-6">
          <h2 className="text-xl font-semibold mb-6">상태 뱃지 예시</h2>
          
          <div className="flex flex-wrap gap-2">
            <span className="minone-status-badge minone-status-received">접수완료</span>
            <span className="minone-status-badge minone-status-processing">처리중</span>
            <span className="minone-status-badge minone-status-completed">처리완료</span>
            <span className="minone-status-badge minone-status-urgent">긴급</span>
          </div>
        </section>

        {/* Color Palette */}
        <section className="minone-card p-6">
          <h2 className="text-xl font-semibold mb-6">컬러 팔레트</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium">Primary</h3>
              <div className="h-12 bg-primary-500 rounded-md"></div>
              <code className="text-xs">#3366cc</code>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Success</h3>
              <div className="h-12 bg-success-500 rounded-md"></div>
              <code className="text-xs">#4db24d</code>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Warning</h3>
              <div className="h-12 bg-warning-500 rounded-md"></div>
              <code className="text-xs">#f59e0b</code>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Info</h3>
              <div className="h-12 bg-info-500 rounded-md"></div>
              <code className="text-xs">#3399e5</code>
            </div>
          </div>
        </section>

        {/* Modal Features */}
        <section className="minone-card p-6">
          <h2 className="text-xl font-semibold mb-6">회원가입 모달 특징</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-primary-500">🎨 디자인 특징</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 피그마 디자인 100% 반영</li>
                <li>• 반응형 레이아웃</li>
                <li>• 접근성 최적화</li>
                <li>• 부드러운 애니메이션</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-primary-500">⚙️ 기능 특징</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 실시간 유효성 검증</li>
                <li>• 자동 휴대폰 번호 포맷팅</li>
                <li>• 비밀번호 보기/숨기기</li>
                <li>• 약관 동의 관리</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Current Theme Info */}
        <section className="minone-card p-6">
          <h2 className="text-xl font-semibold mb-4">현재 테마 정보</h2>
          <div className="text-sm space-y-1">
            <p><strong>설정된 테마:</strong> {theme}</p>
            <p><strong>적용된 테마:</strong> {resolvedTheme}</p>
            <p><strong>폰트:</strong> Inter</p>
            <p><strong>Border Radius:</strong> 0.5rem</p>
            <p><strong>메인 배경:</strong> #f7faff</p>
            <p><strong>헤더 배경:</strong> #f0f5fa</p>
          </div>
        </section>
      </main>

      {/* Signup Modal */}
      <SignupModal 
        open={isSignupModalOpen}
        onOpenChange={setIsSignupModalOpen}
      />
    </div>
  );
};

export default ThemeDemo;
