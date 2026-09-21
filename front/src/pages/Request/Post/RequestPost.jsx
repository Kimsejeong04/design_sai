import { useEffect } from "react";
import PostContent from "./ui/PostContent";
import PostContent2 from "./ui/PostContent2";
import PostContent3 from "./ui/PostContent3"; // 기존 PostCotent3(오타) 파일명도 바꿨다면 이 경로도 함께 수정해주세요
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Wrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px 20px 60px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 20px;
  align-items: start;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Empty = styled.div`
  padding: 60px 0;
  text-align: center;
  color: #888;
`;

export default function RequestPost({ onUpdateDescription }) {
  const location = useLocation();
  const { requestData } = location.state || {};

  useEffect(() => {
    // requestData가 없으면(직접 URL 진입 등) API 호출을 하지 않도록 가드
    if (!requestData) return;
    console.log("requestData", requestData);
  }, [requestData]);

  if (!requestData) {
    return <Wrapper><Empty>불러올 의뢰 정보가 없습니다.</Empty></Wrapper>;
  }

  return (
    <Wrapper>
      <PostContent data={requestData} />

      <Content>
        <PostContent2 data={requestData} />
        <PostContent3 data={requestData} onUpdateDescription={onUpdateDescription} />
      </Content>
    </Wrapper>
  );
}