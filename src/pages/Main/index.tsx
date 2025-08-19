import React from "react";
import { Layout } from "../../components/Layout";
import { Button } from "../../components/ui/button";
import {
  MessageCircle,
  Bot,
  FileText,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Clock,
  Shield,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  const handleChatStart = () => {
    navigate("/chat");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <section className="relative py-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-primary-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <Bot className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              복잡한 민원,{" "}
              <span className="text-primary-500 bg-gradient-to-r from-primary-500 to-blue-600 bg-clip-text text-transparent">
                AI 채팅
              </span>
              으로 <br />
              간단하게 해결하세요
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              민ONE은 복잡한 민원 접수 과정을 AI 채팅 한 번으로 끝내는 혁신적인
              서비스입니다. 선제적 해결방안 제시부터 부처별 양식 변환까지, 모든
              과정을 자동화했습니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary-500 hover:bg-primary-600 text-lg px-8 py-4 h-auto"
                onClick={handleChatStart}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                지금 바로 민원 상담하기
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                왜 민ONE을 선택해야 할까요?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                기존 민원 처리의 불편함을 완전히 해결하는 스마트한 기능들
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  AI 채팅 상담
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  복잡한 양식 대신 간단한 채팅으로 민원을 접수하세요. AI가
                  자연스러운 대화를 통해 필요한 정보를 수집합니다.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    자연어 처리로 편리한 상담
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    24시간 언제든지 이용 가능
                  </li>
                </ul>
              </div>

              {/* Feature 2 */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  선제적 해결방안
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  민원을 접수하기 전에 AI가 즉시 해결 가능한 방법을 제시합니다.
                  많은 문제들이 접수 없이도 해결됩니다.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    즉시 해결방안 제시
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    관련 법규 및 절차 안내
                  </li>
                </ul>
              </div>

              {/* Feature 3 */}
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-8 rounded-2xl border border-purple-100 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  자동 양식 변환
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  해결이 어려운 경우, AI가 각 부처에 맞는 정확한 양식으로 자동
                  변환하여 접수를 도와줍니다.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    부처별 맞춤 양식 생성
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    원클릭 민원 접수
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                이렇게 간단합니다
              </h2>
              <p className="text-xl text-gray-600">
                3단계로 끝나는 스마트 민원 처리
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <MessageCircle className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  AI와 채팅하기
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  복잡한 양식 없이 자연스러운 대화로 문제 상황을 설명해주세요.
                  AI가 친근하게 필요한 정보를 물어봅니다.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <Sparkles className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  해결방안 제시
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  AI가 즉시 해결 가능한 방법을 찾아 제시합니다. 많은 경우 이
                  단계에서 문제가 해결됩니다.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <FileText className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  자동 접수
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  추가 처리가 필요한 경우, 적절한 부처로 정확한 양식에 맞춰
                  자동으로 민원을 접수해줍니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-6 bg-primary-500">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                이미 많은 분들이 경험하고 있습니다
              </h2>
              <p className="text-xl text-primary-100">
                민ONE으로 더 쉽고 빠른 민원 처리를 경험해보세요
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="flex justify-center mb-4">
                  <Clock className="w-12 h-12 text-yellow-300" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">87%</div>
                <div className="text-primary-100">처리 시간 단축</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="w-12 h-12 text-green-300" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">95%</div>
                <div className="text-primary-100">즉시 해결률</div>
              </div>
              {/* 
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="flex justify-center mb-4">
                  <Users className="w-12 h-12 text-blue-300" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">10만+</div>
                <div className="text-primary-100">누적 이용자</div>
              </div> */}

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="flex justify-center mb-4">
                  <Shield className="w-12 h-12 text-purple-300" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">100%</div>
                <div className="text-primary-100">보안 안전성</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              지금 바로 시작해보세요
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              복잡했던 민원 처리, 이제 AI와 간단한 채팅으로 해결하세요. 무료로
              이용할 수 있습니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary-500 hover:bg-primary-600 text-lg px-10 py-6 h-auto shadow-lg"
                onClick={handleChatStart}
              >
                <Bot className="w-6 h-6 mr-3" />
                AI 민원 상담 시작하기
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export { Main };
