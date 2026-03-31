import React, {useEffect,useState} from "react";
import {useNavigate} from "react-router-dom"

import styled from "styled-components";
import Sidebar from "./ui/Sidebar";
import Content from "./ui/Content";
import hoddi from '../../assets/후드집업.png';
import { NextButtonUI } from "../../components";
import axios from "axios";
// 전체 레이아웃
const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  background: #fafafa;                        // 🔧 변경: 배경색 추가
`;

// 사이드바 영역 (고정 너비)
const Left = styled.div`
  width: 350px;                              // 🔧 변경: 너비 조정
  background-color: #ffffff;                 // 🔧 변경: 흰색 배경
  box-shadow: 2px 0 8px rgba(0,0,0,0.1);     // 🔧 변경: 그림자 추가
  transition: width 0.3s ease-in-out;
  @media (max-width: 768px) {                 // 🔧 변경: 모바일 반응형
    display: none;
  }
`;

// 콘텐츠 영역 (남은 공간 채움)
const Right = styled.div`
  flex: 1;
  background-color: #ffffff;
  padding: 2rem;                             // 🔧 변경: 패딩 확장
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.05); // 🔧 변경: 그림자 반전
  border-radius: 1rem;                       // 🔧 변경: 반경 축소
  font-family: 'Noto Sans KR', sans-serif;
`;

const Text = styled.p`
  margin: 0.5rem 0;                          // 🔧 변경: 여백 추가
  font-size: 1.125rem;                       // 🔧 변경: 가독성 크기
  color: #333333;                            // 🔧 변경: 텍스트 컬러
`;

const Portfolio = styled.div`
  width: 100%;
  max-width: 800px;                          // 🔧 변경: 최대 너비
  margin: 1.5rem 0;                          // 🔧 변경: 상하 마진
  padding: 1.5rem;                           // 🔧 변경: 내부 여백 추가
  background: #ffffff;                       // 🔧 변경: 배경색 유지
  border: 2px solid #e0e0e0;                 // 🔧 변경: 테두리 색상 연하게
  border-radius: 0.75rem;                    // 🔧 변경: 반경 조정
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);   // 🔧 변경: 그림자 추가
`;

const Img = styled.img`
  width: 100%;
  max-width: 300px;
  height: auto;                              // 🔧 변경: 높이 자동
  object-fit: cover;                         // 🔧 변경: 비율 유지
`;

const Button = styled(NextButtonUI)`
  display: inline-block;
  padding: 0.75rem 1.5rem;                   // 🔧 변경: 내부 여백
  font-size: 1rem;
  border: 2px solid #799FC4;                 // 🔧 변경: 테두리 색상
  border-radius: 0.5rem;                     // 🔧 변경: 반경
  background: transparent;
  color: #799FC4;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    background: #799FC4;                     // 🔧 변경: 호버 배경
    color: #ffffff;                         // 🔧 변경: 호버 텍스트
  }
`;

const EditButton = styled(Button)`
  background-color: #799FC4;
  color: #ffffff;
  border: none;
  &:hover {
    opacity: 0.9;                            // 🔧 변경: 호버 불투명도
  }
`;

const PortfolioLeftSection = styled.div`
  display: flex;
  flex-direction: column;                    // 🔧 변경: 세로 정렬
  gap: 1.5rem;                               // 🔧 변경: 간격 확대
  align-items: flex-start;
  @media (min-width: 600px) {                // 🔧 변경: 데스크톱 레이아웃
    flex-direction: row;
    align-items: center;
  }
`;

const TextContainer = styled.div`       // 🔧 변경: p -> div
  flex: 2;
  color: #444444;                          // 🔧 변경: 텍스트 컬러
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
  overflow: hidden;                        // 🔧 변경: 오버플로우 처리
  border-radius: 0.75rem;                  // 🔧 변경: 반경 추가
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);   // 🔧 변경: 그림자
`;

const ArrowButton = styled.button`
  all: unset;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  padding: 0.5rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: rgba(255, 255, 255, 1);
  }
