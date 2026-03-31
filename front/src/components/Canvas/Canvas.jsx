import React, { useRef, useState, useEffect } from 'react';
import './Canvas.css';  // 기존 CSS 파일을 불러옵니다

const Canvas = ({ backgroundImage,imageSrc,onSave }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [color, setColor] = useState('black');
  const [lineWidth, setLineWidth] = useState(5);
  const [isErasing, setIsErasing] = useState(false);
  const [fileName, setFileName] = useState('my_drawing'); // 파일명 입력 상태
  const [isWhiteBackground, setIsWhiteBackground] = useState(false); // 배경색 설정

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    setContext(ctx);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
  }, [color, lineWidth]);
  ///////////이아래유즈이펙트 수정
  useEffect(() => {
    if (backgroundImage && context) {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = `http://localhost:8081/files/view/${backgroundImage}`; // 선택된 이미지 URL
      img.onload = () => {
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // 기존 캔버스 지우기
        context.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height); // 이미지 배경으로 그리기
      };
    }
  }, [backgroundImage, context]);

  useEffect(() => {
    if (imageSrc && context) {
      const img = new Image();
      img.crossOrigin = 'Anonymous';  // CORS를 허용하는 설정
      img.src = imageSrc;
      img.onload = () => {
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);  // 이전 그림 지우기
        context.drawImage(img, 0, 0);  // 이미지를 캔버스에 그리기
      };
    }
  }, [imageSrc, context]);
  useEffect(() => {
    if (backgroundImage && context) {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = backgroundImage;  // 수정: 직접 이미지 URL을 받도록 함
      img.onload = () => {
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        context.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
      };
    }
  }, [backgroundImage, context]);

  const startDrawing = (e) => {
    const { left, top } = canvasRef.current.getBoundingClientRect();
    const offsetX = e.clientX - left;  // canvas의 왼쪽 상단으로부터의 X 좌표
    const offsetY = e.clientY - top;   // canvas의 왼쪽 상단으로부터의 Y 좌표
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };
  
  const draw = (e) => {
    if (!isDrawing) return;
    const { left, top } = canvasRef.current.getBoundingClientRect();
    const offsetX = e.clientX - left;
    const offsetY = e.clientY - top;
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };
  
  const stopDrawing = () => {
    context.closePath();
    setIsDrawing(false);
  };

  const changeColor = (newColor) => {
    setColor(newColor);
    if (context) context.strokeStyle = newColor;
  };

  const changeLineWidth = (newWidth) => {
    setLineWidth(newWidth);
    if (context) context.lineWidth = newWidth;
  };

  const enableDrawing = () => {
    setIsErasing(false); // 그리기 모드로 설정
    if (context) {
      context.globalCompositeOperation = 'source-over'; // 그리기 모드로 설정
    }
  };
  
  const enableEraser = () => {
    setIsErasing(true); // 지우기 모드로 설정
    if (context) {
      context.globalCompositeOperation = 'destination-out'; // 지우기 모드로 설정
    }
  };
  

  const clearCanvas = () => {
    if (!context || !canvasRef.current) return;
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const saveImage = async () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');

    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    if (isWhiteBackground) {
      tempCtx.fillStyle = 'white';
      tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    }

    tempCtx.drawImage(canvas, 0, 0);
    const dataURL = tempCanvas.toDataURL('image/png');
    
    if (onSave) {
      onSave(dataURL);
    }

    let file = dataURLtoFile(dataURL, 'drawing.png');  // Data URL을 파일로 변환
    try {
      const formData = new FormData();
      formData.append('file', file);
  
      await fetch('http://localhost:8081/files/upload', {  // 업로드할 서버 API
        method: 'POST',
        body: formData,
        credentials: "include",
      });
  
      alert("이미지가 서버에 저장되었습니다");
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert("이미지 업로드 실패!");
    }

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `${fileName || 'my_drawing'}.png`;
    link.click();
  };
  const dataURLtoFile = (dataURL, filename) => {
    let arr = dataURL.split(','),  // ',' 기준으로 문자열 분리
        mime = arr[0].match(/:(.*?);/)[1],  // MIME 타입 추출
        bstr = atob(arr[1]),  // Base64 문자열을 디코딩
        n = bstr.length,
        u8arr = new Uint8Array(n);  // Uint8Array로 변환
  
    while(n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
  
    // 반환할 파일 객체 생성
    return new File([u8arr], filename, {type: mime});
  };
  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        width={1000}  // 캔버스의 실제 크기
        height={500}  // 캔버스의 실제 크기
        style={{ width: '1000px', height: '500px' }}  // 화면에 표시되는 크기
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        />
      <div className="toolbar">
        <div className="toolbar-left">
          {/* 색상 선택 */}
          <input type="color" value={color} onChange={(e) => changeColor(e.target.value)} />

          {/* 그리기 & 지우개 버튼 */}
          <button onClick={enableDrawing} disabled={isErasing}>✏️ 그리기</button>
          <button onClick={enableEraser} disabled={!isErasing}>🧼 지우개</button>


          {/* 초기화 버튼 (전체 지우기) */}
          <button onClick={clearCanvas}>🗑️ 초기화</button>
        </div>
        
        <div className="toolbar-right">
          {/* 배경 선택 */}
          <label>
            <input
              type="checkbox"
              checked={isWhiteBackground}
              onChange={(e) => setIsWhiteBackground(e.target.checked)}
            />
            배경을 흰색으로 저장
          </label>

          {/* 파일명 입력 */}
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="파일명을 입력하세요"
          />

          {/* 저장 버튼 */}
          <button onClick={saveImage}>저장</button>
        </div>
        
        <div className="toolbar-line-width">
          {/* 선 굵기 조절 (세로 방향) */}
          <input
            type="range"
            min="1"
            max="20"
            value={lineWidth}
            onChange={(e) => changeLineWidth(e.target.value)}
            className="vertical-slider"
          />
        </div>
      </div>
    </div>
  );
};

export default Canvas;