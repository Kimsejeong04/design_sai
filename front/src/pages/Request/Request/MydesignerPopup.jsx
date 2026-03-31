import React from 'react';
import styled from 'styled-components';

// 1) 반투명 오버레이
const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ show }) => (show ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

// 2) 모달 컨테이너
const ModalContainer = styled.div`
  position: relative;
  background: #fff;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
`;

// 3) 닫기 버튼
const CloseButton = styled.button`
  position: absolute;
  top: 12px; 
  right: 12px;
  background: transparent;
  border: none;
  font-size: 1.4rem;
  line-height: 1;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

// 4) 내용 영역 (필요에 따라 확장)
const ModalContent = styled.div`
  margin-top: 16px;
  font-size: 1rem;
  color: #333;
`;

export default function Popup({ show, onClose, children }) {
  return (
    <ModalOverlay show={show}>
      <ModalContainer>
        <CloseButton onClick={onClose} aria-label="닫기">&times;</CloseButton>
        <ModalContent>{children}</ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
}