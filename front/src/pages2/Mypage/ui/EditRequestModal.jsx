import React, { useState } from "react";
import styled from "styled-components";

const CloseButton = styled.button`
  all: unset;
  font-size: 1.8rem;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

export default function EditRequestModal({ onClose, designerName, requestTitle, onAddRequest }) {
  const [message, setMessage] = useState("");
  const [requestText, setRequestText] = useState("");
  
  const handleSend = () => {
    if (!message.trim()) {
      alert("요청사항을 입력해주세요.");
      return;
    }

    // 새 요청 객체 생성
    const newRequest = {
      id: Date.now(),
      title: requestTitle,
      editRequest: message,
      date: new Date().toISOString().slice(0, 10),
    };

    // 상위 컴포넌트에 새 요청 전달
    onAddRequest(newRequest);

    alert(
      `${designerName} 디자이너님께서 "${requestTitle}" 의뢰에 대한 수정요청을 보내셨습니다.\n\n내용: ${message}`
    );

    onClose(); // 모달 닫기
  };

  const handleSubmit = () => {
  const newRequest = {
      id: Date.now(),
      title: requestTitle,
      editRequest: requestText,
      date: new Date().toISOString().slice(0, 10),
    };

    // 기존 데이터 불러오기
    const existing = JSON.parse(localStorage.getItem("editRequests") || "[]");
    localStorage.setItem("editRequests", JSON.stringify([newRequest, ...existing]));

    onClose(); // 모달 닫기
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "0.75rem",
          width: "400px",
          position: "relative",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        {/* X 버튼 */}
        <CloseButton onClick={onClose}>×</CloseButton>

        {/* 제목 */}
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          수정 요청사항 전달
        </h2>

        {/* 텍스트 박스 */}
        <textarea
          placeholder="요청사항을 작성해주세요."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            width: "90%",
            height: "120px",
            padding: "1rem",
            borderRadius: "0.5rem",
            border: "1px solid #ccc",
            resize: "none",
            fontSize: "1rem",
          }}
        />

        {/* 보내기 버튼 */}
        <button
          onClick={handleSend}
          style={{
            marginTop: "1rem",
            width: "100%",
            padding: "0.75rem",
            backgroundColor: "#799FC4",
            color: "#fff",
            border: "none",
            borderRadius: "0.5rem",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          보내기
        </button>
      </div>
    </div>
  );
}