import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi"; // 햄버거 아이콘 추가
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 페이지가 변경될 때 메뉴를 자동으로 닫기
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMenuOpen(false); // 메뉴 닫기
    };

    // 페이지 변경될 때마다 호출
    window.addEventListener("popstate", handleRouteChange);
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  return (
    <header className="navbar">
      <nav className="nav-menu">
        {/* 햄버거 메뉴 아이콘 */}
        <button className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FiMenu size={35} color="white" /> {/* 아이콘 크기와 색상 설정 */}
        </button>

        {/* 기본 메뉴 */}
        <div className="nav-links"> 
          <div className="dropdown">
            <a href="#">직접 의류 디자인</a>
            <div className="dropdown-menu">
              <Link to="/client/clothes" onClick={() => setIsMenuOpen(false)}>
                템플릿으로 디자인
              </Link>
              <Link to="/client/Upload" onClick={() => setIsMenuOpen(false)}>
                디자인 파일 업로드
              </Link>
            </div>
          </div>
          <div className="dropdown">
            <a href="#">제작 의뢰 맡기기</a>
            <div className="dropdown-menu">
              <Link to="/client/request" onClick={() => setIsMenuOpen(false)}>
                의뢰 등록하기
              </Link>
              <Link to="/client/ChoseDesigner" onClick={() => setIsMenuOpen(false)}>
                디자이너 고르기
              </Link>
            </div>
          </div>
          <div className="dropdown">
            <a href="#">계약 관리</a>
            <div className="dropdown-menu">
              <Link to="/client/contract" onClick={() => setIsMenuOpen(false)}>
                계약서 조회 및 처리
              </Link>
              <Link to="/client/ContractSendMessagePage" onClick={() => setIsMenuOpen(false)}>
                계약 수정 건의
              </Link>
            </div>
          </div>

          <div className="dropdown">
            <a href="#">대화방</a>
            <div className="dropdown-menu">
              <Link to="/client/chatmain" onClick={() => setIsMenuOpen(false)}>
                일반 채팅방
              </Link>
            </div>
          </div>

          <div className="dropdown">
            <a href="/client/WrittenReviewPage">작성한 후기</a>
          </div>
        </div>
      </nav>

      {/* 전체 메뉴 클릭 시 펼쳐지는 영역 */}
      {isMenuOpen && (
        <div className="dropdown-container">
          <div className="dropdown-section">
            <h3>직접 의류 디자인</h3>
            <Link to="/client/clothes" onClick={() => setIsMenuOpen(false)}>
              템플릿으로 디자인
            </Link>
            <Link to="/client/Upload" onClick={() => setIsMenuOpen(false)}>
              디자인 파일 업로드
            </Link>
          </div>
          <div className="dropdown-section">
            <h3>제작 의뢰 맡기기</h3>
            <Link to="/client/request" onClick={() => setIsMenuOpen(false)}>
              의뢰 등록하기
            </Link>
            <Link to="/client/ChoseDesigner" onClick={() => setIsMenuOpen(false)}>
              디자이너 고르기
            </Link>
          </div>
          <div className="dropdown-section">
            <h3>계약 관리</h3>
            <Link to="/client/contract" onClick={() => setIsMenuOpen(false)}>
              계약서 조회 및 처리
            </Link>
            <Link to="/client/ContractSendMessagePage" onClick={() => setIsMenuOpen(false)}>
              계약 수정 건의
            </Link>
          </div>
          <div className="dropdown-section">
            <h3>대화방</h3>
            <Link to="/client/ChatMain" onClick={() => setIsMenuOpen(false)}>
              일반 채팅방
            </Link>
            <Link to="/client/chatmain" onClick={() => setIsMenuOpen(false)}>
              사용자 신고/차단
            </Link>
          </div>
          <div className="dropdown-section">
            <h3>마이페이지</h3>
            <Link to="/client/MyInfo" onClick={() => setIsMenuOpen(false)}>
              내 정보
            </Link>
            <Link to="/client/MyDesignsRequests" onClick={() => setIsMenuOpen(false)}>
              디자인&의뢰
            </Link>
            <Link to="/client/MyProgressPage" onClick={() => setIsMenuOpen(false)}>
              진행내역 조회
            </Link>
            <Link to="/client/WrittenReviewPage" onClick={() => setIsMenuOpen(false)}>
              작성한 후기
            </Link>
            <Link to="/client/FavoriteDesigners" onClick={() => setIsMenuOpen(false)}>
              찜한 디자이너
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
