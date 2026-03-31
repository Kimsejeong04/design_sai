import React, { useState, useEffect } from 'react';
import './Carousel2.css';

const Carousel2 = ({ latestTemplate, latestUpload }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const features = [
    {
      title: '최신 디자인 보러가기:디자인 파일 업로드',
      description: '디자인 파일을 업로드하여 만들어낸 최신 디자인을 확인해보세요!',
      link: '/client/clothing-order',
      image: latestUpload ? `http://localhost:8081/files/view/${latestUpload.fileName}` : '/image/banner2-fileuploaddesign.png',
      designTitle: latestUpload ? latestUpload.uploadedAt : '(제목)원피스 디자인했던거 ㆍ 2025.02.11',
      backgroundColor: '#DAFFF1',
    },
    {
      title: '최신 디자인 보러가기:템플릿으로 디자인',
      description: '기본 템플릿을 이용해 만들어낸 최신 디자인을 살펴보세요!',
      link: '/client/customer-support',
      image: latestTemplate ? latestTemplate.imageUrl : '/image/banner2-templatedesign.png',
      designTitle: latestTemplate ? latestTemplate.designName : '(제목)살랑 원피스 디자인들 ㆍ 2025.02.11',
      backgroundColor: '#F3E7FF',
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + features.length) % features.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="carousel2-container" style={{ backgroundColor: features[currentIndex].backgroundColor }}>
      <div className="carousel2">
        <div className="carousel2-item">
          <div className="carousel2-content">
            <h3>{features[currentIndex].title}</h3>
            <p className="description2">{features[currentIndex].description}</p>
            <img
              src={features[currentIndex].image}
              alt={features[currentIndex].designTitle}
            />
            <p className="design-Title2">{features[currentIndex].designTitle}</p>
            <a href={features[currentIndex].link} className="carousel-button">
              더 보기
            </a>
            <div className="dots-container">
              {features.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </div>
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