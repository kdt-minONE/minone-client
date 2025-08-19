import React, { useEffect } from "react";
import ThemeDemo from "./components/ThemeDemo";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { checkAuthStatus } from "./utils/auth";
import { Main } from "./pages/Main";
import { Chat } from "./pages/Chat";

function App() {
  // 앱 시작 시 인증 상태 확인
  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/example" element={<ThemeDemo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
