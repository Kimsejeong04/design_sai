import React, { useState } from "react";
import styled from "styled-components";

import { Modal } from '../../../utils';
import deleteIcon from '../../../assets/delete.png';
import RequestBar from "../../../components/RequestBar/RequestBar";
import { useEffect} from 'react'

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;  
  img {
    width: 20px;
    height: 20px;
  }
`;
// 휴지톧 버튼누르면 나오는 팝업 부분
const CustomModal = styled(Modal)`
  display:flex;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  height: 400px;
  text-align: center;
  max-height: 400px;
`;

const ButtonWrapper = styled.div`
width: 70%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 20px;
  
`;

const CancelButton = styled.button`
  width: 50%;
  border: 1px solid black;
  padding: 10px 20px;
  background: black;
  cursor: pointer;
  color: white;
`;

const ConfirmButton = styled.button`
  width: 50%;
  border: 1px solid red;
  padding: 10px 20px;
  background: white;
  color: red;
  cursor: pointer;
`;



const DeleteIcon = styled.img`
  display:flex;
  justify-content:center;
  algin-items: center;
  width: 200px; /* 원하는 크기로 설정 */
  height: 170px;
`


export default function ModalContent() {
  const [isVisible, setIsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const requestTitle = "후드티 제작"
  const requestDate = "2025-01-01";

  
  // localStorage에서 requestData 가져오기
  const [requestItems, setRequestItems] = useState([]);
    useEffect(() => {
      const storedData = localStorage.getItem("requestData");
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          if (Array.isArray(parsedData)) {
            setRequestItems(parsedData);
          }
        } catch (error) {
          console.error("requestData 파싱 오류:", error);
        }
      }
    }, []);
  
  if (!isVisible) return null;

  return (
    <>
    {requestItems.length > 0 ? (
      requestItems.map((item, index) => (
<RequestBar 
title={requestTitle}
date={requestDate}
onCloseClick={() => setIsModalOpen(true)}/>
    ))
  ): (
    <>
    </>
  )}
    

      {/* 삭제 확인 모달 */}
      {isModalOpen && (
        <CustomModal onClose={() => setIsModalOpen(false)}>

          <DeleteIcon src={deleteIcon} alt="닫기" />
          <h2>글을 삭제하시겠습니까?</h2>
          <p>삭제하시면 다시 복구시킬 수 없습니다.</p>
          <ButtonWrapper>
            <CancelButton 
              onClick={() => 
                setIsModalOpen(false)}>취소</CancelButton>
            <ConfirmButton
              onClick={() => {
                setIsVisible(false); // 컴포넌트 숨기기
                setIsModalOpen(false); // 모달 닫기
              }}
            >
              확인
            </ConfirmButton>
          </ButtonWrapper>
        </CustomModal>
      )}
    </>
  );
}