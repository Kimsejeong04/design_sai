import React from "react";
import { useNavigate } from "react-router-dom";

const PortfolioPopup = ({ onClose }) => {
  const navigate = useNavigate();

  const handleStartPortfolio = () => {
    onClose();
    navigate("/designer/DMyPage");
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(200, 200, 200, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: "450px",
          height: "500px",
          backgroundColor: "#fff",
          border: "2px solid #888",
          boxSizing: "border-box",
          padding: "40px 30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "900",
            color: "#111",
            marginBottom: "30px",
            userSelect: "none",
            textAlign: "center",
            letterSpacing: "0.03em",
            textShadow: "0 1px 2px rgba(0,0,0,0.1)",
          }}
        >
          아직 포트폴리오를 <br/> 만드시지 않으셨나요?
        </h2>
        <p
          style={{
            fontSize: "17px",
            lineHeight: "1.8",
            color: "#333",
            flexGrow: 1,
            userSelect: "none",
            textAlign: "center",
            padding: "0 15px",
            letterSpacing: "0.02em",
          }}
        >
          포트폴리오를 등록하면 당신만의 개성과 작업물을 효과적으로 알릴 수 있습니다.<br />
          전문적인 프로필을 만들어 의뢰인과 클라이언트에게 신뢰를 쌓아보세요!<br />
          지금 바로 시작해보는 건 어떨까요?
        </p>

        <div style={{ display: "flex", gap: "10px", marginTop: "40px" }}>
          <button
            onClick={handleStartPortfolio}
            style={{
              width: "250px",
              padding: "14px 0",
              backgroundColor: "#007BFF",
              color: "white",
              fontSize: "18px",
              fontWeight: "700",
              border: "2px solid #0056b3",
              cursor: "pointer",
              userSelect: "none",
              outline: "none",
              borderRadius: "0",
              transition: "background-color 0.3s ease",
              boxShadow: "0 3px 6px rgba(0, 123, 255, 0.5)",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#007BFF")}
          >
            포트폴리오 시작하기
          </button>
          <button
            onClick={onClose}
            style={{
              width: "250px",
              padding: "14px 0",
              backgroundColor: "#f0f0f0",
              color: "#555",
              fontSize: "18px",
              fontWeight: "700",
              border: "2px solid #aaa",
              cursor: "pointer",
              userSelect: "none",
              outline: "none",
              borderRadius: "0",
              transition: "background-color 0.3s ease",
              boxShadow: "0 2px 4px rgba(170,170,170,0.4)",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#ddd")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPopup;
