import React from "react";
import styled from "styled-components";

export default function EditRequestViewModal({ onClose, requestTitle, editRequest, date }) {
  const CloseButton = styled.button`
    all: unset;
    font-size: 1.8rem;
    cursor: pointer;
    position: absolute;
    top: 1rem;
    right: 1rem;
  `;

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
        <CloseButton onClick={onClose}>×</CloseButton>

        <h2 style={{ textAlign: "center", marginBottom: "0.5rem" }}>
            내가 보낸 수정 요청
            </h2>
            <hr
            style={{
                width: "fit-content",
                maxWidth: "100%",
                margin: "0 auto 1rem auto",
                border: "none",
                borderTop: "2px solid #ccc",
            }}
            />

        <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>{requestTitle}</p>
        <p style={{ fontSize: "0.9rem", color: "#777", marginBottom: "1rem" }}>{date}</p>

        <div
          style={{
            width: "90%",
            minHeight: "120px",
            padding: "1rem",
            borderRadius: "0.5rem",
            border: "1px solid #ccc",
            fontSize: "1rem",
            backgroundColor: "#f9f9f9",
            whiteSpace: "pre-wrap",
          }}
        >
          {editRequest}
        </div>
      </div>
    </div>
  );
}
