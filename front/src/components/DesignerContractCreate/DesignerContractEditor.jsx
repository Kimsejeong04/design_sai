import React, { useRef, useEffect, useState } from "react";
import styles from "./DesignerContractCreate.module.css";
import SampleClauseSidebar, { sampleTemplates } from "../../components/DesignerContractCreate/SampleClauseSidebar";

const sectionTitles = {
  basic: "기본",
  copyright: "저작권",
  cancellation: "취소",
  security: "보안",
  dispute: "분쟁",
  etc: "추가 작성란",
};

const DesignerContractEditor = ({ contractData, setContractData }) => {
  const refs = {
    basic: useRef(null),
    copyright: useRef(null),
    cancellation: useRef(null),
    security: useRef(null),
    dispute: useRef(null),
    etc: useRef(null),
  };

  const [showSamplePanel, setShowSamplePanel] = useState(false);
  const [sampleCategory, setSampleCategory] = useState("");

  const handleSampleInsert = (category, text) => {
    setContentBySection(prev => ({
      ...prev,
      [category]: prev[category] ? prev[category] + "\n" + text : text,
    }));
  };

  const [contentBySection, setContentBySection] = useState({
    basic: contractData.contractContentBySection?.basic || "",
    copyright: contractData.contractContentBySection?.copyright || "",
    cancellation: contractData.contractContentBySection?.cancellation || "",
    security: contractData.contractContentBySection?.security || "",
    dispute: contractData.contractContentBySection?.dispute || "",
    etc: contractData.contractContentBySection?.etc || "",
  });

  useEffect(() => {
    if (contractData.contractContentBySection) {
      setContentBySection(contractData.contractContentBySection);
    }
  }, [contractData.contractContentBySection]);

  const updateContent = (section, html) => {
    setContentBySection((prev) => {
      const updated = { ...prev, [section]: html };
      setContractData((prevParent) => ({
        ...prevParent,
        contractContentBySection: updated,
      }));
      return updated;
    });
  };

  const handleInput = (section) => {
    if (!refs[section].current) return;
    updateContent(section, refs[section].current.innerHTML);
  };

  const handleStyleChange = (section, style) => {
  if (!refs[section].current) return;
  refs[section].current.focus();

  const allowedStyles = ["bold", "italic"]; // 볼드, 이탤릭만 허용

  if (!allowedStyles.includes(style)) return;

  switch (style) {
    case "bold":
      document.execCommand("bold");
      break;
    case "italic":
      document.execCommand("italic");
      break;
    default:
      break;
  }

  updateContent(section, refs[section].current.innerHTML);
};

  const handleInsertText = (section, text) => {
  const editor = refs[section]?.current;
  if (!editor) return;

  editor.focus();

  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  const textNode = document.createTextNode(text);
  range.deleteContents();
  range.insertNode(textNode);

  // 커서 위치 업데이트
  range.setStartAfter(textNode);
  range.setEndAfter(textNode);
  selection.removeAllRanges();
  selection.addRange(range);

  updateContent(section, editor.innerHTML);
};

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, section) => {
    e.preventDefault();

    const data = e.dataTransfer.getData("text/plain");
    if (!data) return;

    const editor = refs[section].current;
    if (!editor) return;

    editor.focus(); // 섹션 focus 보장

    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(editor);
    range.collapse(false); // 끝으로 이동

    const textNode = document.createTextNode(data);
    range.insertNode(textNode);

    // 커서 위치 조정
    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);

    updateContent(section, editor.innerHTML);
  };

  return (
    <div>
      {Object.keys(sectionTitles).map((section) => (
        <div key={section} style={{ marginBottom: "2rem" }}>
          <h3>{sectionTitles[section]}</h3>

            {section !== "etc" && (
              <div>
                <button
                  onClick={() => {
                    setSampleCategory(section); // 클릭한 버튼의 섹션으로 설정
                    setShowSamplePanel(true);   // 사이드바 열기
                  }}
                  style={{
                    backgroundColor: "#799FC4",
                    color: "#fff",
                    padding: "0.5rem 1rem",
                    borderRadius: "5px",
                    border: "none",
                    marginBottom: "10px"
                  }}
                >
                  샘플 문구 보기
                </button>
                {showSamplePanel && (
                <SampleClauseSidebar
                  onInsert={handleSampleInsert}
                  onClose={() => setShowSamplePanel(false)}
                  selectedCategory={sampleCategory}
                />
              )}
              </div>
            )}

          <div
            ref={refs[section]}
            contentEditable
            placeholder={`${sectionTitles[section]} 내용을 입력하세요`}
            className={styles.editor}
            onBlur={() => handleInput(section)}  //사용자가 입력 다 하고 포커스 이동할 때만 처리됨.
            onDrop={(e) => handleDrop(e, section)}
            onDragOver={handleDragOver}
            spellCheck={false}
            dangerouslySetInnerHTML={{ __html: contentBySection[section] }}
            style={{
              border: "1px solid #ccc",
              minHeight: "120px",
              padding: "0.5rem",
              borderRadius: "4px",
              overflowY: "auto",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default DesignerContractEditor;
