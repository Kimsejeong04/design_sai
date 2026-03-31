import React from "react";
import { Link , useNavigate } from "react-router-dom";

import axios from "axios";
import { useState, useEffect} from "react";


export default function DesignerHeader() {
  const navigate = useNavigate();
  const [designerName, setDesignerName] = useState("");

  useEffect(() => {  //? 상단 메뉴바 사용자 이름 표시하기
    fetch("http://localhost:8081/api/user", {
      method: "GET",
      credentials: "include", 
    })
      .then((res) => {
      if (res.status === 401) {
        setClientName("");     // 상태 초기화
        navigate("/login");    // 🔥 로그인 페이지 이동
        return null;
      }
      return res.json();
    })
    .then((data) => {
      if (data) {
        setDesignerName(data.username);
      }
    })
    .catch(() => {
      setDesignerName("");
      navigate("/login"); // 🔥 에러 시도 이동
    });
  }, [location]);

  const handleLogout = async () => {
    try {
        const response = await fetch("http://localhost:8081/api/logout", {
            method: "POST",
            credentials: "include", // ✅ 세션 유지
        });

        if (response.ok) {
            localStorage.removeItem("id");
            localStorage.removeItem("name");
            localStorage.removeItem("usertype");
            navigate("/"); // ✅ 로그인 페이지로 이동
        } else {
            console.error("로그아웃 실패:", await response.text());
        }
    } catch (error) {
        console.error("로그아웃 요청 오류:", error);
    }
};
  return (
    <div className="LogoStuff" style={{ fontFamily: "'Pretendard', sans-serif" }}>
      <Link to="/designer/DesignerCosMain">  
        <img src="/image/image.png" alt="이미지없음" />
      </Link>
      <div className="Buttons1" style={{ marginLeft: 'auto', fontWeight: 400, fontSize: '16px' }}>
        {designerName} 디자이너님, 환영합니다!
        <button className="ButtonAtLogo" style={{ backgroundColor: '#2C2F31', fontWeight: 400, fontSize: '16px'}} onClick={handleLogout}>
          로그아웃
        </button>
        <Link to="/designer/DMyPage">
          <button className="ButtonAtLogo" style={{ backgroundColor: '#80A1BE', fontWeight: 400, fontSize: '16px' }}>
            마이페이지
          </button>
        </Link>
      </div>
    </div>
  );
}
