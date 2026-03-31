import React from "react";
import PostContent from "../../pages/Request/Post/ui/PostContent";
import PostContent2 from "../../pages/Request/Post/ui/PostContent2";
import PostCotent3 from "../../pages/Request/Post/ui/PostContent3";
import styled from "styled-components";
import { useLocation } from 'react-router-dom';

const Content = styled.div`
  width: 100%;
  display: flex;
  
  justify-content: space-between; /* 왼쪽과 오른쪽 컨테이너를 양 끝으로 */
`;

const Left = styled.div`
  flex: 1.2;  /* 왼쪽을 좀 더 넓게 차지 */
`;

const Right = styled.div`
  
  display: flex;               /* 내부 요소를 가로 배치 */
  justify-content: center;   /* 내부 요소들을 오른쪽 정렬 */
  align-items: flex-start;     /* 필요 시 세로 정렬 (예: 상단에 붙이기) */
  padding : 10px;
`;


export default function DesignerRequestPost(onUpdateDescription) {

   const location = useLocation();
  const { requestData } = location.state || {};

  return (
    <>

      <PostContent  data={requestData}/>

      <Content>
        <Left>
          <PostContent2 data={requestData}/>
        </Left>

        <Right>
          <PostCotent3 data={requestData} onUpdateDescription={onUpdateDescription}/>

     
        </Right>
        

      </Content>
       
    </>
  );
}
