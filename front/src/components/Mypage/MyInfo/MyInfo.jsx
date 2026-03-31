import React, { useRef, useState } from "react";
import "./MyInfo.css";

export default function MyInfo() {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState("/image/default-profile.png");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setPreview("/image/default-profile.png");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");
  const [account, setAccount] = useState("");

  const handleSave = () => {
    // 1. 필수 항목 확인
    if (!name || !email || !phone || !birth || !account) {
      alert("필수 항목을 모두 입력해주세요.");
      return; // 조건이 충족되지 않으면 저장 중단
    }
  
    // 2. 저장 로직 실행
    alert("저장 완료!"); // 실제 저장 처리가 들어갈 부분
  };

  return (
    <div className="myinfo-container">
      <div className="info-content">
        {/* 왼쪽 프로필 섹션 */}
        <div className="profile-section">
          <img
            src={preview || "/image/default-profile.png"}
            alt="프로필 사진"
            className="profile-image"
            onClick={() => setIsModalOpen(true)}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <button
            className="profile-change-button"
            onClick={() => fileInputRef.current.click()}
          >
            프로필 변경
          </button>
          <p className="profile-delete-text" onClick={handleImageDelete}>
            삭제
          </p>
        </div>

        {/* 오른쪽 폼 영역 */}
        <div className="form-section">
          <div className="input-group">
            <label className="input-label">성명<span style={{color:'red'}}>*</span></label>
            <input
              type="text"
              className="input-field"
              placeholder="성명 입력"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="input-label">이메일 주소<span style={{color:'red'}}>*</span></label>
            <input
              type="email"
              className="input-field"
              placeholder="이메일 입력"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="input-label">비밀번호</label>
            <div className="input-with-button">
              <input type="password" className="input-field" placeholder="********" disabled />
              <button className="secondary-button" onClick={() => setIsPasswordModalOpen(true)}>
                수정
              </button>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">전화번호<span style={{color:'red'}}>*</span></label>
            <div className="input-with-button">
              <input
                type="tel"
                className="input-field"
                placeholder="전화번호 입력"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <button className="secondary-button">재인증</button>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">생년월일<span style={{color:'red'}}>*</span></label>
            <input
              type="date"
              max={new Date().toISOString().split("T")[0]}
              className="input-field"
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="input-label">성별</label>
            <div className="radio-group">
              <label className="radio-option">
                <input type="radio" name="gender" value="male" /> 남성
              </label>
              <label className="radio-option">
                <input type="radio" name="gender" value="female" /> 여성
              </label>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">환불 계좌 정보<span style={{color:'red'}}>*</span></label>
            <select className="input-field mb-2">
              <option value="personal">개인계좌</option>
              <option value="business">사업자계좌</option>
            </select>
            <input
              type="text"
              className="input-field"
              placeholder="계좌번호 입력"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
            />
          </div>

          {/* 회원탈퇴 */}
          <div className="withdraw-wrapper">
            <p className="withdraw-text">회원탈퇴</p>
          </div>

          {/* 저장/취소 버튼 */}
          <div className="action-buttons">
            <button className="save-button" onClick={handleSave}>
              저장
            </button>
            <button className="cancel-button">취소</button>
            
          </div>
        </div>
      </div>

      {/* 이미지 확대 모달 */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={preview} alt="확대된 프로필" className="modal-image" />
            <button className="modal-close-button" onClick={() => setIsModalOpen(false)}>닫기</button>
          </div>
        </div>
      )}

      {/* 비밀번호 변경 */}
      {isPasswordModalOpen && (
        <div className="modal-overlay" onClick={() => setIsPasswordModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title" style={{color:'#799FC4', fontSize:'25px'}}>비밀번호 변경</h3>

            <hr className="modal-divider" />

            <input
              type="password"
              className="input-field"
              placeholder="현재 비밀번호 입력"
              style={{ marginTop: '15px' }}
            />
            <input
              type="password"
              className="input-field"
              placeholder="새 비밀번호 입력"
              style={{ marginTop: '10px' }}
            />
            <input
              type="password"
              className="input-field"
              placeholder="새 비밀번호 확인"
              style={{ marginTop: '10px' }}
            />

            <p className="password-guideline">
              <span style={{color:'blue'}}>안전한 비밀번호로 내 정보를 보호</span>하세요.<br />
              <span style={{color:'red'}}>다른 아이디/사이트에서 사용한 적 없는 비밀번호</span><br />
              <span style={{color:'red'}}>이전에 사용한 적 없는 비밀번호</span>가 안전합니다.
            </p>

            <hr className="modal-divider" />

            <div className="modal-actions">
              <button className="cancel-button" onClick={() => setIsPasswordModalOpen(false)}>
                취소
              </button>
              <button className="save-button">확인</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
