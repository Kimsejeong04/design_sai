// DeliveryRegister.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const statusList = [
  { key: "pending", label: "대기중" },
  { key: "shipping", label: "배송중" },
  { key: "inProgress", label: "진행중" },
  { key: "completed", label: "완료" },
];

// 상태별 원 색상 지정
const statusColors = {
  pending: "#bbb",
  shipping: "#007BFF",
  inProgress: "#FFA500",
  completed: "#28a745",
};

const carriers = ["CJ대한통운", "한진택배", "롯데택배", "로젠택배", "우체국택배", "CU 편의점 택배", "GS Postbox 택배", "직접배송"];

const DeliveryRegister = () => {
  const { contractId } = useParams();
  const navigate = useNavigate();

  const [trackingNumber, setTrackingNumber] = useState("");
  const [carrier, setCarrier] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [status, setStatus] = useState("pending"); // 진행 상태 기본 대기중

  // 현재 날짜 문자열(yyyy-mm-dd) 생성 (왼쪽 상단에 보여줄 용도)
  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("배송 등록 정보:", {
      contractId,
      trackingNumber,
      carrier,
      deliveryDate,
      status,
    });
    alert("배송 등록이 완료되었습니다.");
    navigate("/designer/Delivery"); // 필요에 따라 변경
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "40px auto",
        padding: 20,
        borderRadius: 12,
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        fontFamily: "Noto Sans KR, sans-serif",
      }}
    >
      {/* 1. 제목 */}
      <h2 style={{ marginBottom: 30, fontWeight: "bold", fontSize: 24 }}>
        배송등록
      </h2>

      {/* 3. 왼쪽 상단 날짜 (크게) */}
      <div
        style={{
          fontSize: 20,
          fontWeight: "600",
          color: "#333",
          marginBottom: 25,
        }}
      >
        {today}
      </div>

      {/* 3단으로 나누기 */}
      {/* 1단: 디자인 사진 + 주문자명 */}
      <section
        style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 30,
            gap: 20,
        }}
        >
        <div
            style={{
            width: 110,
            height: 110,
            borderRadius: 12,
            backgroundColor: "#eee",
            backgroundImage: `url('/image/DesignerPortfolio/포트폴리오1.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontSize: 14, color: "#888" }}>
            주문자명 <span style={{ color: "#333", fontWeight: "600" }}></span>
            </div>
            <div style={{ fontSize: 16, fontWeight: "600", color: "#333" }}>
            주문상품명
            </div>
            <div style={{ fontSize: 14, color: "#888" }}>
            총주문금액 / 희망기한{" "}
            <span style={{ color: "#333", fontWeight: "500" }}></span>
            </div>
        </div>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid #eee", marginBottom: 30 }} />

      {/* 2단: 배송상품 주문상태 안내 */}
      <section style={{ marginBottom: 30 }}>
        <div
          style={{
            fontWeight: "700",
            fontSize: 16,
            marginBottom: 12,
            color: "#333",
          }}
        >
          배송상품 주문상태 안내
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
          }}
        >
          {statusList.map(({ key, label }) => (
            <div
              key={key}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: 1,
                color: key === status ? statusColors[key] : "#999",
                fontWeight: key === status ? "700" : "400",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  border: `2px solid ${
                    key === status ? statusColors[key] : "#ccc"
                  }`,
                  backgroundColor: key === status ? statusColors[key] : "transparent",
                  marginBottom: 6,
                  transition: "all 0.3s ease",
                }}
              />
              <div style={{ fontSize: 14 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      <hr style={{ border: "none", borderTop: "1px solid #eee", marginBottom: 30 }} />

      {/* 3단: 진행상태 드롭다운, 택배사 드롭다운, 운송장번호 텍스트 */}
      <form onSubmit={handleSubmit}>
        <section style={{ marginBottom: 30 }}>
          <label
            htmlFor="statusSelect"
            style={{ display: "block", marginBottom: 8, fontWeight: "600" }}
          >
            진행상태
          </label>
          <select
            id="statusSelect"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              fontSize: 16,
              borderRadius: 6,
              border: "1px solid #ccc",
              marginBottom: 20,
              boxSizing: "border-box",
            }}
          >
            {statusList.map(({ key, label }) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>

          <label
            htmlFor="carrierSelect"
            style={{ display: "block", marginBottom: 8, fontWeight: "600" }}
          >
            택배사
          </label>
          <select
            id="carrierSelect"
            value={carrier}
            onChange={(e) => setCarrier(e.target.value)}
            required
            style={{
              width: "100%",
              padding: 10,
              fontSize: 16,
              borderRadius: 6,
              border: "1px solid #ccc",
              marginBottom: 20,
              boxSizing: "border-box",
            }}
          >
            <option value="">택배사 선택</option>
            {carriers.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>

          <label
            htmlFor="trackingNumber"
            style={{ display: "block", marginBottom: 8, fontWeight: "600" }}
          >
            운송장 번호
          </label>
          <input
            id="trackingNumber"
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            required
            placeholder="운송장 번호를 입력하세요"
            style={{
              width: "100%",
              padding: 10,
              fontSize: 16,
              borderRadius: 6,
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />
        </section>

        {/* 5단: 저장, 취소 버튼 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <button
            type="submit"
            style={{
              flex: 1,
              backgroundColor: "#A3C4D9",
              color: "#fff",
              padding: "12px 0",
              borderRadius: 8,
              border: "none",
              fontWeight: "700",
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            저장
          </button>
          <button
            type="button"
            onClick={handleCancel}
            style={{
              flex: 1,
              backgroundColor: "#ccc",
              color: "#333",
              padding: "12px 0",
              borderRadius: 8,
              border: "none",
              fontWeight: "700",
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeliveryRegister;
