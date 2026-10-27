import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ContractItem from "../ContractItem/ContractItem";
import ContractSearchAndFilter from "../ContractSearchAndFilter/ContractSearchAndFilter";
import "./ContractList.css";

const ContractList = ({ mode = "전체" }) => {
  const [contracts, setContracts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("전체");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [value, setValue] = useState("");
  const [rating, setRating] = useState(0);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${year}.${month}.${day}`;
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/client/contract")
      .then((response) => {
        console.log("받은 계약 데이터:", response.data);
        const mappedContracts = response.data.map((contract) => ({
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
          },
        ];

        setContracts([...mappedContracts, ...dummyData]);
      })
      .catch((error) => {
        console.error("계약 데이터 가져오기 실패:", error);
      });
  }, []);

  const handleClick = (contract) => {
    navigate(`/client/contract/${contract.id}`, { state: { contract } });
  };

  const handleToggleStar = (contractId) => {
    const updatedContracts = contracts.map((contract) => {
      if (contract.id === contractId) {
        return { ...contract, starredStatus: !contract.starredStatus };
      }
      return contract;
    });
    setContracts(updatedContracts);
  };

  const filteredContracts = contracts.filter((contract) => {
    const matchesStatus =
      statusFilter === "전체" || contract.status === statusFilter;

    const matchesSearch =
      (contract.title && contract.title.includes(searchTerm)) ||
      (contract.preview && contract.preview.includes(searchTerm));

    const matchesStar = mode === "중요" ? contract.starredStatus : true;

    return matchesStar && matchesStatus && matchesSearch;
  });

  const handleStatusChange = async (contractId, newStatus) => {
    try {
      await axios.patch(`http://localhost:8081/client/contract/${contractId}`, {
        status: newStatus,
      });

      const updatedContracts = contracts.map((contract) =>
        contract.id === contractId
          ? { ...contract, status: newStatus }
          : contract
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
    if (rating === star) {
      setRating(0);
    } else {
      setRating(star);
    }
  };

  return (
    <div className="cl-wrap">
      <ContractSearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <div className="cl-list">
        {filteredContracts.length > 0 ? (
          filteredContracts.map((contract) => (
            <div key={contract.id} className="cl-row">
              <div className="cl-item">
                <ContractItem
                  contract={contract}
                  onToggleStar={() => handleToggleStar(contract.id)}
                  onClick={() => handleClick(contract)}
                  onStatusChange={handleStatusChange}
                  style={{ flexGrow: 1, margin: 0, padding: 15, minWidth: 0 }}
                />
              </div>
              {contract.status === "완료" && (
                <button
                  type="button"
                  className="cl-end-btn"
                  onClick={() => openReviewModal(contract)}
                >
                  계약
                  <br />
                  종료
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="no-contracts-message">조건에 맞는 계약이 없습니다.</p>
        )}
      </div>

      {isModalOpen && selectedContract && (
        <div className="cl-overlay" onClick={closeReviewModal}>
          <div
            className="cl-modal"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedContract.title}</h2>
            <div className="cl-modal-info">
              <p>계약 상태 <strong>{selectedContract.status}</strong></p>
              <p>만료일 <strong>{selectedContract.date}</strong></p>
              {selectedContract.preview && (
                <p>미리보기 <strong>{selectedContract.preview}</strong></p>
              )}
            </div>

            <div className="cl-stars" aria-label="별점">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`cl-star${star <= rating ? " on" : ""}`}
                  onClick={() => handleStarClick(star)}
                >
                  ★
                </span>
              ))}
            </div>

            <textarea
              className="cl-textarea"
              placeholder="후기를 남겨주세요."
              value={value}
              onChange={handleChange}
            />

            <div className="cl-modal-actions">
              <button
                type="button"
                className="cl-btn cl-btn-ghost"
                onClick={closeReviewModal}
              >
                닫기
              </button>
              <button
                type="button"
                className="cl-btn cl-btn-primary"
                onClick={handleSubmitReview}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractList;