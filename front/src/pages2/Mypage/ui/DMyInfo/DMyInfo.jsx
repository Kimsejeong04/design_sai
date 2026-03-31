import React, { useState } from "react";
import "./DMyInfo.css";

// 분리한 컴포넌트 import
import ProfileSection from "./ProfileSection";
import PersonalInfoSection from "./PersonalInfoSection";
import CareerSection from "./CareerSection";

export default function DMyInfo() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="dmyinfo-container">
      <h2 className="dmyinfo-title">내 정보</h2>

      {/* 탭 메뉴 */}
      <div className="tab-menu">
        <button
          onClick={() => setActiveTab("profile")}
          className={activeTab === "profile" ? "active" : ""}
        >
          프로필
        </button>
        <button
          onClick={() => setActiveTab("personal")}
          className={activeTab === "personal" ? "active" : ""}
        >
          개인정보
        </button>
        <button
          onClick={() => setActiveTab("career")}
          className={activeTab === "career" ? "active" : ""}
        >
          이력사항
        </button>
      </div>

      {/* 탭 콘텐츠 */}
      <div className="tab-content">
        {activeTab === "profile" && <ProfileSection />}
        {activeTab === "personal" && <PersonalInfoSection />}
        {activeTab === "career" && <CareerSection />}
      </div>
    </div>
  );
}
