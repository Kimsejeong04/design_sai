import React from "react";
import styled from "styled-components";

const Container = styled.button`
  display: flex;
  width: auto;
  min-width: 130px;
  border-radius: 10px;
  border: 2px solid rgb(0, 0, 0);
  height: 30px;
  text-align: center;
  background-color: white;
  color: black;
  justify-content: center; /* 텍스트 중앙 정렬 */
  align-items: center;
  padding: 0 10px; /* 좌우 패딩 추가 */
`;

export default function ButtonCategory({ categoryTags, style, amount, deadline }) {
  // 디버깅: 전달된 prop 확인
  console.log("ButtonCategory props:", { categoryTags, style, amount, deadline });

  // 표시할 텍스트 결정
  let displayText = "미지정";
  if (categoryTags) {
    displayText = Array.isArray(categoryTags) && categoryTags.length > 0 ? categoryTags.join(", ") : "카테고리";
  } else if (style) {
    displayText = style || "원하는스타일";
  } else if (amount) {
    displayText = amount || "원하는 금액";
  } else if (deadline) {
    displayText = deadline || "희망 마감기한";
  }

  return (
    <Container>
      {displayText}
    </Container>
  );
}