import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Upload.css"; 
import Canvas from "../../../components/Canvas/Canvas";
import { uploadImage, searchDesigns } from "../../../services/api";

export default function Upload({ onUploadSuccess }) {
  const navigate = useNavigate(); 

  // 파일 박스 상태 관리
  const [fileBoxes, setFileBoxes] = useState([
    { id: 1, fileName: "파일을 올려주세요", showEdit: false, image: null, rawFile: null },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isComposing, setIsComposing] = useState(false);
   
  const [searchResults, setSearchResults] = useState([]);
  const [username, setUsername] = useState("");
  const BASE_URL = "http://localhost:8081";
  
  // 모달(팝업) 상태 관리
  const [activeCanvasBoxId, setActiveCanvasBoxId] = useState(null); 
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);  

  const activeBox = fileBoxes.find(box => box.id === activeCanvasBoxId);

  // 그림판 이미지 저장 처리
  const handleImageSave = (dataURL) => {
    if (!activeCanvasBoxId) return;

    const convertDataURLToFile = (dataurl, filename) => {
      let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {type:mime});
    };

    const generatedFile = convertDataURLToFile(dataURL, `canvas_design_${activeCanvasBoxId}.png`);

    setFileBoxes(prevBoxes =>
      prevBoxes.map(box =>
        box.id === activeCanvasBoxId
          ? { ...box, image: dataURL, rawFile: generatedFile, showEdit: true }
          : box
      )
    );
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/current-user", {
          credentials: "include"
        });

        if (!response.ok) {
          throw new Error("로그인 정보가 없습니다.");
        }

        const data = await response.json();
        setUsername(data.username);
      } catch (error) {
        console.error("현재 사용자 정보를 가져오지 못했습니다.", error);
      }
    };

    getCurrentUser();
  }, []);

  const handleUploadToServer = async (box) => {
    if (!box.rawFile) {
      alert("파일을 선택하거나 그림판으로 먼저 작업해주세요!");
      return;
    }

    try {
      await uploadImage(box.rawFile);
      setShowSuccessPopup(true); 
      
      if (typeof onUploadSuccess === "function") {
        onUploadSuccess(); 
      }
    } catch (error) {
      alert("이미지 업로드 실패!");
    }
  };
  
  const addFileBox = () => {
    if (fileBoxes.length < 3) {
      setFileBoxes(prevBoxes => [
        ...prevBoxes, 
        { id: Date.now(), fileName: "파일을 올려주세요", showEdit: false, image: null, rawFile: null }
      ]);
    } else {
      alert("최대 3개까지만 생성할 수 있습니다.");
    }
  };

  const removeFileBox = (id) => {
    setFileBoxes(prevBoxes => prevBoxes.filter(file => file.id !== id));
  };

  const handleFileChange = (event, id) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
      reader.onloadend = () => {
        setFileBoxes(prevBoxes =>
          prevBoxes.map(fileBox =>
            fileBox.id === id
              ? { 
                  ...fileBox, 
                  fileName: fileNameWithoutExt, 
                  image: reader.result,    
                  rawFile: file,            
                  showEdit: true 
                }
              : fileBox
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSearchChange = (event) => {
    const keyword = event.target.value;
    setInputValue(keyword);

    if (!isComposing) {
      setSearchQuery(keyword);
      handleSearch(keyword);
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = (event) => {
    setIsComposing(false);
    const keyword = event.target.value;
    setSearchQuery(keyword);
    handleSearch(keyword);
  };

  const handleSearch = async (keyword) => {
    if (!username) return;

    try {
      const data = await searchDesigns(username, keyword);
      setSearchResults(data);
    } catch (error) {
      console.error("디자인 검색 실패:", error);
      setSearchResults([]);
    }
  };

  const handleDesignSelect = async (design) => {
    try {
      let imageUrl;
      let fileName;

      if (design.DESIGN_TYPE === "TEMPLATE") {
        imageUrl = design.IMAGE_URL;
        if (!imageUrl) throw new Error("템플릿 이미지 경로가 없습니다.");
        if (!imageUrl.startsWith("http")) imageUrl = `${BASE_URL}${imageUrl}`;
        fileName = design.NAME;
      } else if (design.DESIGN_TYPE === "FILE") {
        imageUrl = `${BASE_URL}/files/view/${encodeURIComponent(design.NAME)}`;
        fileName = design.NAME;
      } else {
        throw new Error("알 수 없는 디자인 유형입니다.");
      }

      const file = await urlToFile(imageUrl, fileName);
      const image = await fileToDataUrl(file);

      const emptyBox = fileBoxes.find((box) => !box.rawFile && !box.image);

      if (emptyBox) {
        setFileBoxes((prev) =>
          prev.map((box) =>
            box.id === emptyBox.id
              ? { ...box, fileName: file.name, image: image, rawFile: file, showEdit: true }
              : box
          )
        );
      } else {
        if (fileBoxes.length >= 3) {
          alert("파일은 최대 3개까지 업로드할 수 있습니다.");
          return;
        }
        setFileBoxes((prev) => [
          ...prev,
          { id: Date.now(), fileName: file.name, showEdit: true, image: image, rawFile: file },
        ]);
      }
    } catch (error) {
      console.error("디자인 불러오기 실패:", error);
      alert("디자인을 불러오지 못했습니다.");
    }
  };

  const formatFileName = (fileName) => {
    if (!fileName) return "디자인";
    
    let cleanName = fileName;

    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}_/;
    cleanName = cleanName.replace(uuidRegex, '');
    
    cleanName = cleanName.replace(/\.(png|jpe?g|gif|svg|webp)$/i, '');
    
    return cleanName;
  };

  const urlToFile = async (url, fileName) => {
    const response = await fetch(url, { credentials: "include" });
    if (!response.ok) throw new Error("이미지를 가져오지 못했습니다.");
    const blob = await response.blob();
    let finalFileName = fileName;
    if (!finalFileName.includes(".")) {
      const extension = blob.type.split("/")[1] || "png";
      finalFileName = `${finalFileName}.${extension}`;
    }
    return new File([blob], finalFileName, { type: blob.type });
  };

  const fileToDataUrl = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      <div className="WholeWrapper">
        <div className="Container">
          
          <div className="Title">
            <h2 className="title">디자인 파일 업로드</h2>
          </div>
          
          <div className="InputWrapper">
            <h3 className="title2">디자인 이름</h3>
            <input 
              type="text" 
              className="title2input" 
              placeholder="파일명 검색"
              value={inputValue}
              onChange={handleSearchChange}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionEnd}
            />
          </div>

          <div className="UploadpageWrapper">
            <div className="UploadpageWrapper2">
              <div className="FileContainer">
                <div className="FileUpload">
                  
                  <h3 style={{ marginBottom: '10px', fontSize: '15px' }}>파일 목록</h3>
                  <h3 style={{ marginBottom: '10px', fontSize: '15px' }}>저장된 디자인</h3>

                  <div style={{ marginBottom: '20px' }}>
                    {searchResults.length > 0 ? (
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {searchResults.map((design) => (
                          <li
                            key={`${design.DESIGN_TYPE}-${design.ID}`}
                            onClick={() => handleDesignSelect(design)}
                            style={{ padding: '8px 0', cursor: "pointer", borderBottom: '1px solid #e0e0e0' }}
                          >
                            <span style={{ fontWeight: 'bold', marginRight: '10px', color: '#444' }}>
                              {design.DESIGN_TYPE === "FILE" ? formatFileName(design.NAME) : design.NAME}
                            </span>
                            <span style={{ fontSize: '12px', color: '#999' }}>
                              {design.DESIGN_TYPE === "TEMPLATE" ? "템플릿" : "파일"}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p style={{ fontWeight: 'bold', fontSize: '14px' }}>검색된 디자인이 없습니다.</p>
                    )}
                  </div>

                  {fileBoxes.length > 0 && fileBoxes.map((fileBox) => (
                    <div key={fileBox.id} className="FileBoxWrapper">
                      
                      {/* 컨트롤 바 (회색 박스 및 버튼 영역) */}
                      <div className="FileBox">
                        <div className="fileNameWrapper">
                          {formatFileName(fileBox.fileName)}
                        </div>
                        
                        <div className="ButtonGroup">
                          <button onClick={() => removeFileBox(fileBox.id)}>삭제</button>
                          
                          <input 
                            type="file" 
                            accept="image/*" 
                            style={{ display: "none" }} 
                            id={`upload-${fileBox.id}`}
                            onChange={(event) => handleFileChange(event, fileBox.id)}
                          />
                          <button onClick={() => document.getElementById(`upload-${fileBox.id}`).click()}>
                            파일 선택
                          </button>
                          
                          <button onClick={() => setActiveCanvasBoxId(fileBox.id)}>그림판</button>
                          <button className="uploadMainButton" onClick={() => handleUploadToServer(fileBox)}>
                            이미지 업로드
                          </button>
                        </div>
                      </div>

                      {/* 편집하기 텍스트 (빈 상태일 때 텍스트만 출력) */}
                      <div style={{ marginTop: '15px' }}>
                        <h4 style={{ margin: '0 0 10px 0', fontSize: '15px', color: '#333' }}>편집하기</h4>
                        
                        {/* 파일(이미지)이 존재할 때만 마이페이지 카드 뷰 렌더링 */}
                        {fileBox.image && (
                          <div className="EditBox" style={{ marginTop: '10px' }}>
                            <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa', borderRadius: '8px', marginBottom: '15px' }}>
                              <img src={fileBox.image} alt="디자인 미리보기" className="previewImage" />
                            </div>
                            
                            <h3 style={{ margin: '0 0 10px 0', color: '#799fc4', fontSize: '20px', fontWeight: "bold" }}>
                              {formatFileName(fileBox.fileName)}
                            </h3>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* 새 파일 박스 추가 버튼 (원래 디자인으로 복구) */}
                  <div className="createFile" style={{ marginTop: '20px' }}>
                    <button 
                      className="createButton" 
                      onClick={addFileBox} 
                      disabled={fileBoxes.length >= 3}
                      style={{
                        padding: '8px 14px',
                        backgroundColor: '#799fc4',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                      }}
                    >
                      +
                    </button>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* === 모달(팝업) 영역 === */}
        {activeCanvasBoxId !== null && (
          <div className="canvasPopupOverlay">
            <div className="canvasPopupContent">
              <div className="canvasArea">
                <Canvas backgroundImage={activeBox?.image} onSave={handleImageSave} />
              </div>
              <button className="closebtn" onClick={() => setActiveCanvasBoxId(null)}>닫기</button>
            </div>
          </div>
        )}

        {showSuccessPopup && (
          <div className="successPopupOverlay">
            <div className="successPopupContent">
              <h3>🎉 업로드 성공!</h3>
              <p>이미지가 성공적으로 업로드되었습니다.<br />메인 페이지로 이동하시겠습니까?</p>
              
              <div className="successPopupButtons">
                <button className="goMainBtn" onClick={() => navigate('/client/Cosmain')}>
                  메인페이지로 이동
                </button>
                <button className="stayBtn" onClick={() => setShowSuccessPopup(false)}>
                  현재 페이지에 머물기
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}