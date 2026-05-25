import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 훅
/*import "../../CosMain/CosMainCss.css";*/
import "./Upload.css";
import { Edit } from "./UploadClick"; 
import Canvas from "../../../components/Canvas/Canvas";
import { uploadImage } from "../../../services/api";

export default function Upload({ onUploadSuccess }) {
  const navigate = useNavigate(); 

  // 파일 박스 상태 관리 (각 박스마다 독립적인 데이터 유지)
  const [fileBoxes, setFileBoxes] = useState([
    { id: 1, fileName: "파일을 올려주세요", showEdit: false, image: null, rawFile: null }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  
  // 모달(팝업) 상태 관리
  const [activeCanvasBoxId, setActiveCanvasBoxId] = useState(null); // 그림판 팝업용 ID
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);  // 업로드 성공 팝업용

  const activeBox = fileBoxes.find(box => box.id === activeCanvasBoxId);

  // 그림판 이미지 저장 처리
  const handleImageSave = (dataURL) => {
    if (!activeCanvasBoxId) return;

    // Base64를 File 객체로 변환 (서버 전송용)
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

  // 백엔드 업로드 실행
  const handleUploadToServer = async (box) => {
    if (!box.rawFile) {
      alert("파일을 선택하거나 그림판으로 먼저 작업해주세요!");
      return;
    }

    try {
      await uploadImage(box.rawFile);
      // 업로드 성공 시 alert 대신 팝업 상태를 true로 변경
      setShowSuccessPopup(true); 
      
      if (typeof onUploadSuccess === "function") {
        onUploadSuccess(); 
      }
    } catch (error) {
      alert("이미지 업로드 실패!");
    }
  };
  
  // 파일 박스 추가 (최대 3개 제한)
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

  const toggleEdit = (id) => {
    setFileBoxes(prevBoxes =>
      prevBoxes.map(file =>
        file.id === id ? { ...file, showEdit: !file.showEdit } : file
      )
    );
  };

  const removeFileBox = (id) => {
    setFileBoxes(prevBoxes => prevBoxes.filter(file => file.id !== id));
  };

  // 파일 선택 처리
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
    setInputValue(event.target.value);
    if (!isComposing) {
      setSearchQuery(event.target.value);
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = (event) => {
    setIsComposing(false);
    setSearchQuery(event.target.value);
  };

  const filteredFiles = fileBoxes.filter(file =>
    file.fileName
      .normalize("NFC")
      .trim()
      .toLowerCase()
      .includes(searchQuery.normalize("NFC").trim().toLowerCase())
  );

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
                  <h3>파일 목록</h3>
                  {filteredFiles.length > 0 ? (
                    filteredFiles.map((fileBox) => (
                      <div key={fileBox.id} className="FileBoxWrapper">
                        <div className="FileBox">
                          <div className="fileNameWrapper" style={{ width: "9.375rem" }}>
                            <p className="fileName">{fileBox.fileName}</p>
                          </div>
                          <div className="ButtonGroup">
                            <button className="deleteButton" onClick={() => removeFileBox(fileBox.id)}>삭제</button>
                            
                            <input 
                              type="file" 
                              accept="image/*" 
                              style={{ display: "none" }} 
                              id={`upload-${fileBox.id}`}
                              onChange={(event) => handleFileChange(event, fileBox.id)}
                            />
                            <button className="uploadButton" onClick={() => document.getElementById(`upload-${fileBox.id}`).click()}>
                              파일 선택
                            </button>
                            
                            <button className="canvasButton" onClick={() => setActiveCanvasBoxId(fileBox.id)}>
                              그림판
                            </button>
                            
                            <button 
                              className="uploadMainButton"
                              onClick={() => handleUploadToServer(fileBox)}
                            >
                              이미지 업로드
                            </button>
                          </div>
                        </div>
                        <Edit show={fileBox.showEdit} toggleEdit={() => toggleEdit(fileBox.id)} image={fileBox.image}  />
                      </div>
                    ))
                  ) : (
                    <p>검색된 파일이 없습니다.</p>
                  )}

                  <div className="createFile">
                    <button 
                      className="createButton" 
                      onClick={addFileBox} 
                      disabled={fileBoxes.length >= 3}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 그림판 모달 팝업 */}
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

        {/* 업로드 성공 선택형 팝업 */}
        {showSuccessPopup && (
          <div className="successPopupOverlay">
            <div className="successPopupContent">
              <h3>🎉 업로드 성공!</h3>
              <p>이미지가 성공적으로 업로드되었습니다.<br />메인 페이지로 이동하시겠습니까?</p>
              
              <div className="successPopupButtons">
                <button className="goMainBtn" onClick={() => navigate('/client/Cosmain')}>
                  메인페이지로 이동
                </button>
                <button 
                  className="stayBtn" 
                  onClick={() => setShowSuccessPopup(false)} /* 팝업만 닫음 */
                >
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