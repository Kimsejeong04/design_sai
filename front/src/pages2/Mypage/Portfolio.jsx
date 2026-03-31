import { useState, useEffect } from "react";
import React from "react";
import styled from "styled-components";
import Sidebar from "./ui/Sidebar";
import Content from "./ui/Content";
import { ImageUploader, NextButtonUI } from "../../components";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate,useLocation } from "react-router-dom";
import axios from "axios";

// 전체 레이아웃
const Layout = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Left = styled.div`
  width: 400px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

const Footer = styled.div`
  display: flex;
  margin: 0 auto;
  margin: 80px;
  justify-content: flex-end;
  gap: 10px;
`;

const PortfolioExplain = styled.div`
  border: 1px dashed #ccc;
  border-radius: 10px;
  display: flex;
  width: 100%;
  max-width: 600px;
  min-height: 30vh;
  background-color: white;
  margin: 0 auto 80px;
  flex-direction: column;
  padding: 20px;
`;

const PortfolioExplain2 = styled(PortfolioExplain)``;
const PortfolioExplain3 = styled(PortfolioExplain)``;

const Text = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px;
`;
const TextAreaInput = styled.textarea`
  border: none;
  font-size: 18px;
  font-weight: bold;
  opacity: 0.7;
  width: 100%;
  height : 300px;
  resize: vertical;       /* 세로로만 리사이즈 가능 */
  

  
`;

const UploadContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 600px;
  background-color: white;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
`;

const CarouselTrack = styled.div`
  display: flex;
  gap: 20px;
  transition: transform 0.5s ease-in-out;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
  border-radius: 50%;
`;

const LeftArrow = styled(ArrowButton)`
  left: 10px;
`;

const RightArrow = styled(ArrowButton)`
  right: 10px;

`;

const CustomUpload = styled(ImageUploader)`
  width: 20vh;
  height: 20vh;
  min-width: 150px;
  min-height: 150px;
  max-width: 200px;
  max-height: 200px;
  flex-shrink: 0;
`;

const CustomUpload2 = styled(ImageUploader)`
  width: 20vh;
  height: auto;
  flex-shrink: 0;
