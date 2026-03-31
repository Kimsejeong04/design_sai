import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";  // 추가
import ContractItem from "../ContractItem/ContractItem";
import ContractSearchAndFilter from "../ContractSearchAndFilter/ContractSearchAndFilter";
import "./ContractList.css";
import styled from 'styled-components';

const ReviewModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 600px;
  height : auto;
  max-width: 90%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
`;


const StarWrapper = styled.div`
  display: flex;
  gap: 10px;
  font-size: 32px;
`;

const Star = styled.span`
  cursor: pointer;
  color: ${({ filled }) => (filled ? "gold" : "lightgray")};
  transition: color 0.2s;
`;

const ContractList = ({ mode = "전체" }) => {
  const [contracts, setContracts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("전체");
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 표시 상태
  const [selectedContract, setSelectedContract] = useState(null);
  const [value, setValue] = useState("");
  const [rating, setRating] = useState(0); // 별점 상태 (0 ~ 5)



  const navigate = useNavigate();
    
  const handleChange = (e) => {
    setValue(e.target.value);
  };


useEffect(() => {

  
  axios.get("http://localhost:8081/client/contract")
    .then((response) => {
      console.log("받은 계약 데이터:", response.data);
      const mappedContracts = response.data.map(contract => ({
        id: contract.contractId,
        starredStatus: false,
        title: contract.contractTitle,
        clientId: contract.clientId,
        status: contract.status,
        date: formatDate(contract.dueDate),
        preview: contract.preview || "",
      }));
       const dummyData = [
        {
          id: "99",
          starredStatus: false,
          title: "완료용 계약 데이터",
          clientId: "dummy-client",
          status: "완료",
          date: "2025.01.01",
          preview: "이것은 예시 계약입니다.",
        }
      ];
      

      setContracts([...mappedContracts, ...dummyData]);
    })
    .catch((error) => {
      console.error("계약 데이터 가져오기 실패:", error);
    });
}, []);

  
// 5/20 병합 한 코드
// const id = localStorage.getItem("id");
//   useEffect(() => {
//     // 처음 컴포넌트 뜰 때 계약 데이터 가져오기
//     axios.get("http://localhost:8081/client/contract")
//       .then((response) => {
//         console.log("받은 계약 데이터:", response.data);
//         // 받아온 데이터 형태에 맞게 가공 (React에서 필요한 형태로)
//         const mappedContracts = response.data.map(contract => ({
//           id: contract.contractId,
//           starredStatus: false, // 별표 기본 false
//           title: contract.contractTitle, // 계약 제목 바로 넣기
//           clientId: contract.clientId,  // client_id → clientId
//           designerId: contract.designerId,
//           status: contract.status,
//           date: formatDate(contract.dueDate),
//           preview: contract.preview || "",  // preview가 없을 경우 빈 문자열로 기본 설정
//         }));

//         const filteredByLoginId = mappedContracts.filter(c => c.clientId === id);
//         setContracts(filteredByLoginId);
//       })
//       .catch((error) => {
//         console.error("계약 데이터 가져오기 실패:", error);
//       });
//   }, [id]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${year}.${month}.${day}`;
  };

  const handleClick = (contract) => {
    navigate(`/client/contract/${contract.id}`, { state: { contract } });
  };

  const handleToggleStar = (contractId) => {
    const updatedContracts = contracts.map((contract) => {
      if (contract.id === contractId) {
        return { ...contract, starredStatus: !contract.starredStatus };  // 해당 계약만 업데이트
      }
      return contract;
    });
    setContracts(updatedContracts);
  };
  

  const filteredContracts = contracts.filter((contract) => {
    const matchesStatus = statusFilter === "전체" || contract.status === statusFilter;
    
    // contract.title과 contract.preview가 null이나 undefined가 아닌 경우에만 includes 호출
    const matchesSearch =
      (contract.title && contract.title.includes(searchTerm)) || 
      (contract.preview && contract.preview.includes(searchTerm));
  
    const matchesStar = mode === "중요" ? contract.starredStatus : true;
  
    return matchesStar && matchesStatus && matchesSearch;
  });
