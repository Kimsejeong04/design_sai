import React, { useState } from 'react';
import './MypageContent.css';

const MypageContent = () => {
  const [activeTab, setActiveTab] = useState('design');
  const [selectedCategory, setSelectedCategory] = useState('template');
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기/닫기 상태
  const [selectedItem, setSelectedItem] = useState(null); // 선택된 카드 항목

  // 디자인 항목 데이터
  const designItems = {
    template: [
      { id: 1, name: '맨투맨1', description: '맨투맨1 설명', image: '/images/맨투맨1.jpg' },
      { id: 2, name: '맨투맨2', description: '맨투맨2 설명', image: '/images/맨투맨2.jpg' },
      { id: 3, name: '맨투맨3', description: '맨투맨3 설명', image: '/images/맨투맨3.jpg' },
    ],
    pattern: [
      { id: 1, name: '자켓', description: '자켓 설명', image: '/images/자켓.jpg' },
      { id: 2, name: '치마1', description: '치마1 설명', image: '/images/치마1.jpg' },
      { id: 3, name: '치마2', description: '치마2 설명', image: '/images/치마2.jpg' },
    ],
    brand: [
      { id: 1, name: '바지', description: '바지 설명', image: '/images/바지.jpg' },
      { id: 2, name: '원피스1', description: '원피스1 설명', image: '/images/원피스1.jpg' },
      { id: 3, name: '원피스2', description: '원피스2 설명', image: '/images/원피스2.jpg' },
    ],
  };

  // 탭 변경 핸들러
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // 드롭다운 변경 핸들러
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // 카드 클릭 핸들러
  const handleCardClick = (item) => {
    setSelectedItem(item); // 클릭한 항목을 저장
    setIsModalOpen(true); // 모달 열기
  };

  // 모달 닫기 핸들러
  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <div>
      <div>
        <button onClick={() => handleTabClick('design')}>디자인</button>
        <button onClick={() => handleTabClick('order')}>의뢰</button>
      </div>

      <div className="tab-content">
        {activeTab === 'design' && (
          <div className="tab">
            <div className="dropdown">
              <select onChange={handleCategoryChange} value={selectedCategory}>
                <option value="template">템플릿 디자인</option>
                <option value="pattern">의류 패턴 설계도 디자인</option>
                <option value="brand">브랜드 샘플 디자인</option>
              </select>
            </div>
            <div className="card-container">
              {designItems[selectedCategory].map((item) => (
                <div
                  key={item.id}
                  className="card"
                  onClick={() => handleCardClick(item)}
                >
                  <img src={item.image} alt={item.name} className="card-image" />
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'order' && (
          <div className="tab">
            <p>의뢰 탭 내용</p>
            {/* 의뢰 탭 내용 구현 */}
          </div>
        )}
      </div>

      {/* 모달 팝업 */}
      {isModalOpen && selectedItem && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>&times;</span>
            <h2>{selectedItem.name}</h2>
            <img src={selectedItem.image} alt={selectedItem.name} className="modal-image" />
            <p>{selectedItem.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MypageContent;
