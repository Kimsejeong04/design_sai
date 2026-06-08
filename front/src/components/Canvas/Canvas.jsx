import React, { useRef, useState, useEffect } from 'react';
import './Canvas.css';

const Canvas = ({ backgroundImage, imageSrc, onSave }) => {
  const bgCanvasRef = useRef(null);
  const drawCanvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [color, setColor] = useState('black');
  const [lineWidth, setLineWidth] = useState(5);
  const [isErasing, setIsErasing] = useState(false);
  const [fileName, setFileName] = useState('my_drawing');
  const [isWhiteBackground, setIsWhiteBackground] = useState(false);

  useEffect(() => {
    const canvas = drawCanvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    setContext(ctx);
  }, []);

  useEffect(() => {
    if (context) {
      context.strokeStyle = isErasing ? 'rgba(0,0,0,1)' : color;
      context.lineWidth = lineWidth;
    }
  }, [color, lineWidth]);

  useEffect(() => {
    const bgSrc = backgroundImage || imageSrc;
    if (!bgSrc) return;
    const canvas = bgCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = bgSrc;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, [backgroundImage, imageSrc]);

  const startDrawing = (e) => {
    const { left, top } = drawCanvasRef.current.getBoundingClientRect();
    const scaleX = drawCanvasRef.current.width / drawCanvasRef.current.offsetWidth;
    const scaleY = drawCanvasRef.current.height / drawCanvasRef.current.offsetHeight;
    const offsetX = (e.clientX - left) * scaleX;
    const offsetY = (e.clientY - top) * scaleY;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { left, top } = drawCanvasRef.current.getBoundingClientRect();
    const scaleX = drawCanvasRef.current.width / drawCanvasRef.current.offsetWidth;
    const scaleY = drawCanvasRef.current.height / drawCanvasRef.current.offsetHeight;
    const offsetX = (e.clientX - left) * scaleX;
    const offsetY = (e.clientY - top) * scaleY;
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    if (context) context.closePath();
    setIsDrawing(false);
  };

  const enableDrawing = () => {
    setIsErasing(false);
    if (context) {
      context.globalCompositeOperation = 'source-over';
      context.strokeStyle = color;
    }
  };

  const enableEraser = () => {
    setIsErasing(true);
    if (context) {
      context.globalCompositeOperation = 'destination-out';
    }
  };

  const clearCanvas = () => {
    if (!context || !drawCanvasRef.current) return;
    context.clearRect(0, 0, drawCanvasRef.current.width, drawCanvasRef.current.height);
  };

  const changeColor = (newColor) => {
    setColor(newColor);
    if (context && !isErasing) context.strokeStyle = newColor;
  };

  const changeLineWidth = (newWidth) => {
    setLineWidth(newWidth);
    if (context) context.lineWidth = newWidth;
  };

  const saveImage = async () => {
    const bgCanvas = bgCanvasRef.current;
    const drawCanvas = drawCanvasRef.current;
    if (!bgCanvas || !drawCanvas) return;

    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = bgCanvas.width;
    tempCanvas.height = bgCanvas.height;

    if (isWhiteBackground) {
      tempCtx.fillStyle = 'white';
      tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    }

    tempCtx.drawImage(bgCanvas, 0, 0);
    tempCtx.drawImage(drawCanvas, 0, 0);

    const dataURL = tempCanvas.toDataURL('image/png');
    if (onSave) onSave(dataURL);

    try {
      const file = dataURLtoFile(dataURL, 'drawing.png');
      const formData = new FormData();
      formData.append('file', file);
      await fetch('http://localhost:8081/files/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      alert('이미지가 서버에 저장되었습니다');
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드 실패!');
    }

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `${fileName || 'my_drawing'}.png`;
    link.click();
  };

  const dataURLtoFile = (dataURL, filename) => {
    let arr = dataURL.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
  };

  const sliderPercent = ((lineWidth - 1) / (50 - 1)) * 100;

  return (
    <div className="canvas-container">
      {/* 왼쪽 슬라이더 - position absolute라서 공간 안 차지함 */}
      <div className="toolbar-line-width">
        <input
          type="range"
          min="1"
          max="50"
          value={lineWidth}
          onChange={(e) => changeLineWidth(Number(e.target.value))}
          className="vertical-slider"
          style={{ '--val': sliderPercent }}
        />
      </div>

      <div className="canvas-area">
        <div className="toolbar">
          <div className="toolbar-left">
            <input type="color" value={color} onChange={(e) => changeColor(e.target.value)} />
            <button onClick={enableDrawing} disabled={!isErasing}>✏️ 그리기</button>
            <button onClick={enableEraser} disabled={isErasing}>🧼 지우개</button>
            <button onClick={clearCanvas}>🗑️ 초기화</button>
          </div>
          <div className="toolbar-right">
            <label>
              <input
                type="checkbox"
                checked={isWhiteBackground}
                onChange={(e) => setIsWhiteBackground(e.target.checked)}
              />
              배경을 흰색으로 저장
            </label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="파일명을 입력하세요"
            />
            <button onClick={saveImage}>저장</button>
          </div>
        </div>

        <div className="canvas-wrapper">
          <canvas ref={bgCanvasRef} width={1000} height={500} className="bg-canvas" />
          <canvas
            ref={drawCanvasRef}
            width={1000}
            height={500}
            className="draw-canvas"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
          />
        </div>
      </div>
    </div>
  );
};

export default Canvas;