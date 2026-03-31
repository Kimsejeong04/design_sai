import React from "react";
import styles from "./DesignerContractCreate.module.css";

export const sampleTemplates = {
  basic: [
    "의뢰인은 제공된 자료(사진, 로고 등)에 대해 사용 권한이 있음을 보장합니다.",
    "디자이너는 의뢰인의 컨셉과 브리프에 따라 1차 시안을 제출합니다.",
    "1차 시안 제출 후 최대 2회까지 수정 요청이 가능합니다.",
    "작업 기간은 의뢰일로부터 평균 14일 내외로 소요됩니다.",
    "의뢰인의 피드백 지연 시 전체 일정이 조정될 수 있습니다.",
  ],
  copyright: [
    "제작된 디자인의 소유권과 저작권은 별도 명시가 없는 한 디자이너에게 귀속됩니다.",
    "의뢰인은 결과물을 상업적 목적으로 사용할 경우, 별도의 계약 조항을 통해 협의합니다.",
    "디자이너는 사전 동의 없이 의뢰인의 브랜드를 외부에 공개하지 않습니다.",
    "의류에 적용된 디자인은 표절이 없는 순수 창작물임을 디자이너가 보증합니다.",
  ],
  cancellation: [
    "작업이 시작된 이후 계약 해지 시, 완료된 작업분에 대한 비용은 환불되지 않습니다.",
    "의뢰인의 요청에 의해 작업 범위가 변경될 경우, 추가 비용이 발생할 수 있습니다.",
    "지연된 피드백이나 자료 제공으로 인한 일정 변경은 디자이너의 책임이 아닙니다.",
  ],
  security: [
    "의뢰 과정에서 주고받은 모든 파일과 정보는 외부에 공유되지 않습니다.",
    "서로의 동의 없이 제3자에게 계약 내용을 전달하거나 공개할 수 없습니다.",
    "보안 유지 기간은 계약 종료 후 6개월로 합니다.",  
  ],
  dispute: [
    "분쟁 발생 시 상호 협의를 우선으로 하며, 해결되지 않으면 중재 기관에 의뢰합니다.",
    "본 계약과 관련된 모든 분쟁은 서울중앙지방법원을 1심 관할 법원으로 합니다.",
    "양 당사자는 계약상 분쟁 발생 시, 원만한 합의를 위해 성실히 협의합니다.",
    "계약 조항의 해석에 이견이 발생할 경우, 디자이너의 표준계약서 기준을 따릅니다.",
  ],
};

const categoryNames = {
  basic: "기본",
  copyright: "저작권",
  cancellation: "취소",
  security: "보안",
  dispute: "분쟁",
};



// CSS 스타일 객체 예시
const tabContainerStyle = {
  marginBottom: "1rem",
  whiteSpace: "normal", // 자동 줄바꿈 허용
  overflowX: "hidden",  // 가로 스크롤 제거
  display: "flex",
  flexWrap: "wrap",     // 줄바꿈 가능하게
  gap: "0.5rem",        // 버튼 간 간격
};

const tabButtonStyle = (isActive) => ({
  flex: "1 1 auto",     // 가변 크기 허용
  minWidth: "80px",     // 최소 너비 지정
  fontSize: "1rem",     // 글자 크기 키우기
  marginBottom: 0,
  backgroundColor: isActive ? "#799FC4" : "#ccc",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  padding: "0.6rem 1rem", // 버튼 패딩 키우기
  cursor: "pointer",
  transition: "background-color 0.3s",
  textAlign: "center",
});

const SampleClauseSidebar = ({ onInsert, onClose, selectedCategory }) => {
  const [category, setCategory] = React.useState(selectedCategory || "basic");

  React.useEffect(() => {
    if (selectedCategory && selectedCategory !== category) {
      setCategory(selectedCategory);
    }
  }, [selectedCategory]);

   return (
    <div className={styles.sidebar}>
      <button onClick={onClose} className={styles.closeButton}>닫기</button>
      <h3 className={styles.title}>샘플 문구</h3>

      <div className={styles.tabContainer}>
        {Object.keys(sampleTemplates).map((key) => (
          <button
            key={key}
            onClick={() => setCategory(key)}
            className={`${styles.tabButton} ${category === key ? styles.tabButtonActive : ""}`}
          >
            {categoryNames[key]}
          </button>
        ))}
      </div>

      <ul className={styles.templateList}>
        {(sampleTemplates[category] || []).map((text, idx) => (
          <li key={idx} style={{ marginBottom: "0.75rem" }}>
            <button
              draggable={true}
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", text);
              }}
              onClick={() => onInsert(category, text)}
              className={styles.templateButton}
            >
              {text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SampleClauseSidebar;