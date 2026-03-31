// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Message.css";

// // localStorage의 'dratfRequest' 데이터를 읽어 렌더링하는 컴포넌트
// export default function Message() {
//   const navigate = useNavigate();
//   const [messageDetail, setMessageDetail] = useState(null);

//   useEffect(() => {
//     // 1) 로컬스토리지에서 'dratfRequest' 키로 저장된 JSON 문자열을 가져온다
//     const raw = localStorage.getItem("dratfRequest");
//     if (!raw) return;

//     try {
//       // 2) JSON 파싱
//       const { contractMessage } = JSON.parse(raw);
//       // 3) contractMessage 객체를 state에 저장
//       setMessageDetail(contractMessage);
//       // (선택) 사용 후 한 번만 읽었다면 삭제
//       // localStorage.removeItem("dratfRequest");
//     } catch (e) {
//       console.error("dratfRequest 파싱 오류:", e);
//     }
//   }, []);

//   // 데이터가 없으면 안내 메시지
//   if (!messageDetail) {
//     return (
//       <div className="message-container">
//         메시지 정보를 찾을 수 없습니다.
//       </div>
//     );
//   }

//   // messageDetail에서 필요한 값 추출
//   const { id, content, time, contract } = messageDetail;

//   const handleClick = () => {
//     // 상세 페이지로 이동
//     navigate(`/client/contract/MessageDetailpage/${id}`);
//   };

//   return (
//     <div className="message-container" onClick={handleClick}>
//       <div className="contract-title">{contract.contractTitle}</div>
//       <div className="design-name">{contract.designerid || "디자이너 없음"}</div>
//       <div className="contract-detail">{content || "보낸 메시지 미리보기"}</div>
//       <div className="contract-date">{time || contract.date || "날짜 없음"}</div>
//     </div>
//   );
// }

import React from "react";
import { useNavigate } from "react-router-dom";
import "./Message.css";

export default function Message({ id, contract, content, time, designer }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/client/contract/MessageDetailpage/${id}`);
  };

  return (
    <div className="message-container" onClick={handleClick}>
      <div className="contract-title">{contract || "계약 정보 없음"}</div>
       <div className="design-name">{designer || "디자이너 정보 없음"}</div>
      <div className="contract-detail">{content || "보낸 메시지 미리보기"}</div>
      <div className="contract-date">{time || "날짜 없음"}</div>
    </div>
  );
}