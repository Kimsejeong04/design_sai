import React, { Children, useState } from "react";
import {SearchBar2, NextButtonUI } from '../../../components';
import styled from "styled-components";
import { Modal } from "../../../utils";
import ModalContent from "./ModalContent";
import SearchRequest from "../../../pages2/Request/SearchRequest";

/* 🎨 UI만 수정: 800x800 고정박스 → 컴팩트한 사이즈 + 스크롤
   - border-radius 제거: 스크롤바 때문에 오른쪽만 각지고 왼쪽만 둥글어 보이던 문제 해결
   - 제목(h2) 폰트 크게 키움 */
const CustomModal = styled(Modal)`
  padding: 32px;
  width: 480px;
  max-height: 640px;
  overflow-y: auto;
  background-color: #fff;
  border-radius: 0;
  box-sizing: border-box;

  h2 {
    font-size: 24px;
    font-weight: 700;
    color: #222;
    margin: 0 0 16px;
  }
`;

/* 🎨 UI만 추가: 제목과 리스트 사이 구분선 */
const Divider = styled.hr`
  border: none;
  border-top: 1px solid #eee;
  margin: 0 0 20px;
`;



const SearchButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-bottom: 2rem;
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
          <Divider />
          <ModalContent />
        </CustomModal>
      )}
    </>
  );
}