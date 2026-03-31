import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import './Welcomecss.css';
export default function Welcome(onSignupClick) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(`http://localhost:8081/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
            credentials: "include", // ✅ 세션 쿠키 포함
        });

        if (!response.ok) {
            setMessage("로그인 실패");
            return;
        }

        const data = await response.json(); // JSON 데이터 가져오기
        setMessage(data.message);

        // ✅ usertype에 따라 페이지 이동
        if (data.usertype === "designer") {
            navigate("/designer/DesignerCosMain");
        } else if (data.usertype === "client") {
            navigate("/client/Cosmain");
        } else {
          console.log("login response ▶", data);
            navigate("/"); // 기본 페이지
        }
    } catch (error) {
        console.error("로그인 요청 오류:", error);
        setMessage("로그인 요청에 실패했습니다.");
    }
};


  const handleRememberMeChange = (e) => {
      setRememberMe(e.target.checked);
  };
  return (
    <div>
      
      <div className='divmcover'>
        <div className='loginWrapper'>
        <div className='divm-wrapperr'>
          <div className='divmm'>
            <br/><br/>
            <p style={{textAlign:'left', fontSize:'30px',fontWeight:'bold'}}>
              어서오세요.<br/>
              디자인 사이입니다.
            </p>
            <p style={{ textAlign: 'left', fontSize: '15px', opacity: 0.8 }}>
              여러 옷들을 디자인 해보세요!
            </p>  
            <br/>
            <form className="form1" onSubmit={handleLoginSubmit}>

            <input  value={username} className="loginput1" type="text" placeholder="   아이디 입력" onChange={(e) => setUsername(e.target.value)}></input>
            <br/>
            <input value={password} className="loginput2" type="password" placeholder="   비밀번호 입력" onChange={(e) => setPassword(e.target.value)}></input>
            <br/>
            <div style={{ display: 'flex', alignItems: 'center', textAlign:'left', marginTop: '10px'}}>
              <input type="checkbox"checked={rememberMe} onChange={handleRememberMeChange}></input> <p style={{ marginLeft: '8px', fontSize: '15px'}}>아이디 저장</p>
            </div>
            
            <br/>
            <button type='submit' style = {{marginTop:'7px', fontSize: '20px', boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.1)'}} className='mainbaroo'>
              로그인
            </button>
            </form>
            <div className='MenuBarr'> 
                <nav>
                    <ul>
                        <li><a href='#'>아이디 찾기</a></li>
                        <li style={{paddingLeft:'5px',paddingRight:'5px'}}><a href='#'>비밀번호 찾기</a></li>
                        <li><a href='/SignIn'>회원가입</a></li>
                    </ul>
                </nav>            
            </div>
          </div>

        </div>

        {/* "여기도 영역임"을 divmcover 내부에서 divm-wrapper 아래로 배치 */}
        <div className='extra-sectionn' style={{textAlign: "center"}}>
          <span style={{ margin: '0 10px', fontSize: '14px', textAlign: 'left', fontSize: '15px', opacity: 0.8 }}>SNS 계정으로 로그인<br/>{message}</span>
          <hr style={{ width: '70%', border: '1px solid #ccc', margin: '0 auto', marginTop:'5px'}} />
          
          <div className="extra-sectionn-btn">
            <button className='mainbaroo2' 
              style={{backgroundColor:'#03C75A', color:'white', marginRight: '20px'}}
            >Naver</button>      

            <button className='mainbaroo2' 
            style={{backgroundColor:'#FFE812', marginRight: '20px'}}>kakao</button>

            <button className='mainbaroo2' 
            style={{backgroundColor:'grey', color:'white', marginRight: '20px'}}>Google</button>
          </div>
        </div>
        </div>
      </div>
</div>
  )
}