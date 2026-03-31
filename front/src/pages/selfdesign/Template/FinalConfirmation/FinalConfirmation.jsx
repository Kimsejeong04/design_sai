// import React, { useState, useEffect, useRef } from "react";
// import { Sidebar, BreadCrumb } from "../../../../components";
// import "./FinalConfirmation.css";
// import html2canvas from "html2canvas";
// const getColorName = (hex) => {
//   const colorMap = {
//     "#ff0000": "빨강",
//     "#00ff00": "초록",
//     "#0000ff": "파랑",
//     "#ff9900": "주황",
//     "#0099ff": "하늘",
//   };
//   return colorMap[hex] || "알 수 없음";
// };

// const ColorCircle = ({ color }) => (
//   <span
//     className="color-circle"
//     style={{ backgroundColor: color }}
//     aria-label={getColorName(color)}
//     title={getColorName(color)}
//   />
// );

// const FinalConfirmation = () => {
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [selectedFabric, setSelectedFabric] = useState([]);
//   const [selectedColors, setSelectedColors] = useState({});
//   const [selectedSize, setSelectedSize] = useState("");
//   const [designName, setDesignName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [note, setNote] = useState("");

//   const [username, setUsername] = useState(null);  // 상태로 username 관리

//   // 저장할 영역 ref
//   const captureRef = useRef(null);

//   // 로그인 세션을 백엔드에서 받아와 sessionStorage에 저장 + 상태 세팅
//   useEffect(() => {
//     const fetchSession = async () => {
//       try {
//         const res = await fetch("http://localhost:8081/api/checkSession", {
//           credentials: "include",
//         });
//         if (res.ok) {
//           const data = await res.json();
//           sessionStorage.setItem("username", data.username);
//           setUsername(data.username);
//         } else {
//           alert("로그인이 필요합니다. 로그인 후 다시 시도해주세요.");
//           window.location.href = "/login";
//         }
//       } catch (error) {
//         console.error("세션 확인 오류:", error);
//         alert("로그인 세션 확인 중 오류가 발생했습니다.");
//         window.location.href = "/login";
//       }
//     };

//     fetchSession();
//   }, []);

//   useEffect(() => {
//     // username이 있을 때만 sessionStorage에서 데이터 불러오기
//     if (!username) return;

//     const storedClothing =
//       sessionStorage.getItem("selectedClothing") ||
//       localStorage.getItem("selectedClothing");

//     if (storedClothing) {
//       try {
//         setSelectedItem(JSON.parse(storedClothing));
//       } catch (e) {
//         console.error("selectedClothing JSON parse error:", e);
//         setSelectedItem(null);
//       }
//     }

//     const storedFabric =
//       sessionStorage.getItem("selectedFabric") || localStorage.getItem("selectedFabric");
//     const storedColors =
//       sessionStorage.getItem("selectedColors") || localStorage.getItem("selectedColors");
//     const storedSize =
//       sessionStorage.getItem("selectedSize") || localStorage.getItem("selectedSize");

//     if (storedFabric) setSelectedFabric(JSON.parse(storedFabric) || []);
//     if (storedColors) setSelectedColors(JSON.parse(storedColors) || {});
//     if (storedSize) setSelectedSize(storedSize);
//   }, [username]);

//   const handleSubmit = async () => {
//   if (!designName.trim()) {
//     alert("디자인 이름을 입력해주세요.");
//     return;
//   }

//   if (!captureRef.current) {
//     alert("디자인 영역을 찾을 수 없습니다.");
//     return;
//   }

//   try {
//     setLoading(true);

//     // 1. 캔버스 이미지 생성 및 base64 획득
//     const canvas = await html2canvas(captureRef.current);
//     const imgData = canvas.toDataURL("image/png").replace(/\s/g, ""); // 🔧 이 부분