`;

export default function Portfolio() {
  const [inputValue, setInputValue] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [files, setFiles] = useState({});
  const [contents, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  

  const itemsPerView = 4; // 최대 4개 이미지 지원
  const totalItems = 4;
  const maxIndex = Math.max(1, totalItems - itemsPerView);

  const { state } = useLocation();
  const editPost = state?.editPost; // 편집할 포스트 데이터
  //수정하기 모드일 때 기존 파일 URL로 files 초기화
  useEffect(() => {
    if (editPost?.files) {
      const initialFiles = editPost.files.reduce((acc, url, idx) => {
        acc[`upload${idx + 1}`] = { file: null, preview: url }; // preview는 URL
        return acc;
      }, {});
      setFiles(initialFiles);
    }
  }, [editPost]);
  //수정하기 모드일 때 content 초기화
  useEffect(() => {
  if (editPost?.contents !== undefined) {
    setContent(editPost.contents);
  }
}, [editPost]);


  useEffect(() => {
    axios.get("http://localhost:8081/api/user", { withCredentials: true })
      .then(response => {
        if (response.data.name) {
          setInputValue(response.data.name);
        }
      })
      .catch(error => console.error("로그인 상태 확인 실패", error));
  }, []);

  const handleSubmit = async (e) => {
  e?.preventDefault();
  if (!contents.trim()) return;

  const formData = new FormData();
  formData.append("contents", contents);
  if (files.upload1) formData.append("image1", files.upload1.file);
  if (files.upload2) formData.append("image2", files.upload2.file);
  if (files.upload3) formData.append("image3", files.upload3.file);
  if (files.upload4) formData.append("image4", files.upload4.file);

  // 디버깅: FormData 내용 확인
  for (let [key, value] of formData.entries()) {
    console.log(key, value, value instanceof File);
  }

  try {
    await axios.post("http://localhost:8081/api/posts/with-images", formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    setContent("");
    setFiles({});
    fetchPosts();
    alert("포트폴리오 작성 완료!");
    navigate("/designer/Dmypage");
  } catch (error) {
    console.error("글 작성 실패", error);
    alert("포트폴리오 작성 실패: " + error.message);
  }
};

{/*
const handleSubmit = async (e) => {
  e?.preventDefault();
  if (!contents.trim()) return;

  const formData = new FormData();
  formData.append("contents", contents);
  if (files.upload1) formData.append("image1", files.upload1.file);
  if (files.upload2) formData.append("image2", files.upload2.file);
  if (files.upload3) formData.append("image3", files.upload3.file);
  if (files.upload4) formData.append("image4", files.upload4.file);

  try {
    if (editPost) {
      // ─────────── 수정 모드 ───────────
      await axios.patch(
        `http://localhost:8081/api/posts/${editPost.postnum}`,  // PATCH URL
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("포트폴리오 수정 완료!");
    } else {
      // ─────────── 생성 모드 ───────────
      await axios.post(
        "http://localhost:8081/api/posts/with-images",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("포트폴리오 작성 완료!");
    }

    // 상태 초기화 & 목록 새로고침
    setContent("");
    setFiles({});
    fetchPosts();
    navigate("/designer/Dmypage");
  } catch (error) {
    console.error("글 작성/수정 실패:", error);
    alert("요청 실패: " + error.message);
  }
};
*/}


  const fetchPosts = () => {
    axios.get("http://localhost:8081/api/posts", { withCredentials: true })
      .then(response => setPosts(response.data))
      .catch(error => console.error("글 목록 불러오기 실패", error));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };



  const itemWidthVh = 20;
  const gapPx = 20;
  const containerWidthPx = 600;
  const itemWidthPx = (itemWidthVh * window.innerHeight) / 100;
  const totalItemWidthPx = itemWidthPx + gapPx;
  const trackWidthPx = totalItems * totalItemWidthPx - gapPx;

  const translateX = currentIndex === maxIndex
    ? -(trackWidthPx - containerWidthPx)
    : -(currentIndex * totalItemWidthPx);

  

  return (
    <Layout>
      <Left>
        <Sidebar />
      </Left>
      <Right>
        <Content>
          <PortfolioExplain>
            <Text>포트폴리오 설명</Text>
            <TextAreaInput
              value={contents}
              onChange={(e) => setContent(e.target.value)}
              placeholder="주로하는 프로젝트의 목적 주로 만드는 옷과 스타일을 설명해주세요"
            />
          </PortfolioExplain>

          <PortfolioExplain2>
            <Text>이미지 등록(필수)</Text>
            <UploadContainer>
              {currentIndex > 0 && (
                <LeftArrow onClick={handlePrev}>
                  <FaArrowLeft />
                </LeftArrow>
              )}

              <CarouselTrack style={{ transform: `translateX(${translateX}px)` }}>
                <CustomUpload id="upload1" files={files} setFiles={setFiles} />
                <CustomUpload id="upload2" files={files} setFiles={setFiles} />
                <CustomUpload id="upload3" files={files} setFiles={setFiles} />
                <CustomUpload id="upload4" files={files} setFiles={setFiles} />
              </CarouselTrack>

              {currentIndex < maxIndex && (
                <RightArrow onClick={handleNext}>
                  <FaArrowRight />
                </RightArrow>
              )}
            </UploadContainer>
          </PortfolioExplain2>

          <PortfolioExplain3>
            <Text>참여했던 계약 등록</Text>
            <UploadContainer>
              <CustomUpload2 id="upload6" files={files} setFiles={setFiles} />
            </UploadContainer>
          </PortfolioExplain3>

          <Footer>
            <NextButtonUI
              onMouseDown={(e) => {
                e.preventDefault();
                e.target.blur();

              }}
              onClick={handleSubmit}
            >작성완료 </NextButtonUI>
             
          </Footer>
        </Content>
      </Right>
    </Layout>
  );
}