import React from "react";
import './index.css';
import { BrowserRouter as Router } from "react-router-dom";

import RouterComponent from "./RouterComponent"// 라우터 관리 파일 분리
import { ChatProvider } from "./pages/ChatMain/ui/ChatContext";

function App() {
  return (
    <div className="App">
        <Router>
          <ChatProvider>
        <RouterComponent /> {/* 라우팅 담당 컴포넌트 */}
        </ChatProvider>
        </Router>
    </div>
  );
}

export default App;
