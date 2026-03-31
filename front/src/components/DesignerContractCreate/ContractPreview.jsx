import React, { forwardRef } from "react";

// 미리보기 컴포넌트 (forwardRef로 ReactToPrint와 연동 가능)
const ContractPreview = forwardRef(({ contractData, deliverables, contentBySection, onClose }, ref) => {
  const today = new Date().toLocaleDateString();

  const SECTION_LABELS = {
    basic: "기본",
    copyright: "저작권",
    cancellation: "취소",
    security: "보안",
    dispute: "분쟁",
    etc: "기타",
};

  return (
    <div
      ref={ref}
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        color: "#333",
        maxWidth: "1000px",  // 더 넓게
        width: "95vw",       // 화면 너비 기준으로 꽉 차게
        overflowX: "hidden", // 가로 스크롤 방지
        margin: "0 auto",
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        style={{
          float: "right",
          marginBottom: "1rem",
          background: "#ccc",
          border: "none",
          padding: "6px 12px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        닫기
      </button>

      <h2 style={{ borderBottom: "2px solid #799FC4", paddingBottom: "0.5rem", clear: "both" }}>
        계약서 미리보기
      </h2>

      <p><strong>의뢰제목:</strong> {contractData.contractTitle || "미입력"}</p>
      <p><strong>계약인 (의뢰인):</strong> {contractData.clientId || "미입력"}</p>
      <p><strong>계약 기간:</strong> {contractData.startDate || "미입력"} ~ {contractData.endDate || "미입력"}</p>
      <p><strong>계약금:</strong> {contractData.requestFee ? `${contractData.requestFee} 원` : "미입력"}</p>
      <p><strong>카테고리:</strong> {deliverables.length > 0 ? deliverables.join(", ") : "미선택"}</p>

      <div style={{ marginTop: "1.5rem" }}>
        <strong>계약서 항목:</strong>
        {Object.entries(contentBySection)
          .filter(([section]) => section === "contractContentBySection")
          .map(([_, text]) =>
            typeof text === "object" ? (
              Object.entries(text).map(([subKey, subText]) => (
                <div
                  key={subKey}
                  style={{
                    marginTop: "1.5rem", // ✅ 문단 간 간격
                    padding: "10px 14px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    backgroundColor: "#fdfdfd",
                  }}
                >
                  <h4 style={{
                    marginBottom: "0.6rem",
                    borderBottom: "1px solid #ddd",
                    paddingBottom: "4px",
                    fontWeight: "bold"
                  }}>
                    {SECTION_LABELS[subKey] || subKey}
                  </h4>
                  <p style={{ whiteSpace: "pre-wrap", margin: 0 }}>{subText}</p>
                </div>
              ))
            ) : (
              <p>{text}</p> // 혹시나 string일 경우 대비
            )
          )}
      </div>

      <p style={{ marginTop: "2rem" }}><strong>서명:</strong> {contractData.signature || "미입력"}</p>

      <p style={{ textAlign: "right", marginTop: "3rem", fontSize: "0.85rem", color: "#999" }}>
        작성일: {today}
      </p>
    </div>
  );
});

export default ContractPreview;