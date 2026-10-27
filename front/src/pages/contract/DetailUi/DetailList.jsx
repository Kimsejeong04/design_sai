import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DetailList.css';
import jeans from '../../../assets/jeans.png';
import RequestEditor from '../../Request/Request/ui/RequestEditor';
import { FaStar, FaRegStar } from "react-icons/fa";
import share from '../../../assets/share.png';
import print from '../../../assets/print.png';
import axios from 'axios';

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}`;
}

// 계약 내용 한글 라벨 매핑
const labelMap = {
  basic: '기본 조항',
  copyright: '저작권',
  cancellation: '해지',
  security: '보안',
  dispute: '분쟁 해결',
  etc: '기타'
};

function renderContractContent(jsonString) {
  if (!jsonString) return <p className="cd-empty">내용이 없습니다.</p>;

  let contentObj = null;
  try {
    contentObj = JSON.parse(jsonString);
  } catch (error) {
    return <p className="cd-empty">계약 내용 파싱 오류</p>;
  }

  return (
    <ul className="cd-clauses">
      {Object.entries(contentObj).map(([key, value]) =>
        value ? (
          <li key={key}>
            <strong>{labelMap[key] || key}</strong>
            <span>{value}</span>
          </li>
        ) : null
      )}
    </ul>
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
      { state: { messageText: plainContent, sendMessage: contractMessage,
        sourcePage: "OtherPage",
      } });
  };

  return (
    <div className="cd-page">
      <h2 className="cd-page-title">전체 계약</h2>

      {/* 헤더 카드 */}
      <section className="cd-card cd-header">
        <div className="cd-header-top">
          <div className="cd-title-row">
            <button
              type="button"
              className="cd-star"
              onClick={handleStarClick}
              aria-label="중요 표시"
            >
              {contractData.starredStatus ? <FaStar color="#FFB800" /> : <FaRegStar />}
            </button>
            <h3 className="cd-contract-name">{contractData.contractTitle}</h3>
          </div>
          <div className="cd-tools">
            <button type="button" className="cd-tool-btn" onClick={handleShare}>
              <img src={share} alt="" />
              공유
            </button>
            <button type="button" className="cd-tool-btn" onClick={handlePrint}>
              <img src={print} alt="" />
              인쇄
            </button>
          </div>
        </div>

        <dl className="cd-meta">
          <div>
            <dt>보낸사람</dt>
            <dd>{contractData.designerId || "미지정"}</dd>
          </div>
          <div>
            <dt>받는사람</dt>
            <dd>{contractData.clientId || "미지정"}</dd>
          </div>
          {contractData.date && (
            <div>
              <dt>날짜</dt>
              <dd>{formatDate(contractData.date)}</dd>
            </div>
          )}
        </dl>
      </section>

      {/* 계약서 */}
      <section className="cd-card cd-paper">
        <div className="cd-paper-head">
          <h3>{contractData.contractTitle}</h3>
          <span className="cd-created">
            계약 작성 시간 {contractData.createdAt ? formatDate(contractData.createdAt) : '미지정'}
          </span>
        </div>

        <div className="cd-paper-body">
          <div className="cd-paper-image">
            <img src={jeans} alt="계약 이미지" />
          </div>
          <dl className="cd-info">
            <div>
              <dt>디자이너</dt>
              <dd>{contractData.designerId || "미지정"}</dd>
            </div>
            <div>
              <dt>의뢰인</dt>
              <dd>{contractData.clientId || "미지정"}</dd>
            </div>
            <div>
              <dt>계약 내용</dt>
              <dd>{renderContractContent(contractData.contractContent)}</dd>
            </div>
            <div>
              <dt>기간</dt>
              <dd>
                {contractData.dueDate
                  ? `${formatDate(contractData.dueDate)}까지`
                  : "2025.2.25까지"}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* 에디터 */}
      <section className="cd-card cd-editor">
        <h4 className="cd-section-title">요청 메시지 작성</h4>
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
      </section>

      {/* 하단 버튼 */}
      <div className="cd-footer">
        <button
          type="button"
          className="cd-btn cd-btn-primary"
          onClick={handleSendRequest}
          disabled={!isEditorSent}
        >
          요청보내기
        </button>
        <button
          type="button"
          className="cd-btn cd-btn-primary"
          onClick={() => setShowModal(true)}
        >
          동의하기
        </button>
        <button type="button" className="cd-btn cd-btn-ghost">작성취소</button>
        <button type="button" className="cd-btn cd-btn-ghost">저장</button>
      </div>

      {/* 동의 팝업 */}
      {showModal && (
        <div className="cd-overlay">
          <div className="cd-modal" role="dialog" aria-modal="true">
            <h3>계약 승인 확인</h3>
            <p>계약에 동의하시면 아래 문구를 그대로 입력해 주세요.</p>
            <p className="cd-modal-phrase">계약 내용을 확인하였으며 동의합니다.</p>
            <input
              type="text"
              value={agreeMessage}
              onChange={(e) => setAgreeMessage(e.target.value)}
              placeholder="위 문구를 입력해 주세요"
            />
            <div className="cd-modal-actions">
              <button type="button" className="cd-btn cd-btn-ghost" onClick={() => setShowModal(false)}>
                취소
              </button>
              <button type="button" className="cd-btn cd-btn-primary" onClick={handleApproveContract}>
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}