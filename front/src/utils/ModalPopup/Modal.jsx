import React from "react";
import styled from "styled-components";

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
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  width: 800px;
  height: 1000px;
 
  overflow-y: auto;
  position: relative;
`;


const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 60px; /* 클릭 영역 확장 */
  height: 60px; /* 클릭 영역 확장 */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10001;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  color: black;
  font-size: 20px;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 10px;
 &:hover {
    background: #333;
    color: white;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    padding: 12px;
  }
`;

export default function Modal({ onClose, children, className, showCloseButton = true }) {
  return (
    <Overlay>
      <ModalContainer className={className}>
        {showCloseButton && (
          <CloseButtonWrapper onClick={() => onClose()}>
            <CloseButton>X</CloseButton>
          </CloseButtonWrapper>
        )}
        {children}
      </ModalContainer>
    </Overlay>
  );
}