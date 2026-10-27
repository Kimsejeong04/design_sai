import React, { useState, useEffect } from "react";
import styled from "styled-components";
import chat from "../../../../assets/대화.png";
import request from "../../../../assets/의뢰.png";
import jeans from "../../../../assets/jeans.png";
import port from "../../../../assets/Portfoilo.png";
import designer from "../../../../assets/desiner.png";
import { Modal } from "../../../../utils";
import RequestPopup from "../../Request/ui/RequestPopup";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import Room from "../../../ChatMain/ui/Room";
import { useChat } from "../../../ChatMain/ui/useChat";

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

/* ===================== 팝업(모달) 스타일 ===================== */
// && 로 공용 Modal의 고정 크기(800x1000)를 확실히 덮어씀
const PortfoilModalContainer = styled(Modal)`
  && {
    display: flex;
    flex-direction: row;
    width: min(960px, 94vw);
    height: min(720px, 92vh);
    overflow: hidden;
    border-radius: 18px;
  }

  @media (max-width: 860px) {
    && {
      flex-direction: column;
      height: 92vh;
      overflow-y: auto;
    }
  }
`;

const ProfilePanel = styled.div`
  flex: 0 0 290px;
  box-sizing: border-box;
  padding: 28px 24px;
  background: #f7f9fc;
  border-right: 1px solid #e8edf3;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;

  @media (max-width: 860px) {
    flex: none;
    border-right: none;
    border-bottom: 1px solid #e8edf3;
    padding-top: 52px;
  }
`;

const DesignerImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 20px;
  border: 3px solid #e6eef6;
  background: #fff;
`;

const DesignerName = styled.h3`
  margin: 18px 0 6px;
  font-size: 1.3rem;
  font-weight: 700;
  color: #2f3b47;
  text-align: center;
  word-break: break-all;
`;

const DesignerIntro = styled.p`
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #7a8794;
  text-align: center;
  word-break: break-word;
`;

const PeriodBadge = styled.div`
  margin: 16px 0 18px;
  padding: 6px 14px;
  border-radius: 999px;
  background: #e8f0f8;
  color: #4a6171;
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
`;

const ActionButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 44px;
  margin-bottom: 8px;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  border: 1px solid #799fc4;
  background: ${(p) => (p.$primary ? "#799fc4" : "#fff")};
  color: ${(p) => (p.$primary ? "#fff" : "#799fc4")};

  &:hover {
    background: ${(p) => (p.$primary ? "#6890b8" : "#eef4fa")};
  }

  img {
    width: 18px;
    height: 18px;
    object-fit: contain;
    ${(p) => (p.$primary ? "filter: brightness(0) invert(1);" : "")}
  }
`;

const CareerBox = styled.div`
  width: 100%;
  margin-top: 12px;
  padding-top: 16px;
  border-top: 1px solid #e8edf3;

  h4 {
    margin: 0 0 10px;
    font-size: 0.9rem;
    color: #2f3b47;
  }

  p {
    margin: 0;
    padding: 14px 12px;
    border: 1px dashed #d9e1ea;
    border-radius: 10px;
    background: #fff;
    color: #9aa7b5;
    font-size: 0.82rem;
    text-align: center;
  }
`;

const RightPanel = styled.div`
  flex: 1;
  min-width: 0;
  box-sizing: border-box;
  padding: 52px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;

  @media (max-width: 860px) {
    overflow: visible;
    padding: 20px 16px 24px;
  }
`;

const ImageCarouselContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  flex-shrink: 0;
  background: #f7f9fc;
  border: 1px solid #e8edf3;
  border-radius: 14px;
  overflow: hidden;
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.45);
  color: white;
  border: none;
  cursor: pointer;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const PrevButton = styled(NavButton)`
  left: 10px;
`;

const NextButton = styled(NavButton)`
  right: 10px;
`;

const PageIndicator = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  padding: 3px 12px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.45);
  color: white;
  font-size: 0.8rem;
  z-index: 2;
`;

const ReviewSection = styled.div`
  flex-shrink: 0;
  border: 1px solid #e8edf3;
  border-radius: 14px;
  padding: 16px;
  background: #fff;

  h4 {
    margin: 0 0 12px;
    font-size: 1rem;
    color: #2f3b47;
  }
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 200px;
  overflow-y: auto;
