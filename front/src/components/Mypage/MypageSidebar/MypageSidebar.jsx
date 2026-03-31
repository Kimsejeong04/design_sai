import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./MypageSidebar.css";
import WrittenReviews from '../../../pages/MyPage/WrittenReviewPage';

export default function MypageSidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <h2 style={{ color: "#799FC4" }}>마이페이지</h2>
      <hr />
      <ul>
        <li className={location.pathname === "/client/MyInfo" ? "active" : ""}>
          <Link to="/client/MyInfo">내 정보</Link>
        </li>
        <li className={location.pathname === "/client/MyDesignsRequests" ? "active" : ""}>
          <Link to="/client/MyDesignsRequests">디자인&의뢰</Link>
        </li>
        <li className={location.pathname === "/client/MyProgressPage" ? "active" : ""}>
          <Link to="/client/MyProgressPage">진행내역 조회</Link>
        </li>
        <li className={location.pathname === "/client/WrittenReviewPage" ? "active" : ""}>
          <Link to="/client/WrittenReviewPage">작성한 후기</Link>
        </li>
        <li className={location.pathname === "/client/FavoriteDesigners" ? "active" : ""}>
          <Link to="/client/FavoriteDesigners">찜한 디자이너</Link>
        </li>
      </ul>
    </div>
  );
}
