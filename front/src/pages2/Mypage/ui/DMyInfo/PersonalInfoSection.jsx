import React, { useState } from "react";

export default function PersonalInfoSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    birth: "",
    gender: "",
    businessNumber: "",
    accountType: "",
    accountName: "",
    bank: "",
    accountFront: "",
    accountBack: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("저장할 개인정보:", form);
    alert("개인정보 저장 완료!");
  };

  const handleCancel = () => {
    setForm({
      name: "",
      email: "",
      password: "",
      phone: "",
      birth: "",
      gender: "",
      businessNumber: "",
      accountType: "",
      accountName: "",
      bank: "",
      accountFront: "",
      accountBack: "",
    });
  };

  return (
    <div className="form-section">
      <h3>개인정보</h3>

      {/* 성명 */}
      <div className="input-group">
        <label className="input-label">성명<span style={{ color: "red" }}>*</span></label>
        <input
          type="text"
          className="input-field short"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      {/* 이메일 */}
      <div className="input-group">
        <label className="input-label">이메일 주소<span style={{ color: "red" }}>*</span></label>
        <input
          type="email"
          className="input-field short"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      {/* 비밀번호 + 수정 버튼 */}
      <div className="input-group horizontal">
        <label className="input-label">비밀번호<span style={{ color: "red" }}>*</span></label>
        <input
          type="password"
          className="input-field short"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="새 비밀번호 입력"
        />
        <button className="sub-button">수정</button>
      </div>

      {/* 전화번호 + 재인증 버튼 */}
      <div className="input-group horizontal">
        <label className="input-label">전화번호<span style={{ color: "red" }}>*</span></label>
        <input
          type="tel"
          className="input-field short"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
        <button className="sub-button">재인증</button>
      </div>

      {/* 생년월일 */}
      <div className="input-group">
        <label className="input-label">생년월일<span style={{ color: "red" }}>*</span></label>
        <input
          type="date"
          className="input-field short"
          name="birth"
          value={form.birth}
          onChange={handleChange}
        />
      </div>

      {/* 성별 */}
      <div className="input-group center">
        <label className="input-label">성별</label>
        <div className="radio-group">
          <label className="radio-label">
            남성
            <input
              type="radio"
              name="gender"
              value="남성"
              checked={form.gender === "남성"}
              onChange={handleChange}
            />
          </label>
          <label className="radio-label">
            여성
            <input
              type="radio"
              name="gender"
              value="여성"
              checked={form.gender === "여성"}
              onChange={handleChange}
            />
          </label>
        </div>
      </div>

      {/* 사업자번호 */}
      <div className="input-group">
        <label className="input-label">사업자번호<span style={{ color: "red" }}>*</span></label>
        <input
          type="text"
          className="input-field short"
          name="businessNumber"
          value={form.businessNumber}
          onChange={handleChange}
        />
      </div>

      {/* 계좌 유형 */}
      <div className="input-group center">
        <label className="input-label">계좌 유형<span style={{ color: "red" }}>*</span></label>
        <div className="radio-group">
          <label className="radio-label">
            개인계좌
            <input
              type="radio"
              name="accountType"
              value="개인계좌"
              checked={form.accountType === "개인계좌"}
              onChange={handleChange}
            />
          </label>
          <label className="radio-label">
            사업자계좌
            <input
              type="radio"
              name="accountType"
              value="사업자계좌"
              checked={form.accountType === "사업자계좌"}
              onChange={handleChange}
            />
          </label>
        </div>
      </div>

      {/* 계좌 성명 + 은행 */}
      <div className="input-group horizontal">
        <label className="input-label">계좌 정보<span style={{ color: "red" }}>*</span></label>
        <input
          type="text"
          className="input-field short"
          name="accountName"
          placeholder="성명"
          value={form.accountName}
          onChange={handleChange}
        />
        <select
          className="input-field short"
          name="bank"
          value={form.bank}
          onChange={handleChange}
        >
          <option value="">은행 선택</option>
          <option value="국민은행">국민은행</option>
          <option value="신한은행">신한은행</option>
          <option value="카카오뱅크">카카오뱅크</option>
          <option value="토스뱅크">토스뱅크</option>
          <option value="농협">농협</option>
          <option value="우리은행">우리은행</option>
          <option value="하나은행">하나은행</option>
        </select>
      </div>

      {/* 계좌번호 */}
      <div className="input-group">
        <label className="input-label">계좌번호<span style={{ color: "red" }}>*</span></label>
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            className="input-field short"
            name="accountFront"
            placeholder="앞자리"
            value={form.accountFront}
            onChange={handleChange}
          />
          <span>-</span>
          <input
            type="text"
            className="input-field short"
            name="accountBack"
            placeholder="뒷자리"
            value={form.accountBack}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* 버튼 */}
      <div className="action-buttons">
        <button className="save-button" onClick={handleSave}>
          저장
        </button>
        <button className="cancel-button" onClick={handleCancel}>
          취소
        </button>
      </div>
    </div>
  );
}
