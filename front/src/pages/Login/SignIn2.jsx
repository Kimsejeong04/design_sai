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
    const [profileImage, setProfileImage] = useState(null);
    const [profileImageFile, setProfileImageFile] = useState(null);

      const handleSignupSubmit = async (e) => {
        e.preventDefault();
        if (!username.trim() && !password.trim()) {
          setMessage("회원가입 정보를 입력해 주세요.");
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
    
        if (!email.trim()){
          setMessage("이메일이 입력되지 않았습니다.")
          return;
        }

        if (!name.trim()){
          setMessage("이름이 입력되지 않았습니다.")
          return;
        }

        if (!tel.trim()){
          setMessage("전화번호가 입력되지 않았습니다.")
          return;
        }

        if (!birthdate.trim()){
          setMessage("생년월일이 입력되지 않았습니다.")
          return;
        }

        if (!gender.trim()){
          setMessage("성별이 입력되지 않았습니다.")
          return;
        }

        if (password !== confirmPasswd) {
          setMessage("비밀번호가 일치하지 않습니다.");
          return;
        }

        try {
        // 회원가입 요청 시점에 FormData 생성
        const formData = new FormData();

        formData.append(
          "user",
          new Blob(
            [
              JSON.stringify({
                username,
                password,
                email,
                birthdate,
                tel,
                name,
                gender,
                userType,
              }),
            ],
            { type: "application/json" }
          )
        );

        // 프로필 사진을 선택한 경우에만 추가
        if (profileImageFile) {
          formData.append("profileImage", profileImageFile);
        }

        const response = await fetch(
          "http://localhost:8081/api/signup",
          {
            method: "POST",
            body: formData,
            credentials: "include",
            mode: "cors",
          }
        );

        const data = await response.json();

        if (response.ok && data.message === "회원가입 성공!") {
          localStorage.setItem("signupEmail", email);
          localStorage.setItem("signupUsername", username);
          localStorage.setItem("signupName", name);
          localStorage.setItem("signupPass", password);

          setMessage(data.message);

          setTimeout(() => {
            navigate("/GoodSign");
          }, 1000);
        } else {
          setMessage(data.message || "회원가입에 실패했습니다.");
        }
      } catch (error) {
        console.error("회원가입 오류:", error);
        setMessage("회원가입 중 오류가 발생했습니다.");
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
    
      const handleProfileImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
          alert("이미지 파일만 선택할 수 있습니다.");
          e.target.value = "";
          return;
        }

        if (file.size > 5 * 1024 * 1024) {
          alert("프로필 사진은 5MB 이하만 가능합니다.");
          e.target.value = "";
          return;
        }

        setProfileImage(URL.createObjectURL(file));
        setProfileImageFile(file);
      };

      const handleProfileImageRemove = () => {
        if (profileImage) {
          URL.revokeObjectURL(profileImage);
        }

        setProfileImage(null);
        setProfileImageFile(null);
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
              <div className="profile-image-section">
                <label className="profile-image-label">
                  프로필 사진
                </label>

                <div className="profile-image-preview">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="프로필 미리보기"
                      className="profile-image"
                    />
                  ) : (
                    <div className="profile-image-placeholder">
                      <span>사진 선택</span>
                    </div>
                  )}
                </div>

                <div className="profile-image-buttons">
                  <label className="profile-image-upload">
                    사진 선택
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageChange}
                      hidden
                    />
                  </label>

                  {profileImage && (
                    <button
                      type="button"
                      className="profile-image-remove"
                      onClick={handleProfileImageRemove}
                    >
                      사진 삭제
                    </button>
                  )}
                </div>

                <p className="profile-image-guide">
                  이미지 파일만 가능하며, 최대 5MB까지 업로드할 수 있습니다.
                </p>
              </div>
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