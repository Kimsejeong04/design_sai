import React, { useState, useEffect } from 'react';
import DeliveryCard from './DeliveryCard';
import DeliveryDetail from './DeliveryDetail';
import DeliveryTracking from './DeliveryTracking';

const DeliveryPage = () => {
  // 전체 더미 데이터
  const allDeliveries = [
    {
      date: '2025-06-04',
      status: '작업진행중',
      imageUrl: '/image/brandDesign/브랜드디자인1.jpg',
      customerName: '홍길동',
      orderTitle: '원피스 3종',
      price: '16,000원',
      deadline: '6월 10일',
      contractId: 'abc123',
      isShipped: false,
    },
    {
      date: '2025-06-01',
      status: '배송중',
      imageUrl: '/image/brandDesign/브랜드디자인3.jpg',
      customerName: '김민지',
      orderTitle: '봄 느낌 원피스',
      price: '14,000원',
      deadline: '6월 8일',
      contractId: 'xyz789',
      isShipped: true,
    },
    {
      date: '2025-05-30',
      status: '배송완료',
      imageUrl: '/image/brandDesign/브랜드디자인2.jpg',
      customerName: '박서연',
      orderTitle: '리뉴얼 디자인',
      price: '20,000원',
      deadline: '6월 5일',
      contractId: 'def456',
      isShipped: true,
    },
    {
      date: '2025-05-28',
      status: '작업대기중',
      imageUrl: '/image/brandDesign/브랜드디자인2.jpg',
      customerName: '이수진',
      orderTitle: 'SNS 배너 제작',
      price: '12,000원',
      deadline: '6월 9일',
      contractId: 'ghi321',
      isShipped: false,
    },
    {
      date: '2025-05-25',
      status: '배송중',
      imageUrl: '/image/brandDesign/브랜드디자인3.jpg',
      customerName: '최민호',
      orderTitle: '팝업 디자인',
      price: '18,000원',
      deadline: '6월 7일',
      contractId: 'jkl654',
      isShipped: true,
    },
  ];

  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedDelivery, setSelectedDelivery] = useState(null); // 상세보기용
  const [deliveries, setDeliveries] = useState([]);  // 배열 상태와 setter 생성

  // 삭제 함수
  const handleDelete = (contractId) => {
    if (window.confirm('배송내역을 삭제하시겠습니까?')) {
      setDeliveries(prev => prev.filter(item => item.contractId !== contractId));
    }
  };

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 2);
  };

  // 상세보기 눌렀을 때
  const handleViewDetail = (delivery) => {
    setSelectedDelivery(delivery);
  };

  // 뒤로 가기
  const handleBack = () => {
    setSelectedDelivery(null);
  };

  return (
    <div className="page-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      {selectedDelivery ? (
        <DeliveryTracking delivery={selectedDelivery} onBack={handleBack} />
      ) : (
        <>
          <h1 style={{ fontSize: '30px', fontWeight: '700', marginBottom: '32px', color: '#799fc4' }}>배송 내역</h1>

          {allDeliveries.slice(0, visibleCount).map((d, idx) => (
            <DeliveryCard 
              key={idx} 
              {...d} 
              delivery={d}
              onDelete={() => handleDelete(d.contractId)} // 여기 d로 바꿈
            />
          ))}

          {visibleCount < allDeliveries.length && (
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <button
                onClick={handleShowMore}
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  backgroundColor: '#799fc4',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                더보기
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DeliveryPage;