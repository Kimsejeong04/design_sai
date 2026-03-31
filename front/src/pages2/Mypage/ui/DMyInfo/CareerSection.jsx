import React, { useState } from "react";
import CertificateModal from "./CertificateModal";
import EducationModal from "./EducationModal";

const fashionCerts = [
  "패션디자이너 자격증",
  "의류기사",
  "의상디자인산업기사",
  "패션머천다이저",
  "스타일리스트 자격증",
  "패션코디네이터",
  "텍스타일디자인 기사",
  "패션컬러리스트",
  "의류제품개발 전문가",
  "패션비즈니스 전문가",
];

const designCerts = [
  "어도비 포토샵",
  "일러스트레이터",
  "인디자인",
  "UX/UI 디자인",
];
const programmingCerts = [
  "정보처리기사",
  "자바 개발자",
  "웹 개발자",
  "리액트 전문가",
];

export default function CareerSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("design");
  const [selectedCerts, setSelectedCerts] = useState([]);
  const [careerPeriod, setCareerPeriod] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
   
  const [educationList, setEducationList] = useState([]);  // 학력목록 상태 추가
  const [certificationList, setCertificationList] = useState([]);   // 자격증 상태 추가
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  const certsToShow = (
    selectedCategory === "design" ? designCerts :
    selectedCategory === "programming" ? programmingCerts :
    fashionCerts
  ).filter(cert => cert.includes(searchTerm));

  const toggleCert = (cert) => {
    setSelectedCerts((prev) =>
      prev.includes(cert) ? prev.filter(c => c !== cert) : [...prev, cert]
    );
  };

  const handleAddCert = (newCert) => {
  if (!selectedCerts.includes(newCert)) {
    setSelectedCerts([...selectedCerts, newCert]);
  }
  };

  const handleAddEducation = (newEdu) => {
    setEducationList((prev) => [...prev, newEdu]);
  };

  const handleAddCertification = (newCert) => {
    setCertificationList((prev) => [...prev, newCert]);
  };


  return (
    <div className="form-section">
      <h3>이력사항</h3>

      {/* 보유기술 라벨 */}
      <label
        className="input-label"
        htmlFor="cert-search"
        style={{ color: "#6b7280", display: "block", marginBottom: "0.5rem" }}
      >
        보유기술<span style={{ color: "red" }}>*</span>
      </label>

      {/* 검색창 + 돋보기 아이콘 */}
      <div
        style={{
          position: "relative",
          width: "100%",
        }}
      >
        {/* 돋보기 아이콘 (SVG) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="gray"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          style={{
            position: "absolute",
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
            pointerEvents: "none",
          }}
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" />
        </svg>

        <input
          type="text"
          id="cert-search"
          placeholder="자격증 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            height: "2.5rem",
            padding: "0.4rem 0.5rem 0.4rem 2.5rem", // 왼쪽 패딩 충분히 줌
            borderRadius: "0.3rem",
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* 보유기술 박스 (카테고리 + 자격증리스트 + 선택한 자격증) */}
      <div
        style={{
          display: "flex",
          border: "1px solid #ccc",
          borderRadius: "0.5rem",
          padding: "1rem",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {/* 왼쪽: 카테고리 + 자격증 리스트 */}
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: "0.5rem" }}>
            <button
              type="button"
              onClick={() => setSelectedCategory("fashion")}
              style={{
                marginRight: "0.5rem",
                background: selectedCategory === "fashion" ? "#799FC4" : "#eee",
                color: selectedCategory === "fashion" ? "white" : "black",
                border: "none",
                padding: "0.3rem 0.6rem",
                borderRadius: "0.3rem",
                cursor: "pointer",
              }}
            >
              패션
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("design")}
              style={{
                marginRight: "0.5rem",
                background: selectedCategory === "design" ? "#799FC4" : "#eee",
                color: selectedCategory === "design" ? "white" : "black",
                border: "none",
                padding: "0.3rem 0.6rem",
                borderRadius: "0.3rem",
                cursor: "pointer",
              }}
            >
              디자인
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("programming")}
              style={{
                background: selectedCategory === "programming" ? "#799FC4" : "#eee",
                color: selectedCategory === "programming" ? "white" : "black",
                border: "none",
                padding: "0.3rem 0.6rem",
                borderRadius: "0.3rem",
                cursor: "pointer",
              }}
            >
              프로그래밍
            </button>
          </div>

          <div style={{ maxHeight: "120px", overflowY: "auto" }}>
            {certsToShow.length > 0 ? (
              certsToShow.map((cert) => (
                <div key={cert} style={{ marginBottom: "0.3rem" }}>
                  <label style={{ cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={selectedCerts.includes(cert)}
                      onChange={() => toggleCert(cert)}
                      style={{ marginRight: "0.5rem" }}
                    />
                    {cert}
                  </label>
                </div>
              ))
            ) : (
              <p style={{ color: "#888" }}>검색 결과가 없습니다.</p>
            )}
          </div>
        </div>

        {/* 오른쪽: 선택한 자격증 해시태그 (클릭 시 선택 해제 가능) */}
        <div
          style={{
            flex: 1,
            borderLeft: "1px solid #ccc",
            paddingLeft: "1rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            minHeight: "120px",
            alignContent: "flex-start",
          }}
        >
          {selectedCerts.length > 0 ? (
            selectedCerts.map((cert) => (
              <div
                key={cert}
                onClick={() => toggleCert(cert)}
                style={{
                  background: "#799FC4",
                  color: "white",
                  borderRadius: "1rem",
                  padding: "0.3rem 0.8rem",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  userSelect: "none",
                }}
                title="클릭하여 선택 해제"
              >
                {cert} &#10005;
              </div>
            ))
          ) : (
            <p style={{ color: "#888" }}>선택된 자격증이 없습니다.</p>
          )}
        </div>
      </div>

      {/* 경력사항 */}
      <div
        className="input-group horizontal"
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "2rem",
          gap: "1rem",
        }}
      >
        <label
          className="input-label"
          htmlFor="career-period"
          style={{ minWidth: "80px", color: "#6b7280" }}
        >
          경력사항<span style={{ color: "red" }}>*</span>
        </label>
        <select
          id="career-period"
          value={careerPeriod}
          onChange={(e) => setCareerPeriod(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: "0.3rem",
            border: "1px solid #ccc",
            minWidth: "150px",
          }}
        >
          <option value="">선택하세요</option>
          <option value="신입">신입</option>
          <option value="1년 이하">1년 이하</option>
          <option value="2년">2년</option>
          <option value="3년">3년</option>
          <option value="4년">4년</option>
          <option value="5년">5년</option>
          <option value="6년">6년</option>
          <option value="7년 이상">7년 이상</option>
        </select>
        <div
          style={{
            marginLeft: "auto",
            color: "#2a71d0",
            fontSize: "0.85rem",
            whiteSpace: "nowrap",
          }}
        >
          TIP. 전문 분야와 직접적으로 연관된 총 경력 기간을 선택해 주세요.
        </div>
      </div>

      {/* 학력추가 버튼 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "1.5rem",
          gap: "1rem",
        }}
      >
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          style={{
            padding: "0.6rem 1.2rem",
            fontSize: "0.95rem",
            backgroundColor: "#799FC4",
            color: "white",
            border: "none",
            borderRadius: "0.4rem",
            cursor: "pointer",
            flexShrink: 0, // 버튼 사이즈 줄지 않게
          }}
        >
          학력 추가
        </button>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            maxWidth: "100%",
            overflowX: "auto",
            padding: "0.3rem 0.5rem",
            border: "1px solid #ccc",
            borderRadius: "0.5rem",
            flex: 1,
          }}
        >
          {educationList.length > 0 ? (
            educationList.map((edu, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#E5EDF5",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "1rem",
                  fontSize: "0.9rem",
                  whiteSpace: "nowrap",
                }}
              >
                학교명: {edu.school} / 전공: {edu.major} / 재적 상태: {edu.status}
              </div>
            ))
          ) : (
            <span style={{ color: "#888" }}>추가된 학력이 없습니다.</span>
          )}
        </div>
      </div>



      {/* 자격증 추가 버튼 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "1.5rem",
          gap: "1rem",
        }}
      >
        <button
          type="button"
          onClick={() => setIsCertModalOpen(true)}
          style={{
            padding: "0.6rem 1.2rem",
            fontSize: "0.95rem",
            backgroundColor: "#799FC4",
            color: "white",
            border: "none",
            borderRadius: "0.4rem",
            cursor: "pointer",
            flexShrink: 0, // 버튼 사이즈 줄지 않게
          }}
        >
          자격증 추가
        </button>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            maxWidth: "100%",
            overflowX: "auto",
            padding: "0.3rem 0.5rem",
            border: "1px solid #ccc",
            borderRadius: "0.5rem",
            flex: 1,
          }}
        >
          {certificationList.length > 0 ? (
            certificationList.map((cert, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#E5EDF5",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "1rem",
                  fontSize: "0.9rem",
                  whiteSpace: "nowrap",
                }}
              >
                자격증명: {cert.name} / 발행기관: {cert.agency} / 취득일자: {cert.date}
              </div>
            ))
          ) : (
            <span style={{ color: "#888" }}>추가된 자격증이 없습니다.</span>
          )}
        </div>
      </div>



      {/* 학력 모달 렌더링 */}
      {isModalOpen && (
        <EducationModal
          onClose={() => setIsModalOpen(false)}
          onAddCert={handleAddEducation}
        />
      )}

      {/* 자격증 모달 */}
      {isCertModalOpen && (
        <CertificateModal
          onClose={() => setIsCertModalOpen(false)}
          onAddCertification={handleAddCertification}
        />
      )}

      {/* 하단 버튼 */}
      <div className="action-buttons">
        <button className="save-button">저장</button>
        <button className="cancel-button">취소</button>
      </div>
    </div>
  );
}
