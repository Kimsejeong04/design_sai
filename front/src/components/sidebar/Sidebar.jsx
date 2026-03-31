import React from "react";
import "./Sidebar.css"; // 필요한 스타일링 파일

const Sidebar = ({ activePage }) => {
  return (
    <div className="final-confirmation-container">
      {/* 왼쪽 카테고리 */}
      <aside className="sidebar">
        <h3>템플릿으로 디자인</h3>
        <hr />
        <ul>
          {[ "의류 종류 선택", "원단 선택", "사이즈 스펙 입력", "최종 확인" ].map((text, index) => {
            const stepNumber = index + 1;
            return (
              <li key={stepNumber} className={activePage === stepNumber ? "active" : ""}>
                <span className={`step-circle ${activePage === stepNumber ? "filled" : ""}`}>
                  {stepNumber}
                </span>
                {text}
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
