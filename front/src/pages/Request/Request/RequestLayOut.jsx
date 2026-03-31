import React from 'react';
import styled from 'styled-components';

// styled-components를 컴포넌트 바깥으로 선언
const Container = styled.div`
  width: 100%;
  background: white;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  margin: 0 auto;
  justify-content: center;
`;

const ContentHeaderWrapper = styled.div`
  width: 50%;
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  gap: 100px;
`;

const PaginationContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  justify-content: center;
  padding: 25px 0;
  background-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const PageButton = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 50%;
  background-color: #f2f2f2;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #bfd7ee;
  }
  &.active {
    background-color: #BFD7EE;
    font-weight: bold;
  }
`;

export default function RequestLayOut({ children }) {
  return (
    <Container>
      <ContentHeaderWrapper />
      <Content>{children}</Content>
      {/* <PaginationContainer>
        <PageButton className="active">1</PageButton>
        <PageButton>2</PageButton>
        <PageButton>3</PageButton>
      </PaginationContainer> */}
    </Container>
  );
}

