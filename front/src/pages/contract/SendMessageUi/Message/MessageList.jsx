// MessageList.jsx
import React, { useState, useEffect } from "react";
import Message from "./Message";
import "./MessageList.css";

export default function MessageList({ excludeContractId }) {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    // 하드코딩된 계약 데이터 (3개로 확장)
    const contractData = [
      { id: "1", title: "디자인 계약서 1", preview: "3페이지 분량 / 클라이언트 서명 완료", status: "진행중", date: "2025.04.11" },
      { id: "2", title: "위탁계약서", preview: "초안 전달 / 검토 중", status: "완료", date: "2025.04.05" },
      { id: "3", title: "프로젝트 계약서", preview: "계약 해지 요청 / 내용 확인 필요", status: "해지", date: "2025.03.30" },
    ];
    // 현재 표시 중인 계약을 제외한 리스트 생성
    const filteredContracts = contractData.filter((contract) => contract.id !== excludeContractId);
    setContracts(filteredContracts);
  }, [excludeContractId]);

  return (
    <div className="message-list-container">
      <h3>다른 계약 메시지</h3>
      {contracts.length > 0 ? (
        contracts.map((contract) => (
          <Message key={contract.id} contract={contract} />
        ))
      ) : (
        <p>다른 메시지가 없습니다.</p>
      )}
    </div>
  );
}