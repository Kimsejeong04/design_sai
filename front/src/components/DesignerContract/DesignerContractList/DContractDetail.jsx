import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DContractDetail = () => {
  const { roomId } = useParams();
  const [contract, setContract] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8081/designer/contract/${roomId}`)
      .then(res => {
        setContract(res.data);
      })
      .catch(err => {
        console.error("계약 상세 정보 불러오기 실패:", err);
      });
  }, [roomId]);

  if (!contract) return <div>로딩 중...</div>;

  return (
    <div>
      <h2>계약 상세 정보</h2>
      <p>계약명: {contract.contractTitle}</p>
      <p>상태: {contract.status}</p>
      <p>계약 기간: {contract.dueDate}</p>
      {/* 필요한 상세 정보들 출력 */}
    </div>
  );
};

export default DContractDetail;