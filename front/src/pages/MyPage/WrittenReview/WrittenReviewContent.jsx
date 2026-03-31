import { useState, useEffect } from 'react';
import "./WrittenReviewContent.css";
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
  height : 800px;
  max-width: 90%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;



export default function WrittenReviewContent() {
  const [contracts, setContracts] = useState([]);
  const [editingContractId, setEditingContractId] = useState(null);
  const [tempReviewContext, setTempReviewContext] = useState('');
  const [tempReviewStar, setTempReviewStar] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 표시 상태
  

// useEffect(() => {
//   axios.get("http://localhost:8081/client/contract")
//     .then((response) => {
//       console.log("받은 계약 데이터:", response.data);
//       const mappedContracts = response.data.map(contract => ({
//         id: contract.contractId,
//         starredStatus: false,
//         title: contract.contractTitle,
//         clientId: contract.clientId,
//         status: contract.status,
//         date: formatDate(contract.dueDate),
//         preview: contract.preview || "",
//       }));
      

//       setContracts(mappedContracts);
//     })
//     .catch((error) => {
//       console.error("계약 데이터 가져오기 실패:", error);
//     });
// }, []);

  // 테스트 데이터 하드코딩
  useEffect(() => {
    const mockContracts = [
      {
        contractId: 1,
        requestId: "2",
        designerId: "designer001",
        duedate: formatDate("2025-05-24"),
        requestFee: "10000",
        status: "완료",
        clientId: "가나다",
        contractTitle: "ㅁㅇㄴㄹ",
        isStarred: "null",
        finishDate: "2025-06-01",
        reviewStar: "☆☆☆☆☆",
        reviewContext: "리뷰 내용 1",
        image: "/image/기본이미지.png",
      },
      {
        contractId: 2,
        requestId: "3",
        designerId: "designer002",
        duedate: formatDate("2025-05-30"),
        requestFee: "10000",
        status: "완료",
        clientId: "asdfd",
        contractTitle: "하하하하",
        isStarred: "null",
        finishDate: "2025-06-02",
        reviewStar: "☆☆☆☆☆",
        reviewContext: "리뷰 내용 2",
        image: "/image/기본이미지.png",
      },
      {
        contractId: 3,
        requestId: "4",
        designerId: "designer003",
        duedate: formatDate("2025-05-01"),
        requestFee: "10000",
        status: "완료",
        clientId: "가나다라마바사",
        contractTitle: "ㅁㅇㄴㄹ",
        isStarred: "null",
        finishDate: "2025-06-03",
        reviewStar: "☆☆☆☆☆",
        reviewContext: "리뷰 내용 3",
        image: "/image/기본이미지.png",
      },
      {
        contractId: 4,
        requestId: "5",
        designerId: "designer005",
        duedate: formatDate("2025-05-02"),
        requestFee: "10000",
        status: "완료",
        clientId: "가나다",
        contractTitle: "완료된 계약만",
        isStarred: "true",
        finishDate: "2025-06-20",
        reviewStar: "☆☆☆☆☆",
        reviewContext: "리뷰내용",
        image: "/image/기본이미지.png",
      },
    ];

    setContracts(mockContracts);
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${year}.${month}.${day}`;
  };

  // 편집 시작
  const startEditing = (contract) => {
    setEditingContractId(contract.contractId);
    setTempReviewContext(contract.reviewContext || '');
    setTempReviewStar(contract.reviewStar ? contract.reviewStar.match(/☆/g)?.length || 0 : 0);
    setIsModalOpen(true); // 모달 열기
  };

  // 편집 저장
  const saveEdit = (contractId) => {
    const updatedContracts = contracts.map((contract) =>
      contract.contractId === contractId
        ? {
            ...contract,
            reviewContext: tempReviewContext,
            reviewStar: "☆".repeat(tempReviewStar),
          }
        : contract
    );
    setContracts(updatedContracts);
    setEditingContractId(null);
    setTempReviewContext('');
    setTempReviewStar(0);
    setIsModalOpen(false); // 모달 닫기
  };

  // 모달 닫기
  const closeModal = () => {
    setEditingContractId(null);
    setTempReviewContext('');
    setTempReviewStar(0);
    setIsModalOpen(false);
  };

  // 별 클릭 핸들러
  const handleStarClick = (starCount) => {
    setTempReviewStar(starCount);
  };

  // 완료된 계약만 필터링
  const completedContracts = contracts.filter((contract) => contract.status === "완료");

  // 현재 편집 중인 계약 객체 찾기
  const editingContract = contracts.find((contract) => contract.contractId === editingContractId);

  

  return (
    <div className="writtenreviewcontent-container">
      <div className="writtenreviewcontent-title">작성한 후기</div>
      <div className="writtenreviewcontent-itemcontainer">
        {completedContracts.length > 0 ? (
          completedContracts.map((contract) => (
            <div key={contract.contractId} className="writtenreviewcontent-item">
              <div className="writtenreviewcontent-topside">
                <div className="designer-image">
                  {contract.image ? (
                    <img
                      src={contract.image}
                      alt="Designer"
                      style={{ width: "80px", height: "80px", objectFit: "contain" }}
                    />
                  ) : (
                    <div style={{ width: "80px", height: "80px", backgroundColor: "#eee" }}>
                      이미지 없음
                    </div>
                  )}
                </div>
                
                <div className="designer-info">
                  <div style={{ color: "gray" }}>{contract.designerId}</div>
                  <div style={{ fontWeight: "bold", fontSize: "20px" }}>{contract.contractTitle}</div>
                  <div style={{ color: "gray" }}>{contract.requestFee} {contract.duedate}</div>
                </div>
                
              </div>
              <div className="writtenreviewcontent-bottomside">
                <>
                  <div className="reviewcontract-container">
                      <div className="reviewcontract-containertop">
                          <div class="datastar-container">
                              <div>{contract.finishDate || '미정'}</div>
                              <div>{contract.reviewStar || '별점 없음'}</div>
                          </div>
                          <div style={{justifyContent : "flex-end"}} className="reviewbutton-container">
                            <button onClick={() => startEditing(contract)} style={{ marginLeft: '10px' }}>편집</button>
                          </div>
                      </div>

                    <div className="reviewcontract-containerbottom">
                      {contract.image ? (
                        <img
                          src={contract.image}
                          alt="Designer"
                          style={{ width: "200px", height: "200px", objectFit: "contain" }}
                        />
                      ) : (
                        <div style={{ width: "80px", height: "80px", backgroundColor: "#eee" }}>
                          이미지 없음
                        </div>
                      )}
                      <div>{contract.reviewContext || '리뷰 없음'}</div>
                    </div>
                  </div>
                  
                </>
              </div>
            </div>
          ))
        ) : (
          <p>완료된 계약이 없습니다.</p>
        )}
      </div>

      {/* 모달 */}
      {isModalOpen && editingContractId && editingContract && (
        <ReviewModal>
          <ModalContent>
            <h2>리뷰 편집</h2>
             <div className="writtenreviewcontent-topside">
                <div className="designer-image">
                  {editingContract.image ? (
                    <img
                      src={editingContract.image}
                      alt="Designer"
                      style={{ width: "80px", height: "80px", objectFit: "contain" }}
                    />
                  ) : (
                    <div style={{ width: "80px", height: "80px", backgroundColor: "#eee" }}>
                      이미지 없음
                    </div>
                  )}
                </div>
                <div className="designer-info">
                  <div style={{ color: "gray" }}>{editingContract.designerId}</div>
                  <div style={{ fontWeight: "bold", fontSize: "20px" }}>{editingContract.contractTitle}</div>
                  <div style={{ color: "gray" }}>{editingContract.requestFee} {editingContract.duedate}</div>
                </div>
              </div>

                 <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => handleStarClick(star)}
                    style={{
                      cursor: 'pointer',
                      fontSize: '20px',
                      color: star <= tempReviewStar ? '#FFD700' : '#D3D3D3',
                      justifyContent : "center"
                      
                    }}
                  >
                    ☆
                  </span>
                ))}
              </div>

            <div className="edit-mode">
              <textarea
                value={tempReviewContext}
                onChange={(e) => setTempReviewContext(e.target.value)}
                placeholder="리뷰 내용을 입력하세요"
                rows={3}
                style={{ border : "1px solid #EBE5E5",borderRadius:"10px",  width: '90%', margin: '0 auto', height: "500px", backgroundColor : "#EBE5E5", padding : "10px"}}
              />
           
              </div>
              
              <div className="modalbutton-container">
                <button onClick={() => saveEdit(editingContractId)}>확인</button>
                <button onClick={closeModal} style={{ marginLeft: '5px' }}>취소</button>
              </div>
              
            
          </ModalContent>
        </ReviewModal>
      )}
    </div>
  );
}