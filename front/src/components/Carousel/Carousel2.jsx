import React, { useState, useEffect } from 'react';
import './Carousel2.css';

const Carousel2 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideCount = 2;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slideCount);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slideCount) % slideCount);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 4000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="carousel2-container">
      {/* 슬라이드 1: 브랜드 슬로건 포스터 */}
      {currentIndex === 0 && (
        <div className="poster-banner">
          <div className="poster-bg-circle circle1"></div>
          <div className="poster-bg-circle circle2"></div>

          <svg className="poster-icon icon-shirt" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 8L8 18V28H16V56H48V28H56V18L42 8L37 13H27L22 8Z"
                  stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
            <path d="M27 13C27 13 28 18 32 18C36 18 37 13 37 13" stroke="currentColor" strokeWidth="2.5" fill="none"/>
          </svg>

          <svg className="poster-icon icon-scissors" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="46" r="7" stroke="currentColor" strokeWidth="2.5" fill="none"/>
            <circle cx="16" cy="18" r="7" stroke="currentColor" strokeWidth="2.5" fill="none"/>
            <path d="M22 22L52 50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M22 42L52 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>

          <svg className="poster-icon icon-thread" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="32" cy="32" rx="22" ry="22" stroke="currentColor" strokeWidth="2.5" fill="none"/>
            <path d="M14 24C24 28 40 28 50 24" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M14 32C24 36 40 36 50 32" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M14 40C24 44 40 44 50 40" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M50 32C56 38 58 50 58 50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          </svg>

          <svg className="poster-icon icon-button" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="2.5" fill="none"/>
            <circle cx="24" cy="24" r="3" fill="currentColor"/>
            <circle cx="40" cy="24" r="3" fill="currentColor"/>
            <circle cx="24" cy="40" r="3" fill="currentColor"/>
            <circle cx="40" cy="40" r="3" fill="currentColor"/>
          </svg>

          <svg className="poster-icon icon-sparkle1" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 0C20 0 21 16 24 19C27 22 40 20 40 20C40 20 27 22 24 24C21 27 20 40 20 40C20 40 19 27 16 24C13 22 0 20 0 20C0 20 13 22 16 19C19 16 20 0 20 0Z" fill="currentColor"/>
          </svg>

          <svg className="poster-icon icon-sparkle2" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 0C20 0 21 16 24 19C27 22 40 20 40 20C40 20 27 22 24 24C21 27 20 40 20 40C20 40 19 27 16 24C13 22 0 20 0 20C0 20 13 22 16 19C19 16 20 0 20 0Z" fill="currentColor"/>
          </svg>

          <svg className="poster-icon icon-button2" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="2.5" fill="none"/>
            <circle cx="24" cy="24" r="3" fill="currentColor"/>
            <circle cx="40" cy="24" r="3" fill="currentColor"/>
            <circle cx="24" cy="40" r="3" fill="currentColor"/>
            <circle cx="40" cy="40" r="3" fill="currentColor"/>
          </svg>

          <div className="poster-content">
            <h2 className="poster-title">당신의 취향이<br />작품이 되는 곳</h2>
            <p className="poster-subtitle">옷장 속 아이디어, 디자인사이에서 현실이 되다</p>
            <a href="/client/clothing-order" className="carousel-button">자세히 보기 →</a>
          </div>
        </div>
      )}

      {/* 슬라이드 2: 첫 의뢰 이벤트 배너 */}
      {currentIndex === 1 && (
        <div className="event-banner">
          <div className="event-bg-circle ecircle1"></div>
          <div className="event-bg-circle ecircle2"></div>
          <div className="event-bg-circle ecircle3"></div>

          <div className="event-content">
            <span className="event-label">첫 의뢰 이벤트</span>
            <h2 className="event-title">
              신규 회원<br />
              첫 의뢰 <strong>20% 할인</strong>
            </h2>
            <p className="event-subtitle">지금 가입하고 첫 디자인 의뢰를 더 가볍게 시작하세요</p>
            <a href="/client/customer-support" className="carousel-button">이벤트 참여하기 →</a>
          </div>

          <div className="event-visual">
            <img src="/image/Big sale.png" alt="빅세일" className="event-icon icon-big-sale" />
            <img src="/image/Discount.png" alt="할인" className="event-icon icon-discount" />
            <img src="/image/Gift box.png" alt="선물박스 할인" className="event-icon icon-gift" />

            <div className="event-percent-badge">
              <span className="percent-number">20</span>
              <span className="percent-sign">% OFF</span>
            </div>
          </div>
        </div>
      )}

      {/* 점(dots) */}
      <div className="dots-container">
        {Array.from({ length: slideCount }).map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>

      {/* 네비게이션 버튼 */}
      <button className="prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Carousel2;