import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";  // useNavigate 추가
import "./OngoingContract.css";

const OngoingContract = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // 추가

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await axios.get("http://localhost:8081/client/contract");

        // 필요한 데이터로 매핑
        const mappedContracts = response.data.map((contract) => ({
          id: contract.contractId,
          title: contract.contractTitle,
          preview: contract.preview || "(미리보기 없음)",
        }));

        setContracts(mappedContracts.slice(0, 3)); // 3개만 저장
      } catch (error) {
        console.error("계약 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, []);

  if (loading) return <p>불러오는 중...</p>;

  if (contracts.length === 0) {
    return <p className="no-contract">아직 계약이 없습니다.</p>;
  }

  // 자세히 보기 클릭 시 이동 함수
  const handleDetailClick = (id) => {
    navigate(`/client/contract/${id}`);
  };

  return (
    <>
      {contracts.map((selectedContract) => (
        <div key={selectedContract.id} className="GoingContent">
          <h3 className="GoingContent-title">{selectedContract.title}</h3>
          <p
            className={`GoingContent-text ${
              !selectedContract.preview || selectedContract.preview === "(미리보기 없음)"
                ? "no-preview"
                : ""
            }`}
          >
            {selectedContract.preview && selectedContract.preview !== "(미리보기 없음)"
              ? selectedContract.preview
              : "미리보기가 준비 중입니다."}
          </p>
          {/* Link 대신 onClick으로 navigate 사용 */}
          <button
            className="GoingContent-btn"
            onClick={() => handleDetailClick(selectedContract.id)}
          >
            자세히 보기
          </button>
        </div>
      ))}
    </>
  );
};

export default OngoingContract;
