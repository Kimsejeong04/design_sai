import React, { useState, useEffect, useRef } from "react";
import { MdDescription } from "react-icons/md";
import DesignerContractInputSection from "../../components/DesignerContractCreate/DesignerContractInputSection";
import DesignerContractEditor from "../../components/DesignerContractCreate/DesignerContractEditor";
import DesignerContractFileUpload from "../../components/DesignerContractCreate/DesignerContractFileUpload";
import SampleClauseSidebar, { sampleTemplates } from "../../components/DesignerContractCreate/SampleClauseSidebar";
import DesignerLayout from "../../DesignerLayout";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import ContractPreview from "../../components/DesignerContractCreate/ContractPreview";

const deliverableOptions = ["상의", "아우터", "바지", "원피스", "스커트", "스니커즈", "신발", "가방",];

const DesignerContractCreatePage = ({ clientId }) => {
  const [contractData, setContractData] = useState({
    requestId: "",
    designerId: "",
    dueDate: "",     
    createdAt: "",   
    requestFee: "",
    status: "미수신",
    clientId: clientId || "",
    contractTitle: "",
    starredStatus: 0,
    contractContent: "",
    signature: "",
    step: 1,
    
  });

  const [contentBySection, setContentBySection] = useState({
    basic: "",
    copyright: "",
    cancellation: "",
    security: "",
    dispute: "",
    etc: "",
  });

  const [showSamplePanel, setShowSamplePanel] = useState(false);
  const [agreeToAll, setAgreeToAll] = useState(false);
  const [deliverables, setDeliverables] = useState([]);
  const [sampleCategory, setSampleCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDesignerUsername = async () => {
      try {
        // 세션 쿠키를 포함하여 요청
        const response = await fetch("http://localhost:8081/api/user", {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          if (data.username) {
            console.log("✅ 세션에서 username 획득:", data.username);
            setContractData(prev => ({
              ...prev,
              designerId: data.username,
            }));
          } else {
            console.warn("❗ 세션은 있지만 username 없음");
            // username이 없을 경우의 처리 (예: 로그인 페이지로 리다이렉트)
            // navigate("/login");
          }
        } else {
          console.error("Failed to fetch current user session:", response.status);
          // 세션이 없거나 오류 발생 시
          // navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching current user session:", error);
        // 네트워크 오류 등 발생 시
      }
    };

    fetchDesignerUsername();

    const saved = localStorage.getItem("contractDraft");
    if (saved) {
      const parsed = JSON.parse(saved);
      setContractData(prev => ({
        ...prev,
        ...parsed.contractData,
        designerId: prev.designerId || parsed.contractData?.designerId || "",
      }));
      setDeliverables(parsed.deliverables || []);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contractDraft", JSON.stringify({ contractData, deliverables }));
  }, [contractData, deliverables]);

  const handleSampleInsert = (text) => {
    setContractData(prev => ({
      ...prev,
      contractContent: prev.contractContent
        ? prev.contractContent + "\n" + text
        : text,
    }));
  };

  const handleSubmit = async () => {
    console.log("계약 제목:", contractData.contractTitle);
  console.log("마감일:", contractData.dueDate);
  console.log("요청 비용:", contractData.requestFee);
  
    if (!contractData.designerId) {
      alert("디자이너 정보가 없습니다. 다시 로그인 해주세요.");
      return;
    }
      
    if (!contractData.contractTitle || !contractData.dueDate || !contractData.requestFee) {
    alert("계약 제목, 마감일, 요청 비용을 모두 입력해주세요.");
    return;
  }

  const requestFee = Number(contractData.requestFee.replace(/,/g, ""));
  if (isNaN(requestFee)) {
    alert("유효한 요청 비용을 입력해주세요.");
    return;
  }

  if (!contractData.signature) {
    alert("서명을 입력해주세요.");
    return;
  }

  const fullContractContent = Object.values(contentBySection)
  .map(section => {
    if (typeof section === "string") return section;
    else if (typeof section === "object" && section !== null) return JSON.stringify(section);
    else return "";
  })
  .filter(Boolean)
  .join("\n\n");

  console.log("🌟 서버로 전송될 최종 계약 내용 (fullContractContent):", fullContractContent);
  console.log("🌟 최종 계약 내용의 길이:", fullContractContent.length);

  try {
    const response = await fetch("http://localhost:8081/client/contract", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...contractData,
        contractContent: fullContractContent,
        requestFee,
        deliverables,
      }),
    });

    if (response.ok) {
      alert("작성 완료! 계약서가 저장되었습니다.");
      navigate("/designer/DesignerContractManage");
    } else {
      alert("작성 실패했습니다. 다시 시도해주세요.");
    }
  } catch (error) {
    console.error("작성 중 오류 발생:", error);
    alert("작성 중 오류가 발생했습니다.");
  }
};

  const handleCancel = () => {
    if (window.confirm("정말 작성 취소하시겠습니까?")) {
      setContractData({
        requestId: "",
        designerId: contractData.designerId,
        dueDate: "",     
        createdAt: "", 
        requestFee: "",
        status: "미수신",
        clientId: clientId || "",
        contractTitle: "",
        starredStatus: 0,
        contractContent: "",
        signature: "",
      });
      setDeliverables([]);
      setContentBySection({
        basic: "",
        copyright: "",
        cancellation: "",
        security: "",
        dispute: "",
        etc: "",
      });
      localStorage.removeItem("contractDraft");
    }
  };

  const handleDeliverableChange = (item) => {
    if (deliverables.includes(item)) {
      setDeliverables(deliverables.filter(d => d !== item));
    } else {
      setDeliverables([...deliverables, item]);
    }
  };

  const formatNumberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleFeeChange = (e) => {
    const value = e.target.value.replace(/,/g, "");
    if (!isNaN(value) || value === "") {
      setContractData(prev => ({
        ...prev,
        requestFee: value === "" ? "" : formatNumberWithCommas(value),
      }));
    }
  };

  const componentRef = useRef();
  const [showPreview, setShowPreview] = useState(false);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: contractData.contractTitle || "계약서",
  });

  return (    
    <div
      style={{
        padding: "1.875rem",
        maxWidth: "62.5rem",
        margin: "0 auto",
        marginTop: "1.25rem",
        marginBottom: "1.25rem",
        backgroundColor: "#fff",
        borderRadius: "0.625rem",
        boxShadow: "0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1
        style={{
          fontSize: "1.75rem",
          marginBottom: "1.875rem",
          color: "#799FC4",
          display: "flex",
          alignItems: "center",
        }}
      >
        <MdDescription style={{ marginRight: "0.625rem", fontSize: "2rem" }} />
        계약서 작성
      </h1>

      <DesignerContractInputSection 
        contractData={contractData} 
        setContractData={setContractData} 
        handleFeeChange={handleFeeChange}
      />

      <br/>
      <div style={{ margin: "1.5rem 0" }}>
        <hr style={{  border: "0.7px solid #E6E6E6", margin: "1.3rem 0" }} />
        <h2 style={{ fontSize: "1.4375rem", marginBottom: "1.5rem" }}> 카테고리 선택</h2>
        {deliverableOptions.map((item, idx) => (
          <label key={idx} style={{ marginRight: "1rem", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={deliverables.includes(item)}
              onChange={() => handleDeliverableChange(item)}
              style={{ marginRight: "0.25rem" }}
            />
            {item}
          </label>
        ))}
      </div>

      <hr style={{ border: "1px solid #E6E6E6", margin: "1.3rem 0" }} />

      <DesignerContractEditor
        contractData={contentBySection}
        setContractData={setContentBySection}
      />

      <br/><br/>

      <DesignerContractFileUpload />

      <br/><br/>

      <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <label htmlFor="signature" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
          서명 (이름 입력)
        </label>
        <input
          type="text"
          id="signature"
          placeholder="서명 입력 (이름)"
          value={contractData.signature}
          onChange={e => setContractData({ ...contractData, signature: e.target.value })}
          style={{
            width: "100%",
            padding: "0.5rem",
            fontSize: "1rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <hr style={{ border: "1px solid #E6E6E6", marginBottom: "1rem" }} />

      <div style={{ marginBottom: "1.5rem", fontSize: "0.9rem", color: "#555" }}>
      <input
        type="checkbox"
        checked={agreeToAll}
        onChange={(e) => setAgreeToAll(e.target.checked)}
      />
      <label>
        개인정보 수집 및 이용안내(필수, 선택)에 모두 동의합니다.
      </label>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.5rem" }}>
      <button
        onClick={() => setShowPreview(true)}
        style={{
          backgroundColor: "#f0f4f8",
          color: "#799FC4",
          padding: "0.6rem 1.5rem",
          borderRadius: "6px",
          border: "1px solid #799FC4",
          minWidth: "100px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        미리보기
      </button>

      <button
        onClick={handleCancel}
        style={{
          backgroundColor: "#eee",
          color: "#999",
          padding: "0.6rem 1.5rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
          minWidth: "100px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        취소
      </button>

      <button
        onClick={handleSubmit}
        disabled={!agreeToAll}
        style={{
          backgroundColor: agreeToAll ? "#799FC4" : "#ccc",
          color: "#fff",
          padding: "0.6rem 1.5rem",
          borderRadius: "6px",
          border: "none",
          minWidth: "100px",
          fontWeight: "bold",
          cursor: agreeToAll ? "pointer" : "not-allowed",
          opacity: agreeToAll ? 1 : 0.6,
          transition: "background-color 0.3s ease",
        }}
      >
        작성 완료
      </button>
    </div>

      {showPreview && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "2rem",
              borderRadius: "10px",
              maxWidth: "100%",
              maxHeight: "90%",
              overflowY: "auto",
            }}
          >
            <ContractPreview
              ref={componentRef}
              contractData={contractData}
              contentBySection={contentBySection}
              deliverables={deliverables}
              onClose={() => setShowPreview(false)}
              onPrint={handlePrint}
            />
          </div>
        </div>
      )}
    </div>
  );
};

DesignerContractCreatePage.getLayout = function getLayout(page) {
  return <DesignerLayout>{page}</DesignerLayout>;
};

export default DesignerContractCreatePage;