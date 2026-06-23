import React, { useEffect, useRef, useState} from 'react';
import "./ClothesTest.css";

export default function ClothesTest({
  clothingType, 
  neckY, setNeckY,
  neckXOffset, setNeckXOffset,
  shoulderOffset, setShoulderOffset,
  chestOffset, setChestOffset,
  bodyLength, setBodyLength,
  armLengthFactor, setArmLengthFactor,
  upperWidthOffset, 
  lowerWidthOffset, setLowerWidthOffset,
  topBodyHeight, setTopBodyHeight,

  waistWidth, setWaistWidth,
  
  resetValues,
  isPreview = false, 
  
  pantsLength, setPantsLength,
  waistOffset, setWaistOffset,
  hipOffset, setHipOffset,
  thighOffset, setThighOffset,
  hemOffset, setHemOffset,
  crotchLength, setCrotchLength,
}) {
  const canvasRef = useRef(null);
  
  const [shapeColor, setShapeColor] = useState('#87ceeb');
  const [shapePattern, setShapePattern] = useState('무지');

  useEffect(() => {
    const storedColor = localStorage.getItem('fabricColor');
    const storedPattern = localStorage.getItem('fabricPattern');
    
    if (storedColor) setShapeColor(storedColor);
    if (storedPattern) setShapePattern(storedPattern);
  }, []);

  const drawClothes = () => {  
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;

    const safeType = typeof clothingType === 'string' ? clothingType : String(clothingType || "");

    if (safeType.includes('바지') || safeType.includes('팬츠') || safeType.includes('슬랙스')) { 
      drawPants(ctx, canvas);
    } else if (safeType.includes('반팔') || safeType.includes('반바지') || safeType.includes('티셔츠')) {
      drawShortSleeve(ctx, canvas);
    } else if (safeType.includes('자켓')) {
      drawCoat(ctx, canvas, true); 
    } else if (safeType.includes('코트')) {
      drawCoat(ctx, canvas, false);
    } else if (safeType.includes('원피스')) {
      drawDress(ctx, canvas, safeType.includes('미니'));
    } else if (safeType.includes('스커트') || safeType.includes('치마')) {
      drawSkirt(ctx, canvas, safeType.includes('미니'));
    } else if (safeType.includes('화') || safeType.includes('로퍼') || safeType.includes('샌들') || safeType.includes('하이탑') || safeType.includes('신발')) {
      drawShoes(ctx, canvas, safeType);
    } else if (safeType.includes('백') || safeType.includes('가방')) {
      drawBag(ctx, canvas, safeType);
    } else {
      drawLongSleeve(ctx, canvas); 
    }

    if (!isPreview) {
      const imageData = canvas.toDataURL('image/png');
      try {
        localStorage.setItem('shirtCanvasImage', imageData);
      } catch (e) {
        console.error('localStorage 저장 오류:', e);
      }
    }
  };

  const drawLongSleeve = (ctx, canvas) => {
    const centerX = canvas.width / 2;  
    const currentCenterX = (100 + 200) / 2;  
    const offsetX = centerX - currentCenterX;  
    const centerY = canvas.height / 2; 
    const currentCenterY = (40 + bodyLength + 210) / 2; 
    const offsetY = centerY - currentCenterY; 

    ctx.save(); 
    ctx.translate(0, offsetY);
    
    const neckLeftX = 100 - shoulderOffset+ 38 - upperWidthOffset + offsetX;
    const shoulderLeftBase = { x: 50 + offsetX, y: 110 }; 
    const sleeveLeftBase = { x: 60 + offsetX, y: 20 };
    const sleeveRightBase = { x: 240 + offsetX, y: 20 };

    const midLeftShoulder = { x: (neckLeftX + shoulderLeftBase.x) / 2, y: (50 + shoulderLeftBase.y) / 2 };
    const interpFactor = Math.min(armLengthFactor / 7, 5) ;

    const leftShoulder = {
      x: shoulderLeftBase.x * interpFactor + midLeftShoulder.x * (1 - interpFactor ),
      y: shoulderLeftBase.y * interpFactor + midLeftShoulder.y * (1 - interpFactor ),
    };
    const leftSleeve = {
      x: sleeveLeftBase.x * interpFactor + midLeftShoulder.x * (1 - interpFactor) ,
      y: sleeveLeftBase.y * interpFactor + midLeftShoulder.y * (1 - interpFactor) ,
    };

    const neckRightX = 200 + shoulderOffset-38 + upperWidthOffset + offsetX;
    const shoulderRightBase = { x: 250 + offsetX, y: 110 }; 
    
    const midRightShoulder = { x: (neckRightX + shoulderRightBase.x) / 2, y: (50 + shoulderRightBase.y) / 2 };

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
    ctx.save(); ctx.fillStyle = shapeColor; ctx.fill(); ctx.restore(); ctx.stroke();    applyPattern(ctx, canvas);
    ctx.restore();
  };

  const drawShortSleeve = (ctx, canvas) => {
    const centerX = canvas.width / 2;
    const currentCenterX = (100 + 200) / 2;
    const offsetX = centerX - currentCenterX;
    const centerY = canvas.height / 2; 
    const currentCenterY = (40 + bodyLength + 210) / 2; 
    const offsetY = centerY - currentCenterY; 

    ctx.save(); 
    ctx.translate(0, offsetY);

    const neckLeftX = 100 - shoulderOffset + 38 - upperWidthOffset + offsetX;
    const shoulderLeftBase = { x: 50 + offsetX, y: 110 };

    const sleeveLeftBase = { x: 60 + offsetX, y: 20 };
    const sleeveRightBase = { x: 240 + offsetX, y: 20 };

    const midLeftShoulder = { x: (neckLeftX + shoulderLeftBase.x) / 2, y: (50 + shoulderLeftBase.y) / 2 };
    const interpFactor = Math.min(armLengthFactor / 7, 5) * 0.12;

    const leftShoulder = {
      x: shoulderLeftBase.x * interpFactor + midLeftShoulder.x * (1 - interpFactor),
      y: shoulderLeftBase.y * interpFactor + midLeftShoulder.y * (1 - interpFactor),
    };
    const leftSleeve = {
      x: sleeveLeftBase.x * interpFactor + midLeftShoulder.x * (1 - interpFactor),
      y: sleeveLeftBase.y * interpFactor + midLeftShoulder.y * (1 - interpFactor),
    };

    const neckRightX = 200 + shoulderOffset - 38 + upperWidthOffset + offsetX;
    const shoulderRightBase = { x: 250 + offsetX, y: 110 };

    const midRightShoulder = { x: (neckRightX + shoulderRightBase.x) / 2, y: (50 + shoulderRightBase.y) / 2 };

    const rightShoulder = {
      x: shoulderRightBase.x * interpFactor + midRightShoulder.x * (1 - interpFactor),
      y: shoulderRightBase.y * interpFactor + midRightShoulder.y * (1 - interpFactor),
    };
    const rightSleeve = {
      x: sleeveRightBase.x * interpFactor + midRightShoulder.x * (1 - interpFactor),
      y: sleeveRightBase.y * interpFactor + midRightShoulder.y * (1 - interpFactor),
    };

    ctx.beginPath();
    ctx.moveTo(neckLeftX, 50);
    ctx.lineTo(leftShoulder.x, leftShoulder.y);
    ctx.lineTo(leftShoulder.x + 20, leftShoulder.y + 15);

    ctx.lineTo(100 - chestOffset + 82 + offsetX, 50 + topBodyHeight + 30);
    ctx.lineTo(100 - lowerWidthOffset + 90 + offsetX, bodyLength + 130);
    ctx.lineTo(200 + lowerWidthOffset - 90 + offsetX, bodyLength + 130);
    ctx.lineTo(200 + chestOffset - 82 + offsetX, 50 + topBodyHeight + 30);

    ctx.lineTo(rightShoulder.x - 20, rightShoulder.y + 15);
    ctx.lineTo(rightShoulder.x, rightShoulder.y);
    ctx.lineTo(neckRightX, 50);

    ctx.lineTo(170 + neckXOffset - 20 + offsetX + 20, 40);
    ctx.quadraticCurveTo(150 + offsetX, neckY + 82, 130 - neckXOffset + offsetX, 40);
    ctx.lineTo(neckLeftX, 50);

    ctx.closePath();
    ctx.save(); ctx.fillStyle = shapeColor; ctx.fill(); ctx.restore(); ctx.stroke();    applyPattern(ctx, canvas);
    ctx.restore();
  };

  const drawShortCoat = (ctx, canvas) => {
    const centerX = canvas.width / 2;  
    const currentCenterX = (100 + 200) / 2;  
    const offsetX = centerX - currentCenterX;  
    const centerY = canvas.height / 2; 
    const currentCenterY = (40 + bodyLength + 210) / 2; 
    const offsetY = centerY - currentCenterY; 

    ctx.save(); 
    ctx.translate(0, offsetY);
    
    const neckLeftX = 100 - shoulderOffset+ 38 - upperWidthOffset + offsetX;
    const shoulderLeftBase = { x: 50 + offsetX, y: 110 }; 

    const sleeveLeftBase = { x: 60 + offsetX, y: 20 };
    const sleeveRightBase = { x: 240 + offsetX, y: 20 };

    const midLeftShoulder = { x: (neckLeftX + shoulderLeftBase.x) / 2, y: (50 + shoulderLeftBase.y) / 2 };
    const interpFactor = Math.min(armLengthFactor / 7, 5) ;

    const leftShoulder = {
      x: shoulderLeftBase.x * interpFactor + midLeftShoulder.x * (1 - interpFactor ),
      y: shoulderLeftBase.y * interpFactor + midLeftShoulder.y * (1 - interpFactor ),
    };

    const neckRightX = 200 + shoulderOffset-38 + upperWidthOffset + offsetX;
    const shoulderRightBase = { x: 250 + offsetX, y: 110 }; 
    const midRightShoulder = { x: (neckRightX + shoulderRightBase.x) / 2, y: (50 + shoulderRightBase.y) / 2 };

    const rightShoulder = {
      x: shoulderRightBase.x * interpFactor + midRightShoulder.x * (1 - interpFactor ) ,
      y: shoulderRightBase.y * interpFactor + midRightShoulder.y * (1 - interpFactor )  ,
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
    ctx.save(); ctx.fillStyle = 'shapeColor'; ctx.fill(); ctx.restore(); ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(150 + offsetX, neckY + 51); 
    ctx.lineTo(150 + offsetX, centerY + 22);   
    ctx.stroke();

    applyPattern(ctx, canvas);
    ctx.restore();
  };

  const drawPants = (ctx, canvas) => {
    const centerX = canvas.width / 2;
    const offsetX = centerX - 150;

    const waist = (waistOffset || 35) * 1.8; 
    const hem = (hemOffset || 20) * 3; 
    const length = (pantsLength || 95) * 2.8; 
    const crotchY = (crotchLength || 25) * 5 + 20;

    const centerY = canvas.height / 2; 
    const currentCenterY = (100 + length) / 2; 
    const offsetY = centerY - currentCenterY + 13.5; 

    ctx.save(); 
    ctx.translate(0, offsetY);

    ctx.beginPath();
    ctx.moveTo(165 - waist + offsetX, 50); 
    ctx.lineTo(135 + waist + offsetX, 50); 
    ctx.lineTo(150 + hem + offsetX, length); 
    ctx.lineTo(150 + hem - 40 + offsetX, length); 
    ctx.lineTo(150 + offsetX, crotchY); 
    ctx.lineTo(150 - hem + 40 + offsetX, length); 
    ctx.lineTo(150 - hem + offsetX, length); 
    ctx.closePath();

    ctx.save(); 
    ctx.fillStyle = (shapeColor && shapeColor !== 'undefined' && shapeColor !== 'null') ? shapeColor : '#87ceeb';   
    ctx.fill(); 
    ctx.stroke();
    applyPattern(ctx, canvas);
    ctx.restore();
  };
    
  const drawCoat = (ctx, canvas, isJacket) => {
    const centerX = canvas.width / 2;  
    const currentCenterX = (100 + 200) / 2;  
    const offsetX = centerX - currentCenterX;  

    // 1. 세로(Y) 축 좌표 계산
    const coatHemY = isJacket ? bodyLength + 100 : bodyLength + 220; // 밑단
    const armpitY = 50 + topBodyHeight + 30; // 겨드랑이
    const shoulderY = 75; 

    // 캔버스 중앙 정렬용
    const centerY = canvas.height / 2; 
    const currentCenterY = (40 + coatHemY) / 2; 
    const offsetY = centerY - currentCenterY;
    
    ctx.save(); 
    ctx.translate(0, offsetY); 

    // 2. 가로(X) 축 좌표 계산
    const neckLeftX = 95 - shoulderOffset + 38 + offsetX;
    const neckRightX = 205 + shoulderOffset - 38 + offsetX;

    const shoulderLeftX = neckLeftX - 28; 
    const shoulderRightX = neckRightX + 28;

    const chestLeftX = 110 - chestOffset + 86 + offsetX;
    const chestRightX = 190 + chestOffset - 86 + offsetX;

    const hemLeftX = isJacket ? 117 - lowerWidthOffset + 90 + offsetX : 95 - lowerWidthOffset + 95 + offsetX;
    const hemRightX = isJacket ? 183 + lowerWidthOffset - 90 + offsetX : 205 + lowerWidthOffset - 95 + offsetX;
    
    //const hemLeftX = 95 - lowerWidthOffset + 95 + offsetX;
    //const hemRightX = 205 + lowerWidthOffset - 95 + offsetX;

    // 3. 소매 좌표 계산 
    const sleeveLength = armLengthFactor * 7; 
    const wristWidth = 30;  

    const sleeveLeftX = shoulderLeftX - 25;
    const sleeveLeftY = shoulderY + sleeveLength;

    const sleeveRightX = shoulderRightX + 25;
    const sleeveRightY = shoulderY + sleeveLength;

    // 4. 코트 외곽선 그리기
    ctx.beginPath();
    
    // --- 왼쪽 ---
    ctx.moveTo(neckLeftX, 50);
    ctx.lineTo(shoulderLeftX, shoulderY); 
    ctx.lineTo(sleeveLeftX, sleeveLeftY); // 손목 바깥
    ctx.lineTo(sleeveLeftX + wristWidth, sleeveLeftY); // 손목 안쪽
    ctx.lineTo(chestLeftX, armpitY); // 겨드랑이

    // --- 몸통 ---
    ctx.lineTo(hemLeftX, coatHemY + 5); // 왼쪽 밑단
    ctx.lineTo(hemRightX, coatHemY + 5); // 오른쪽 밑단

    // --- 오른쪽 ---
    ctx.lineTo(chestRightX, armpitY); // 겨드랑이
    ctx.lineTo(sleeveRightX - wristWidth, sleeveRightY); // 손목 안쪽
    ctx.lineTo(sleeveRightX, sleeveRightY); // 손목 바깥
    ctx.lineTo(shoulderRightX, shoulderY); 
    ctx.lineTo(neckRightX, 50);

    // --- 목 파임(뒷목) ---
    ctx.lineTo(170 + neckXOffset - 20 + offsetX + 20, 40);
    ctx.quadraticCurveTo(150 + offsetX, neckY + 82, 130 - neckXOffset + offsetX, 40);
    ctx.lineTo(neckLeftX, 50);
    ctx.closePath();

    ctx.save(); 
    ctx.fillStyle = (shapeColor && shapeColor !== 'undefined' && shapeColor !== 'null') ? shapeColor : '#87ceeb';    ctx.fill(); 
    ctx.restore(); 
    ctx.stroke();

    applyPattern(ctx, canvas);

    const vNeckBottomY = neckY + 51;

    ctx.beginPath();
    ctx.moveTo(150 + offsetX, vNeckBottomY); 
    ctx.lineTo(150 + offsetX, coatHemY + 4); 
    ctx.stroke();

    ctx.restore();
  };
  
  const drawDress = (ctx, canvas, isMini) => {
    const centerX = canvas.width / 2;
    const offsetX = centerX - 150;

    const neckLeftX = 100 - shoulderOffset + 38 - (upperWidthOffset || 0) + offsetX;
    const neckRightX = 200 + shoulderOffset - 38 + (upperWidthOffset || 0) + offsetX;
    const chestLeft = 100 - chestOffset + 82 + offsetX;
    const chestRight = 200 + chestOffset - 82 + offsetX;
    const armpitY = 50 + topBodyHeight + 30;

    const shoulderLeftX = neckLeftX - 12; 
    const shoulderRightX = neckRightX + 12;
    const shoulderY = 75;

    const sleeveLeftX = shoulderLeftX - 8 - (armLengthFactor * 0.3); 
    const sleeveLeftY = shoulderY + 12 + (armLengthFactor * 0.4); 

    const sleeveRightX = shoulderRightX + 8 + (armLengthFactor * 0.3);
    const sleeveRightY = shoulderY + 12 + (armLengthFactor * 0.4);

    const currentWaist = waistWidth || 74;
    const waistY = armpitY + (bodyLength * 0.45);
    const waistDistance = currentWaist * 0.65;
    const waistLeft = 150 - waistDistance + offsetX;
    const waistRight = 150 + waistDistance + offsetX;

    const dressHemY = isMini ? bodyLength + 160 : bodyLength + 210;
    const hemDistance = lowerWidthOffset * 0.85;
    const hemLeft = 150 - hemDistance + offsetX;
    const hemRight = 150 + hemDistance + offsetX;

    const centerY = canvas.height / 2;
    const currentCenterY = (50 + dressHemY) / 2;
    const offsetY = centerY - currentCenterY - 9;

    ctx.save();
    ctx.translate(0, offsetY);
    ctx.beginPath();

    ctx.moveTo(neckLeftX, 50);
    ctx.lineTo(shoulderLeftX, shoulderY);
    ctx.lineTo(sleeveLeftX, sleeveLeftY); 
    ctx.lineTo(chestLeft, armpitY);      

    ctx.quadraticCurveTo(waistLeft, waistY, hemLeft, dressHemY);
    ctx.lineTo(hemRight, dressHemY);
    ctx.quadraticCurveTo(waistRight, waistY, chestRight, armpitY);

    ctx.lineTo(sleeveRightX, sleeveRightY); 
    ctx.lineTo(shoulderRightX, shoulderY);
    ctx.lineTo(neckRightX, 50);

    ctx.lineTo(170 + (neckXOffset||15) - 20 + offsetX + 20, 40);
    ctx.quadraticCurveTo(150 + offsetX, (neckY||18) + 82, 130 - (neckXOffset||15) + offsetX, 40);
    ctx.lineTo(neckLeftX, 50);
    ctx.closePath();

    ctx.save(); 
    ctx.fillStyle = (shapeColor && shapeColor !== 'undefined' && shapeColor !== 'null') ? shapeColor : '#87ceeb';   
    
    ctx.fill();
    ctx.stroke();
    applyPattern(ctx, canvas);
    ctx.restore();
  };


  const drawSkirt = (ctx, canvas, isMini) => {
    const centerX = canvas.width / 2;

    const waistWidth = waistOffset * 2.5;
    const hemWidth = lowerWidthOffset * 3.0;

    const length = isMini
      ? bodyLength * 2.5
      : bodyLength * 4.9;

    const topY = 80;
    const bottomY = topY + length;

    const centerY = canvas.height / 2;
    const currentCenterY = (topY + bottomY) / 2;
    //const offsetY = centerY - currentCenterY - 20;

    const offsetY = isMini
      ? centerY - currentCenterY - 20
      : centerY - currentCenterY + 10;

    ctx.save();
    ctx.translate(0, offsetY);

    ctx.beginPath();

    // 왼쪽 허리
    ctx.moveTo(
      centerX - waistWidth / 2,
      topY
    );

    // 왼쪽 라인
    ctx.quadraticCurveTo(
      centerX - hemWidth / 2,
      topY + length * 0.6,
      centerX - hemWidth / 2,
      bottomY
    );

    // 밑단
    ctx.lineTo(
      centerX + hemWidth / 2,
      bottomY
    );

    // 오른쪽 라인
    ctx.quadraticCurveTo(
      centerX + hemWidth / 2,
      topY + length * 0.6,
      centerX + waistWidth / 2,
      topY
    );

    ctx.closePath();

    ctx.save();
    ctx.fillStyle = (shapeColor && shapeColor !== 'undefined' && shapeColor !== 'null') ? shapeColor : '#87ceeb';   
    ctx.fill();
    ctx.stroke();

    applyPattern(ctx, canvas);

    ctx.restore();
  };


  const drawShoes = (ctx, canvas, type) => {
    const centerX = canvas.width / 2;
    ctx.save();
    ctx.fillStyle = 'shapeColor';

    const drawShoe = (x, isHighTop) => {
      ctx.beginPath();
      const topY = isHighTop ? 150 : 200; 
      ctx.moveTo(x - 20, topY);
      ctx.lineTo(x + 20, topY);
      ctx.lineTo(x + 30, 250); 
      ctx.lineTo(x - 30, 250); 
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    };

    drawShoe(centerX - 40, type.includes('하이탑')); 
    drawShoe(centerX + 40, type.includes('하이탑')); 
    ctx.restore();
    applyPattern(ctx, canvas);
  };

  const drawBag = (ctx, canvas, type) => {
    const centerX = canvas.width / 2;
    ctx.save();
    ctx.fillStyle = 'shapeColor';

    if (type.includes('백팩')) {
      ctx.beginPath();
      ctx.roundRect(centerX - 60, 80, 120, 150, 20); 
      ctx.fill(); ctx.stroke();
      ctx.beginPath();
      ctx.roundRect(centerX - 40, 150, 80, 60, 10);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(centerX - 40, 120); 
      ctx.lineTo(centerX + 40, 120); 
      ctx.lineTo(centerX + 60, 220); 
      ctx.lineTo(centerX - 60, 220); 
      ctx.closePath();
      ctx.fill(); ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(centerX, 120, 20, Math.PI, 0);
      ctx.stroke();
    }
    ctx.restore();
    applyPattern(ctx, canvas);
  };

  const applyPattern = (ctx, canvas) => {
    if (!shapePattern || shapePattern === '무지') return; 

    ctx.save();
    ctx.clip(); 

    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
    
    const startX = -canvas.width;
    const endX = canvas.width * 2;
    const startY = -canvas.height;
    const endY = canvas.height * 2;

    if (shapePattern === '도트') {
      const dotSpacing = 20;
      const dotRadius = 3;
      for (let y = startY; y < endY; y += dotSpacing) {
        for (let x = startX; x < endX; x += dotSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } 
    else if (shapePattern === '스트라이프') {
      const stripeSpacing = 15;
      ctx.lineWidth = 2;
      for (let x = startX; x < endX; x += stripeSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, startY);
        ctx.lineTo(x, endY);
        ctx.stroke();
      }
    } 
    else if (shapePattern === '체크') {
      const checkSpacing = 20;
      ctx.lineWidth = 1.5;
      // 세로줄
      for (let x = startX; x < endX; x += checkSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, startY);
        ctx.lineTo(x, endY);
        ctx.stroke();
      }
      // 가로줄
      for (let y = startY; y < endY; y += checkSpacing) {
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.lineTo(endX, y);
        ctx.stroke();
      }
    }

    ctx.restore();
  };

  useEffect(() => {  
    drawClothes(); 
  }, [
    clothingType, 
    neckY, neckXOffset, shoulderOffset, chestOffset, bodyLength, armLengthFactor, topBodyHeight, lowerWidthOffset,
    pantsLength, waistOffset, hipOffset, thighOffset, hemOffset, crotchLength,
    waistWidth, shapeColor, shapePattern,
  ]);
  
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

  const safeClothingType = typeof clothingType === 'string' ? clothingType : String(clothingType || "");

  const isPants =
    safeClothingType.includes("바지") ||
    safeClothingType.includes("팬츠");

  const isSkirt =
    safeClothingType.includes("스커트") ||
    safeClothingType.includes("치마");

  return (
    <div className="canvas-adjust" style={{ textAlign: 'center' }}>
      <div className="size-spec-layout">
        <div className="size-spec-container">
          <canvas
            ref={canvasRef}
            width={350}
            height={350}
            style={{ margin: "3px", width: "450px", height: "450px", display: "block", border: '2px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9' }}
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
            {isPants ? (
              <>
                <div style={{ marginTop: '1rem' }}>
                  <h4>총 기장</h4>
                  <input type="range" min={91} max={103} step={0.25} value={pantsLength} onChange={(e) => setPantsLength(Number(e.target.value))} style={{ width: '80%' }} />
                  <input type="number" min={91} max={103} step={0.25} value={pantsLength} onChange={handleInputChange(setPantsLength, 80, 120)} style={{ width: 70, marginLeft: 10 }} />
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <h4>허리 단면</h4>
                  <input type="range" min={31} max={43} step={0.25} value={waistOffset} onChange={(e) => setWaistOffset(Number(e.target.value))} style={{ width: '80%' }} />
                  <input type="number" min={31} max={43} step={0.25} value={waistOffset} onChange={handleInputChange(setWaistOffset, 20, 60)} style={{ width: 70, marginLeft: 10 }} />
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <h4>엉덩이 단면</h4>
                  <input type="range" min={41} max={53} step={0.25} value={hipOffset} onChange={(e) => setHipOffset(Number(e.target.value))} style={{ width: '80%' }} />
                  <input type="number" min={41} max={53} step={0.25} value={hipOffset} onChange={handleInputChange(setHipOffset, 30, 70)} style={{ width: 70, marginLeft: 10 }} />
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <h4>허벅지 단면</h4>
                  <input type="range" min={24} max={36} step={0.25} value={thighOffset} onChange={(e) => setThighOffset(Number(e.target.value))} style={{ width: '80%' }} />
                  <input type="number" min={24} max={36} step={0.25} value={thighOffset} onChange={handleInputChange(setThighOffset, 15, 50)} style={{ width: 70, marginLeft: 10 }} />
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <h4>밑위 길이</h4>
                  <input type="range" min={23} max={29} step={0.25} value={crotchLength} onChange={(e) => setCrotchLength(Number(e.target.value))} style={{ width: '80%' }} />
                  <input type="number" min={23} max={29} step={0.25} value={crotchLength} onChange={handleInputChange(setCrotchLength, 15, 40)} style={{ width: 70, marginLeft: 10 }} />
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <h4>밑단 단면</h4>
                  <input type="range" min={18} max={24} step={0.25} value={hemOffset} onChange={(e) => setHemOffset(Number(e.target.value))} style={{ width: '80%' }} />
                  <input type="number" min={18} max={24} step={0.25} value={hemOffset} onChange={handleInputChange(setHemOffset, 10, 35)} style={{ width: 70, marginLeft: 10 }} />
                </div>
                            </>
            ) : isSkirt ? (
              <>
                <div style={{ marginTop: '1rem' }}>
                  <h4>총 기장</h4>
                  <input
                    type="range"
                    min={40}
                    max={60}
                    step={0.25}
                    value={bodyLength}
                    onChange={(e) => setBodyLength(Number(e.target.value))}
                    style={{ width: '80%' }}
                  />
                  <input
                    type="number"
                    value={bodyLength}
                    onChange={handleInputChange(setBodyLength, 30, 80)}
                    style={{ width: 70, marginLeft: 10 }}
                  />
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <h4>허리 단면</h4>
                  <input
                    type="range"
                    min={31}
                    max={43}
                    step={0.25}
                    value={waistOffset}
                    onChange={(e) => setWaistOffset(Number(e.target.value))}
                    style={{ width: '80%' }}
                  />
                  <input
                    type="number"
                    value={waistOffset}
                    onChange={handleInputChange(setWaistOffset, 20, 60)}
                    style={{ width: 70, marginLeft: 10 }}
                  />
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <h4>밑단 단면</h4>
                  <input
                    type="range"
                    min={45}
                    max={60}
                    step={0.25}
                    value={lowerWidthOffset}
                    onChange={(e) => setLowerWidthOffset(Number(e.target.value))}
                    style={{ width: '80%' }}
                  />
                  <input
                    type="number"
                    value={lowerWidthOffset}
                    onChange={handleInputChange(setLowerWidthOffset, 30, 100)}
                    style={{ width: 70, marginLeft: 10 }}
                  />
                </div>
              </>
            ) : (
              <>
                <div style={{ marginTop: '1rem' }}>
                  <h4>목 파임</h4>
                  <input type="range" min={18} max={21} step={0.25} value={neckY} onChange={(e) => setNeckY(Number(e.target.value))} style={{ width: '80%' }} />
                  <input type="number" min={18} max={21} step={0.25} value={neckY} onChange={handleInputChange(setNeckY, 50, 150)} style={{ width: 70, marginLeft: 10 }} />
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <h4>목 너비</h4>
                  <input type="range" min={18} max={24} step={0.25} value={neckXOffset} onChange={(e) => setNeckXOffset(Number(e.target.value))} style={{ width: '80%' }} />
                  <input type="number" min={18} max={24} step={0.25} value={neckXOffset} onChange={handleInputChange(setNeckXOffset, -20, 15)} style={{ width: 70, marginLeft: 10 }} />
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <h4>어깨 단면</h4>
                  <input type="range" min={38} max={50} step={0.25} value={shoulderOffset} onChange={(e) => setShoulderOffset(Number(e.target.value))} style={{ width: '80%' }} />
                  <input type="number" min={38} max={50} step={0.25} value={shoulderOffset} onChange={handleInputChange(setShoulderOffset, 0, 30)} style={{ width: 70, marginLeft: 10 }} />
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <h4>가슴 단면</h4>
                  <input type="range" min={82} max={106} step={0.25} value={chestOffset} onChange={(e) => setChestOffset(Number(e.target.value))} style={{ width: '80%' }} />
                  <input type="number" min={82} max={105} step={0.25} value={chestOffset} onChange={handleInputChange(setChestOffset, 0, 30)} style={{ width: 70, marginLeft: 10 }} />
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <h4>총 기장</h4>
                  <input type="range" min={67} max={77} step={0.25} value={bodyLength} onChange={(e) => setBodyLength(Number(e.target.value))} style={{ width: '80%' }} />
                  <input type="number" min={67} max={77} step={0.25} value={bodyLength} onChange={handleInputChange(setBodyLength, 150, 400)} style={{ width: 70, marginLeft: 10 }} />
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <h4>소매 기장</h4>
                  <input type="range" min={20} max={26} step={0.01} value={armLengthFactor} onChange={(e) => setArmLengthFactor(Number(e.target.value))} style={{ width: '80%' }} />
                  <input type="number" min={1} max={5} step={0.25} value={armLengthFactor} onChange={handleInputChange(setArmLengthFactor, 0, 5)} style={{ width: 70, marginLeft: 10 }} />
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <h4>암홀(직선)</h4>
                  <input type="range" min={18} max={30} step={0.25} value={topBodyHeight} onChange={(e) => setTopBodyHeight(Number(e.target.value))} style={{ width: '80%' }} />
                  <input type="number" min={18} max={30} step={0.25} value={topBodyHeight} onChange={handleInputChange(setTopBodyHeight, 10, 100)} style={{ width: 70, marginLeft: 10 }} />
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <h4>밑단 단면</h4>
                  <input type="range" min={90} max={114} step={0.25} value={lowerWidthOffset} onChange={(e) => setLowerWidthOffset(Number(e.target.value))} style={{ width: '80%' }} />
                  <input type="number" min={90} max={114} step={0.25} value={lowerWidthOffset} onChange={handleInputChange(setLowerWidthOffset, 0, 50)} style={{ width: 70, marginLeft: 10 }} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}