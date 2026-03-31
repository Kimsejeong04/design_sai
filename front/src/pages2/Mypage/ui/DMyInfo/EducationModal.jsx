import React, { useState } from "react";

export default function EducationModal({ onClose, onAddCert }) {
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [status, setStatus] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!school || !major || !status) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    onAddCert({ school, major, status, file });
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "0.5rem",
          width: "400px",
          position: "relative",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>학력</h2>

        {/* 닫기 버튼 - SVG 아이콘 */}
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* 학교명 */}
        <label style={{ display: "block", marginBottom: "0.25rem" }}>
          학교명<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          placeholder="학교명을 입력하세요"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
            borderRadius: "0.3rem",
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
        />

        {/* 전공 */}
        <label style={{ display: "block", marginBottom: "0.25rem" }}>
          전공<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          placeholder="전공을 입력하세요"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
            borderRadius: "0.3rem",
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
        />

        {/* 상태 */}
        <label style={{ display: "block", marginBottom: "0.25rem" }}>
          재적 상태<span style={{ color: "red" }}>*</span>
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
            borderRadius: "0.3rem",
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
          required
        >
          <option value="" disabled>
            상태를 선택하세요
          </option>
          <option value="재학">재학</option>
          <option value="휴학">휴학</option>
          <option value="이수">이수</option>
          <option value="졸업">졸업</option>
        </select>

        {/* 증빙 자료 첨부 */}
        <label style={{ display: "block", marginBottom: "0.25rem" }}>증빙 자료 첨부</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ marginBottom: "1rem" }}
        />

        {/* 제출 버튼 */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.6rem",
            backgroundColor: "#799FC4",
            color: "white",
            border: "none",
            borderRadius: "0.3rem",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          추가
        </button>
      </form>
    </div>
  );
}
