import React from "react";
import styled from "styled-components";
import { Button } from "../../../../components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  min-width: 400px;
  max-width: 800px;
  width: 60%;
  height: 80%;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  float: right;
  border: none;
  background: white;
  font-size: 20px;
  cursor: pointer;
  color: black;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  gap: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Text = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  color: #9d9b9b;
  gap: 10px;

  hr {
    border-top: 2px solid #ccc;
    margin: 1px;
  }

  p {
    font-weight: bold;
    color: #333;
  }

  div {
    color: #555;
    font-size: 16px;
    margin-bottom: 10px;
    white-space: pre-wrap;
  }
`;

const StyledButton = styled.button`
  background-color: #799fc4;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;

  &:hover {
    filter: brightness(90%);
  }
`;

export default function RequestPopup({ onClose, data }) {
   const handleSave = () => {
    // 기존 requestData 가져오기
    const existingData = localStorage.getItem("requestData");
    let requestData = [];
    
    if (existingData) {
      try {
        requestData = JSON.parse(existingData);
        if (!Array.isArray(requestData)) {
          requestData = [requestData]; // 배열이 아니면 배열로 변환
        }
      } catch (error) {
        console.error("requestData 파싱 오류:", error);
        requestData = [];
      }
    }

    // 새로운 데이터 추가
    requestData.push(data);
    
    // localStorage에 저장
    localStorage.setItem("requestData", JSON.stringify(requestData));
    console.log("Data saved to localStorage:", requestData);
    alert("임시저장이 완료되었습니다.");
  };

  // Debugging: Log received data
  console.log("RequestPopup received data:", data);

  return (
    <Overlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>X</CloseButton>
        <Header>
          <div>
            <h2 style={{ margin: "20px", marginTop: "50px" }}>주호석님의</h2>
            <h1 style={{ margin: "20px" }}>의뢰서</h1>
          </div>
          <ButtonContainer>
            <StyledButton onClick={onClose}>취소</StyledButton>
            <StyledButton onClick={handleSave}>저장</StyledButton>
          </ButtonContainer>
        </Header>
        <Text>
          <p>글제목</p>
          <div>{data?.title || "제목이 없습니다."}</div>

          <hr />
          <p>카테고리</p>
          <div>
            {data?.categoryTags && Array.isArray(data.categoryTags) && data.categoryTags.length > 0
              ? data.categoryTags.join(", ")
              : "카테고리가 없습니다."}
          </div>

          <hr />
          <p>원하는 스타일</p>
          <div>
            {data?.style && data.style !== "선택하세요" ? data.style : "스타일이 선택되지 않았습니다."}
          </div>

          <hr />
          <p>원하는 금액</p>
          <div>{data?.amount || "금액이 입력되지 않았습니다."}</div>

          <hr />
          <p>희망 마감기한</p>
          <div>
            {data?.deadline && data.deadline !== "선택하세요"
              ? data.deadline
              : "마감기한이 선택되지 않았습니다."}
          </div>

          <hr />
          <p>게시글 작성일시</p>
          <div>{new Date().toLocaleString()}</div>

          <hr />
          <p>상세 설명</p>
          <div>{data?.description || "상세 설명이 없습니다."}</div>

          <hr />
        </Text>
      </ModalContainer>
    </Overlay>
  );
}