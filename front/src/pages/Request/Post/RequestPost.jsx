import {useState, useEffect} from "react";
import ContentHeader from "../ui/ContentHeader";
import PostContent from "./ui/PostContent";
import PostContent2 from "./ui/PostContent2";
import PostCotent3 from "./ui/PostContent3";
import styled from "styled-components";
import { useLocation } from 'react-router-dom';
import axios from "axios";

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



export default function RequestPost({ onUpdateDescription }) {
  const location = useLocation();
  const { requestData } = location.state || {};
console.log("requestData", requestData.requestData);
console.log("데이터 있는지", useLocation().state)
const [data, setData] = useState([]);

  useEffect(() => {
    // axios.get("/mock-request-writing.json") //의뢰생성에서 나오는 테스트 json데이터 public/mock-request-writing.json
    axios.get("http://localhost:8081/api/requests", {withCredentials: true})
    //벡엔드에서 의뢰생성에서 디자인옷 json 데이터 필요해요 
    .then(res => {
      console.log("📦 게시물 응답 데이터:", res.data);
      setData(res.data);
    })
    .catch(err => {
      console.error('❌ 찜한 의뢰 목록 불러오기 실패:', err);
      if (err.response && err.response.status === 401) {
        alert("게시물 실패 .");
      } else {
        alert("게시물 목록 을 불러오는 데 실패했습니다.");
      }
    });
  }, []);

  const {
    requestId = "",
    title = "",
    categoryTags = "",
    style = "",
    amount = "",
    deadline = "",
    description = "",
    image1Url = "",
    image2Url = "", // 오타 수정
    image3Url = "",
    selectedItem = null
  } = data;

  return (
    <>
      <PostContent data={requestData} />

      {requestData && (
        <Content>
          <Left>
            <PostContent2 data={requestData} />
          </Left>

          <Right>
            <PostCotent3 data={requestData} onUpdateDescription={onUpdateDescription} />
          </Right>
        </Content>
      )}
    </>
  );
}