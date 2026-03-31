import React from "react";
import Profile from "./ui/Profile";
import Search from "./ui/Search";
import styled from "styled-components";
import ContentHeader from "../ui/ContentHeader";
import SideMenuBar from "../../../components/sidebar/SideMenuBar";
import axios from "axios";
import {useState, useEffect, navigate} from "react";
import {SearchBar2, NextButtonUI } from '../../../components';
import RequestLayOut from "../Request/RequestLayOut";
import SearchRequest from "../../../pages2/Request/SearchRequest";



// 전체 레이아웃을 감싸는 컨테이너
export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;           /* 가운데 정렬 */
  width: 100%;
  min-height: 100vh;
  background-color: #f9faff;     /* 은은한 배경 */
  padding: 2rem 1rem;            /* 상하 2rem, 좌우 1rem 여백 */
`;

// Content(App Screen) 스타일
export const Content = styled.div`
  width: 100%;
  max-width: 1200px;             /* 컨텐츠 최대 너비 */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;                   /* 카드 사이 간격 */
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

export default function ChoseDesigner() {
  const [postsCount, setPostsCount] = useState(0);  // 개수를 저장할 상태 추가
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    

const [review, setReview] = useState([]);

    const handleSearchTermChange = (newSearchTerm) => {
      setSearchTerm(newSearchTerm);
    };
  const fetchPosts = () => {
    axios.get("http://localhost:8081/api/posts", { withCredentials: true }) 
      .then(response => {
        console.log("글 목록 불러오기 성공", response.data);
        setPosts(response.data);
        setPostsCount(response.data.length); 
      })
      .catch(error => console.error("글 목록 불러오기 실패", error));
  };
  useEffect(() => {
    fetchPosts();
  }, []);


console.log("posts:", posts);
console.log("searchTerm:", searchTerm);

  const fetchReview = () => {
      axios.get("/mock-review.json") //public/mock-review.json
      // axios.get("http://localhost:8081/api/review", { withCredentials: true }) //벡엔드 api 주소에 review가없어서 주석처리했어요 
      .then(response => {
        console.log("글 후기 목록 불러오기 성공", response.data);
        setReview(response.data);
        
      })
      .catch(error => console.error("글 후기 목록 불러오기 실패", error));
  };
  useEffect(() => {
    fetchReview();
  }, []);



  
// 검색어 공백 제거 및 소문자 변환 엔터하면 검색 돼는걸루 
    const trimmedSearchTerm = searchTerm.trim().toLowerCase();
    // id 필드를 기준으로 필터링
    const filteredItems = trimmedSearchTerm
        ? posts.filter(
              (post) =>
                  typeof post.id === "string" &&
                  post.id.toLowerCase().includes(trimmedSearchTerm)
          )
        : posts;

    // 디버깅 로그
    useEffect(() => {
        console.log("검색어:", searchTerm);
        console.log("정리된 검색어:", trimmedSearchTerm);
        console.log("필터링된 항목:", filteredItems);
    }, [searchTerm, filteredItems]);

    
  return (
    <>
   
    
    {/*<SearchBar2 onSearchTermChange={handleSearchTermChange} />*/}

    <RequestLayOut>
      <div style={{display : "flex", alignItems:"center" }}><h1>디자이너찾기 </h1>
      <SearchRequest searchTerm={searchTerm} setSearchTerm={setSearchTerm} children={"디자이너검색"} /></div>
      <MainContainer>
    
       <Content>
      {filteredItems.length > 0 ? (
        filteredItems.map((post) => (
          <Profile key={post.postnum} post={post} reviews={review} />
          ))
        ) : (
            <p>찾으시는 ID가 없습니다.</p>
          )}
        </Content>
      </MainContainer>
    </RequestLayOut>
  </>
  );
}








// // Sidebar 스타일
// const Sidebar = styled.div`
//   flex: 0 0 250px; /* Sidebar 너비 고정 */
//   display: flex;
//   flex-direction: column;
//   background: #fff; /* Sidebar 배경색 */
//   padding: 20px;
//   border-right: 1px solid #ccc; /* 구분선 */
// `;