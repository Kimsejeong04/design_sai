import React, { useState } from "react";

export default function CertificateModal ({ onClose, onAddCertification }) {
  const [name, setName] = useState(""); // 자격증명
  const [agency, setAgency] = useState(""); // 발행기관
  const [date, setDate] = useState(""); // 취득일자
  const [file, setFile] = useState(null); // 첨부 파일

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !agency || !date) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    onAddCertification({ name, agency, date, file });
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
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>자격증</h2>

        {/* 닫기 버튼 */}
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

        {/* 자격증명 */}
        <label style={{ display: "block", marginBottom: "0.25rem" }}>
          자격증명<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          placeholder="자격증명을 입력하세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
            borderRadius: "0.3rem",
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
        />

        {/* 발행기관 */}
        <label style={{ display: "block", marginBottom: "0.25rem" }}>
          발행기관<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          placeholder="발행기관을 입력하세요"
          value={agency}
          onChange={(e) => setAgency(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
            borderRadius: "0.3rem",
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
        />

        {/* 취득일자 */}
        <label style={{ display: "block", marginBottom: "0.25rem" }}>
          취득일자<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
            borderRadius: "0.3rem",
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
          required
        />

        {/* 증빙 자료 첨부 */}
        <label style={{ display: "block", marginBottom: "0.25rem" }}>증빙 자료 첨부</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ marginBottom: "1rem" }}
        />

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
