import "./MyProgressContent.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ContractItem from "../../../components/contract/ContractItem/ContractItem";

const statusImages = {
  "디자인하기": "/image/대기중.png",
  "본뜨기": "/image/진행중.png",
  "마감하기": "/image/배송중.png",
  "포장하기": "/image/완료됨.png",
};

const allStatuses = ["디자인하기", "본뜨기", "마감하기", "포장하기"];

export default function MyProgressContent({ mode = "전체", username: propUsername,refreshFlag }) {
  const [username, setUsername] = useState(propUsername);
  const [contracts, setContracts] = useState([]);
  const [statusFilter, setStatusFilter] = useState("전체");
  const [searchTerm, setSearchTerm] = useState("");
  const [update, stepUpdated]= useState("")

  useEffect(() => {
  if (!username) return;
  fetchContracts();  
}, [username, stepUpdated]);  // ➋ stepUpdated가 바뀌면 다시 불러오기

async function fetchContracts() {
  try {
    const res = await axios.get(
      `http://localhost:8081/api/progress/client/contracts/${username}`
    );
    setContracts(res.data.map(/* 가공 */));
  } catch (err) {
    console.error("계약 데이터 가져오기 실패", err);
  }
}
  useEffect(() => {
    if (!propUsername) {
      const fetchSession = async () => {
        try {
          const res = await fetch("http://localhost:8081/api/user", {
            credentials: "include",
          });
          if (!res.ok) throw new Error("세션 없음");
          const data = await res.json();
          if (data.username) {
            setUsername(data.username);
          }
        } catch (err) {
          console.warn("세션 정보 없음:", err);
        }
      };
      fetchSession();
    }
  }, [propUsername]);

   // ➋ contracts 불러오는 함수
  async function fetchContracts() {
    try {
      const { data } = await axios.get(
        
        `http://localhost:8081/api/progress/client/contracts/${username}`
      );
      console.log("서버 응답이 배열", data);

      // data가 배열인지 확인
      if (!Array.isArray(data)) {
        console.error("서버 응답이 배열이 아닙니다:", data);
        return;
      }
      // 실제로 map에 콜백을 넘겨줘야 합니다
      const mapped = data.map((c) => ({
        id: c.contractId,
        title: c.contractTitle,
        step: c.step != null ? c.step : 0,
        status: allStatuses[c.step] || allStatuses[0],
        date: c.dueDate ? c.dueDate.split("-").join(".") : "",
        starredStatus: c.starredStatus === 1,
        preview: c.contractContent || "",
      }));
      setContracts(mapped);
    } catch (err) {
      console.error("계약 데이터 가져오기 실패", err);
    }
  }

  // ➌ username 또는 refreshFlag 바뀔 때마다 재조회
  useEffect(() => {
    if (username) {
      fetchContracts();
    }
  }, [username, refreshFlag]);
  
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${year}.${month}.${day}`;
  };

  const handleToggleStar = (contractId) => {
    const updatedContracts = contracts.map((contract) =>
      contract.id === contractId
        ? { ...contract, starredStatus: !contract.starredStatus }
        : contract
    );
    setContracts(updatedContracts);
  };

  const filteredContracts = contracts.filter((contract) => {
    const matchesStatus = statusFilter === "전체" || contract.status === statusFilter;
    const matchesSearch =
      (contract.title && contract.title.includes(searchTerm)) ||
      (contract.preview && contract.preview.includes(searchTerm));
    const matchesStar = mode === "중요" ? contract.starredStatus : true;
    return matchesStar && matchesStatus && matchesSearch;
  });

  return (
    <div>
      <div className="progress-container">
        <div className="progress-title"></div>
        <div className="progress-content">
          <div className="progress-contract">
            {filteredContracts.length > 0 ? (
              filteredContracts.map((contract) => (
                <div key={contract.id} className="contract-with-images">
                  <ContractItem
                    key={contract.contractId}
                    contract={contract}
                    onToggleStar={() => handleToggleStar(contract.contractId)}
                  />
                  <div className="status-image-container">
                    <div className="status-images">
                      {allStatuses.map((status, index) => {
                        const isActive = contract.step === index;
                        return (
                          <div key={status} className="status-item">
                            <img
                              src={statusImages[status]}
                              alt={`${status} 상태 이미지`}
                              className={`status-image ${
                                isActive ? "active" : "inactive"
                              }`}
                            />
                            <span className="status-text">{status}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-contracts-message">조건에 맞는 계약이 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
