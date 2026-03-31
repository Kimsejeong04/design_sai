import React, { Children, useState } from "react";
import {SearchBar2, NextButtonUI } from '../../../components';
import styled from "styled-components";
import { Modal } from "../../../utils";
import ModalContent from "./ModalContent";
import SearchRequest from "../../../pages2/Request/SearchRequest";

const CustomModal = styled(Modal)`
  padding: 20px;
  width: 800px;
  height: 800px;
  background-color: #fff; /* 모달 배경색 설정 */
`;



const SearchButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  
`;


export default function ContentHeader({ children, showButtons = true }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      
        <SearchButtonWrapper>
          {showButtons && (
            <ButtonContainer>
              {/* '임시저장함' 버튼 → /SavedRequests 페이지로 이동 */}
              <NextButtonUI onClick={() => setModalOpen(true)}>임시저장함</NextButtonUI>
              {/* '글쓰기' 버튼 → /RequestWriting 페이지로 이동 */}
              <NextButtonUI to="/client/RequestWriting">글쓰기</NextButtonUI>
            </ButtonContainer>
          )}
        </SearchButtonWrapper>
      

      {modalOpen && (
        <CustomModal onClose={() => setModalOpen(false)}>
          <h2>임시저장된 글</h2>
          <ModalContent />
        </CustomModal>
      )}
    </>
  );
}