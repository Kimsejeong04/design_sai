import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaBox } from 'react-icons/fa';  // 택배상자 아이콘

const DeliveryTracking = ({ delivery, onBack }) => {
    const location = useLocation();
    const navigate = useNavigate();


  // delivery가 없으면 임시 기본값 (테스트용)
  const data = delivery ?? {
    courier: 'CJ대한통운',
    trackingNumber: '1234567890',
    designerName: '홍길동',
    receiverName: '김수진',
    receiverAddress: '서울특별시 강남구 테헤란로 123',
    deliveryRequest: '문 앞에 놔주세요.',
    trackingHistory: [
        { time: '2025.01.14 13:14', location: '사상MP', status: '배송중(입고)' },
        { time: '2025.01.13 09:30', location: '부산물류센터', status: '발송완료' },
    ],
    };

  return (
    <div style={{
        padding: 20,
        fontFamily: 'Arial, sans-serif',
        minHeight: '100vh',
        maxWidth: '1000px',
        margin: '0 auto',  // 가운데 정렬
        }}>
      <h1 style={{ textAlign: 'center', marginBottom: 30 }}>실시간 배송조회</h1>

      {/* 1단 */}
      <div
        style={{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 20,
            marginBottom: 20,
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            height: '150px',          // 높이 고정
        }}
      >
        {/* 왼쪽 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
          <FaBox size={60} color="#555" />
          <div>
            <p><strong>택배사:</strong> {data.courier}</p>
            <p><strong>운송장번호:</strong> {data.trackingNumber}</p>
            <p><strong>디자이너명:</strong> {data.designerName}</p>
          </div>
        </div>

            {/* 오른쪽 */}
        <div style={{ flex: 1, paddingLeft: 40 }}>
            <p style={{ margin: 0, color: '#333' }}><strong>받는 사람:</strong> {data.receiverName}</p>
            <p style={{ margin: 0, color: '#333' }}><strong>받는 주소:</strong> {data.receiverAddress}</p>
            <p style={{ margin: 0, color: '#333' }}><strong>배송 요청사항:</strong> {data.deliveryRequest}</p>
        </div>
        </div>


        {/* 2단 */}
        <div>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '1000px', background: '#fff' }}>
            <thead>
                <tr style={{ borderBottom: '2px solid #ddd' }}>
                <th style={{ padding: '10px 8px' }}>시간</th>
                <th style={{ padding: '10px 8px' }}>현재 위치</th>
                <th style={{ padding: '10px 8px' }}>배송 상태</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(data.trackingHistory) && data.trackingHistory.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '10px 8px', color: '#333' }}>{item.time}</td>
                    <td style={{ padding: '10px 8px', color: '#333' }}>{item.location}</td>
                    <td style={{ padding: '10px 8px', color: '#333' }}>{item.status}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', marginBottom: '40px', marginTop: '20px' }}>
            <button
                onClick={() => navigate(-1)}
                style={{ backgroundColor: '#799fc4', color: 'white', padding: '12px 24px', borderRadius: '6px', border: 'none', fontSize: '16px' }}
                >
                배송조회로 돌아가기
            </button>
      </div>
    </div>
  );
};

export default DeliveryTracking;
