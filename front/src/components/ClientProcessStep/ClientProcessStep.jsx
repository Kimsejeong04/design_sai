import React from "react";
import { Link } from "react-router-dom";
import "./ClientProcessStep.css";

const ClientSteps = [
  {
    title: "직접의류디자인",
    description: "템플릿 선택, 디자인 업로드, 브랜드 검색으로 직접 디자인!",
    path: "/client/clothes"
  },
  {
    title: "제작의뢰맡기기",
    description: "의뢰를 등록하고 원하는 디자이너를 선택하세요!",
    path: "/client/request"
  },
  {
    title: "계약 관리",
    description: "작업 전 계약서를 확인하고 안전한 거래를 진행해보세요!",
    path: "/client/contract"
  },
  {
    title: "대화방",
    description: "피드백과 실시간 소통은 대화방에서!",
    path: "/client/chatmain"
  }
];

export default function ClientProcessStep() {
  const baseColor = "157, 187, 213";
  const opacities = [0.3, 0.5, 0.8, 1];

  return (
    <div className="process-steps-container">
      <div className="process-steps">
        {ClientSteps.map((step, index) => (
          <Link to={step.path} key={index} className="step-link">
            <div className="step" style={{ cursor: "pointer" }}>
              <div
                className="circle"
                style={{ backgroundColor: `rgba(${baseColor}, ${opacities[index]})` }}
              >
                {index + 1}
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
