// import React, { useState, useEffect } from "react";
// import { FaStar, FaRegStar, FaChevronDown, FaChevronUp } from "react-icons/fa";
// import share from '../../../assets/share.png';
// import print from '../../../assets/print.png';


// export default function MessageDetail({ onToggleStar }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [detail, setDetail] = useState(null);

//   useEffect(() => {
//     // 로컬스토리지에서 드래프트 요청 데이터를 읽어옵니다
//     const raw = localStorage.getItem("dratfRequest");
//     if (!raw) return;
//     try {
//       const { contractMessage } = JSON.parse(raw);
//       setDetail(contractMessage);
//       // 한 번 읽고 나서 삭제하려면 아래 주석 해제
//       // localStorage.removeItem("dratfRequest");
//     } catch (e) {
//       console.error("dratfRequest 파싱 오류:", e);
//     }
//   }, []);

//   if (!detail) {
//     return <div className="message-detail-container">메시지 정보를 찾을 수 없습니다.</div>;
//   }

//   const { contract, content, time, id } = detail;
//   const toggleOpen = () => setIsOpen(prev => !prev);

//   return (
//     <div className="Detailcontainer">
//       <div className="Detailtitle">
//         <span>보낸 메시지</span>
//       </div>

//       <div className="HeaderContainer">
//         <div className="DetailHeaderContainer">
//           <div className="DetailHeader">
//             <span
//               style={{ cursor: 'pointer', marginLeft: '10px' }}
//               onClick={() => onToggleStar && onToggleStar(detail)}
//             >
//               {contract.isStarred ? <FaStar color="#FFD700" /> : <FaRegStar />}
//             </span>
//             <span>계약 이름: {contract.title}</span>
//             <div className="SharePrint">
//               <button>공유</button>
//               <img src={share} alt="공유 아이콘" />
//               <button>인쇄</button>
//               <img src={print} alt="인쇄 아이콘" />
//             </div>
//           </div>
//         </div>

//         <div className="TitleContent">
//           <p>보낸사람: {contract.sender || "미지정"}</p>
//           <p>받는사람: {contract.recipient || "미지정"}</p>
//           <p style={{ fontSize: '12px' }}>{time}</p>
//         </div>
//       </div>

//       <button
//         onClick={toggleOpen}
//         style={{
//           background: 'none',
//           border: 'none',
//           cursor: 'pointer',
//           display: 'flex',
//           alignItems: 'center',
//           gap: '8px',
//           marginTop: '10px'
//         }}
//       >
//         {isOpen ? <FaChevronUp size={24} color="#333" /> : <FaChevronDown size={24} color="#333" />}
//         <p>계약내용 보기</p>
//       </button>

//       {isOpen && (
//         <div
//           className="DetailContent"
//           style={{
//             marginTop: '20px',
//             padding: '10px',
//             border: '1px solid #ddd',
//             borderRadius: '8px',
//             height: '400px',
//             overflowY: 'auto'
//           }}
//         >
//           <p>{contract.content || '상세 계약 내용입니다'}</p>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaStar, FaRegStar, FaChevronDown, FaChevronUp } from "react-icons/fa";
import share from '../../../assets/share.png';
import print from '../../../assets/print.png';

export default function MessageDetail({ onToggleStar }) {
  const { id } = useParams();  // URL에서 메시지 id 받기
  const [isOpen, setIsOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      console.warn("메시지 ID가 없습니다.");
      return;
    }

    setLoading(true);
    axios.get(`http://localhost:8081/api/request-messages/${id}`)
      .then(res => {
        console.log("✅ 응답 데이터:", res.data); // 응답 데이터 구조 확인
        setDetail(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ 메시지 상세 조회 실패:", err);
        setError("메시지를 불러오는 데 실패했습니다.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="message-detail-container">로딩 중...</div>;
  if (error) return <div className="message-detail-container">{error}</div>;
  if (!detail) return <div className="message-detail-container">메시지 정보를 찾을 수 없습니다.</div>;

  // contract 대신 detail에서 바로 필요한 값 꺼내기
  const {
    isStarred,
    contractTitle,
    clientId,
    designerId,
    content,
    time,
  } = detail;

  const toggleOpen = () => setIsOpen(prev => !prev);

  return (
    <div className="Detailcontainer">
      <div className="Detailtitle">
        <span>보낸 메시지</span>
      </div>

      <div className="HeaderContainer">
        <div className="DetailHeaderContainer">
          <div className="DetailHeader">
            <span
              style={{ cursor: 'pointer', marginLeft: '10px' }}
              onClick={() => onToggleStar && onToggleStar(detail)}
            >
              {isStarred ? <FaStar color="#FFD700" /> : <FaRegStar />}
            </span>
            <span>계약 이름: {detail.contractTitle || '제목 없음'}</span>
            <div className="SharePrint">
              <button>공유</button>
              <img src={share} alt="공유 아이콘" />
              <button>인쇄</button>
              <img src={print} alt="인쇄 아이콘" />
            </div>
          </div>
        </div>

        <div className="TitleContent">
          <p>보낸사람: {detail.designerId || "미지정"}</p>
          <p>받는사람: {detail.clientId || "미지정"}</p>
          <p style={{ fontSize: '12px' }}>{time}</p>
        </div>
      </div>

      <button
        onClick={toggleOpen}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginTop: '10px'
        }}
      >
        {isOpen ? <FaChevronUp size={24} color="#333" /> : <FaChevronDown size={24} color="#333" />}
        <p>계약내용 보기</p>
      </button>

      {isOpen && (
        <div
          className="DetailContent"
          style={{
            marginTop: '20px',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            height: '400px',
            overflowY: 'auto'
          }}
        >
          <p>{content || '상세 계약 내용입니다'}</p>
        </div>
      )}
    </div>
  );
}