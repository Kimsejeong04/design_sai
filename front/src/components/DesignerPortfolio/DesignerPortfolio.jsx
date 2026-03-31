import React from "react";
import { Link } from "react-router-dom";
import "./DesignerPortfolio.css";

// DesignerPortfolio 컴포넌트 내부에서 데이터를 처리
const DesignerPortfolio = () => {
  const designerList = [
    {
      id: 1,
      name: "홍길동",
      hashtags: ["#상의", "#캐주얼", "#린넨"],
      image: "/image/DesignerPortfolio/포트폴리오1.jpg", // 실제 이미지 경로 사용
    },
    {
      id: 2,
      name: "김디자이너",
      hashtags: ["#하의", "#원단고급", "#청바지"],
      image: "/image/DesignerPortfolio/포트폴리오2.jpg",
    },
    {
      id: 3,
      name: "이디자이너",
      hashtags: ["#자켓", "#세련됨", "#따듯"],
      image: "/image/DesignerPortfolio/포트폴리오3.jpg",
    },
    {
      id: 4,
      name: "박디자이너",
      hashtags: ["#상의", "#귀여움", "#편안함"],
      image: "/image/DesignerPortfolio/포트폴리오4.jpg",
    },
    {
      id: 5,
      name: "최디자이너",
      hashtags: ["#자켓", "#겨울", "#가벼운"],
      image: "/image/DesignerPortfolio/포트폴리오5.jpg",
    },
    {
      id: 6,
      name: "정디자이너",
      hashtags: ["#원단", "#고급", "#여성미"],
      image: "/image/DesignerPortfolio/포트폴리오6.jpg",
    },
    {
      id: 7,
      name: "강디자이너",
      hashtags: ["#원피스", "#시크", "#스트리트"],
      image: "/image/DesignerPortfolio/포트폴리오7.jpg",
    },
    {
      id: 8,
      name: "홍디자이너",
      hashtags: ["#상의", "#겨울", "#차분한"],
      image: "/image/DesignerPortfolio/포트폴리오8.jpg",
    },
  ];

  return (
    <div className="DesignerListContainer">
      {designerList.map((designer) => (
        <div className="DesignerPorfol" key={designer.id}>
          <div className="DesignerImg">
            <img src={designer.image} alt={`${designer.name} 이미지`} />
          </div>
          <h3 className="DesignerPorfol-title">
            {designer.name}
            <span className="DesignerSuffix"> 디자이너님</span>
          </h3>
          <p className="DesignerPorfol-text">
            {designer.hashtags.map((tag, index) => (
                <span className="DesignerHashtag" key={index}>{tag}</span>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DesignerPortfolio;
