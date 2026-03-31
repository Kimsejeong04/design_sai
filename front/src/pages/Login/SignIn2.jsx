import React, { useState, useEffect } from "react";
import './Signin2css.css';
import { useNavigate, useLocation } from 'react-router-dom';

export default function SignIn2() {
    const navigate = useNavigate();
    const location = useLocation();
    const userType = location.state?.userType || "client"; // 기본값 설정

    const [username, setId] = useState("");
    const [password, setPasswd] = useState("");
    const [confirmPasswd, setConfirmPasswd] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [tel, setTel] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [message, setMessage] = useState("");
    const [isidValid, setIsidValid] = useState(false);
    const [idCheckMessage, setidCheckMessage] = useState("");            
    const [confirmPassword, setConfirmPassword] = useState("");
      const [isUsernameValid, setIsUsernameValid] = useState(false);
      const [usernameCheckMessage, setUsernameCheckMessage] = useState("");
      const [isSignup, setIsSignup] = useState(false);

      const handleSignupSubmit = async (e) => {
        e.preventDefault();
        if (!username.trim() && !password.trim()) {
          setMessage("회원가입 정보를 입력해 주십시오.");
          return;
        }
    
        if (!username.trim()) {
          setMessage("아이디가 입력되지 않았습니다.");
          return;
        }
    
        if (!password.trim()) {
          setMessage("비밀번호가 입력되지 않았습니다.");
          return;
        }
        /*if (!isUsernameValid) {
          setMessage("아이디 중복확인을 해주십시오.");
          return;
        }*/
    
        if (password !== confirmPasswd) {
          setMessage("비밀번호가 일치하지 않습니다.");
          return;
        }
    
        const response = await fetch(`http://localhost:8081/api/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password, email, birthdate, tel, name, gender, userType }),
          credentials: "include",
          mode: "cors",
        });
    
        const data = await response.json();
        if (response.ok && data.message === "회원가입 성공!") {
            localStorage.setItem("signupEmail", email);
            localStorage.setItem("signupUsername", username);
            localStorage.setItem("signupName", name);
            localStorage.setItem("signupPass", password);


          setMessage(data.message);
          setTimeout(() => {
            navigate('/GoodSign');  // 회원가입 성공 시 Hello 컴포넌트로 이동
          }, 1000);
        } else {
          setMessage(data.message);
        }
      };
       // 회원가입 화면으로 이동 시 초기화
       const handleGoToSignup = () => {
        setId("");
        setPasswd("");
        setMessage("");
        setIsSignup(true);
      };
    
      // 로그인 화면으로 이동 시 초기화
      const handleGoToLogin = () => {
        setId("");
        setPasswd("");
        setMessage("");
        setConfirmPasswd("");
        setIsSignup(false);
        setUsernameCheckMessage("");
      };
    
      const handleCheckUsername = async () => {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/check-username/?username=${username}`
        );
        const data = await response.json();
        if (!username.trim()) {
          setMessage("입력 이후 중복확인을 진행하십시오");
            return;
        } else {
          if(data.exists){ 
           
            setIsUsernameValid(false);
            setUsernameCheckMessage("중복 Id입니다!");
          }else{
          setIsUsernameValid(true);
          setUsernameCheckMessage("사용 가능한 Id입니다.");
          }
        }
      };
  return (
    <div>
        <div className='divmcover'>
        <div className='loginWrapper'>
        <div className='divm-wrapperr'>
          <div className='divmmmm'>
            <p style={{fontSize:'30px'}}>
            <div className="login">
                필수정보 입력
        
            <form className="form1" onSubmit={handleSignupSubmit}>
            <div className="inputinfo">
            아이디
            <br/>
                <input
                type="text"
                className={`input-text  ${!isidValid ? "invalid" : ""}`}
                value={username}
                onChange={(e) => setId(e.target.value)}
                
                />
                {/*<button
                type="button"
                className="dupcheck"
                onClick={handleCheckUsername}
                >
                중복 확인
                </button>*/}
            <span>{idCheckMessage}</span>
            </div>
            <div  className="inputinfo" >
            비밀번호
            <br/>

            <input
              type="password"
              className="input-password"
              value={password}
              onChange={(e) => setPasswd(e.target.value)}
            />
                        </div>

            <div  className="inputinfo">
            비밀번호 확인
            <br/>

            <input
              type="password"
              className="input-password"
              value={confirmPasswd}
              onChange={(e) => setConfirmPasswd(e.target.value)}
            />
            </div>

            <div  className="inputinfo">
            이메일 입력
            <br/>

            <input
              type="email"
              className="input-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
                        </div>
            <div className="inputinfo">
                <label>이름</label><br/>
                <input
                  type="text"
                  className="input-text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="inputinfo">
                <label>전화번호</label><br/>
                <input
                  type="tel"
                  className="input-text"
                  placeholder="010-1234-5678"
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                />
              </div>

              <div className="inputinfo">
                <label>생년월일</label><br/>
                <input
                  type="date"
                  className="input-text"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                />
              </div>

              <div className="inputinfo">
                <label>성별</label><br/>
                <select
                  className="input-text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">선택하세요</option>
                  <option value="male">남성</option>
                  <option value="female">여성</option>
                  <option value="other">기타</option>
                </select>
              </div>

            

            {message && <p style={{ color: "red" }}>{message}</p>}
            <button type="submit" className="mpbutton">
              다음
            </button>
            {/*
            <button
              type="button"
              className="mpbutton"
              onClick={handleGoToLogin}
            >
              돌아가기
            </button>*/}
            </form>
        
        
            </div>
            </p>
          

           
          </div>

        </div>
        </div>

      </div>


        

    </div>
  )
}