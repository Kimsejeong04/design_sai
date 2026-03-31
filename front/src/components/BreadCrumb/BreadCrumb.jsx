import React from "react";
import "./BreadCrumb.css"; // 스타일 파일

// activePage prop은 1, 2, 3, 4 등의 값을 가질 것으로 가정
const BreadCrumb = ({ activePage }) => {
  return (
    <nav className="breadcrumb">
      <a href="#" className={activePage === 1 ? "active" : "default"}>
        의류 종류
      </a>
      &gt;
      <a href="#" className={activePage === 2 ? "active" : "default"}>
        원단 선택
      </a>
      &gt;
      <a href="#" className={activePage === 3 ? "active" : "default"}>
        사이즈 스펙
      </a>
      &gt;
      <a href="#" className={activePage === 4 ? "active" : "default"}>
        최종 확인
      </a>
    </nav>
  );
};

export default BreadCrumb;
