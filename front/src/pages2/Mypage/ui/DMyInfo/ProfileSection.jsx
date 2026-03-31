import React, { useState, useRef } from "react";

export default function ProfileSection() {
  /* ---------------- 상태 ---------------- */
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState("/image/default-profile.png");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [region, setRegion] = useState("");
  const [specialties, setSpecialties] = useState([]); // 최대 3개

  /* ---------------- 프로필 이미지 ---------------- */
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

  /* ---------------- 전문분야 선택 ---------------- */
  const addSpecialty = (value) => {
    if (!value) return;
    if (specialties.includes(value)) return; // 중복 금지
    if (specialties.length >= 3) return; // 최대 3개
    setSpecialties([...specialties, value]);
  };

  const removeSpecialty = (index) => {
    setSpecialties(specialties.filter((_, i) => i !== index));
  };

  /* ---------------- 저장 / 취소 ---------------- */
  const handleSave = () => {
    if (!nickname) {
      alert("닉네임은 필수입니다.");
      return;
    }
    const payload = {
      nickname,
      bio,
      region,
      specialties,
    };
    console.log("저장할 데이터:", payload);
    alert("저장 완료!");
    // TODO: 서버 저장 API 연동
  };

  const handleCancel = () => {
    setNickname("");
    setBio("");
    setRegion("");
    setSpecialties([]);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="myinfo-container">
      <h3>프로필</h3>
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
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            프로필 변경
          </button>
          <p className="profile-delete-text" onClick={handleImageDelete}>
            삭제
          </p>
        </div>

        {/* 오른쪽 폼 영역 */}
        <div className="form-section">
          {/* 닉네임 */}
          <div className="input-group">
            <label className="input-label">
              디자이너 닉네임<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="닉네임 입력"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>

          {/* 자기소개 */}
          <div className="input-group">
            <label className="input-label">
                자기소개<span style={{ color: "red" }}>*</span>
            </label>
            <textarea
                className="input-field"
                placeholder="자기소개를 입력하세요"
                maxLength={100}
                rows={7}             
                style={{ resize: "none" }}
                value={bio}
                onChange={(e) => {
                    if (e.target.value.length <= 100) {
                    setBio(e.target.value);
                    }
                }}
                />
            <div style={{ textAlign: "right", fontSize: "0.9rem", color: "#666" }}>
                {bio.length} / 100
            </div>
          </div>

          {/* 지역 */}
          <div className="input-group">
            <label className="input-label">지역</label>
            <select
              className="input-field"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="">선택하세요</option>
              <option value="서울">서울</option>
              <option value="경기도">경기도</option>
              <option value="인천">인천</option>
              <option value="충청남도">충청남도</option>
              <option value="충청북도">충청북도</option>
            </select>
          </div>

          {/* 전문분야 선택 */}
          <div className="input-group">
            <label className="input-label">전문분야 (최대 3개)</label>
            <select
              className="input-field"
              onChange={(e) => {
                addSpecialty(e.target.value);
                e.target.value = ""; // 초기화
              }}
            >
              <option value="">선택하세요</option>
              <option value="상의">상의</option>
              <option value="아우터">아우터</option>
              <option value="바지">바지</option>
              <option value="원피스">원피스</option>
              <option value="스커트">스커트</option>
              <option value="스니커즈">스니커즈</option>
              <option value="신발">신발</option>
              <option value="가방">가방</option>
            </select>
          </div>

          {/* 선택된 전문분야 표시 */}
          {specialties.length > 0 && (
            <div className="input-group">
              <label className="input-label">전문분야 - 1 / 2 / 3</label>
              <div>
                {specialties.map((item, index) => (
                  <span
                    key={index}
                    style={{
                      display: "inline-block",
                      marginRight: "10px",
                      background: "#e0e7f1",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  >
                    {`${index + 1}: ${item}`}
                    <button
                      type="button"
                      onClick={() => removeSpecialty(index)}
                      style={{
                        marginLeft: "6px",
                        background: "none",
                        border: "none",
                        color: "red",
                        cursor: "pointer",
                      }}
                    >
                      ❌
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 저장 / 취소 */}
          <div className="action-buttons">
            <button className="save-button" onClick={handleSave}>
              저장
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              취소
            </button>
          </div>
        </div>
      </div>

      {/* 이미지 확대 모달 */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={preview} alt="확대된 프로필" className="modal-image" />
            <button
              className="modal-close-button"
              onClick={() => setIsModalOpen(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}