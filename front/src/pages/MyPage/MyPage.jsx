// MyPage.jsx
import React, { useState } from "react";
import MypageSidebar from "../../components/Mypage/MypageSidebar";   
import MypageContent from "../../components/Mypage/MypageContent";
import './MyPage.css'

const MyPage = () => {

  return (
    <div className="mypage-container">
      <div className="mypage-sidebar">
        <MypageSidebar />  {/* 사이드바 컴포넌트 */}
      </div>

      <div className="mypage-content">
        <p style={{fontSize:'15px'}}>마이페이지 &gt; 디자인&의뢰</p>
        <h2>
          디자인&의뢰
        </h2>
        <MypageContent/>
      </div>
    </div>
  );
};

export default MyPage;
