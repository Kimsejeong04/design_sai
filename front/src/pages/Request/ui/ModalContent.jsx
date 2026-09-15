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