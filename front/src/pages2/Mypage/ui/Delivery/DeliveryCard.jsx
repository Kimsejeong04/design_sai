// DeliveryCard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeliveryCard.css';
import DeliveryDetail from './DeliveryDetail';

const DeliveryCard = ({
    date,
    status,
    imageUrl,
    customerName,
    orderTitle,
    price,
    deadline,
    contractId,
    isShipped,
    delivery, 
    onDelete,
  }) => {
    const navigate = useNavigate();
    const [showDetail, setShowDetail] = useState(false);

    const toggleDetail = () => {
      setShowDetail(prev => !prev);
    };
    


  return (
    <div className="delivery-card">
      <div className="delivery-date">{date}</div>

      <div className="delivery-body">
        {/* 왼쪽 */}
        <div className="left-section">
          <div className="status">{status}</div>
          <div className="info-container">
            <img src={imageUrl} alt="디자인 미리보기" className="preview-image" />
            <div className="info-text">
              <p className="customer-name">주문자명: {customerName}</p>
              <p className="order-title">주문상품명: {orderTitle}</p>
              <p>총 주문 금액: {price} </p>
              <p>희망 기한: {deadline}</p>
            </div>
          </div>
        </div>

        {/* 오른쪽 */}
        <div className="right-section">
          <button
            className="action-btn"
             onClick={() => {
                console.log('navigate 호출, delivery:', delivery);
                navigate('/designer/Delivery/detail', {
                state: { delivery }
              });
            }}
          >
            배송상세보기
          </button>

          <button
            className="action-btn"
            onClick={() =>
              navigate(isShipped ? `/designer/delivery/tracking/${contractId}` : `/designer/delivery/register/${contractId}`, {
                state: { delivery },
              })
            }
          >
            {isShipped ? '배송조회' : '배송등록'}
          </button>
          <button className="action-btn">대화하기</button>
          <button
            className="action-btn report-btn"
            onClick={() => {
              if (window.confirm("신고하시겠습니까?")) {
                // 확인 클릭 시 실행할 로직
                alert("신고가 접수되었습니다."); // 예시
                // 여기에 실제 신고 처리 함수 호출 가능
              } else {
                // 취소 클릭 시 별도 동작 없으면 생략 가능
                console.log("신고 취소됨");
              }
            }}
          >
            신고하기
          </button>
        </div>
      </div>

      {/* 상세 정보 보여주기 */}
      {showDetail && <DeliveryDetail delivery={delivery} />}
    </div>
  );
};

export default DeliveryCard;
