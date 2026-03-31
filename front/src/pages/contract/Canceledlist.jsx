// src/components/ChatMain/CanceledList.jsx
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
  background: #fff8f8;
  margin-bottom: 16px;
`;

export default function CanceledList({ item }) {
  const { id, content, time, contract } = item;
  return (
    <Container>
      <h3>취소된 요청</h3>
      <p>시간: {time}</p>
      <hr />
      <h4>관련 계약</h4>
      <p>제목: {contract.contractTitle}</p>
      <p>디자이너: {contract.designerId}</p>
      <p>클라이언트: {contract.clientId}</p>
    </Container>
  );
}
