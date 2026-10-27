import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { Modal } from '../../../utils';
import deleteIcon from '../../../assets/delete.png';
import RequestBar from "../../../components/RequestBar/RequestBar";
//import { useEffect} from 'react'

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

/* 🎨 UI만 추가: 리스트 항목들 사이 간격을 최대한 촘촘하게.
   단, 각 항목 자체의 높이/내부 여백은 RequestBar 컴포넌트 내부에서 정의돼 있어서
   여기서는 "항목 사이 간격"만 줄일 수 있음 */
const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

// 휴지톧 버튼누르면 나오는 팝업 부분
/* 🎨 UI만 수정: 500x400 고정박스 → 훨씬 컴팩트하게 */
const CustomModal = styled(Modal)`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 32px 24px;
  border-radius: 12px;
  width: 320px;
  height: 280px;
  text-align: center;
  box-sizing: border-box;

  h2 {
    font-size: 17px;
    font-weight: 700;
    color: #222;
    margin: 4px 0 0;
  }

  p {
    font-size: 14px;
    color: #888;
    margin: 8px 0 0;
  }
`;

const ButtonWrapper = styled.div`
width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  gap: 12px;
  
`;

/* 🎨 UI만 수정: 색상/라운드만 다듬음 (onClick 로직은 그대로) */
const CancelButton = styled.button`
  flex: 1;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  padding: 10px 0;
  background: #fff;
  color: #555;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

const ConfirmButton = styled.button`
  flex: 1;
  border: none;
  border-radius: 8px;
  padding: 10px 0;
  background: #e5484d;
  color: #fff;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    filter: brightness(0.92);
  }
`;



const DeleteIcon = styled.img`
  display:flex;
  justify-content:center;
  algin-items: center;
  width: 64px;
  height: 54px;
  object-fit: contain;
`


export default function ModalContent() {
  const navigate = useNavigate();
  const requestTitle = "후드티 제작"
  const requestDate = "2025-01-01";

  const [isVisible, setIsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(false);

  // localStorage에서 requestData 가져오기
  const [requestItems, setRequestItems] = useState([]);
    useEffect(() => {
      const fetchDrafts = async () =>{
        try{
          const response = await axios.get("http://localhost:8081/api/requests/drafts?username=bzbz");
          console.log("임시저장 목록: ", response.data);
          setRequestItems(response.data);
        } catch (error){
          console.error("임시저장 목록 조회 실패:", error);
        }
      };
    fetchDrafts();
  }, []);
  
  if (!isVisible) return null;

  return (
    <>
    {requestItems.length > 0 ? (
      requestItems.map((item, index) => (
      <RequestBar 
          key={item.requestId}
          title={item.title}
          date={item.deadline}
          onClick={() => {
            console.log("선택한 임시저장 글:", item.requestId);
            navigate(`/client/RequestWriting?draftId=${item.requestId}`);
          }}
          onCloseClick={() => {
            setSelectedRequestId(item.requestId);
            setIsModalOpen(true);
          }}
        />
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
              onClick={async() => {
                try {
                  await axios.delete(
                    `http://localhost:8081/api/requests/${selectedRequestId}`
                  );

                  // 삭제된 글을 목록에서도 제거
                  setRequestItems((prev) =>
                    prev.filter((item) => item.requestId !== selectedRequestId)
                  );

                  setIsModalOpen(false);
                  setSelectedRequestId(null);

                  alert("삭제되었습니다.");
                } catch (error) {
                  console.error("임시저장 삭제 실패:", error);
                  alert("삭제에 실패했습니다.");
                }
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