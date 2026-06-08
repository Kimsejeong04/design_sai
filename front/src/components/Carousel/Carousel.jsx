import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Carousel.css';

const features = [
  {
    title: '디자인 파일 업로드',
    subtitle: '내 아이디어를 현실로',
    description: '나만의 디자인 파일을 업로드하고\n전문 디자이너와 함께 완성하세요.',
    link: '/client/Upload',
    image: '/image/banner-design file.png',
    bg: 'linear-gradient(135deg, #c8fce8 0%, #a8f0d8 40%, #dafff1 100%)',
    accent: '#2ec090',
    badge: '🎨 직접 디자인',
    btnColor: '#2ec090',
    btnHover: '#1da878',
  },
  {
    title: '템플릿으로 디자인',
    subtitle: '10분이면 충분해요',
    description: '다양한 템플릿 중 마음에 드는 걸 골라\n나만의 스타일로 커스텀하세요.',
    link: '/client/clothes',
    image: '/image/banner-templet.png',
    bg: 'linear-gradient(135deg, #ede0ff 0%, #d8c4ff 40%, #f3e7ff 100%)',
    accent: '#8b5cf6',
    badge: '✨ 쉽고 빠르게',
    btnColor: '#8b5cf6',
    btnHover: '#7c3aed',
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused]         = useState(false);
  const isAnimating                      = useRef(false);
  const trackRef                         = useRef(null);

  // ── 핵심: translateX 슬라이딩 ──────────────────────────────
  const slideTo = useCallback((nextIndex) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const track     = trackRef.current;
    const direction = nextIndex > currentIndex ? -1 : 1;

    // 1) transition 없이 시작 위치 세팅
    track.style.transition = 'none';
    track.style.transform  = `translateX(${direction * -100}%)`;

    // 2) 새 슬라이드 반영 후 → 제자리로 부드럽게 이동
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setCurrentIndex(nextIndex);
        track.style.transition = 'transform 0.55s cubic-bezier(0.77, 0, 0.175, 1)';
        track.style.transform  = 'translateX(0%)';

        track.addEventListener('transitionend', () => {
          isAnimating.current = false;
        }, { once: true });
      });
    });
  }, [currentIndex]);

  const nextSlide = useCallback(() => {
    slideTo((currentIndex + 1) % features.length);
  }, [currentIndex, slideTo]);

  const prevSlide = useCallback(() => {
    slideTo((currentIndex - 1 + features.length) % features.length);
  }, [currentIndex, slideTo]);

  const goToSlide = useCallback((index) => {
    if (index === currentIndex) return;
    slideTo(index);
  }, [currentIndex, slideTo]);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(nextSlide, 4000);
    return () => clearInterval(id);
  }, [nextSlide, isPaused]);

  const current = features[currentIndex];

  return (
    <div
      className="cs-wrap"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="cs-bg" style={{ background: current.bg }} />

      <div className="cs-circle cs-circle-1" style={{ background: current.accent }} />
      <div className="cs-circle cs-circle-2" style={{ background: current.accent }} />
      <div className="cs-circle cs-circle-3" style={{ background: current.accent }} />

      {/* 슬라이드 트랙 전체가 translateX로 이동 */}
      <div className="cs-track" ref={trackRef}>
        <div className="cs-content">
          <div className="cs-badge" style={{ background: current.accent }}>
            {current.badge}
          </div>
          <div className="cs-subtitle">{current.subtitle}</div>
          <h2 className="cs-title">{current.title}</h2>
          <p className="cs-desc">{current.description}</p>
          <a
            href={current.link}
            className="cs-btn"
            style={{ background: current.btnColor }}
            onMouseEnter={e => (e.currentTarget.style.background = current.btnHover)}
            onMouseLeave={e => (e.currentTarget.style.background = current.btnColor)}
          >
            자세히 보기
          </a>
        </div>

        <div className="cs-image">
          <img src={current.image} alt={current.title} />
        </div>
      </div>

      <button className="cs-arrow cs-arrow-prev" onClick={prevSlide}>&#10094;</button>
      <button className="cs-arrow cs-arrow-next" onClick={nextSlide}>&#10095;</button>

      <div className="cs-dots">
        {features.map((_, i) => (
          <button
            key={i}
            className={`cs-dot ${i === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(i)}
          />
        ))}
      </div>

      {!isPaused && <div key={`progress-${currentIndex}`} className="cs-progress" />}
    </div>
  );
};

export default Carousel;