//     // 2. 색상 데이터 포맷팅
//     const formattedColors = Object.entries(selectedColors).map(([id, color]) => ({
//       id: String(id),
//       color: color,
//     }));
//     const finalColor = formattedColors.length > 0 ? formattedColors[0].color : "#ffffff";

//     // 3. 서버에 보낼 최종 데이터 객체
//     const finalData = {
//       username,
//       designName: designName.trim(),
//       clothingType: selectedItem ? selectedItem.name : "",
//       fabricJson: JSON.stringify(selectedFabric.map(f => f.name)),
//       colorsJson: JSON.stringify(
//         formattedColors.length > 0 ? formattedColors : [{ color: finalColor }]
//       ),
//       size: selectedSize,
//       category: "template",
//       note,
//       designImageBase64: imgData, // 캡처한 이미지 base64 넣기
//     };

//     console.log("전송하는 finalData:", finalData);

//     // 4. POST 요청
//     const response = await fetch("http://localhost:8081/designs/add", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(finalData),
//       credentials: "include",
//     });

//     if (response.ok) {
//       alert("디자인이 성공적으로 저장되었습니다.");
//     } else {
//       const errorResponse = await response.json();
//       alert("저장 실패: " + (errorResponse.message || "알 수 없는 오류 발생"));
//     }
//   } catch (error) {
//     alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
//     console.error(error);
//   } finally {
//     setLoading(false);
//   }
// };

//   // 이미지 저장 함수
//   const saveAsImage = () => {
//     if (!captureRef.current) return;

//     html2canvas(captureRef.current).then((canvas) => {
//       //const canvas = await html2canvas(captureRef.current);
//       const imgData = canvas.toDataURL("image/png").replace(/\s/g, ""); // 🔧 이 부분
//       const link = document.createElement("a");
//       link.href = imgData;
//       link.download = `${designName || "design"}_confirmation.png`;
//       link.click();
//     }).catch((error) => {
//       alert("이미지 저장 중 오류가 발생했습니다.");
//       console.error(error);
//     });
//   };

//   return (
//     <div className="final-container">
//       <div className="layout1">
//         <aside>
//           <Sidebar activePage={4} />
//         </aside>
//         <main className="content1">
//           <BreadCrumb activePage={4} />
//           <h3>4. 최종 확인</h3>
//           <hr />

//           <section className="summary-section" ref={captureRef}>
//             <div className="summary-item design-name-input">
//               <label htmlFor="designName" className="label">
//                 디자인 이름:
//               </label>
//               <input autoFocus
//                 placeholder="디자인 이름을 입력하세요"
//                 id="designName"
//                 type="text"
//                 value={designName}
//                 onChange={(e) => setDesignName(e.target.value)}
//               />
//             </div>

//             <div className="summary-item">
//               <span className="label">선택한 의류 종류:</span>
//               <span className="value">
//                 {selectedItem
//                   ? `${selectedItem.category || ""} > ${selectedItem.item || ""}`
//                   : "미선택"}
//               </span>
//             </div>

//             <div className="summary-item fabric-list">
//               <span className="label">선택한 원단 및 혼합율:</span>
//               <div className="value">
//                 {selectedFabric.length > 0 ? (
//                   selectedFabric.map((f) => (
//                     <div key={f.id} className="fabric-item">
//                       <img src={f.imageSrc} alt={f.name} className="fabric-img" />
//                       <div className="fabric-info">
//                         <div className="fabric-name">{f.name}</div>
//                         <div>혼합율: {f.mixingRatio || 0}%</div>
//                         <div>
//                           색상:{" "}
//                           <ColorCircle
//                             color={selectedColors[f.id] || f.initialColor}
//                           />{" "}
//                           {getColorName(selectedColors[f.id] || f.initialColor)}
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   "미선택"
//                 )}
//               </div>
//             </div>

//             <div className="summary-item">
//               <span className="label">선택한 사이즈:</span>
//               <span className="value">{selectedSize || "미선택"}</span>
//             </div>

