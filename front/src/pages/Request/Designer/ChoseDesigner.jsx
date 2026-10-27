import React from "react";
import Profile from "./ui/Profile";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import RequestLayOut from "../Request/RequestLayOut";
import SearchRequest from "../../../pages2/Request/SearchRequest";

// 제목 + 검색창 영역
const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 16px 8px;
  box-sizing: border-box;
`;

const TitleBox = styled.div`
  min-width: 0;
`;

const PageTitle = styled.h1`
  margin: 0;
  font-size: 1.75rem;
  font-weight: 700;
  color: #2f3b47;
`;

const PageDesc = styled.p`
  margin: 6px 0 0;
  font-size: 0.95rem;
  color: #7a8794;
`;

const SearchWrap = styled.div`
  flex: 1 1 280px;
  max-width: 420px;
  min-width: 0;

  @media (max-width: 600px) {
    max-width: none;
  }
`;

// 개수 + 정렬 바
const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 16px 0;
  box-sizing: border-box;
`;

const CountText = styled.span`
  font-size: 0.95rem;
  color: #5b6773;

  strong {
    color: #799fc4;
    font-weight: 700;
  }
`;

const SortSelect = styled.select`
  height: 38px;
  padding: 0 14px;
  border: 1px solid #dfe6ee;
  border-radius: 999px;
  background: #f7f9fc;
  font-size: 0.9rem;
  color: #3b4754;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #799fc4;
  }
`;

// 전체 레이아웃을 감싸는 컨테이너
export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 16px 16px 48px;
  box-sizing: border-box;
`;

// 카드 그리드
export const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
`;

const EmptyText = styled.p`
  grid-column: 1 / -1;
  padding: 64px 16px;
  text-align: center;
  color: #8b97a3;
  border: 1px dashed #d9e1ea;
  border-radius: 16px;
  background: #fafbfd;
  margin: 0;
`;

// 스켈레톤
const shimmer = keyframes`
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const SkeletonCard = styled.div`
  border: 1px solid #e8edf3;
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  padding-bottom: 16px;
`;

const SkeletonBlock = styled.div`
  background: linear-gradient(90deg, #eef2f6 25%, #f7f9fb 37%, #eef2f6 63%);
  background-size: 800px 100%;
  animation: ${shimmer} 1.4s linear infinite;
  border-radius: ${(p) => p.$radius || "6px"};
  width: ${(p) => p.$w || "100%"};
  height: ${(p) => p.$h || "16px"};
  margin: ${(p) => p.$m || "0"};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

function SkeletonCards({ count = 8 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i}>
          <SkeletonBlock $h="0" $radius="0" style={{ paddingTop: "75%" }} />
          <SkeletonBlock $w="60%" $h="18px" $m="16px auto 8px" />
          <SkeletonBlock $w="80%" $h="12px" $m="0 auto" />
        </SkeletonCard>
      ))}
    </>
  );
}

export default function ChoseDesigner() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [review, setReview] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("default");

  const fetchPosts = () => {
    axios.get("http://localhost:8081/api/posts", { withCredentials: true })
      .then(response => {
        console.log("글 목록 불러오기 성공", response.data);
        setPosts(response.data);
      })
      .catch(error => console.error("글 목록 불러오기 실패", error))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    fetchPosts();
  }, []);

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

  // 검색어 공백 제거 및 소문자 변환
  const trimmedSearchTerm = searchTerm.trim().toLowerCase();
  // id 필드를 기준으로 필터링
  const filteredItems = trimmedSearchTerm
    ? posts.filter(
        (post) =>
          typeof post.id === "string" &&
          post.id.toLowerCase().includes(trimmedSearchTerm)
      )
    : posts;

  // 정렬 (원본 배열은 건드리지 않음)
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOrder === "name") {
      return String(a.id).localeCompare(String(b.id), "ko");
    }
    if (sortOrder === "recent") {
      return b.postnum - a.postnum;
    }
    return 0;
  });

  return (
    <>
      <RequestLayOut>
        <PageHeader>
          <TitleBox>
            <PageTitle>디자이너 찾기</PageTitle>
            <PageDesc>마음에 드는 디자이너를 찾아 의뢰를 맡겨보세요.</PageDesc>
          </TitleBox>
          <SearchWrap>
            <SearchRequest
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              children={"디자이너검색"}
            />
          </SearchWrap>
        </PageHeader>

        <Toolbar>
          <CountText>
            총 <strong>{loading ? "-" : sortedItems.length}</strong>명
          </CountText>
          <SortSelect
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            aria-label="정렬"
          >
            <option value="default">기본순</option>
            <option value="recent">최신순</option>
            <option value="name">이름순</option>
          </SortSelect>
        </Toolbar>

        <MainContainer>
          <Content>
            {loading ? (
              <SkeletonCards />
            ) : sortedItems.length > 0 ? (
              sortedItems.map((post) => (
                <Profile key={post.postnum} post={post} reviews={review} />
              ))
            ) : (
              <EmptyText>찾으시는 ID가 없습니다.</EmptyText>
            )}
          </Content>
        </MainContainer>
      </RequestLayOut>
    </>
  );
}