`;

const ReviewContainer = styled.div`
  padding: 12px 14px;
  background-color: #f9fcfe;
  border: 1px solid #dbe6f1;
  border-radius: 10px;

  strong {
    margin-right: 4px;
    color: #345c74;
    font-size: 0.9rem;
  }
  p {
    margin: 0;
    color: #8b97a3;
    font-size: 0.9rem;
  }
  span {
    color: #333;
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

/* ===================== 카드 스타일 ===================== */
const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 16px;
  background-color: white;
  border: 1px solid #e8edf3;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(40, 60, 90, 0.05);
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 24px rgba(40, 60, 90, 0.12);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
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
  background: rgba(255, 255, 255, 0.85);
  border: none;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
  transition: transform 0.15s ease;
  &:hover {
    transform: scale(1.08);
  }
  &:focus {
    outline: none;
  }
`;

const Title = styled.h3`
  width: calc(100% - 24px);
  font-size: 1.05rem;
  font-weight: 700;
  margin: 14px 12px 4px;
  color: #2f3b47;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DesignerSuffix = styled.span`
  font-size: 0.85rem;
  font-weight: 500;
  color: #8b97a3;
  margin-left: 4px;
`;

const ContentText = styled.p`
  font-size: 0.85rem;
  font-weight: 400;
  color: #7a8794;
  text-align: center;
  margin: 0 14px;
  line-height: 1.3;
  min-height: 2.6em;
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

  // useChat 훅 초기화
  const {
    isModalOpen: isChatModalOpen,
    selectedRoomId,
    selectedUser,
    isSideMenuOpen,
    messages,
    bottomRef,
    setMessages,
    handleProfileClick,
    handleCloseModal,
    handleMenuClick,
    handleCloseSideMenu,
    handleKeyDown,
    handleCompositionStart,
    handleCompositionEnd,
    handleSideMenuBlock,
    handleSideMenuReport,
    handleConfirmYes,
    handleConfirmNo,
    isConfirmOpen,
    confirmMessage,
    isSuccessPopupOpen,
    popupMessage,
    setModalOpen,
    setModalOpen2,
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

      const existingRoom = chatData.find(
        (room) => room.creator === post.id || room.participant === post.id
      );

      if (existingRoom) {
        handleProfileClick(existingRoom);
      } else {
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
          const textResponse = await res.text();
          const isLiked = textResponse === "true" || textResponse === true;
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
            {liked ? <FaHeart color="red" size={20} /> : <FaRegHeart color="gray" size={20} />}
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
          <ProfilePanel>
            <DesignerImage src={designerImages[designerImageIndex]} alt="디자이너 프로필" />
            <DesignerName>{post.id}</DesignerName>
            <DesignerIntro>{post.contents}</DesignerIntro>
            <PeriodBadge>참여기간 2025.01 ~ 2025.01</PeriodBadge>

            <ActionButton type="button" $primary onClick={ChatEvent}>
              <img src={chat} alt="" />
              대화하기
            </ActionButton>
            <ActionButton type="button" onClick={() => setIsRequestPopupOpen(true)}>
              <img src={request} alt="" />
              의뢰신청하기
            </ActionButton>

            {/* 이력사항 자리: 백엔드 API 준비 후 이 영역에 연결 */}
            <CareerBox>
              <h4>이력사항</h4>
              <p>이력사항이 아직 등록되지 않았어요.</p>
            </CareerBox>
          </ProfilePanel>

          <RightPanel>
            <ImageCarouselContainer>
              <PrevButton type="button" onClick={prevImage}>{"<"}</PrevButton>
              <CarouselImage
                src={portfolioImages[carouselIndex]}
                alt={`포트폴리오 이미지 ${carouselIndex + 1}`}
              />
              <NextButton type="button" onClick={nextImage}>{">"}</NextButton>
              <PageIndicator>
                {carouselIndex + 1} / {portfolioList.length}
              </PageIndicator>
            </ImageCarouselContainer>

            <ReviewSection>
              <h4>작성된 리뷰</h4>
              <ReviewList>
                {matchedReview &&
                matchedReview.reviewcontent &&
                matchedReview.reviewcontent.length > 0 ? (
                  matchedReview.reviewcontent.map((comment, idx) => (
                    <ReviewContainer key={idx}>
                      <strong>{matchedReview.id}</strong>
                      <span>{comment}</span>
                    </ReviewContainer>
                  ))
                ) : (
                  <ReviewContainer>
                    <p>리뷰가 없습니다.</p>
                  </ReviewContainer>
                )}
              </ReviewList>
            </ReviewSection>
          </RightPanel>

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