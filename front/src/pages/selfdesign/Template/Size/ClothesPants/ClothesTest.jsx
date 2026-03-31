import React, { useEffect, useRef } from 'react';
import "./ClothesTest.css";

export default function ClothesTest({
  neckY, setNeckY,
  neckXOffset, setNeckXOffset,
  shoulderOffset, setShoulderOffset,
  chestOffset, setChestOffset,
  bodyLength, setBodyLength,
  armLengthFactor,setArmLengthFactor,
  upperWidthOffset, 
  lowerWidthOffset, setLowerWidthOffset,
  topBodyHeight, setTopBodyHeight,
  resetValues,
  isPreview = false, // FinalConfirmation에서 호출될 때 입력 컨트롤 숨기기
}) {
  const canvasRef = useRef(null);
  



  const drawShirt = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    

    const centerX = canvas.width / 2;  // 캔버스 가로 중앙 250 중앙에 오도록 배치 하는거
    const currentCenterX = (100 + 200) / 2;  // 원래 중심 셔츠 중심(150) 
    const offsetX = centerX - currentCenterX;  // ->100 픽셀 이동

    const neckLeftX = 100 - shoulderOffset+ 38 - upperWidthOffset + offsetX;
    
    const shoulderLeftBase = { x: 50 + offsetX, y: 110 }; //x 가 커지고 y가 작아져야 대각선으로 줄어듬 

    const sleeveLeftBase = { x: 60 + offsetX, y: 20 };
    const sleeveRightBase = { x: 240 + offsetX, y: 20 };

    const midLeftShoulder = {
      x: (neckLeftX + shoulderLeftBase.x) / 2,
      y: (50 + shoulderLeftBase.y) / 2,
    };

    // Normalize armLengthFactor to range [0, 1] to reduce growth rate
    const interpFactor = Math.min(armLengthFactor / 7, 5);

    const leftShoulder = {
      x: shoulderLeftBase.x * interpFactor + midLeftShoulder.x * (1 - interpFactor ),
      y: shoulderLeftBase.y * interpFactor + midLeftShoulder.y * (1 - interpFactor ),
    };

    const leftSleeve = {
      x: sleeveLeftBase.x * interpFactor + midLeftShoulder.x * (1 - interpFactor) ,
      y: sleeveLeftBase.y * interpFactor + midLeftShoulder.y * (1 - interpFactor) ,
    };

    const neckRightX = 200 + shoulderOffset-38 + upperWidthOffset + offsetX;
    
    const shoulderRightBase = { x: 250 + offsetX, y: 110 }; //x 가 작아지고 y도 작아져야 대각선으로 줄어듬
    

    const midRightShoulder = {
      x: (neckRightX + shoulderRightBase.x) / 2,
      y: (50 + shoulderRightBase.y) / 2,
    };

    const rightShoulder = {
      x: shoulderRightBase.x * interpFactor + midRightShoulder.x * (1 - interpFactor ) ,
      y: shoulderRightBase.y * interpFactor + midRightShoulder.y * (1 - interpFactor )  ,
    };

    const rightSleeve = {
      x: sleeveRightBase.x * interpFactor+ midRightShoulder.x * (1 - interpFactor),
      y: sleeveRightBase.y * interpFactor+ midRightShoulder.y * (1 - interpFactor),
    };

    ctx.beginPath();
    ctx.moveTo(neckLeftX, 50); 
    ctx.lineTo(leftShoulder.x  , leftShoulder.y);
    ctx.lineTo(leftShoulder.x + 20, leftShoulder.y + 15);

    ctx.lineTo(100 - chestOffset+82 + offsetX, 50 + topBodyHeight + 30 );
    ctx.lineTo(100 - lowerWidthOffset +90 + offsetX, bodyLength + 130);
    ctx.lineTo(200 + lowerWidthOffset -90 + offsetX, bodyLength + 130);
    ctx.lineTo(200 + chestOffset-82 + offsetX, 50 + topBodyHeight+ 30 );

    ctx.lineTo(rightShoulder.x - 20, rightShoulder.y + 15);
    ctx.lineTo(rightShoulder.x, rightShoulder.y);
    ctx.lineTo(neckRightX, 50);

    ctx.lineTo(170 + neckXOffset-20 + offsetX+20, 40);
    ctx.quadraticCurveTo(150 + offsetX, neckY+82, 130 - neckXOffset + offsetX, 40);
    ctx.lineTo(neckLeftX, 50);

    ctx.closePath();

    // 셔츠 내부를 빨간색으로 채우기
    ctx.save();
    ctx.fillStyle = '#87ceeb';
    ctx.fill();
    ctx.restore();

    ctx.stroke(); // 셔츠 외곽선 다시 그리기

    // 셔츠 안에만 땡땡이 무늬를 그리기 위해 클리핑 설정
    ctx.save();
    ctx.clip();

    // 땡땡이 무늬 그리기 (원형 반복)
    const dotSpacing = 20;
    const dotRadius = 3;
    ctx.fillStyle = 'black';

    for (let y = 0; y < canvas.height; y += dotSpacing) {
      for (let x = 0; x < canvas.width; x += dotSpacing) {
        ctx.beginPath();
        ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore(); // 클리핑 해제
    // 캔버스를 이미지로 변환하여 localStorage에 저장
    if (!isPreview) {
      const imageData = canvas.toDataURL('image/png');
      try {
        localStorage.setItem('shirtCanvasImage', imageData);
      } catch (e) {
        console.error('localStorage 저장 오류:', e);
      }
    }
  };
    
  

  

  useEffect(() => {
    drawShirt();
  }, [neckY, neckXOffset, shoulderOffset, chestOffset, bodyLength, armLengthFactor, topBodyHeight, lowerWidthOffset]);

  
  const handleInputChange = (setter, min, max) => (e) => {
    let val = e.target.value;
    if (val === '') {
      setter(val);
      return;
    }
    val = Number(val);
    if (isNaN(val)) return;
    if (val < min) val = min;
    if (val > max) val = max;
    setter(val);
  };

  return (
    <div className="canvas-adjust" style={{ textAlign: 'center', }}>
      <div className="size-spec-layout">
        <div className="size-spec-container">
          <canvas
            ref={canvasRef}
            width={300}
            height={300}
           style={{ margin :"3px", border: '2px solid #ccc' , borderRadius: '10px', backgroundColor: '#f9f9f9' }}
          ></canvas>
          <div
            className="cliders-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
              gap: '5px',
              marginTop: '2rem',
              justifyItems: 'center',
            }}
          >
            <div style={{ marginTop: '1rem' }}>
              <h4>목 파임 </h4>
              <input
                type="range"
                min={18}
                max={21}
                step={0.25}
                value={neckY}
                onChange={(e) => setNeckY(Number(e.target.value))}
                style={{ width: '80%' }}
              />
              <input
                type="number"
                min={18}
                max={21}
                step={0.25}
                value={neckY}
                onChange={handleInputChange(setNeckY, 50, 150)}
                style={{ width: 70, marginLeft: 10 }}
              />
            </div>

            <div style={{ marginTop: '1rem' }}>
              <h4>목 너비</h4>
              <input
                type="range"
                min={18}
                max={24}
                step={0.25}
                value={neckXOffset}
                onChange={(e) => setNeckXOffset(Number(e.target.value))}
                style={{ width: '80%' }}
              />
              <input
                type="number"
                min={18}
                max={24}
                step={0.25}
                value={neckXOffset}
                onChange={handleInputChange(setNeckXOffset, -20, 15)}
                style={{ width: 70, marginLeft: 10 }}
              />
            </div>

            <div style={{ marginTop: '1rem' }}>
              <h4>어깨 단면</h4>
              <input
                type="range"
                min={38}
                max={50}
                step={0.25}
                value={shoulderOffset}
                onChange={(e) => setShoulderOffset(Number(e.target.value))}
                style={{ width: '80%' }}
              />
              <input
                type="number"
                min={38}
                max={50}
                step={0.25}
                value={shoulderOffset}
                onChange={handleInputChange(setShoulderOffset, 0, 30)}
                style={{ width: 70, marginLeft: 10 }}
                
              />
            </div>

            <div style={{ marginTop: '1rem' }}>
              <h4>가슴 단면</h4>
              <input
                type="range"
                min={82}
                max={106}
                step={0.25}
                value={chestOffset}
                onChange={(e) => setChestOffset(Number(e.target.value))}
                style={{ width: '80%' }}
              />
              <input
                type="number"
                min={82}
                max={105}
                step={0.25}
                value={chestOffset}
                onChange={handleInputChange(setChestOffset, 0, 30)}
                style={{ width: 70, marginLeft: 10 }}
              />
            </div>

            <div style={{ marginTop: '1rem' }}>
              <h4>총 기장</h4>
              <input
                type="range"
                min={67}
                max={77}
                step={0.25}
                value={bodyLength}
                onChange={(e) => setBodyLength(Number(e.target.value))}
                style={{ width: '80%' }}
              />
              <input
                type="number"
                min={67}
                max={77}
                step={0.25}
                value={bodyLength}
                onChange={handleInputChange(setBodyLength, 150, 400)}
                style={{ width: 70, marginLeft: 10 }}
              />
            </div>

            <div style={{ marginTop: '1rem' }}>
              <h4>소매 기장</h4>
              <input
                type="range"
                min={20}
                max={26}
                step={0.01}
                value={armLengthFactor}
                onChange={(e) => setArmLengthFactor(Number(e.target.value))}
                style={{ width: '80%' }}
              />
              <input
                type="number"
                min={1}
                max={5}
                step={0.25}
                value={armLengthFactor}
                onChange={handleInputChange(setArmLengthFactor, 0, 5)}
                style={{ width: 70, marginLeft: 10 }}
              />
            </div>

            <div style={{ marginTop: '1rem' }}>
              <h4>암홀(직선)</h4>
              <input
                type="range"
                min={18}
                max={30}
                step={0.25}
                value={topBodyHeight}
                onChange={(e) => setTopBodyHeight(Number(e.target.value))}
                style={{ width: '80%' }}
              />
              <input
                type="number"
                min={18}
                max={30}
                step={0.25}
                value={topBodyHeight}
                onChange={handleInputChange(setTopBodyHeight, 10, 100)}
                style={{ width: 70, marginLeft: 10 }}
              />
            </div>

            <div style={{ marginTop: '1rem' }}>
              <h4>밑단 단면</h4>
              <input
                type="range"
                min={90}
                max={114}
                step={0.25}
                value={lowerWidthOffset}
                onChange={(e) => setLowerWidthOffset(Number(e.target.value))}
                style={{ width: '80%' }}
              />
              <input
                type="number"
                min={90}
                max={114}
                step={0.25}
                value={lowerWidthOffset}
                onChange={handleInputChange(setLowerWidthOffset, 0, 50)}
                style={{ width: 70, marginLeft: 10 }}
              />
             
            </div>
             <button
                onClick={resetValues}
                style={{
                  marginTop: '2rem',
                  backgroundColor: 'rgb(157, 187, 213)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  width: "100%",
                }}
              >
                초기화
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}