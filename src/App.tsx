import React, { useEffect } from "react";
import ThemeDemo from "./components/ThemeDemo";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { checkAuthStatus } from "./utils/auth";

function App() {
  // 앱 시작 시 인증 상태 확인
  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout>asd</Layout>} />
        <Route path="/example" element={<ThemeDemo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
