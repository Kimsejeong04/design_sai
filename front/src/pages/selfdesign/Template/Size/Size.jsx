// import React, { useState,useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../Fabric/Fabric.css";

// import Sizespecbutton from "./Sizespecbutton";
// import { Sidebar, BreadCrumb } from "../../../../components";
// import axios from "axios";  // Axios 임포트
// import SizeBottom from "./SizeBottom";
// import ClothesTest from "./ClothesPants/ClothesTest";
// import Sizespec from "./Sizespec";

// const Size = () => {
//   const [selectedSize, setSelectedSize] = useState(null);  // 선택된 사이즈
//   const [category, setCategory] = useState(null);
//   const navigate = useNavigate();

//   const [selectedSizeIndex, setSelectedSizeIndex] = useState(null);
//   const [sizeData, setSizeData] = useState({});

//   const handleSizeChange = (index, sizeValues) => {
//     setSelectedSizeIndex(index);
//     setSizeData(sizeValues); // 예: { totalLength: 69, chest: 90, ... }
//   };


//   // "저장하기" 버튼 클릭 시
//   const handleSave = async () => {
//     if (!selectedSize) {
//       alert("사이즈를 선택하시오");
//       return;
//     }

//     try {
//       // 선택된 사이즈를 세션에 저장
//       sessionStorage.setItem("selectedSize", selectedSize);

//       // 캔버스 이미지(localStorage에서 가져오기)
//       const canvasImage = localStorage.getItem("shirtCanvasImage");

//       if (canvasImage) {
//         // 세션에 이미지 저장 (다음 페이지에서 확인 가능하도록)
//         sessionStorage.setItem("shirtCanvasImage", canvasImage);

//         // 👉 또는 서버에 저장하고 싶다면 (예: Spring Boot 백엔드)
//         /*
//         await axios.post("/api/save-canvas", {
//           size: selectedSize,
//           image: canvasImage,  // base64 string
//         });
//         */
//       } else {
//         console.warn("캔버스 이미지가 localStorage에 존재하지 않습니다.");
//       }

//       alert(`${selectedSize} 사이즈가 선택되었습니다.`);
//       navigate("/client/FinalConfirmation");
//     } catch (error) {
//       console.error("저장 실패:", error);
//       alert("저장에 실패했습니다.");
//     }
//   };

//   // localStorage에서 선택된 카테고리 읽기
//   useEffect(() => {
//     const storedClothing = localStorage.getItem("selectedClothing");
//     if (storedClothing) {
//       try {
//         const clothing = JSON.parse(storedClothing);
//         setCategory(clothing.category);
//       } catch (e) {
//         console.error("selectedClothing 파싱 오류:", e);
//         console.log("🚩 selectedClothing.category:", category);

//       }
//     }
//   }, []);

//   // 카테고리에 따라 적절한 Size 컴포넌트 렌더링
//   const renderSizeComponent = () => {
//     switch (category) {
//       case "상의": 
//         return <Sizespec onSizeChange={handleSizeChange} selectedSizeIndex={selectedSizeIndex} selectedSize={selectedSize}
//       setSelectedSize={setSelectedSize} />

//       case "바지":
//         return<SizeBottom
//       selectedSize={selectedSize}
//       setSelectedSize={setSelectedSize}
//     />;
//       case "아우터":
//         // return <SizeOuter selectedSize={selectedSize} setSelectedSize={setSelectedSize} />;
//       // 추가 카테고리
//       case "원피스":
//         return <div>원피스용 사이즈 입력 (구현 필요)</div>;
//       case "스커트":
//         return <div>스커트용 사이즈 입력 (구현 필요)</div>;
//       default:
//         return <div>선택된 카테고리가 없습니다.</div>;
//     }
//   };

//   return (
//     <div className="clothes-container">
//       <div className="layout1">
//         <div className="layout1">
//           <aside>
//             <Sidebar activePage={3} />
//           </aside>

//           <div className="content1">
//             <BreadCrumb activePage={3} />
//             <h3>3. 사이즈 스펙 입력</h3>
//             <hr />
            
            

            
//             {renderSizeComponent()}
            
//             <div className="footer button_size">
//               {/* <Sizespecbutton label="초기화" style={{ cursor: "pointer" }} onClick={() => setSelectedSize(null)} /> */}
              
//               <Sizespecbutton label="이전" onClick={() => navigate(-1)} />
//               <Sizespecbutton label="저장하기" onClick={handleSave} />
              
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Size;


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

const Size = () => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [category, setCategory] = useState(null); // '상의', '바지' 등 카테고리 저장
  
  const [clothingName, setClothingName] = useState("");
  const navigate = useNavigate();
  
  // 하위 컴포넌트(Sizespec, SizeBottom)의 초기화 함수를 호출하기 위한 리모컨
  const sizespecRef = useRef(null);
  const sizeBottomRef = useRef(null);
  const sizeDressRef = useRef(null);
  const sizeSkirtRef = useRef(null);
  const sizeCoatRef = useRef(null);

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
      alert("사이즈를 선택하시오");
      return;
    }
    try {
      sessionStorage.setItem("selectedSize", selectedSize);
      alert(`${selectedSize} 사이즈가 선택되었습니다.`);
      navigate("/client/FinalConfirmation");
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장에 실패했습니다.");
    }
  };

  const renderSizeComponent = () => {
    switch (category) {
      case "상의": 
        return (
          <Sizespec 
            ref={sizespecRef} // 초기화 리모컨 연결
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize} 
            clothingType={clothingName}
          />
        );
      case "바지":
        return (
          <SizeBottom
            actionRef={sizeBottomRef} // 초기화 리모컨 연결
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
        );
      case "아우터":
        return (
          <SizeCoat 
            actionRef={sizeCoatRef} // 초기화 리모컨 연결
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

          {/* 카테고리에 맞는 표와 캔버스 띄우기 */}
          {renderSizeComponent()}
          
          {/* 하단 공통 버튼 영역 */}
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