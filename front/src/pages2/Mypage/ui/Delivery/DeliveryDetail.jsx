import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DeliveryDetail = ( {onDelete} ) => {
  const location = useLocation();
  const navigate = useNavigate();
  const delivery = location.state?.delivery;

  if (!delivery) return <div style={{ textAlign: 'center', marginTop: '100px' }}>배송 데이터가 없습니다.</div>;

  // 공통 p 스타일 (크게)
  const pStyle = { fontSize: '18px', margin: '8px 0' };
  // 총 결제금액, 총 상품가격 스타일 (더 크고 굵게)
  const highlightPStyle = { fontSize: '20px', fontWeight: 'bold', margin: '12px 0', color: '#333' };

  // 삭제 버튼 클릭 핸들러
  const handleDeleteClick = () => {
    const confirmed = window.confirm('배송내역을 삭제하시겠습니까?');
    if (confirmed) {
      if (onDelete) {
        onDelete(delivery.id);  // 고유 id 전달 (id 필드가 있다고 가정)
      }
      navigate(-1); // 삭제 후 뒤로가기
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 30px', fontSize: '17px' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#799fc4', marginBottom: '32px' }}>배송 상세</h1>

      {/* 받는 사람 정보 */}
      <div style={{ border: '1px solid #ccc', borderRadius: '12px', padding: '24px', marginBottom: '24px', background: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>받는 사람 정보</h2>
        </div>
        <p style={pStyle}><strong>받는 사람</strong> {delivery.customerName}</p>
        <p style={pStyle}><strong>연락처</strong> 010-1234-5678</p>
        <p style={pStyle}><strong>받는 주소</strong> 서울특별시 무슨구 무슨동 123-45</p>
      </div>

      {/* 결제 정보 */}
      <div style={{ border: '1px solid #ccc', borderRadius: '12px', padding: '24px', marginBottom: '24px', background: '#fff' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>결제 정보</h2>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '280px', border: '1px solid #eee', padding: '20px', borderRadius: '8px' }}>
            <p style={pStyle}>카드 국민카드 / 일시불</p>
            <p style={pStyle}>포인트 사용 2,000P</p>
            <p style={highlightPStyle}><strong>총 결제 금액</strong> {delivery.price}</p>
          </div>
          <div style={{ flex: 1, minWidth: '280px', border: '1px solid #eee', padding: '20px', borderRadius: '8px' }}>
            <p style={highlightPStyle}><strong>총 상품 가격</strong> {delivery.price}</p>
            <p style={pStyle}>배송비 3,000원</p>
          </div>
        </div>
      </div>

      {/* 배송 정보 */}
      <div style={{ border: '1px solid #ccc', borderRadius: '12px', padding: '24px', marginBottom: '32px', background: '#fff' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>배송 정보</h2>
        <p style={pStyle}><strong>택배사</strong> CJ대한통운</p>
        <p style={pStyle}><strong>운송장 번호</strong> 1234567890</p>
        <p style={pStyle}><strong>받는 주소</strong> 서울특별시 무슨구 무슨동 123-45</p>
        <p style={pStyle}><strong>배송 요청사항</strong> 문 앞에 두고 벨 눌러주세요.</p>
      </div>

      {/* 버튼 묶음 */}
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', marginBottom: '40px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ backgroundColor: '#799fc4', color: 'white', padding: '12px 24px', borderRadius: '6px', border: 'none', fontSize: '16px' }}
        >
          배송조회로 돌아가기
        </button>
        <button
            onClick={handleDeleteClick}
            style={{ backgroundColor: '#ccc', color: '#333', padding: '12px 24px', borderRadius: '6px', border: 'none', fontSize: '16px' }}
            >
            배송내역 삭제
            </button>
        </div>

      {/* 안내사항 박스 */}
      <div style={{ backgroundColor: '#f2f2f2', padding: '20px 24px', borderRadius: '8px', color: '#333', fontSize: '15px' }}>
        <h3 style={{ marginBottom: '10px', fontWeight: 'bold', fontSize: '18px' }}>
          <span style={{color: 'red'}}>취소/반품/교환</span> 신청 전 확인해주세요!
        </h3>
        <p>
          배송상세 페이지는 결제 내역과 수령 정보를 기반으로 작성되었습니다. <br />
          상품 수령 후 단순 변심, 수취인 정보 오기재로 인한 반품/환불은 불가할 수 있습니다.<br />
          정확한 문의사항은 반드시 <strong>대화방</strong>을 통해 전달해 주세요.
        </p>
      </div>
    </div>
  );
};

export default DeliveryDetail;
