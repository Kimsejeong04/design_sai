import React from "react";
import "./ProcessSteps.css";

const steps = [
  { title: "의뢰 찾기", description: "디자이너와 함께할 작업 의뢰를 찾아보고, 적합한 작업자를 검색하세요!" },
  { title: "제작 관리", description: "현재 작업하고 있는 디자인과 프로젝트를 관리해보세요!" },
  { title: "계약 관리", description: "거래를 안전하게 진행할 수 있도록 계약서를 확인하세요!" },
  { title: "대화방", description: "빠른 피드백과 의논을 위해 대화방을 활용하세요!" }
];

export default function ProcessSteps() {
  const baseColor = "157, 187, 213"; // #9DBBD5의 RGB 값
  const opacities = [0.3, 0.5, 0.8, 1]; // 원하는 투명도

  return (
    <div className="process-steps-container">
      <div className="process-steps">
        {steps.map((step, index) => (
          <div key={index} className="step">
            <div
              className="circle"
              style={{ backgroundColor: `rgba(${baseColor}, ${opacities[index]})` }}>
              {index + 1}
            </div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}