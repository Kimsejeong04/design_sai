import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi"; // 햄버거 아이콘 추가
import "../Navbar/Navbar.css";

const DesignerNavbar = () => {
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
            <Link to="/designer/DesignerRequest" onClick={() => setIsMenuOpen(false)}>
                의뢰 찾기
              </Link>
            
              
            
          </div>
          <div className="dropdown">
            <a href="/designer/OngoingRequests">제작 관리</a>
            
          </div>
          <div className="dropdown">
            <a href="#">계약 관리</a>
            <div className="dropdown-menu">
              <Link to="/designer/DesignerContractCreate" onClick={() => setIsMenuOpen(false)}>
                계약서 작성
              </Link>
              <Link to="/designer/DesignerContractManage" onClick={() => setIsMenuOpen(false)}>
                계약서 관리
              </Link>
            </div>
          </div>
          <div className="dropdown">
            <a href="#">대화방</a>
            <div className="dropdown-menu">
              <Link to="/designer/chatmain" onClick={() => setIsMenuOpen(false)}>
                일반 채팅방
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 전체 메뉴 클릭 시 펼쳐지는 영역 */}
      {isMenuOpen && (
        <div className="dropdown-container">
          <div className="dropdown-section">
            <h3>의뢰 찾기</h3>
            <Link to="/designer/DesignerRequest" onClick={() => setIsMenuOpen(false)}>
              의뢰 찾아보기
            </Link>
          </div>
          <div className="dropdown-section">
            <h3>제작 관리</h3>
            <Link to="/designer/OngoingRequests" onClick={() => setIsMenuOpen(false)}>
              진행중인 의뢰내역
            </Link>
          </div>
          <div className="dropdown-section">
            <h3>계약 관리</h3>
              <Link to="/designer/DesignerContractCreate" onClick={() => setIsMenuOpen(false)}>
                계약서 작성
              </Link>
              <Link to="/designer/DesignerContractManage" onClick={() => setIsMenuOpen(false)}>
                계약서 관리
              </Link>
          </div>
          <div className="dropdown-section">
            <h3>대화방</h3>
            <Link to="/client/chatmain" onClick={() => setIsMenuOpen(false)}>
              일반 채팅방
            </Link>
            <Link to="/client/chatmain" onClick={() => setIsMenuOpen(false)}>
              사용자 신고/차단
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default DesignerNavbar;
