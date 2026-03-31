import React, { useState, useEffect } from "react";
import "./MainBanner.css";

const banners = [
  "배너 이미지 URL 1",
  "배너 이미지 URL 2",
  "배너 이미지 URL 3"
];

export default function MainBanner() {
  const [currentBanner, setCurrentBanner] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * banners.length);
    setCurrentBanner(banners[randomIndex]);
  }, []);

  return (
    <div className="main-banner" style={{ backgroundImage: `url(${currentBanner})` }}>
      <h1>Design Sai</h1>
      <p>여러 의뢰인들과 협업하며, 자신만의 디자인 세계를 개척해 나가세요!</p>
    </div>
  );
}
