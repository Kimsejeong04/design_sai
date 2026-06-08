import React, { useEffect, useRef } from 'react';
import "./ClothesTest.css";

export default function ClothesTest({
  clothingType, //5.4 추가
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
  
  pantsLength, setPantsLength,
  waistOffset, setWaistOffset,
  hipOffset, setHipOffset,
  thighOffset, setThighOffset,
  hemOffset, setHemOffset,
  crotchLength, setCrotchLength,
}) {
  const canvasRef = useRef(null);
  
  const drawClothes = () => {  // 5.4 추가
  const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화
  
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 3;

  // 선택된 옷 종류에 따라 다른 그리기 함수 호출
  const safeType = clothingType || "";
  //console.log("1단계에서 넘어온 옷 이름:", safeType);

  if (safeType.includes('바지') || safeType.includes('팬츠') || safeType.includes('슬랙스')) { 
      drawPants(ctx, canvas);
    } else if (safeType.includes('반팔') || safeType.includes('반바지') || safeType.includes('티셔츠')) {
      drawShortSleeve(ctx, canvas);
      } else if (safeType.includes('집업') || safeType.includes('자켓')) {
      drawShortCoat(ctx, canvas);
    } else if (safeType.includes('코트')) {
      drawCoat(ctx, canvas);
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

    const centerX = canvas.width / 2;  // 캔버스 가로 중앙 250 중앙에 오도록 배치 하는거
    const currentCenterX = (100 + 200) / 2;  // 원래 중심 셔츠 중심(150) 
    const offsetX = centerX - currentCenterX;  // ->100 픽셀 이동

    const centerY = canvas.height / 2; // 캔버스의 진짜 세로 중앙
    const currentCenterY = (40 + bodyLength + 210) / 2; // 긴팔 상의의 세로 중앙 (목 파임 40 ~ 밑단 130)
    const offsetY = centerY - currentCenterY; // 위아래 이동 거리 계산

    ctx.save(); 
    ctx.translate(0, offsetY);
    
    const neckLeftX = 100 - shoulderOffset+ 38 - upperWidthOffset + offsetX;
    
    const shoulderLeftBase = { x: 50 + offsetX, y: 110 }; //x 가 커지고 y가 작아져야 대각선으로 줄어듬 

    const sleeveLeftBase = { x: 60 + offsetX, y: 20 };
    const sleeveRightBase = { x: 240 + offsetX, y: 20 };

    const midLeftShoulder = {
      x: (neckLeftX + shoulderLeftBase.x) / 2,
      y: (50 + shoulderLeftBase.y) / 2,
    };

    // Normalize armLengthFactor to range [0, 1] to reduce growth rate
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

    ctx.save(); ctx.fillStyle = '#87ceeb'; ctx.fill(); ctx.restore(); ctx.stroke();

    applyPattern(ctx, canvas);
    ctx.restore();
  };


  const drawShortSleeve = (ctx, canvas) => {
    const centerX = canvas.width / 2;
    const currentCenterX = (100 + 200) / 2;
    const offsetX = centerX - currentCenterX;

    const centerY = canvas.height / 2; // 캔버스의 진짜 세로 중앙
    const currentCenterY = (40 + bodyLength + 210) / 2; // 긴팔 상의의 세로 중앙 (목 파임 40 ~ 밑단 130)
    const offsetY = centerY - currentCenterY; // 위아래 이동 거리 계산

    ctx.save(); 
    ctx.translate(0, offsetY);

    const neckLeftX = 100 - shoulderOffset + 38 - upperWidthOffset + offsetX;
    const shoulderLeftBase = { x: 50 + offsetX, y: 110 };

    const sleeveLeftBase = { x: 60 + offsetX, y: 20 };
    const sleeveRightBase = { x: 240 + offsetX, y: 20 };

    const midLeftShoulder = {
      x: (neckLeftX + shoulderLeftBase.x) / 2,
      y: (50 + shoulderLeftBase.y) / 2,
    };

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

    const midRightShoulder = {
      x: (neckRightX + shoulderRightBase.x) / 2,
      y: (50 + shoulderRightBase.y) / 2,
    };

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

    ctx.save(); ctx.fillStyle = '#87ceeb'; ctx.fill(); ctx.restore(); ctx.stroke();

    applyPattern(ctx, canvas);
    ctx.restore();
  };

  const drawShortCoat = (ctx, canvas) => {

    const centerX = canvas.width / 2;  // 캔버스 가로 중앙 250 중앙에 오도록 배치 하는거
    const currentCenterX = (100 + 200) / 2;  // 원래 중심 셔츠 중심(150) 
    const offsetX = centerX - currentCenterX;  // ->100 픽셀 이동

    const centerY = canvas.height / 2; // 캔버스의 진짜 세로 중앙
    const currentCenterY = (40 + bodyLength + 210) / 2; // 긴팔 상의의 세로 중앙 (목 파임 40 ~ 밑단 130)
    const offsetY = centerY - currentCenterY; // 위아래 이동 거리 계산

    ctx.save(); 
    ctx.translate(0, offsetY);
    
    const neckLeftX = 100 - shoulderOffset+ 38 - upperWidthOffset + offsetX;
    
    const shoulderLeftBase = { x: 50 + offsetX, y: 110 }; //x 가 커지고 y가 작아져야 대각선으로 줄어듬 

    const sleeveLeftBase = { x: 60 + offsetX, y: 20 };
    const sleeveRightBase = { x: 240 + offsetX, y: 20 };

    const midLeftShoulder = {
      x: (neckLeftX + shoulderLeftBase.x) / 2,
      y: (50 + shoulderLeftBase.y) / 2,
    };

    // Normalize armLengthFactor to range [0, 1] to reduce growth rate
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

    ctx.save(); ctx.fillStyle = '#87ceeb'; ctx.fill(); ctx.restore(); ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(150 + offsetX, neckY + 51); // 목 한가운데서 시작
    ctx.lineTo(150 + offsetX, centerY + 22);   
    ctx.stroke();

    applyPattern(ctx, canvas);
    ctx.restore();
  };

  // 5.4 추가
  const drawPants = (ctx, canvas) => {
    const centerX = canvas.width / 2;
    const offsetX = centerX - 150;

    // 슬라이더 값을 바지 비율에 맞게 변형
    const waist = chestOffset * 0.8; // 가슴단면 슬라이더 -> 허리로 사용
    const hem = lowerWidthOffset * 0.7; // 밑단 슬라이더 -> 바지 밑단으로 사용
    const length = bodyLength * 2.5 + 100; // 총기장 슬라이더 -> 바지 기장
    const crotchY = topBodyHeight * 2 + 100; // 암홀 슬라이더 -> 밑위(가랑이) 길이

    const centerY = canvas.height / 2; // 캔버스의 진짜 세로 중앙
    const currentCenterY = (100 + length) / 2; // 바지의 세로 중앙
    const offsetY = centerY - currentCenterY; // 위아래 이동 거리 계산

    ctx.save(); 
    ctx.translate(0, offsetY);

    ctx.beginPath();
    ctx.moveTo(165 - waist + offsetX, 50); // 왼쪽 허리
    ctx.lineTo(135 + waist + offsetX, 50); // 오른쪽 허리
    ctx.lineTo(150 + hem + offsetX, length); // 오른쪽 바깥 밑단
    ctx.lineTo(150 + hem - 40 + offsetX, length); // 오른쪽 안쪽 밑단
    ctx.lineTo(150 + offsetX, crotchY); // 사타구니 (가랑이)
    ctx.lineTo(150 - hem + 40 + offsetX, length); // 왼쪽 안쪽 밑단
    ctx.lineTo(150 - hem + offsetX, length); // 왼쪽 바깥 밑단
    ctx.closePath();

    ctx.save(); ctx.fillStyle = '#87ceeb'; ctx.fill(); ctx.restore(); ctx.stroke();

    applyPattern(ctx, canvas);
    ctx.restore();
  };
    
  
  const drawCoat = (ctx, canvas) => {
    const centerX = canvas.width / 2;  
    const currentCenterX = (100 + 200) / 2;  
    const offsetX = centerX - currentCenterX;  

    const coatHemY = bodyLength + 220; 
    const centerY = canvas.height / 2; 
    const currentCenterY = (40 + coatHemY) / 2; 
    const offsetY = centerY - currentCenterY;
    ctx.save(); 
    ctx.translate(0, offsetY); 


    const neckLeftX = 100 - shoulderOffset + 38 - upperWidthOffset + offsetX;
    const shoulderLeftBase = { x: 50 + offsetX, y: 110 }; 
    const sleeveLeftBase = { x: 60 + offsetX, y: 20 };
    const sleeveRightBase = { x: 240 + offsetX, y: 20 };

    const midLeftShoulder = {
      x: (neckLeftX + shoulderLeftBase.x) / 2,
      y: (50 + shoulderLeftBase.y) / 2,
    };

    const interpFactor = Math.min(armLengthFactor / 7, 5); // 긴 소매 유지!

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
    const midRightShoulder = {
      x: (neckRightX + shoulderRightBase.x) / 2,
      y: (50 + shoulderRightBase.y) / 2,
    };

    const rightShoulder = {
      x: shoulderRightBase.x * interpFactor + midRightShoulder.x * (1 - interpFactor),
      y: shoulderRightBase.y * interpFactor + midRightShoulder.y * (1 - interpFactor),
    };
    const rightSleeve = {
      x: sleeveRightBase.x * interpFactor + midRightShoulder.x * (1 - interpFactor),
      y: sleeveRightBase.y * interpFactor + midRightShoulder.y * (1 - interpFactor),
    };

    // 코트 몸통 그리기
    ctx.beginPath();
    ctx.moveTo(neckLeftX, 50); 
    ctx.lineTo(leftShoulder.x, leftShoulder.y);
    ctx.lineTo(leftShoulder.x + 20, leftShoulder.y + 15);
    
    // 겨드랑이 라인
    ctx.lineTo(100 - chestOffset + 82 + offsetX, 50 + topBodyHeight + 30);
    // 밑단 (coatHemY 사용해서 길게)
    ctx.lineTo(85 - lowerWidthOffset + 90 + offsetX, coatHemY);
    ctx.lineTo(215 + lowerWidthOffset - 90 + offsetX, coatHemY);
    
    ctx.lineTo(200 + chestOffset - 82 + offsetX, 50 + topBodyHeight + 30);
    ctx.lineTo(rightShoulder.x - 20, rightShoulder.y + 15);
    ctx.lineTo(rightShoulder.x, rightShoulder.y);
    ctx.lineTo(neckRightX, 50);
    ctx.lineTo(170 + neckXOffset - 20 + offsetX + 20, 40);
    ctx.quadraticCurveTo(150 + offsetX, neckY + 82, 130 - neckXOffset + offsetX, 40);
    ctx.lineTo(neckLeftX, 50);
    ctx.closePath();

    ctx.save(); ctx.fillStyle = '#87ceeb'; ctx.fill(); ctx.restore(); ctx.stroke();

    // 코트 한가운데 지퍼(절개선) 그리기
    ctx.beginPath();
    ctx.moveTo(150 + offsetX, neckY + 51); // 목 한가운데서 시작
    ctx.lineTo(150 + offsetX, coatHemY);   
    ctx.stroke();

    applyPattern(ctx, canvas);
    ctx.restore();
  };
  

  const drawDress = (ctx, canvas, isMini) => {
    const centerX = canvas.width / 2;
    const currentCenterX = (100 + 200) / 2;
    const offsetX = centerX - currentCenterX;

    const neckLeftX = 100 - shoulderOffset + 38 - upperWidthOffset + offsetX;
    const shoulderLeftBase = { x: 50 + offsetX, y: 110 };
    const midLeftShoulder = { x: (neckLeftX + shoulderLeftBase.x) / 2, y: (50 + shoulderLeftBase.y) / 2 };
    
    const interpFactor = 0.15; 

    const leftShoulder = {
      x: shoulderLeftBase.x * interpFactor + midLeftShoulder.x * (1 - interpFactor),
      y: shoulderLeftBase.y * interpFactor + midLeftShoulder.y * (1 - interpFactor),
    };

    const neckRightX = 200 + shoulderOffset - 38 + upperWidthOffset + offsetX;
    const shoulderRightBase = { x: 250 + offsetX, y: 110 };
    const midRightShoulder = { x: (neckRightX + shoulderRightBase.x) / 2, y: (50 + shoulderRightBase.y) / 2 };

    const rightShoulder = {
      x: shoulderRightBase.x * interpFactor + midRightShoulder.x * (1 - interpFactor),
      y: shoulderRightBase.y * interpFactor + midRightShoulder.y * (1 - interpFactor),
    };

    // 가슴, 허리, 밑단 계산
    const chestLeft = 100 - chestOffset + 82 + offsetX;
    const chestRight = 200 + chestOffset - 82 + offsetX;
    const armpitY = 50 + topBodyHeight + 30; // 겨드랑이 높이
    
    const waistY = armpitY + 40; 
    const waistLeft = chestLeft + 15;  
    const waistRight = chestRight - 15;

    // 미니 원피스면 짧게, 롱이면 길게
    const dressHemY = isMini ? bodyLength + 150 : bodyLength + 203; 
    const hemLeft = 100 - lowerWidthOffset + 60 + offsetX; // 밑단은 넓게 쫙 펴지게
    const hemRight = 200 + lowerWidthOffset - 60 + offsetX;

    const centerY = canvas.height / 2; // 캔버스의 진짜 세로 중앙
    const currentCenterY = (50 + dressHemY) / 2; // 원피스의 세로 중앙 (목 파임 50 ~ 밑단 dressHemY)
    const offsetY = centerY - currentCenterY; // 위아래 이동 거리 계산

    ctx.save(); 
    ctx.translate(0, offsetY);

    ctx.beginPath();
    
    ctx.moveTo(neckLeftX, 50);
    ctx.lineTo(leftShoulder.x, leftShoulder.y);
    ctx.lineTo(leftShoulder.x + 10, leftShoulder.y + 15);
    
    
    ctx.lineTo(chestLeft, armpitY);
    ctx.quadraticCurveTo(waistLeft, waistY, hemLeft, dressHemY);
    
    ctx.lineTo(hemRight, dressHemY);

    // 오른쪽 밑단 ~ 허리(곡선) ~ 겨드랑이
    ctx.quadraticCurveTo(waistRight, waistY, chestRight, armpitY);
    
    // 오른쪽 소매 ~ 넥라인
    ctx.lineTo(rightShoulder.x - 10, rightShoulder.y + 15);
    ctx.lineTo(rightShoulder.x, rightShoulder.y);
    ctx.lineTo(neckRightX, 50);

    ctx.lineTo(170 + neckXOffset - 20 + offsetX + 20, 40);
    ctx.quadraticCurveTo(150 + offsetX, neckY + 82, 130 - neckXOffset + offsetX, 40);
    ctx.lineTo(neckLeftX, 50);
    ctx.closePath();

    ctx.save(); ctx.fillStyle = '#87ceeb'; ctx.fill(); ctx.restore(); ctx.stroke();
    applyPattern(ctx, canvas);

    ctx.restore();
  };

  // 스커트 그리기 
  const drawSkirt = (ctx, canvas, isMini) => {
    const centerX = canvas.width / 2;
    const offsetX = centerX - 150;
    const waist = chestOffset * 0.8;
    const hem = lowerWidthOffset * 1.3;

    const length = isMini ? bodyLength * 1.5 + 100 : bodyLength * 2.5 + 140;

    const centerY = canvas.height / 2; // 캔버스의 진짜 세로 중앙
    const currentCenterY = (100 + length) / 2; // 바지의 세로 중앙 (허리 50 ~ 밑단 length)
    const offsetY = centerY - currentCenterY; // 위아래 이동 거리 계산

    ctx.save(); 
    ctx.translate(0, offsetY);

    ctx.beginPath();
    ctx.moveTo(155 - waist + offsetX, 100); // 왼쪽 허리
    ctx.lineTo(135 + waist + offsetX, 100); // 오른쪽 허리
    ctx.lineTo(130 + hem + offsetX, length); // 오른쪽 밑단
    ctx.lineTo(165 - hem + offsetX, length); // 왼쪽 밑단
    ctx.closePath();

    ctx.save(); ctx.fillStyle = '#87ceeb'; ctx.fill(); ctx.restore(); ctx.stroke();
    applyPattern(ctx, canvas);

    ctx.restore();
  };

  // 👟 신발 통합 그리기
  const drawShoes = (ctx, canvas, type) => {
    const centerX = canvas.width / 2;
    ctx.save();
    ctx.fillStyle = '#87ceeb';

    // 신발은 기본적으로 두 짝을 그립니다.
    const drawShoe = (x, isHighTop) => {
      ctx.beginPath();
      // 하이탑이면 발목을 높게 그립니다.
      const topY = isHighTop ? 150 : 200; 
      ctx.moveTo(x - 20, topY);
      ctx.lineTo(x + 20, topY);
      ctx.lineTo(x + 30, 250); // 발끝
      ctx.lineTo(x - 30, 250); // 뒤꿈치
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    };

    drawShoe(centerX - 40, type.includes('하이탑')); // 왼쪽 신발
    drawShoe(centerX + 40, type.includes('하이탑')); // 오른쪽 신발
    ctx.restore();
    applyPattern(ctx, canvas);
  };

  // 🎒 가방 통합 그리기 (백팩 vs 토트/도트백)
  const drawBag = (ctx, canvas, type) => {
    const centerX = canvas.width / 2;
    ctx.save();
    ctx.fillStyle = '#87ceeb';

    if (type.includes('백팩')) {
      // 백팩 모양 (둥근 사각형)
      ctx.beginPath();
      ctx.roundRect(centerX - 60, 80, 120, 150, 20); // x, y, width, height, radius
      ctx.fill(); ctx.stroke();
      // 백팩 주머니
      ctx.beginPath();
      ctx.roundRect(centerX - 40, 150, 80, 60, 10);
      ctx.stroke();
    } else {
      // 토트백/도트백 모양 (사다리꼴 + 손잡이)
      ctx.beginPath();
      ctx.moveTo(centerX - 40, 120); // 왼쪽 위
      ctx.lineTo(centerX + 40, 120); // 오른쪽 위
      ctx.lineTo(centerX + 60, 220); // 오른쪽 아래
      ctx.lineTo(centerX - 60, 220); // 왼쪽 아래
      ctx.closePath();
      ctx.fill(); ctx.stroke();
      
      // 손잡이
      ctx.beginPath();
      ctx.arc(centerX, 120, 20, Math.PI, 0);
      ctx.stroke();
    }
    ctx.restore();
    applyPattern(ctx, canvas);
  };


  const applyPattern = (ctx, canvas) => {
    ctx.save();
    ctx.clip();
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
    ctx.restore();
  };


  // useEffect(() => {
  //   drawShirt();
  // }, [neckY, neckXOffset, shoulderOffset, chestOffset, bodyLength, armLengthFactor, topBodyHeight, lowerWidthOffset]);
  useEffect(() => {  // 5.4추가
    drawClothes(); 
  }, [clothingType, neckY, neckXOffset, shoulderOffset, chestOffset, bodyLength, armLengthFactor, topBodyHeight, lowerWidthOffset]);

  
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
            {clothingType && clothingType.includes("바지") ? (
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

            {/* <button
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
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}