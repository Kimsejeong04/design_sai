import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Fabric/Fabric.css";
import Sizespec from "./Sizespec";
import SizeBottom from "./SizeBottom"; 
import SizeDress from "./SizeDress";
import SizeSkirt from "./SizeSkirt";
import Sizespecbutton from "./Sizespecbutton";
import { Sidebar, BreadCrumb } from "../../../../components";
import axios from "axios";
import SizeCoat from "./SizeCoat";
import html2canvas from "html2canvas"; 

const Size = () => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [category, setCategory] = useState(null); // '상의', '바지' 등 카테고리 저장
  const [clothingName, setClothingName] = useState("");
  const navigate = useNavigate();
  
  // 하위 컴포넌트의 초기화 함수를 호출하기 위한 리모컨
  const sizespecRef = useRef(null);
  const sizeBottomRef = useRef(null);
  const sizeDressRef = useRef(null);
  const sizeSkirtRef = useRef(null);
  const sizeCoatRef = useRef(null);

  const captureRef = useRef(null);

  useEffect(() => {
    const storedClothing = localStorage.getItem("selectedClothing");
    if (storedClothing) {
      try {
        const clothing = JSON.parse(storedClothing);
        setCategory(clothing.category); // 예: "상의" 또는 "바지"
        setClothingName(clothing.name || clothing.label || clothing.category || "");
      } catch (e) {
        console.error("selectedClothing 파싱 오류:", e);
      }
    }
  }, []);

  const handleSave = async () => {
    if (!selectedSize) {
      alert("사이즈를 선택해 주세요.");
      return;
    }
    
    try {
      const targetElement = document.getElementById("capture-target");

      if (!targetElement) {
        console.error("캡처 영역(capture-target)을 찾을 수 없습니다.");
        return; 
      }

      sessionStorage.removeItem("designImage");

      const canvas = await html2canvas(targetElement, {
        backgroundColor: "#ffffff", 
        scale: 2,                  
        useCORS: true,             
      });
      
      const imgData = canvas.toDataURL("image/png");
      
      if (imgData && imgData !== "data:," && imgData.length > 1000) {
        sessionStorage.setItem("designImage", imgData);
        sessionStorage.setItem("selectedSize", selectedSize);
        
        navigate("/client/FinalConfirmation");
      } else {
        console.error("의상 이미지 캡처 실패: 빈 이미지 생성됨");
      }

    } catch (error) {
      console.error("이미지 생성 중 오류 발생:", error);
    }
  };

  const renderSizeComponent = () => {
    switch (category) {
      case "상의": 
        return (
          <Sizespec 
            ref={sizespecRef} 
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize} 
            clothingType={clothingName}
          />
        );
      case "바지":
        return (
          <SizeBottom
            actionRef={sizeBottomRef} 
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
        );
      case "아우터":
        return (
          <SizeCoat 
            actionRef={sizeCoatRef} 
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            clothingType={clothingName} 
          />
        );
      case "원피스":
        return (
          <SizeDress 
            actionRef={sizeDressRef} 
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            clothingType={clothingName}
            />
        );
      case "스커트":
        return (
          <SizeSkirt 
            actionRef={sizeSkirtRef} 
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize} 
            clothingType={clothingName}
          />
        );
      default:
        return <div>옷 종류를 선택해주세요. (현재 카테고리: {category})</div>;
    }
  };

  const handleReset = () => {
    if (category === "상의" && sizespecRef.current) {
      sizespecRef.current.triggerReset();
    } else if (category === "바지" && sizeBottomRef.current) {
      sizeBottomRef.current.triggerReset();
    }else if (category === "원피스" && sizeDressRef.current) {
      sizeDressRef.current.triggerReset(); 
    }else if (category === "스커트" && sizeSkirtRef.current) {
      sizeSkirtRef.current.triggerReset(); 
    }else if (category === "아우터" && sizeCoatRef.current) {
      sizeCoatRef.current.triggerReset(); 
    }
  };

  return (
    <div className="clothes-container">
      <div className="layout1">
        <aside>
          <Sidebar activePage={3} />
        </aside>

        <div className="content1">
          <BreadCrumb activePage={3} />
          <h3>3. 사이즈 스펙 입력</h3>
          <hr /><br /><br />

          <div ref={captureRef} className="size-component-wrapper" style={{ backgroundColor: "#ffffff", padding: "10px" }}>
            {renderSizeComponent()}
          </div>
          
          <div className="footer button_size">
            <Sizespecbutton label="초기화" onClick={handleReset} />
            <Sizespecbutton label="이전" onClick={() => navigate(-1)} />
            <Sizespecbutton label="저장하기" onClick={handleSave} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Size;