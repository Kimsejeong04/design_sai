import React, { useState, useEffect } from "react";
import styled from "styled-components";
import cart2 from "../../../../assets/cart2.png";
import chat from "../../../../assets/대화.png";
import request from "../../../../assets/의뢰.png";
import jeans from "../../../../assets/jeans.png";
import port from "../../../../assets/Portfoilo.png";
import designer from "../../../../assets/desiner.png";
import { Modal } from "../../../../utils";
import { useNavigate } from "react-router-dom";
import RequestPopup from "../../Request/ui/RequestPopup";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import Room from "../../../ChatMain/ui/Room";
import { useChat } from "../../../ChatMain/ui/useChat"; // useChat 훅 임포트

// 이미지 배열
const profileImages = [
  jeans,
  require("../../../../assets/프로필이미지/프로필이미지1.jpg"),
  require("../../../../assets/프로필이미지/프로필이미지2.jpg"),
  require("../../../../assets/프로필이미지/프로필이미지3.jpg"),
  require("../../../../assets/프로필이미지/프로필이미지4.jpg"),
  require("../../../../assets/프로필이미지/프로필이미지5.jpg"),
  require("../../../../assets/프로필이미지/프로필이미지6.jpg"),
];

const designerImages = [
  designer,
  require("../../../../assets/디자이너이미지/디자이너1.png"),
  require("../../../../assets/디자이너이미지/디자이너2.png"),
  require("../../../../assets/디자이너이미지/디자이너3.png"),
  require("../../../../assets/디자이너이미지/디자이너4.png"),
  require("../../../../assets/디자이너이미지/디자이너5.png"),
  require("../../../../assets/디자이너이미지/디자이너6.png"),
];

const portfolioImages = [
  port,
  require("../../../../assets/포트폴리오이미지/포트폴리오1.png"),
  require("../../../../assets/포트폴리오이미지/포트폴리오2.png"),
  require("../../../../assets/포트폴리오이미지/포트폴리오3.png"),
  require("../../../../assets/포트폴리오이미지/포트폴리오4.png"),
  require("../../../../assets/포트폴리오이미지/포트폴리오5.png"),
  require("../../../../assets/포트폴리오이미지/포트폴리오6.png"),
];

// Styled Components (원본과 동일, 생략된 부분은 그대로 유지)
const PortfoilModalContainer = styled(Modal)`
  display: flex;
  flex-direction: row;
  height: 800px;
`;

const ModalContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: 2px solid #799fc4;
  border-radius: 15px;
  margin: 20px;
  padding: 20px;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
`;

const ModalContent3 = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: 2px solid #799fc4;
  border-radius: 15px;
  margin: 20px;
  padding: 20px;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  min-height: 0;
  max-height: 70vh;
  overflow-y: auto;
`;

const DesignerImage = styled.img`
  margin: 0 auto;
  width: 100%;
  max-width: 150px;
  height: auto;
  object-fit: contain;
  margin-top: 10px;
  background-color: black;
`;

const ImageCarouselContainer = styled.div`
  position: relative;
  width: 500px;
  height: 535px;
  margin: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  border: 2px solid #799fc4;
  border-radius: 15px;
  overflow: hidden;
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 8px;
  cursor: pointer;
  z-index: 2;
  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const PrevButton = styled(NavButton)`
  left: 8px;
`;

const NextButton = styled(NavButton)`
  right: 8px;
`;

const PageIndicator = styled.div`
  position: absolute;
  bottom: 12px;
  width: 100%;
  text-align: center;
  color: white;
  font-size: 0.9rem;
  background: rgba(0, 0, 0, 0.3);
  padding: 4px 0;
  border-radius: 8px;
  z-index: 2;
`;

const ImgaeContainer = styled.img`
  width: 10%;
  object-fit: contain;
`;

const PeriodContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  font-weight: bold;
  font-size: 13px;
  margin: 10px;
  justify-content: flex-start;
  width: 100%;
`;

const PeriodText = styled.p`
  margin: 0;
  color: #333;
`;

const ModalButton = styled.button`
  all: unset;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const ModalButton2 = styled.button`
  all: unset;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const Container = styled.div`
  display: flex;
  position: relative;
  width: 250px;
  height: 280px;
  background-color: white;
  border-radius: 0.3125rem;
  border: none;
  margin: 30px;
  cursor: pointer;
  box-shadow: 0 0.3125rem 0.3125rem rgba(0, 0, 0, 0.1);
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  width: 250px;
  height: 190px;
  overflow: hidden;
  border-radius: 0.3125rem 0.3125rem 0 0;
  position: relative;
`;

const JeansImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const HeartButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 36px;
  height: 36px;
  background: transparent;
  border: none;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
  &:hover svg {
    color: rgba(128, 128, 128, 0.5);
  }
  &:focus {
    outline: none;
  }
`;

const Title = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin: 1.5rem 0 4px;
  color: #4a6171;
  text-align: center;
`;

const Modalcontainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReviewContainer = styled.div`
  width: 80%;
  margin: 10px auto;
  padding: 16px;
  background-color: #f9fcfe;
  border: 1px solid #799fc4;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  strong {
    display: block;
    margin-bottom: 8px;
    color: #345c74;
    font-size: 1rem;
  }
  p {
    margin: 0;
    color: #333;
    line-height: 1.5;
    font-size: 0.95rem;
  }
`;

const DesignerSuffix = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  color: #4a6171;
  margin-left: 4px;
`;

const ContentText = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  color: #555;
  text-align: center;
  margin: 0 10px 5px;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
`;

// 날짜를 "YYYY.MM.DD" 형식으로 변환하는 유틸
function formatDate(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

export default function Profile({ post, reviews }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRequestPopupOpen, setIsRequestPopupOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [chatData, setChatData] = useState([]); // 채팅방 데이터
  const navigate = useNavigate();

  // useChat 훅 초기화
  const {
    filteredChats,
    recentSearches,
    isModalOpen: isChatModalOpen,
    selectedRoomId,
    selectedUser,
    isSideMenuOpen,
    messages,
    modalOpen,
    modalOpen2,
    currentView,
    isConfirmOpen,
    confirmMessage,
    isSuccessPopupOpen,
    popupMessage,
    bottomRef,
    setMessages,
    handleSearch,
    handleRecentSearchClick,
    handleProfileClick,
    handleCloseModal,
    handleMenuClick,
    handleCloseSideMenu,
    handleKeyDown,
    handleCompositionStart,
    handleCompositionEnd,
    handleSidebarLinkClick,
    handleBlockClick,
    handleReportClick,
    handleSideMenuBlock,
    handleSideMenuReport,
    handleConfirmYes,
    handleConfirmNo,
    setModalOpen,
    setModalOpen2,
    addRequestMessage,
    handleItemSelect,
    handleRequestselect,
  } = useChat(chatData);

  // 채팅방 데이터 초기화
  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const sessionResponse = await axios.get("http://localhost:8081/api/user", {
          withCredentials: true,
        });
        const currentUserId = sessionResponse.data.username;
        if (!currentUserId) throw new Error("로그인이 필요합니다.");

        // 디자이너와의 채팅방 조회
        const response = await axios.get("http://localhost:8081/api/rooms/list", {
          withCredentials: true,
        });
        const rooms = response.data
          .filter((room) => room.creator === post.id || room.participant === post.id)
          .map((room) => ({
            id: room.id,
            creator: room.creator,
            name: room.name,
            message: room.creator,
            time: formatDate(room.createdAt || new Date().toISOString()),
          }));
        setChatData(rooms);
      } catch (error) {
        console.error("채팅방 데이터 가져오기 실패:", error);
      }
    };
    fetchChatData();
  }, [post.id]);

  // "대화하기" 버튼 클릭 시 채팅방 생성 또는 선택
  const ChatEvent = async (e) => {
    e.stopPropagation();
    try {
      const sessionResponse = await axios.get("http://localhost:8081/api/user", {
        withCredentials: true,
      });
      const currentUserId = sessionResponse.data.username;
      if (!currentUserId) throw new Error("로그인이 필요합니다.");

      // 기존 채팅방 확인
      const existingRoom = chatData.find(
        (room) => room.creator === post.id || room.participant === post.id
      );

      if (existingRoom) {
        // 기존 채팅방이 있으면 선택
        handleProfileClick(existingRoom);
      } else {
        // 새 채팅방 생성
        const response = await axios.post(
          "http://localhost:8081/api/rooms/create",
          {
            creator: post.id,
            participant: currentUserId,
            name: `${post.id}와의 채팅방`,
          },
          { withCredentials: true }
        );
        const newRoom = {
          id: response.data.roomId,
          creator: post.id,
          name: `${post.id}와의 채팅방`,
          message: post.id,
          time: formatDate(new Date().toISOString()),
        };
        setChatData((prev) => [...prev, newRoom]);
        handleProfileClick(newRoom);
      }
    } catch (error) {
      console.error("채팅방 생성/연결 실패:", error);
      handleConfirmYes("error", error.message || "채팅방을 열 수 없습니다.");
    }
  };

  // 찜 상태 확인
  useEffect(() => {
    async function fetchLiked() {
      try {
        const res = await fetch(
          `http://localhost:8081/api/posts/like/check/${post.postnum}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (res.ok) {
          const isLiked = await res.json();
          setLiked(isLiked);
        }
      } catch (error) {
        console.error("찜 상태 확인 오류", error);
      }
    }
    fetchLiked();
  }, [post.postnum]);

  const handleToggleLike = async (e) => {
    e.stopPropagation();
    if (liked) {
      const confirmUnlike = window.confirm("찜 해제를 하시겠습니까?");
      if (!confirmUnlike) return;
      try {
        const response = await fetch(
          `http://localhost:8081/api/posts/unlike/${post.postnum}`,
          {
            method: "POST",
            credentials: "include",
          }
        );
        if (response.ok) {
          setLiked(false);
        } else {
          alert("찜 해제 실패!");
        }
      } catch (error) {
        console.error("찜 해제 오류", error);
      }
    } else {
      try {
        const response = await fetch(
          `http://localhost:8081/api/posts/like/${post.postnum}`,
          {
            method: "POST",
            credentials: "include",
          }
        );
        if (response.ok) {
          setLiked(true);
        } else {
          alert("찜하기 실패!");
        }
      } catch (error) {
        console.error("찜하기 오류", error);
      }
    }
  };

  const portfolioList = portfolioImages;
  const prevImage = (e) => {
    e.stopPropagation();
    setCarouselIndex((i) => (i === 0 ? portfolioList.length - 1 : i - 1));
  };
  const nextImage = (e) => {
    e.stopPropagation();
    setCarouselIndex((i) => (i === portfolioList.length - 1 ? 0 : i + 1));
  };

  const matchedReview = reviews.find((review) => review.id === post.id);
  const imageIndex = Math.abs(post.postnum % profileImages.length);
  const designerImageIndex = Math.abs(post.postnum % designerImages.length);

  return (
    <>
      <Container onClick={() => setIsModalOpen(true)}>
        <ImageWrapper>
          <JeansImage src={profileImages[imageIndex]} alt="프로필 이미지" />
          <HeartButton onClick={handleToggleLike}>
            {liked ? <FaHeart color="red" size={24} /> : <FaRegHeart color="gray" size={24} />}
          </HeartButton>
        </ImageWrapper>
        <Title>
          {post.id}
          <DesignerSuffix>디자이너님</DesignerSuffix>
        </Title>
        <ContentText>{post.contents}</ContentText>
      </Container>

      {isModalOpen && (
        <PortfoilModalContainer onClose={() => setIsModalOpen(false)}>
          <ModalContent>
            <DesignerImage src={designerImages[designerImageIndex]} alt="예시" />
            <h3>{post.id}</h3>
            <p>{post.contents}</p>
            <PeriodContainer>
              <PeriodText>참여기간</PeriodText>
              <PeriodText>2025.01 ~ 2025.01</PeriodText>
            </PeriodContainer>
            <PeriodContainer>
              <ImgaeContainer src={chat} alt="대화하기" />
              <ModalButton onClick={ChatEvent}>대화하기</ModalButton>
            </PeriodContainer>
            <PeriodContainer>
              <ImgaeContainer src={request} alt="의뢰신청하기" />
              <ModalButton2 onClick={() => setIsRequestPopupOpen(true)}>
                의뢰신청하기
              </ModalButton2>
            </PeriodContainer>
          </ModalContent>
          <Modalcontainer>
            <ImageCarouselContainer>
              <PrevButton onClick={prevImage}>{"<"}</PrevButton>
              <CarouselImage
                src={portfolioImages[carouselIndex]}
                alt={`포트폴리오 이미지 ${carouselIndex + 1}`}
              />
              <NextButton onClick={nextImage}>{">"}</NextButton>
              <PageIndicator>
                {carouselIndex + 1} / {portfolioList.length}
              </PageIndicator>
            </ImageCarouselContainer>
            <ModalContent3>
              <h4>작성된 리뷰</h4>
              {matchedReview && matchedReview.reviewcontent && matchedReview.reviewcontent.length > 0 ? (
                matchedReview.reviewcontent.map((comment, idx) => (
                  <ReviewContainer key={idx}>
                    <strong>{matchedReview.id}</strong>: {comment}
                  </ReviewContainer>
                ))
              ) : (
                <ReviewContainer>
                  <p>리뷰가 없습니다.</p>
                </ReviewContainer>
              )}
            </ModalContent3>
          </Modalcontainer>
          {isRequestPopupOpen && <RequestPopup onClose={() => setIsRequestPopupOpen(false)} />}
        </PortfoilModalContainer>
      )}

      {isChatModalOpen && (
        <Room
          roomId={selectedRoomId}
          selectedUser={selectedUser || post.id}
          messages={messages}
          setMessages={setMessages}
          isSideMenuOpen={isSideMenuOpen}
          onClose={handleCloseModal}
          onMenuClick={handleMenuClick}
          onCloseSideMenu={handleCloseSideMenu}
          onKeyDown={handleKeyDown}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          setModalOpen={setModalOpen}
          setModalOpen2={setModalOpen2}
          onBlock={handleSideMenuBlock}
          onReport={handleSideMenuReport}
          isConfirmOpen={isConfirmOpen}
          confirmMessage={confirmMessage}
          onConfirmYes={handleConfirmYes}
          onConfirmNo={handleConfirmNo}
          isSuccessPopupOpen={isSuccessPopupOpen}
          popupMessage={popupMessage}
          bottomRef={bottomRef}
        />
      )}
    </>
  );
}