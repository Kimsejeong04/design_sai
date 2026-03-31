import React, { useEffect, useState } from "react";
import EditRequestViewModal from "../ui/EditRequestViewModal";
import EditRequestModal from "./EditRequestModal";

// 예시용 비동기 데이터 함수 (실제로는 API 요청으로 교체 예정)
const fetchEditRequests = async () => {
  return [
    {
      id: 1,
      title: "디자인 작업 의뢰서 #1",
      editRequest: `안녕하세요, 전달드린 로고 시안 중 파란색 계열이 너무 강해서 부드러운 파스텔 톤으로 조정해 주셨으면 합니다. 
가능하다면 흰 배경에서도 잘 보이도록 대비도 고려해주세요.`,
      date: "2025-05-05",
    },
    {
      id: 2,
      title: "로고 제작 의뢰서 #2",
      editRequest: `로고에 사용된 글꼴 크기가 모바일에서는 다소 작게 느껴집니다. 
폰트 크기를 조금 키우거나, 반응형으로 글자 크기를 조절하는 방향을 제안드립니다.`,
      date: "2025-04-22",
    },
  ];
};

export default function EditRequests() {
  const [contracts, setContracts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("전체");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

    // 새 요청 추가 함수 - contracts 상태 업데이트
    const handleAddRequest = (newRequest) => {
    setContracts((prev) => {
      const updated = [newRequest, ...prev];
      localStorage.setItem("editRequests", JSON.stringify(updated));
      return updated;
    });
  };

  const filteredContracts = contracts.filter((contract) => {
    if (search && !contract.title.includes(search)) return false;

    const now = new Date();
    const contractDate = new Date(contract.date);

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

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("editRequests") || "[]");
    setContracts(stored);

    const loadRequests = async () => {
      try {
        const data = await fetchEditRequests();
        setContracts(data);
        localStorage.setItem("editRequests", JSON.stringify(data));
      } catch (error) {
        console.error("데이터를 불러오는 데 실패했습니다", error);
      }
    };

    loadRequests();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setContracts((prev) => prev.filter((req) => req.id !== id));
    }
  };

  const handleClickRequest = (req) => {
    setSelectedRequest(req); // 모달 띄우기
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "1.5rem" }}>내가 보낸 수정 요청사항</h1>

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

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredContracts.map((req) => (
          <li
            key={req.id}
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
              cursor: "pointer",
            }}
            onClick={() => handleClickRequest(req)} // 클릭 시 모달 열기
          >
            <div>
              <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                {req.title}
              </div>
              <div
                style={{ color: "#333", fontSize: "1rem", marginTop: "0.3rem" }}
              >
                {req.editRequest.slice(0, 30)}...
              </div>
              <div
                style={{ color: "#666", fontSize: "0.9rem", marginTop: "0.2rem" }}
              >
                {req.date}
              </div>
            </div>

            <span
              role="button"
              aria-label="삭제"
              style={{ fontSize: "1.5rem", cursor: "pointer", color: "#c00" }}
              onClick={(e) => {
                e.stopPropagation(); // 삭제 클릭 시 모달 안 열리게
                handleDelete(req.id);
              }}
              title="삭제"
            >
              🗑️
            </span>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <EditRequestModal
          onClose={() => setIsModalOpen(false)}
          designerName="홍길동" // 적절히 변경하세요
          requestTitle="디자인 작업 의뢰서 #3" // 적절히 변경하거나 prop으로 전달
          onAddRequest={handleAddRequest} // 새 요청 추가 콜백
        />
      )}

      {/* ✨ 모달 렌더링 */}
      {selectedRequest && (
        <EditRequestViewModal
          requestTitle={selectedRequest.title}
          editRequest={selectedRequest.editRequest}
          date={selectedRequest.date}
          onClose={() => setSelectedRequest(null)}
        />
      )}
    </div>
  );
}