//             <div className="summary-item note-input">
//               <label htmlFor="note" className="label">
//                 메모 또는 요청사항:
//               </label>
//               <textarea
//                 id="note"
//                 placeholder="제작자에게 남기고 싶은 내용을 입력하세요."
//                 value={note}
//                 onChange={(e) => setNote(e.target.value)}
//                 rows={4}
//                 style={{ width: "100%" }}
//               />
//             </div>
//           </section>
          

//           <footer className="footer">
//             <button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="submit-btn"
//             >
//               {loading ? "저장 중..." : "저장하기"}
//             </button>
//             <button type="button" onClick={saveAsImage} className="pdf-btn">
//               이미지로 저장하기
//             </button>
//           </footer>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default FinalConfirmation;




// FinalConfirmation.jsx
import React, { useState, useEffect, useRef } from "react";
import { Sidebar, BreadCrumb } from "../../../../components";
import "./FinalConfirmation.css";
import html2canvas from "html2canvas";
import SizeBottom from "../Size/SizeBottom";
import Sizespec from "../Size/Sizespec";
import ClothesTest from "../Size/ClothesPants/ClothesTest";
import { useNavigate } from "react-router-dom";
import MyDesignsRequests from '../../../../components/Mypage/MyDesignsRequests/MyDesignsRequests';
const getColorName = (hex) => {
  const colorMap = {
    "#ff0000": "빨강",
    "#00ff00": "초록",
    "#0000ff": "파랑",
    "#ff9900": "주황",
    "#0099ff": "하늘",
  };
  return colorMap[hex] || "알 수 없음";
};

const ColorCircle = ({ color }) => (
  <span
    className="color-circle"
    style={{ backgroundColor: color }}
    aria-label={getColorName(color)}
    title={getColorName(color)}
  />
);

const FinalConfirmation = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedFabric, setSelectedFabric] = useState([]);
  const [selectedColors, setSelectedColors] = useState({});
  const [selectedSize, setSelectedSize] = useState("");
  const [designName, setDesignName] = useState("");
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState("");  // 메모 상태 추가
  const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"]; 
  const [rows, setRows] = useState([]);
  const [sizeValues, setSizeValues] = useState([]); // 선택된 사이즈의 values 배열
  const id = sessionStorage.getItem("id") || localStorage.getItem("id");
   
  const [sizeLabels, setSizeLabels] = useState([]);
  const [username, setUsername] = useState(null);  // 상태로 username 관리
    const [selectedRatios, setSelectedRatios] = useState({});


  
  useEffect(() => {
  // … username 체크 로직 생략 …

  // 저장된 혼합율 가져오기
  const storedRatiosJson =
    sessionStorage.getItem("selectedRatios") ||
    localStorage.getItem("selectedRatios");
  if (storedRatiosJson) {
    try {
      const parsed = JSON.parse(storedRatiosJson);
      setSelectedRatios(parsed);
    } catch (e) {
      console.error("selectedRatios 파싱 오류:", e);
    }
  }
}, [username]);

  // 로그인 세션을 백엔드에서 받아와 sessionStorage에 저장 + 상태 세팅
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("http://localhost:8081/api/checkSession", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          sessionStorage.setItem("username", data.username);
          setUsername(data.username);
        } else {
          alert("로그인이 필요합니다. 로그인 후 다시 시도해주세요.");
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("세션 확인 오류:", error);
        alert("로그인 세션 확인 중 오류가 발생했습니다.");
        window.location.href = "/login";
      }
    };

    fetchSession();
  }, []);


  // 저장할 영역 ref
  const captureRef = useRef(null);

  const [category, setCategory] = useState(null);
  
  const navigate = useNavigate();
     // localStorage에서 선택된 카테고리 읽기
      useEffect(() => {
        const storedClothing = localStorage.getItem("selectedClothing");
        if (storedClothing) {
          try {
            const clothing = JSON.parse(storedClothing);
            setCategory(clothing.category);
          } catch (e) {
            console.error("selectedClothing 파싱 오류:", e);
          }
        }
      }, []);

