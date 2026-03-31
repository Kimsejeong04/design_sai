import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import './GoodSignUpcss.css';

export default function GoodSignUp() {
      const navigate = useNavigate();
    
const [signupEmail, setSignupEmail] = useState("");
  const [signupName, setSignupName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    const storedEmail = localStorage.getItem("signupEmail") || "이메일 없음";
    const storedName = localStorage.getItem("signupName") || "이름 없음";
    const storedUsername = localStorage.getItem("signupUsername");
    const storedPass = localStorage.getItem("signupPass");

    setSignupEmail(storedEmail);
    setSignupName(storedName);
    setUserName(storedUsername);
    setPassword(storedPass);
    // ✅ 사용자 이름을 localStorage에 저장 (헤더에서 사용)
    localStorage.setItem("name", storedName);

    
  }, []);
  const redirecToRight = async (e) => {
    console.log("로그인 시도: ", username, password);
    try {
        const response = await fetch(`http://localhost:8081/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({username, password}),
            credentials: "include", // ✅ 세션 쿠키 포함
        });

        if (!response.ok) {
            return;
        }

        const data = await response.json(); // JSON 데이터 가져오기

        // ✅ usertype에 따라 페이지 이동
        if (data.usertype === "designer") {
            navigate("/designer/DesignerCosMain");
        } else if (data.usertype === "client") {
            navigate("/client/Cosmain");
        } else {
            navigate("/"); // 기본 페이지
        }
    } catch (error) {
        console.error("리디렉 요청 오류:", error);
    }
};
  return (
    <div className='divmcover'>
    <div className='loginWrapper'>
    <div className='divm-wrapperr'>
      <div className='divmmm'>
      <div style={{ textAlign: "center" }}>
  <p style={{ fontSize: "30px" }}>
    <span style={{ fontWeight: "bold" }}>환영합니다!</span>
  </p>
  <p style={{ fontSize: "19px" }}>
    디자인사이 계정 가입이 완료되었습니다.
    <br />
    디자인사이 하나로 다양한 서비스를 편리하게 이용해 보세요!
  </p>
  
  {/* ✅ div를 p 태그 바깥으로 이동 */}
  <div className="ProfileIcon"></div>  
  <strong>{signupEmail}</strong> <br />
  <strong>{signupName}</strong>
  
  <div style={{ display:"flex",justifyContent:"center",alignItems:"center"}}>
    <br />
    <button
      style={{backgroundColor: "#BFD7EE"}}
      className="mainbarooo2" 
      onClick={() => redirecToRight()}
    >
      시작하기
    </button>
  </div>
</div>

       

       
      </div>

    </div>
    </div>

  </div>
  )
}