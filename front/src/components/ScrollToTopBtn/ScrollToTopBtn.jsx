// ScrollToTopButton.js
import React, { useState } from "react";
import "./ScrollToTopBtn.css";

const ScrollToTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true); // 스크롤이 300px 이상일 때 버튼 보이기
    } else {
      setIsVisible(false); // 그렇지 않으면 버튼 숨기기
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 부드럽게 위로 스크롤
    });
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    isVisible && (
      <button className="scroll-to-top" onClick={scrollToTop}>
        ↑
      </button>
    )
  );
};

export default ScrollToTopBtn;