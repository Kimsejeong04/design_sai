import React from "react";
import styled from "styled-components";
import Sidebar from "./ui/Sidebar";
import { NextButtonUI } from "../../components";
import CompletedRequest from "./ui/CompletedRequest"

// 전체 레이아웃
const Layout = styled.div`
  display: flex;
  min-height: 100vh; /* 전체 화면 높이 활용 */
`;

// 사이드바 영역 (고정 너비)
const Left = styled.div`
  width: 400px; /* 고정 너비 */
  transition: width 0.3s ease-in-out; /* 부드러운 전환 */
  
`;

// 콘텐츠 영역 (남은 공간 채움)
const Right = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 1.5rem; /* 24px */
  margin: 2rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 1.25rem; /* 20px */
  font-family: 'Noto Sans KR', sans-serif;
`;

export default function CompletedRequestPage() {

  return (
    <Layout>
      <Left>
        <Sidebar/>
      </Left>
      <Right>
        <CompletedRequest/>
      </Right>
    </Layout>
  );
}