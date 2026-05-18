import React, { useState } from "react";
/*import "../../CosMain/CosMainCss.css";*/
import "./Upload.css";
import { Edit } from "./UploadClick"; // Edit 컴포넌트 불러오기
import Canvas from "../../../components/Canvas/Canvas";
import { uploadImage } from "../../../services/api";




export default function Upload({ onUploadSuccess }) {
  const [fileBoxes, setFileBoxes] = useState([
    { id: 1, fileName: "파일을 올려주세요", showEdit: false, image: null }
  ]);
  const [imageData, setImageData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false); // 그림판 팝업 상태 관리
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageSave = (dataURL) => {
    setImageData(dataURL);  // 상위 컴포넌트의 상태에 저장
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleImageClick = (file) => {
    setSelectedImage(file.image); // 선택한 파일의 이미지 데이터를 저장
  };
  const handleUpload2 = async () => {
    if (!file) {
      alert("파일을 선택하세요!");
      return;
    }

    try {
      await uploadImage(file);
      alert("이미지 업로드 성공!");
      // onUploadSuccess(); // 업로드 후 목록 갱신 이거 실패하는것같아서 주석처리함요
    } catch (error) {
      alert("이미지 업로드 실패!");
    }
  };
  
  // FileBox를 최대 3개까지만 생성하도록 제한
  const addFileBox = () => {
    if (fileBoxes.length < 3) {
      setFileBoxes(prevBoxes => [
        ...prevBoxes, 
        { id: prevBoxes.length + 1, fileName: "파일을 올려주세요", showEdit: false, image: null }
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

  const handleUpload = (event, id) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
      reader.onloadend = () => {
        setFileBoxes(prevBoxes =>
          prevBoxes.map(fileBox =>
            fileBox.id === id
              ? { ...fileBox, fileName: fileNameWithoutExt, image: reader.result, showEdit: true }
              : fileBox
          )
        );
        setSelectedImage(reader.result);
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
                    filteredFiles.map((file) => (
                      <div key={file.id} className="FileBoxWrapper">
                        <div className="FileBox">
                          <div className="fileNameWrapper" style={{ width: "9.375rem" }}>  {/* fileNameWrapper의 폭을 줄임 */}
                            <p className="fileName">{file.fileName}</p>
                          </div>
                          <div className="ButtonGroup">
                            <button className="deleteButton" onClick={() => removeFileBox(file.id)}>삭제</button>
                            <input 
                              type="file" 
                              accept="image/*" 
                              style={{ display: "none" }} 
                              id={`upload-${file.id}`}
                              onChange={(event) => {handleUpload(event, file.id); handleFileChange(event);}}
                            />
                            <button className="uploadButton" onClick={() => {document.getElementById(`upload-${file.id}`).click(); setSelectedImage(file.image);}}>
                              파일 선택
                            </button>
                            {/* 그림판 버튼 추가 */}
                            <button className="canvasButton" onClick={() => setShowCanvas(true)}>
                              그림판
                            </button>
                            <button 
                              className="uploadMainButton"
                              onClick={() => handleUpload2()}
                            >
                              이미지 업로드
                            </button>
                          </div>
                        </div>
                        <Edit show={file.showEdit} toggleEdit={() => toggleEdit(file.id)} image={imageData ? imageData:file.image}  />
                      </div>
                    ))
                  ) : (
                    <p>검색된 파일이 없습니다.</p>
                  )}

                  {/*<div className="ButtonContainer">
                    <button className="resetButton" onClick={() => setFileBoxes([])}>초기화</button>
                    <button className="saveButton">저장</button>
                  </div>*/}
                  <div className="createFile">
                    {/*<button 
                      className="createButton" 
                      onClick={addFileBox} 
                      disabled={fileBoxes.length >= 3}
                    >
                      +
                    </button>*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 그림판 팝업 */}
        {showCanvas && (
          <div className="canvasPopup">
            <div className="canvasPopupContent">
              {/* canvas만 스크롤 되게 하고, 닫기 버튼은 항상 아래에 있게 */}
              <div className="canvasArea">
                <Canvas backgroundImage={selectedImage} onSave={handleImageSave} />
              </div>
              <button className="closebtn" onClick={() => setShowCanvas(false)}>닫기</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