`;

const PrevButton = styled(ArrowButton)`
  left: 0.5rem;
`;
const NextButton = styled(ArrowButton)`
  right: 0.5rem;
`;




export default function DMyPage() {

const [posts, setPosts] = useState([]);
const navigate = useNavigate();
const [currentImageIndex, setCurrentImageIndex] = useState(0); // 현재 이미지 인덱스 상태 추가

const fetchPosts = async () => {
  try {
    const { data } = await axios.get(
      //  ("/mock-portpolio.json"),
      "http://localhost:8081/api/posts",
      { withCredentials: true }
    );
    console.log("🚀 서버 응답 데이터:", data);
    // 1) 응답이 배열이 아니면 빈 배열로
    const rawPosts = Array.isArray(data) ? data : [];

    // 2) image1~4 필드를 files 배열로 통합
    const posts = rawPosts.map(post => {
      // image1~4를 배열에 담고, null·undefined·''인 항목은 걸러내기
      const files = [post.image1Url, post.image2Url, post.image3Url, post.image4Url]
        .filter(url => url);
      return { ...post, files };
    });

    // 3) 최신순 정렬
    posts.sort((a, b) => (b.postnum || 0) - (a.postnum || 0));

    // 4) 최신 글 1건만 상태 설정
    setPosts(posts.slice(0, 1));
  } catch (error) {
    console.error("글 목록 불러오기 실패:", error);
    setPosts([]);
  }
};

  useEffect(() => {
    fetchPosts();
  }, []);
  
  
  // 다음 이미지로 이동
  const handleNext = () => {
    if (posts[0]?.files?.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === posts[0].files.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  // 이전 이미지로 이동
  const handlePrev = () => {
    if (posts[0]?.files?.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? posts[0].files.length - 1 : prevIndex - 1
      );
    }
  };



   return (
    <Layout>
      <Left>
        <Sidebar/>
      </Left>
      <Right>
        
        {/* <Text>내 포트폴리오</Text>
          <Portfolio>
          <Text style={{opacity: '0.2'}}>포트폴리오를 등록해 나의 디자인을 노출시켜보세요</Text>
          <Img src={hoddi} alt="포트폴리오 아이콘" />
          <Button to='/designer/Portfolio'>포트폴리오 등록하기</Button>
          </Portfolio> */}
           <Content>
           <Text>내 포트폴리오</Text>
          {posts.length > 0 ? (
            <Portfolio key={posts[0].id || posts[0].postnum}>
              <PortfolioLeftSection>
                <TextContainer>
                  <Text>디자이너 설명</Text>
                  <Text>{posts[0].contents}</Text>

                </TextContainer>
                {posts[0].files.length > 0 ? (
                  <CarouselContainer>
                    <PrevButton onClick={handlePrev}>&larr;</PrevButton>
                    <Img
                      src={posts[0].files[currentImageIndex]}
                      alt={`포트폴리오 이미지 ${currentImageIndex + 1}`}
                      onError={() => console.error(`이미지 로드 실패: ${posts[0].files[currentImageIndex]}`)}
                    />
                    <NextButton onClick={handleNext}>&rarr;</NextButton>
                  </CarouselContainer>
                ) : (
                  <Text style={{ opacity: 0.2 }}>이미지가 없습니다</Text>
                )}
                <EditButton
                  onClick={() =>
                    navigate("/designer/Portfolio", { state: { editPost: posts[0] } })
                  }
                >
                  수정하기
                </EditButton>
              </PortfolioLeftSection>
            </Portfolio>
          ) : (
          <Portfolio>
            <Text style={{ opacity: 0.2 }}>
              포트폴리오를 등록해 나의 디자인을 노출시켜보세요
            </Text>
            <Img
              src={hoddi}
              alt="포트폴리오 아이콘"
              style={{ width: '50%', height: '50%' }}
            />
            <Button to="/designer/Portfolio">등록하기</Button>
          </Portfolio>
          )}
        </Content>
      </Right>
    </Layout>
  );
}