import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "./Navbar.css";

const menuData = [
  {
    label: "직접 의류 디자인",
    sub: [
      { text: "템플릿으로 디자인", to: "/client/clothes" },
      { text: "디자인 파일 업로드", to: "/client/Upload" },
    ],
  },
  {
    label: "제작 의뢰 맡기기",
    sub: [
      { text: "의뢰 등록하기", to: "/client/request" },
      { text: "디자이너 고르기", to: "/client/ChoseDesigner" },
    ],
  },
  {
    label: "계약 관리",
    sub: [
      { text: "계약서 조회 및 처리", to: "/client/contract" },
      { text: "계약 수정 건의", to: "/client/ContractSendMessagePage" },
    ],
  },
  {
    label: "대화방",
    sub: [
      { text: "일반 채팅방", to: "/client/chatmain" },
    ],
  },
  {
    label: "작성한 후기",
    to: "/client/WrittenReviewPage",
    sub: [],
  },
];

const mypageData = {
  label: "마이페이지",
  sub: [
    { text: "내 정보", to: "/client/MyInfo" },
    { text: "디자인&의뢰", to: "/client/MyDesignsRequests" },
    { text: "진행내역 조회", to: "/client/MyProgressPage" },
    { text: "작성한 후기", to: "/client/WrittenReviewPage" },
    { text: "찜한 디자이너", to: "/client/FavoriteDesigners" },
  ],
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null); // 언더라인용 hover 상태
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
    setHoveredItem(null);
  }, [location.pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <header className="navbar">
      {/* ── 메인 네비게이션 바 ── */}
      <nav className="nav-menu">
        {/* 햄버거 버튼 */}
        <button
          className="menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="전체 메뉴"
        >
          {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

        {/* 중앙 메뉴 링크들 */}
        <div className="nav-links">
          {menuData.map((menu) => (
            <div
              key={menu.label}
              className="nav-item-wrapper"
              onMouseEnter={() => {
                setHoveredItem(menu.label);
                if (menu.sub.length > 0) setActiveDropdown(menu.label);
              }}
              onMouseLeave={() => {
                setHoveredItem(null);
                setActiveDropdown(null);
              }}
            >
              {/* 메뉴 라벨 — Link든 span이든 동일하게 렌더링 */}
              {menu.to ? (
                <Link to={menu.to} className="nav-link">
                  {menu.label}
                  <span className={`nav-underline ${hoveredItem === menu.label ? "active" : ""}`} />
                </Link>
              ) : (
                <span className="nav-link">
                  {menu.label}
                  <span className={`nav-underline ${hoveredItem === menu.label ? "active" : ""}`} />
                </span>
              )}

              {/* hover 드롭다운 */}
              {menu.sub.length > 0 && (
                <div
                  className={`dropdown-panel ${activeDropdown === menu.label ? "visible" : ""}`}
                  onMouseEnter={() => {
                    setHoveredItem(menu.label);
                    setActiveDropdown(menu.label);
                  }}
                  onMouseLeave={() => {
                    setHoveredItem(null);
                    setActiveDropdown(null);
                  }}
                >
                  {menu.sub.map((item) => (
                    <Link key={item.text} to={item.to} className="dropdown-link">
                      {item.text}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* ── 햄버거 전체 메뉴 패널 ── */}
      <div className={`fullmenu-panel ${isMenuOpen ? "open" : ""}`}>
        <div className="fullmenu-inner">
          {/* 일반 메뉴 섹션들 */}
          {menuData.map((menu) => (
            <div key={menu.label} className="fullmenu-section">
              <p className="fullmenu-title">{menu.label}</p>
              {menu.sub.length > 0 ? (
                menu.sub.map((item) => (
                  <Link key={item.text} to={item.to} className="fullmenu-link">
                    {item.text}
                  </Link>
                ))
              ) : (
                <Link to={menu.to} className="fullmenu-link">
                  바로가기
                </Link>
              )}
            </div>
          ))}

          {/* 마이페이지 섹션 */}
          <div className="fullmenu-section">
            <p className="fullmenu-title">{mypageData.label}</p>
            {mypageData.sub.map((item) => (
              <Link key={item.text} to={item.to} className="fullmenu-link">
                {item.text}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 오버레이 (바깥 클릭 시 닫기) */}
      {isMenuOpen && (
        <div className="fullmenu-overlay" onClick={() => setIsMenuOpen(false)} />
      )}
    </header>
  );
};

export default Navbar;