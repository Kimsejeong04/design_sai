import React, { useRef, useState } from 'react';
import "./CosMainCss.css";
import { MainBanner } from "../index"; // MainBanner 컴포넌트 임포트 (배너 랜덤 선택 처리)
import OngoingContract from '../../components/OngoingContract/OngoingContract';
import DesignerPortfolio from '../../components/DesignerPortfolio/DesignerPortfolio';
import RecommendedDesign from '../../components/RecommendedDesign/RecommendedDesign';
import ClientProcessStep from '../../components/ClientProcessStep/ClientProcessStep';

export default function CosMain() {
  // useRef로 scrollContainerRef 정의
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // 마우스 드래그 시작
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  // 마우스 이동
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX;
    const SCROLL_SPEED = 1.5;
    const walk = (startX - x) * SCROLL_SPEED;
    scrollContainerRef.current.scrollLeft = scrollLeft + walk;
  };

  // 드래그 종료
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div>
      <div className="WholeWrapper">
        <div className="ContentsWrapper">
          <MainBanner />
          <ClientProcessStep/>
          <div className="Content-Sell">
            <h2>진행중인 <span style={{ color: '#9ABCD4' }}>계약</span></h2>
            <p>현재 진행중인 계약을 살펴보세요.</p>
            <div className="Content-Sell2">
              <OngoingContract />
            </div>
          </div>

          <div className="DesignerPortfolio-Sell">
            <h2><span style={{ color: '#9ABCD4' }}>추천</span> 디자이너 포트폴리오</h2>
            <p>현재 인기 많은 디자이너들의 포트폴리오를 감상하시고 새로운 디자인을 만들어 보세요!</p>
                <div className="DesignerPortfolio-Sell2">
                  <DesignerPortfolio />
                </div>
          </div>

          <div className="RecommendedDesign-Sell">
            <div className="RecommendedDesign-Sell2">
                <h2 className="Recomm-title" style={{ fontSize: '2.5rem' }}>
                    추천 <br />디자인
                </h2>
                <p className="Recomm-text" style={{ lineHeight: '1.2' }}>
                  디자인사이에서 추천하는<br />
                  디자이너들을 확인하세요!<br />
                  여러 디자인과 함께 멋진<br />
                  결과물들을 만들어 행복한<br />
                  추억을 얻으세요
                  디자인사이에서 추천하는
                  디자이너들을 확인하세요!<br />
                </p>
                <button className="detail-button">
                  자세히 보기
                </button>
            </div>

            {/* 드래그 가능한 가로 스크롤 영역 */}
            <div
              className="RecommendedDesign-Sell3"
              ref={scrollContainerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div className="RecommendedDesign-Sell3-Container">
                <RecommendedDesign />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
