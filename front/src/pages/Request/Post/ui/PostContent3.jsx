import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  width: 400px;
  height: auto;
`;

const DetailBox = styled.div`
  flex: 0.8;
  width: 100%;
  max-width: 400px;
  height: 200px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.6;
  letter-spacing: 0.5px;
  color: rgb(58, 159, 232);
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  white-space: pre-wrap;
  word-break: break-word;
`;

const TextArea = styled.textarea`
  aspect-ratio: 1 / 1;
  width: 100%;
  height: 100%;
  background-color: white;
  border: 2px solid;
  padding: 10px;
  font-size: 16px;
  resize: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ButtonDetailContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #799fc4;
  width: 120px;
  height: 30px;
  border: 1px solid;
  font-weight: bold;
  font-size: 18px;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Text = styled.div`
  margin: 20px;
`;

const ImgItem = styled.img`
  width: 100%;
  max-height: 245px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 8px;
  background: #f0f0f0;
`;

const ImgContainer1 = styled.div`
  margin-top: 16px;
  min-height: 150px;
  padding: 8px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  background-color: #fafafa;
  position: relative;
`;

export default function PostCotent3({ data = {} }) {
  const { requestId = "", description = "", image1Url = "" } = data;

  const [editMode, setEditMode] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description || "");
  const [isSaving, setIsSaving] = useState(false);

  // 파일명만 추출하는 함수
  const getFileNameFromUrl = (url) => url.split("/").pop();

  // 이미지 URL 생성
  const firstImageUrl = image1Url
    ? `http://localhost:8081/api/requests/files/view/${getFileNameFromUrl(image1Url)}`
    : null;

  const handleEditToggle = () => {
    setEditMode(true);
    setEditedDescription(description || "");
  };

  const handleSave = async () => {
    if (!editedDescription.trim()) {
      alert("상세설명을 입력해주세요.");
      return;
    }
    if (!requestId) {
      alert("요청 ID가 없습니다.");
      return;
    }

    setIsSaving(true);
    try {
      const updatedPost = { description: editedDescription };

      const response = await axios.patch(
        `http://localhost:8081/api/requests/${requestId}/description`,
        updatedPost,
        { withCredentials: true }
      );

      setEditMode(false);
      setIsSaving(false);
      alert("수정 완료!");
    } catch (error) {
      setIsSaving(false);
      alert("수정에 실패했습니다.");
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditedDescription(description || "");
  };

  return (
    <Container>
      <ButtonContainer>
        <ButtonDetailContainer>상세설명</ButtonDetailContainer>
        {editMode ? (
          <>
            <ButtonDetailContainer disabled={isSaving} onClick={handleSave}>
              {isSaving ? "저장 중..." : "저장"}
            </ButtonDetailContainer>
            <ButtonDetailContainer onClick={handleCancel}>취소</ButtonDetailContainer>
          </>
        ) : (
          <ButtonDetailContainer onClick={handleEditToggle}>수정하기</ButtonDetailContainer>
        )}
      </ButtonContainer>

      {editMode ? (
        <TextArea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          placeholder="상세설명을 입력하세요"
        />
      ) : (
        <DetailBox>
          <Text>{description || "수정하기"}</Text>
        </DetailBox>
      )}

      <ImgContainer1>
        {firstImageUrl ? (
          <ImgItem src={firstImageUrl} alt="요청 이미지" />
        ) : (
          <div>이미지가 없습니다.</div>
        )}
      </ImgContainer1>
    </Container>
  );
}
