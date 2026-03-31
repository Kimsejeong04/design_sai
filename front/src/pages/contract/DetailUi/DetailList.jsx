import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DetailList.css';
import jeans from '../../../assets/jeans.png';
import NextButtonUI from '../../../components/NextButton/NextButton';
import styled from 'styled-components';
import RequestEditor from '../../Request/Request/ui/RequestEditor';
import { FaStar, FaRegStar } from "react-icons/fa";
import share from '../../../assets/share.png';  
import print from '../../../assets/print.png';
import axios from 'axios';

const Button = styled(NextButtonUI)`
  background-color: #d5d5d5;
  color: black;
`;

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}`;
}

// 계약 내용 보기 편하게 렌더링하는 함수 + 한글 라벨 매핑
const labelMap = {
  basic: '기본 조항',
  copyright: '저작권',
  cancellation: '해지',
  security: '보안',
  dispute: '분쟁 해결',
  etc: '기타'
};

function renderContractContent(jsonString) {
  if (!jsonString) return <p>내용이 없습니다.</p>;

  let contentObj = null;
  try {
    contentObj = JSON.parse(jsonString);
  } catch (error) {
    return <p>계약 내용 파싱 오류</p>;
  }

  return (
    <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.5', marginTop: '8px' }}>
      {Object.entries(contentObj).map(([key, value]) => (
        value ? (
          <p key={key}>
            <strong>{labelMap[key] || key}:</strong> {value}
          </p>
        ) : null
      ))}
    </div>
  );
}

export default function DetailList({ contractId, contract, onToggleStar }) {
  const [contractData, setContractData] = useState(contract);
  const navigate = useNavigate();
  const [editorContent, setEditorContent] = useState("");
  const [isEditorSent, setIsEditorSent] = useState(false);
  const [contractMessage, setSendMessage] = useState();
  const [agreeMessage, setAgreeMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    const fetchContract = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/client/contract/${contractId}`);
        const data = response.data;
        if (data) {
          setContractData(data);
          localStorage.setItem(`contract-${contractId}`, JSON.stringify(data));
        }
      } catch (error) {
        console.error("계약 데이터를 불러오는 중 오류가 발생했습니다:", error);
      }
    };

    const savedContract = localStorage.getItem(`contract-${contractId}`);
    if (savedContract) {
      setContractData(JSON.parse(savedContract));
    } else {
      fetchContract();
    }
  }, [contractId]);

  const handleStarClick = () => {
    const updatedContract = { ...contractData, starredStatus: !contractData.starredStatus };
    setContractData(updatedContract);
    axios.put(`http://localhost:8081/client/contract/${contractData.id}/star`, {
      starredStatus: updatedContract.starredStatus
    })
    .then(() => {
      onToggleStar(updatedContract);
      localStorage.setItem(`contract-${contractId}`, JSON.stringify(updatedContract));
    })
    .catch((error) => {
      console.error("중요 표시 상태 변경 실패:", error);
    });
  };

  const handleShare = () => {
    alert("공유 기능은 아직 구현되지 않았습니다.");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleApproveContract = async () => {
    if (agreeMessage !== "계약 내용을 확인하였으며 동의합니다.") {
      alert("정확한 문구를 입력해 주세요.");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8081/client/contract/approve`, {
        contractId: contractId,
        agreeMessage: agreeMessage
      });

      if (response.status === 200) {
        alert("계약이 승인되었습니다.");
        const updated = await axios.get(`http://localhost:8081/client/contract/${contractId}`);
        setContractData(updated.data);
        setShowModal(false);
      }
      
    } catch (err) {
      console.error("계약 승인 실패:", err);
      alert("서버 오류로 계약을 승인할 수 없습니다.");
    }
  };

  if (!contractData || !contractData.contractTitle) {
    return <div>계약서 데이터를 찾을 수 없습니다.</div>;
  }

  const handleSendRequest = async () => {

    const plainContent = editorContent.replace(/<\/?[^>]+(>|$)/g, '');
    // If you use contractMessage.content elsewhere, set it to plainContent
    if (contractMessage) {
      setSendMessage({ ...contractMessage, content: plainContent });
    }
    const messagePayload = {
      messageId: contractMessage?.id,
      content: plainContent,
      contractId: contractId,
      clientId: contractData?.clientId,
      designerId: contractData?.designerId,
      time: contractMessage?.time,
    };

    try {
      const response = await axios.post("http://localhost:8081/api/request-messages/send", messagePayload);

      if (response.status === 200) {
        alert("요청 메시지를 성공적으로 보냈습니다!");
        setEditorContent("");
        setIsEditorSent(false);
      }
    } catch (error) {
      console.error("메시지 전송 실패:", error);
      alert("메시지 전송 중 오류가 발생했습니다.");
    }

    navigate('/client/Chatmain', 
      { state: { messageText: plainContent, sendMessage : contractMessage,
        sourcePage: "OtherPage", 
      } });
  };
  
  

  return (
    <div className="Detailcontainer">
      <div className="Detailtitle">
        <span>전체 계약</span>
      </div>

      <div className="HeaderContainer">
        <div className="DetailHeaderContainer">
          <div className="DetailHeader">
            <span style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={handleStarClick}>
              {contractData.starredStatus ? <FaStar color="#FFD700" /> : <FaRegStar />}
            </span>
            <span>계약 이름: {contractData.contractTitle}</span>
            <div className="SharePrint">
              <button onClick={handleShare}>공유</button>
              <img src={share} alt="공유 아이콘" />
              <button onClick={handlePrint}>인쇄</button>
              <img src={print} alt="인쇄 아이콘" />
            </div>
          </div>
        </div>

        <div className="TitleContent">
          <p>보낸사람: {contractData.designerId || "미지정"}</p>
          <p>받는사람: {contractData.clientId || "미지정"}</p>
          <p style={{ fontSize: '12px' }}>{formatDate(contractData.date)}</p>
        </div>
      </div>

      <div className="DetailContent">
        <div className="left">
          <p style={{ fontSize: '30px', fontWeight: 'bold' }}>{contractData.contractTitle}</p>
          <div className="image-info-wrapper">
            <div className="image-container">
              <img src={jeans} alt="사진" />
            </div>
            <div className="info-container">
              <p>디자이너: {contractData.designerId || "미지정"}</p>
              <p>의뢰인: {contractData.clientId || "미지정"}</p>
              <p>계약 내용:</p>
              {renderContractContent(contractData.contractContent)}
              <p>기간: {contractData.dueDate ? `${formatDate(contractData.dueDate)}까지` : "2025.2.25까지"}</p>
            </div>
          </div>
        </div>
        <div className="right">
          <p>계약 작성 시간: {contractData.createdAt ? formatDate(contractData.createdAt) : '미지정'}</p>
        </div>
      </div>

      <div className="Editor">
        <div className="EditorInner">
          <RequestEditor
            value={editorContent}
            onChange={(content) => {
              setEditorContent(content);
              setIsEditorSent(content.trim() !== "");
              const newMessage = {
                id: `msg-${Date.now()}`,
                content,
                time: new Date().toLocaleTimeString(),
                contract: { ...contractData, content }
              };
              setSendMessage(newMessage);
            }}
          />
        </div>
      </div>

      <div className="Detailfooter">
        <div className="DetailButton">
          <NextButtonUI onClick={handleSendRequest} disabled={!isEditorSent}  >요청보내기</NextButtonUI>
        </div>
        <div className="DetailButton">
          <NextButtonUI onClick={() => setShowModal(true)}>동의하기</NextButtonUI>
        </div>
          <Button>작성취소</Button>
          <Button>저장</Button>
        </div>

      {showModal && (
        <div style={modalStyle.overlay}>
          <div style={modalStyle.modal}>
            <h3>계약 승인 확인</h3>
            <h5>계약을 동의하면 '계약 내용을 확인하였으며 동의합니다.'를 입력해주세요.</h5>
            <input
              type="text"
              value={agreeMessage}
              onChange={(e) => setAgreeMessage(e.target.value)}
              placeholder="예: 계약 내용을 확인하였으며 동의합니다."
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <div style={{ textAlign: 'right' }}>
              <button onClick={handleApproveContract} style={modalStyle.button}>확인</button>
              <button onClick={() => setShowModal(false)} style={modalStyle.cancelButton}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const modalStyle = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    background: 'white',
    padding: '1.25rem', 
    borderRadius: '0.5rem', 
    width: '25rem', 
    boxShadow: '0 0.25rem 0.5rem rgba(0,0,0,0.2)', 
  },
  button: {
    padding: '0.5rem 1rem', 
    marginRight: '0.5rem', 
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '0.25rem',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '0.25rem',
    cursor: 'pointer',
  }
};
