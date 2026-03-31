import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PortfolioList.css";

const portfolioData = [
  { 
    title: "모던 자켓 디자인", 
    description: "스타일리시한 모던 자켓 디자인 프로젝트", 
    date: "2025-03-18", 
    image: "/image/RecommendDesign/추천디자인1.jpg" 
  },
  { 
    title: "캐주얼 후디 컬렉션", 
    description: "편안하고 트렌디한 후디 디자인", 
    date: "2025-04-01", 
    image: "/image/RecommendDesign/추천디자인2.jpg" 
  },
  { 
    title: "오버핏 셔츠 디자인", 
    description: "자유로운 느낌의 오버핏 셔츠 디자인", 
    date: "2025-02-15", 
    image: "/image/RecommendDesign/추천디자인3.jpg" 
  },
];

export default function PortfolioList() {
  const [displayData, setDisplayData] = useState(portfolioData);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/posts", { withCredentials: true }) 
      // .get("/mock-posts.json")   /public/mock-posts.json
      // 6.14 로컬 JSON 파일로 테스트 포트폴리오 api/posts에 올리는 이미지파일타입 필요해요 
      .then((response) => {
        let posts = response.data;
        console.log("Fetched posts:", posts);

        // 응답 데이터 검증
        if (!Array.isArray(posts)) {
          console.warn("API 응답이 배열이 아닙니다. 기본 데이터 사용.");
          setDisplayData(portfolioData);
          return;
        }

        // files가 비어 있지 않은 포스트 필터링
        const validPosts = posts.filter(
          (post) => Array.isArray(post.files) && post.files.length > 0
        );

        if (validPosts.length > 0) {
          // 포스트를 portfolioData 형식으로 매핑
          const mappedPosts = validPosts.map((post) => ({
            title: post.contents || "제목 없음",
            description: post.contents || "설명 없음",
            date: post.postnum
              ? new Date(post.postnum).toISOString().split("T")[0]
              : "날짜 없음",
            image: post.files[0], // 첫 번째 이미지 URL
          }));

          console.log("Mapped posts:", mappedPosts);
          setDisplayData(mappedPosts);
        } else {
          console.log("유효한 files 데이터가 없음. 기본 데이터 사용.");
          setDisplayData(portfolioData);
        }
      })
      .catch((error) => {
        console.error("포스트 가져오기 실패:", error);
        console.log("API 오류로 기본 데이터 사용.");
        setDisplayData(portfolioData);
      });
  }, []);

  return (
    <div className="portfolio-list">
      {displayData.map((item, index) => (
        <div
          key={index}
          className="portfolio-item"
          style={{ backgroundImage: `url(${item.image})` }}
        >
          <div className="portfolio-content">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <span className="date">{item.date}</span>
          </div>
        </div>
      ))}
    </div>
  );
}