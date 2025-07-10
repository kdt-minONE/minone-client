import React from "react";
import ThemeDemo from "./components/ThemeDemo";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";

function App() {
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