//  const loadSizeData = () => {
//     if (selectedSize && category) {
//       const storageKey = category === "바지" ? "sizeSpecRowsBottom" : "sizeSpecRows";
//       const savedRows = localStorage.getItem(storageKey);
//       if (savedRows) {
//         try {
//           const rows = JSON.parse(savedRows);
//           const sizeIndex = sizes.indexOf(selectedSize);
//           if (sizeIndex >= 0) {
//             const values = rows
//               .filter((row) => !row.colspan && row.type !== "disabled")
//               .map((row) => row.values[sizeIndex]);
//             setSizeValues(values);

//             const labels =
//               category === "바지"
//                 ? ["총길이", "허리둘레", "엉덩이둘레", "밑위길이", "허벅지단면", "밑단둘레"]
//                 : ["총 기장", "가슴 단면", "밑단 단면", "소매 기장", "어깨 단면", "허리 단면", "암홀 (직선)", "소매단 단면", "소매통 단면"];
//             setSizeLabels(labels);
//           }
//         } catch (e) {
//           console.error(`localStorage ${storageKey} 파싱 오류:`, e);
//           setSizeValues([]);
//           setSizeLabels([]);
//         }
//       }
//     }
//   };

// 사이트 데이터 로드 
  const loadSizeData = () => {
    if (selectedSize && category) {
      const storageKey = category === "바지" ? "sizeSpecRowsBottom" : "sizeSpecRows";
      const savedRows = localStorage.getItem(storageKey);
      if (savedRows) {
        try {
          const rows = JSON.parse(savedRows);
          const sizeIndex = sizes.indexOf(selectedSize.toUpperCase());
          if (sizeIndex >= 0) {
            // Filter out rows that are not relevant (e.g., disabled or colspan rows)
            const filteredRows = rows.filter((row) => !row.colspan && row.type !== "disabled");
            // Map values for the selected size
            const values = filteredRows.map((row) => row.values[sizeIndex]);
            // Map labels from the rows
            const labels = filteredRows.map((row) => row.label);
            setSizeValues(values);
            setSizeLabels(labels);
          } else {
            setSizeValues([]);
            setSizeLabels([]);
          }
        } catch (e) {
          console.error(`localStorage ${storageKey} 파싱 오류:`, e);
          setSizeValues([]);
          setSizeLabels([]);
        }
      } else {
        setSizeValues([]);
        setSizeLabels([]);
      }
    }
  };

  useEffect(() => {
    //console.log("🔍 useEffect 실행됨, id:", id);
    //if (!id) {
    //  alert("로그인이 필요합니다. 로그인 후 다시 시도해주세요.");
    // window.location.href = "/login";
    //  return;
    //} 
    
    const storedClothing =
      sessionStorage.getItem("selectedClothing") ||
      localStorage.getItem("selectedClothing");

    if (storedClothing) {
      try {
        setSelectedItem(JSON.parse(storedClothing));
      } catch (e) {
        console.error("selectedClothing JSON parse error:", e);
        setSelectedItem(null);
      }
    }
    

 
    // const storedFabric =
    //   sessionStorage.getItem("selectedFabric") || localStorage.getItem("selectedFabric");
    // const storedColors =
    //   sessionStorage.getItem("selectedColors") || localStorage.getItem("selectedColors");
    // const storedSize =
    //   sessionStorage.getItem("selectedSize") || localStorage.getItem("selectedSize");

    // if (storedFabric) setSelectedFabric(JSON.parse(storedFabric) || []);
    // if (storedColors) setSelectedColors(JSON.parse(storedColors) || {});
    // if (storedSize) setSelectedSize(storedSize);
// }, [id]);
  
    const storedFabric = 
      sessionStorage.getItem("selectedFabric") || localStorage.getItem("selectedFabric");
    const storedColors = 
      sessionStorage.getItem("selectedColors") || localStorage.getItem("selectedColors");
    const storedSize = 
      sessionStorage.getItem("selectedSize");

    if (storedFabric) setSelectedFabric(JSON.parse(storedFabric) || []);
    if (storedColors) setSelectedColors(JSON.parse(storedColors) || {});
    if (storedSize) setSelectedSize(storedSize);

    loadSizeData();
  }, [category, selectedSize, id]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "sizeSpecRows" || event.key === "sizeSpecRowsBottom") {
        loadSizeData();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [category, selectedSize]);
  