const handleStatusChange = async (contractId, newStatus) => {
  try {
    // 서버에 status 업데이트 요청
    await axios.patch(`http://localhost:8081/client/contract/${contractId}`, {
      status: newStatus,
    });

    // 로컬 상태 업데이트
    const updatedContracts = contracts.map((contract) =>
      contract.id === contractId ? { ...contract, status: newStatus } : contract
    );
    setContracts(updatedContracts);
  } catch (error) {
    console.error("status 업데이트 실패:", error);
    alert("status 변경에 실패했습니다.");
  }
};
const openReviewModal = (contract) => {
  setSelectedContract(contract);
  setIsModalOpen(true);
};


  const closeReviewModal = () => {
    setIsModalOpen(false);
    setSelectedContract(null);
  };

  
  
  // 리뷰저장 버튼 핸들러 
  const handleSubmitReview = async () => {
  
    alert("리뷰가 저장되었습니다!");
    closeReviewModal();
 
};

const handleStarClick = (star) => {
  // 현재 클릭한 별이 이미 선택된 별이면 → 0으로 초기화
  if (rating === star) {
    setRating(0);
  } else {
    setRating(star);
  }
};

  return (
    <div>
      <ContractSearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center", // 가로 가운데 정렬
          alignItems: "center",     // 세로 가운데 정렬
          flexDirection: "column",  // 자식들을 세로로 나열
          width: "100%",
        }}
      >
        {filteredContracts.length > 0 ? (
          filteredContracts.map((contract) => (
            <div
              key={contract.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1px",
                width: "800px", // 리스트 아이템 고정 너비
                marginBottom: "5px",
                flexShrink: 0,
              }}
            >
              <ContractItem
                contract={contract}
                onToggleStar={() => handleToggleStar(contract.id)}
                onClick={() => handleClick(contract)}
                onStatusChange={handleStatusChange}
                style={{ flexGrow: 1, margin: 0, padding: 15 }}
              />
              {contract.status === "완료" && (
                <button
                  style={{
                    padding: "6px 10px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    height: "105px",
                    margin: 0,
                    border: "none",
                    flexShrink: 0,
                  }}
                  onClick={() => openReviewModal(contract)}
                >
                  계약<br />종료
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="no-contracts-message">조건에 맞는 계약이 없습니다.</p>
        )}
      </div>
      
      {isModalOpen && selectedContract && (
  <ReviewModal onClick={closeReviewModal}>
    <ModalContent onClick={(e) => e.stopPropagation()}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center", 
          gap: "8px",     
          padding: "20px",
        }}
        className="contractlist-modal"
      >
        <h2 style={{ margin: 0 }}>{selectedContract.title}</h2>
        <p style={{ margin: 0 }}>계약 상태: {selectedContract.status}</p>
        <p style={{ margin: 0 }}>만료일: {selectedContract.date}</p>
        <p style={{ margin: 0 }}>미리보기: {selectedContract.preview}</p>

        <StarWrapper>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              filled={star <= rating}
              onClick={() => handleStarClick(star)}
            >
              ★
            </Star>
          ))}
        </StarWrapper>

        <textarea
          style={{
            width: "80%",
            height: "300px",
            resize: "none",
            borderRadius: "12px",
            border: "2px solid rgba(16, 133, 249, 0.5)",
            fontSize: "16px", 
            padding: "10px",
            fontWeight: "normal", 
          }}
          value={value}
          onChange={handleChange}
        />

        <div
          className="contractlist-buttoncontainer"
          style={{
            display: "flex",
            justifyContent: "flex-end", 
            width: "80%",
            marginTop: "12px",
            gap: "8px", 
          }}
        >
          <button style={{ width: "100px" }} onClick={closeReviewModal}>
            닫기
          </button>
          <button style={{ width: "100px" }} onClick={handleSubmitReview}>
            저장
          </button>
        </div>
      </div>
    </ModalContent>
  </ReviewModal>
)}
    </div>
  );
};

export default ContractList;
