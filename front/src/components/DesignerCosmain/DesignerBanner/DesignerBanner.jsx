import React from "react";
import videoFile from "../../../assets/videos/DesignerBanner.mp4"; // import로 비디오 파일 불러오기
import "./DesignerBanner.css";

export default function DesignerBanner() {
  return (
    <div className="main-banner">
      {/* 배경 비디오 */}
      <video autoPlay loop muted className="background-video">
        <source src={videoFile} type="video/mp4" />
        당신의 브라우저가 video 태그를 지원하지 않습니다.
      </video>

      {/* 어두운 오버레이 */}
      <div className="overlay"></div>

      {/* 배너 콘텐츠 */}
      <div className="banner-content">
        <h1><span className="highlight">D</span>esign <span className="highlight">S</span>ai</h1>
        <p>여러 의뢰인들과 협업하며, 자신만의 디자인 세계를 개척해 나가세요!</p>
        <button
          className="banner-button"
          onClick={() => {
            window.location.href = "/designer/DMyPage";
          }}
        >
          지금 시작하기
        </button>
      </div>
    </div>
  );
}
