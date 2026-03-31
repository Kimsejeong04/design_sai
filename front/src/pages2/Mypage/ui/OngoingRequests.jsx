import React, { useEffect, useState } from "react";
import ProgressModal from "./ProgressModal";
import EditRequestModal from "./EditRequestModal";
import axios from "axios";

export default function OngoingRequests() {
  const [contracts, setContracts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("전체");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);

  useEffect(() => {
    const loadContracts = async () => {
      try {
        const response = await axios.get("http://localhost:8081/client/contract");
        console.log("받은 계약 데이터:", response.data);
        setContracts(response.data);
      } catch (error) {
        console.error("계약 데이터를 불러오는 중 오류 발생:", error);
      }
    };
    loadContracts();
  }, []);

  const filteredContracts = contracts.filter((contract) => {
    if (search && !contract.requestTitle?.includes(search)) return false;

    if (!contract.dueDate) {
      console.warn("Invalid dueDate for contract:", contract);
      return false;
    }

    const now = new Date();
    const contractDate = new Date(contract.dueDate);

    if (isNaN(contractDate)) {
      console.warn("Invalid dueDate format for contract:", contract.dueDate);
      return false;
    }

    if (filter === "1개월") {
      const oneMonthAgo = new Date(now);
      oneMonthAgo.setMonth(now.getMonth() - 1);
      return contractDate >= oneMonthAgo;
    }
    if (filter === "2개월") {
      const twoMonthsAgo = new Date(now);
      twoMonthsAgo.setMonth(now.getMonth() - 2);
      return contractDate >= twoMonthsAgo;
    }
    if (filter === "3개월") {
      const threeMonthsAgo = new Date(now);
      threeMonthsAgo.setMonth(now.getMonth() - 3);
      return contractDate >= threeMonthsAgo;
    }

    return true;
  });

  return (
    <div style={{ padding: "1rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "1.5rem" }}>진행중인 의뢰내역</h1>

      {/* 검색 + 필터 */}
      <div style={{ marginBottom: "1.5rem", display: "flex", gap: "1rem" }}>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, padding: "0.5rem 1rem", fontSize: "1rem" }}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: "0.5rem 1rem", fontSize: "1rem" }}
        >
          <option value="전체">전체</option>
          <option value="1개월">1개월</option>
          <option value="2개월">2개월</option>
          <option value="3개월">3개월</option>
        </select>
      </div>

      {/* 계약서 리스트 */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredContracts.map((contract) => (
          <li
            key={contract.id}
            style={{
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "0.5rem",
              padding: "1rem",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
              <span
                role="img"
                aria-label="edit"
                style={{ fontSize: "1.5rem", cursor: "pointer" }}
                onClick={() => alert("연필 아이콘 클릭 - 수정 기능 예정")}
              >
                ✏️
              </span>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                  {contract.contractTitle}
                </div>
                <div style={{ color: "#666", fontSize: "0.9rem" }}>
                  {contract.dueDate}
                </div>
              </div>
            </div>

            {/* 오른쪽 버튼들 */}
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <div>
                <button
                  style={{
                    backgroundColor: "#799FC4",
                    color: "white",
                    border: "none",
                    borderRadius: "0.3rem",
                    padding: "0.5rem 1rem",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSelectedContract(contract);
                    setShowModal(true);
                  }}
                >
                  진행도 등록
                </button>
              </div>

              <button
                style={{
                  backgroundColor: "#4a6171",
                  color: "white",
                  border: "none",
                  borderRadius: "0.3rem",
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSelectedContract(contract);
                  setShowEditModal(true);
                }}
              >
                수정 요청사항 전달
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* 진행도 등록 모달 */}
      {showModal && selectedContract && (
        <ProgressModal
          onClose={() => {
            setShowModal(false);
            setSelectedContract(null);
          }}
          contract={selectedContract}
          initialStep={selectedContract.step || 0} // step 데이터가 없으면 기본값 0
          onStepUpdated={(updatedStep) => {
            const updatedContracts = contracts.map((c) =>
              c.id === selectedContract.id ? { ...c, step: updatedStep } : c
            );
            setContracts(updatedContracts);
          }}
        />
      )}

      {/* 수정 요청사항 모달 */}
      {showEditModal && selectedContract && (
        <EditRequestModal
          onClose={() => {
            setShowEditModal(false);
            setSelectedContract(null);
          }}
          designerName="윤디" // 예시 이름 (로그인 사용자로 교체 가능)
          requestTitle={selectedContract.contractTitle}
        />
      )}
    </div>
  );
}
