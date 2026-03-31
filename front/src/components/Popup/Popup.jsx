// Popup.jsx
import React from "react";
import styled from "styled-components";

// 전체 화면을 덮는 오버레이
const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 팝업 창 컨테이너
const PopupContainer = styled.div`
  background: white;
  width: 350px;
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;

  p {
    font-weight: 500;
    margin-bottom: 10px;
  }

  ul {
    list-style: none; 
  }

  li {
   font-weight: bold;
    margin: 5px 0;
  }
`;

// 팝업 하단 버튼 영역
const PopupFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

// 팝업 버튼 스타일 (취소, 확인)
const PopupButton = styled.button`
  width: 50%;
  padding: 10px;
  background: ${(props) => (props.primary ? "white" : "#f0f0f0")};
  color: ${(props) => (props.primary ? "red" : "black")};
  font-size: 16px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  
  &:hover {
    background: ${(props) => (props.primary ? "#ffdddd" : "#e0e0e0")};
  }
`;

// Popup 컴포넌트
const Popup = ({ title, children, onCancel, onConfirm }) => {
  return (
    <PopupOverlay>
      <PopupContainer>
        {title && <p>{title}</p>}
        {children}
        <PopupFooter>
          <PopupButton onClick={onCancel}>취소</PopupButton>
          <PopupButton primary onClick={onConfirm}>확인</PopupButton>
        </PopupFooter>
      </PopupContainer>
    </PopupOverlay>
  );
};

export default Popup;
