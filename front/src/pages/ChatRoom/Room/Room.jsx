import React from "react";
import styled from "styled-components";
import { Modal as BaseModal } from "../../../utils";

// `Modal`을 커스터마이즈하여 재정의
const CustomModal = styled(BaseModal)`
  & > div:first-child {
    background-color: rgba(0, 0, 0, 0.7);
  }
  & > div:last-child {
    border-radius: 12px;
    padding: 30px;
    max-width: 600px;
  }
  & > div:last-child > button {
    background-color: #ff4d4f;
    color: white;
    font-weight: bold;
  }
`;

// `Room` 컴포넌트 정의
export default function Room({ onClose, children, showCloseButton }) {
  return (
    <CustomModal onClose={onClose} showCloseButton={showCloseButton}>
      {children}
    </CustomModal>
  );
}

// 재정의된 `CustomModal`을 export
export { CustomModal };