/*
  const handleSubmit = async () => { /* 템플릿으로 디자인하기 저장하면 사이즈조절한옷 마이페이지에 보이는거 프론트에서 되나 테스트하려고 잠깐 주석처리한고
                                      
    if (!designName.trim()) {
      alert("디자인 이름을 입력해주세요.");
      return;
    }

    const formattedColors = Object.entries(selectedColors).map(([id, color]) => ({
      id: String(id),
      color: color,
    }));

    const finalColor = formattedColors.length > 0 ? formattedColors[0].color : "#ffffff";

    const finalData = {
      id,
      designName: designName.trim(),
      clothingType: selectedItem.item,
      fabricJson: JSON.stringify(selectedFabric.map(f => f.name)),
      colorsJson: JSON.stringify(
        formattedColors.length > 0 ? formattedColors : [{ color: finalColor }]
      ),
      size: selectedSize,
      category: "template",
      note,
    };

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8081/designs/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
        credentials: "include",
      });

      if (response.ok) {
        alert("디자인이 성공적으로 저장되었습니다.");
      } else {
        const errorResponse = await response.json();
        alert("저장 실패: " + (errorResponse.message || "알 수 없는 오류 발생"));
      }
    } catch (error) {
      alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };
  */

  //여기부터 프론트용 테스트용
  const handleSubmit = async () => { 
    if (!designName.trim()) {
      alert("디자인 이름을 입력해주세요.");
      return;
    }

    const formattedColors = Object.entries(selectedColors).map(([id, color]) => ({ 
      id: String(id),
      color: color,
    }));

    const finalColor = formattedColors.length > 0 ? formattedColors[0].color : "#ffffff"; 

      // 카테고리에 따라 캔버스 이미지 가져오기 
    let imageData = null; //나중에 이부분 기존코드에 추가 
    if (category === "상의") { // 나중에 이부분 기존코드에 추가 
    imageData = localStorage.getItem("shirtCanvasImage"); // 나중에 이부분 기존코드에 추가 
    } else if (category === "바지") { //  나중에 이부분 기존코드에 추가 
    imageData = localStorage.getItem("pantsCanvasImage"); // 나중에 이부분 기존코드에 추가 
    }

    const finalData = { 
      designId: Date.now(), // 고유 ID로 현재 타임스탬프 사용 
      id,
      designName: designName.trim(),
      clothingType: selectedItem.item,
      fabricJson: JSON.stringify(selectedFabric.map(f => f.name)),
      colorsJson: JSON.stringify(
        formattedColors.length > 0 ? formattedColors : [{ color: finalColor }]
      ),
      size: selectedSize,
      category: "template",
      note,
      imageUrl: imageData, // base64 문자열을 imageUrl로 저장 // 나중에 이부분 기존코드에 추가 
    createdAt: new Date().toISOString(), 
    };

    try {
    setLoading(true);
    // localStorage에 디자인 데이터 저장
    const existingDesigns = JSON.parse(localStorage.getItem("mockDesigns") || "[]");
    existingDesigns.push(finalData);
    localStorage.setItem("mockDesigns", JSON.stringify(existingDesigns));
      
    alert("디자인이 성공적으로 저장되었습니다.");
    navigate("/client/cosmain")
    // 성공 시 localStorage에서 이미지 제거 (선택 사항)
    if (category === "상의") {
      localStorage.removeItem("shirtCanvasImage");
    } else if (category === "바지") {
      localStorage.removeItem("pantsCanvasImage");
    }
  } catch (error) {
    alert("오류가 발생했습니다. 다시 시도해주세요.");
    console.error("Submit error:", error);
  } finally {
    setLoading(false);
  }
};
//여기까지 프론트용 테스트용

  // 이미지 저장 함수
  const saveAsImage = () => {
    if (!captureRef.current) return;

    html2canvas(captureRef.current).then((canvas) => {
      // 캔버스를 이미지 데이터 URL로 변환
      const imgData = canvas.toDataURL("image/png");

      // 이미지 다운로드용 링크 생성
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `${designName || "design"}_confirmation.png`;
      link.click();
    }).catch((error) => {
      alert("이미지 저장 중 오류가 발생했습니다.");
      console.error(error);
    });
  };

  const renderSizeComponent = () => {
    switch (category) {
      case "상의":
          const storedImage = localStorage.getItem("shirtCanvasImage");

        // sizeLabels와 sizeValues를 매핑하여 ClothesTest에 전달
        const sizeProps = {
          neckY: sizeLabels.includes("목 파임") ? sizeValues[sizeLabels.indexOf("목 파임")] : 18,
          neckXOffset: sizeLabels.includes("목 너비") ? sizeValues[sizeLabels.indexOf("목 너비")] : 15,
          shoulderOffset: sizeLabels.includes("어깨 단면") ? sizeValues[sizeLabels.indexOf("어깨 단면")] : 38,
          chestOffset: sizeLabels.includes("가슴 단면") ? sizeValues[sizeLabels.indexOf("가슴 단면")] : 82,
          bodyLength: sizeLabels.includes("총 기장") ? sizeValues[sizeLabels.indexOf("총 기장")] : 67,
          armLengthFactor: sizeLabels.includes("소매 기장")
            ? (sizeValues[sizeLabels.indexOf("소매 기장")] - 20) / (26 - 20)
            : 1,
          upperWidthOffset: 0,
          lowerWidthOffset: sizeLabels.includes("밑단 단면") ? sizeValues[sizeLabels.indexOf("밑단 단면")] : 90,
          topBodyHeight: sizeLabels.includes("암홀 (직선)") ? sizeValues[sizeLabels.indexOf("암홀 (직선)")] : 40,
        };
        return storedImage ? (
    <img
      src={storedImage}
      alt="셔츠 미리보기"
      style={{ width: "300px", height: '300px', border: '1px solid #ccc' }}
    />
  ) : (
    <div>먼저 사이즈 스펙에서 셔츠를 조절해주세요.</div>
  );
      case "바지":
        const storedImageBottom = localStorage.getItem("pantsCanvasImage");

        // sizeLabels와 sizeValues를 매핑하여 ClothesTest에 전달
        const sizePropsBottom = {
          waistWidth: sizeLabels.includes("허리단면") ? sizeValues[sizeLabels.indexOf("허리단면")] : 72,
          rise: sizeLabels.includes("밑위") ? sizeValues[sizeLabels.indexOf("밑위")] : 26,
          length: sizeLabels.includes("총장") ? sizeValues[sizeLabels.indexOf("총장")] : 97,
          thighWidth: sizeLabels.includes("허벅지 단면") ? sizeValues[sizeLabels.indexOf("허벅지 단면")] : 27,
          hemWidth: sizeLabels.includes("밑단 단면") ? sizeValues[sizeLabels.indexOf("밑단 단면")] : 34,
        };
        return storedImageBottom ? (
    <img
      src={storedImageBottom}
      alt="바지 미리보기"
      style={{ width: "300px", height: '300px', border: '1px solid #ccc' }}
    />
  ) : (
    <div>먼저 사이즈 스펙에서 바지를 조절해주세요.</div>
  );
        
      case "아우터":
        return <div>아우터용 사이즈 입력 (구현 필요)</div>;
      case "원피스":
        return <div>원피스용 사이즈 입력 (구현 필요)</div>;
      case "스커트":
        return <div>스커트용 사이즈 입력 (구현 필요)</div>;
      default:
        return <div>선택된 카테고리가 없습니다.</div>;
    }
  };


    return (
    <div className="final-container">
      <div className="layout1">
        <aside>
          <Sidebar activePage={4} />
        </aside>
        <main className="content1">
          <BreadCrumb activePage={4} />
          <h3>4. 최종 확인</h3>
          <hr />

          {/* 캡처할 영역 전체를 감싸는 ref */}
          
          <section className="summary-section" ref={captureRef}>
            
            {/* 디자인 이름 입력란 - 제일 위로 이동 */}
            <div className="summary-item design-name-input">
              <label htmlFor="designName" className="label">
                디자인 이름:
              </label>
              <input autoFocus
                placeholder="디자인 이름을 입력하세요"
                id="designName"
                type="text"
                value={designName}
                onChange={(e) => setDesignName(e.target.value)}
              />
            </div>

            <div className="summary-item">
              <span className="label">선택한 의류 종류:</span>
              <span className="value">
                {selectedItem
                  ? `${selectedItem.category || ""} > ${selectedItem.item || ""}`
                  : "미선택"}
              </span>
            </div>

            <div className="summary-item fabric-list">
              <span className="label">선택한 원단 및 혼합율:</span>
              <div className="value">
                {selectedFabric.length > 0 ? (
                  selectedFabric.map((f) => (
                    <div key={f.id} className="fabric-item">
                      <img src={f.imageSrc} alt={f.name} className="fabric-img" />
                      <div className="fabric-info">
                        <div className="fabric-name">{f.name}</div>
                        <div>원단별 혼합율</div>
                         <div>
          혼합율: {selectedRatios[f.id] !== undefined 
            ? `${selectedRatios[f.id]}%` 
            : "0%"}
        </div>
                        <div>
                          색상:{" "}
                          <ColorCircle
                            color={selectedColors[f.id] || f.initialColor}
                          />{" "}
                          {getColorName(selectedColors[f.id] || f.initialColor)}
                          
                        </div>
                      </div>
                    </div>
                  
                  ))
                ) : (
                  "미선택"
                )}
              <div className="finalconfirmation-category-image">
                  {renderSizeComponent()}
                  {selectedSize && sizeValues.length > 0 && (
                    <div className="summary-item size-values">
                      <span className="label">사이즈 스펙 ({selectedSize}):</span>
                      <div className="list-value">
                        <ul className="size-list">
                          {sizeLabels.map((label, index) => (
                            <li key={index} className="size-item">
                              <span className="size-label">{label}</span>
                              <span className="size-value">{sizeValues[index]?.toFixed(1)} cm</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="summary-item">
              <span className="label">선택한 사이즈:</span>
              <span className="value">{selectedSize || "미선택"}</span>
            </div>

            {/* 메모 입력란 */}
            
            
          {/* 선택된 사이즈의 values 렌더링 */}
           
           <div className="summary-item note-input">
              <label htmlFor="note" className="label">
                메모 또는 요청사항:
              </label>
              <textarea
                id="note"
                placeholder="제작자에게 남기고 싶은 내용을 입력하세요."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                style={{ width: "100%" }}
              />
            </div>
          </section>
          

          <footer className="footer">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="submit-btn"
            >
              {loading ? "저장 중..." : "저장하기"}
            </button>
            <button type="button" onClick={saveAsImage} className="pdf-btn">
              이미지로 저장하기
            </button>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default FinalConfirmation;