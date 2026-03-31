import React from "react";
import styled from "styled-components";
import ChatLayout from "./ui/ChatLayout";
import Search from "./ui/Search";
import ChatProfile from "./ui/ChatProfile";
import { Modal } from "../../utils";
import Room from "./ui/Room";
import ItemBox from "./ui/ItemBox";
import ModalContent from "../Request/ui/ModalContent";
import { useChat } from "./ui/useChat";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import './ui/ChatRoom.css';
import axios from "axios";
import RequestBar from "../../components/RequestBar/RequestBar";

const CustomModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  width: 700px;
  height: 800px;
  
`;

const CustomModalHeader = styled.div`
  background-color: #f2eeee;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  padding: 15px;
  margin-bottom: 20px;
`;

const ItemBoxContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 50px;
  
`;

const ReportButton = styled.button`
  padding: 10px;
  background-color: #799fc4;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #cc0000;
  }
`;

const BlockButton = styled.button`
  padding: 10px;
  background-color: #9dbdd5;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    background-color: #444;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

/*const chatData = [
  { name: "Cody Fisher", message: "how it going?", time: "12:00 p.m." },
  { name: "Jane Cooper", message: "What the latest news?", time: "10:53 a.m." },
  { name: "Annette Black", message: "I dont eat, so I dont have a favorite food.", time: "2023-11-09" },
];*/

function formatDate(dateString) {
  if (!dateString) return ""; // Return empty string if dateString is falsy
  const d = new Date(dateString);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

function ChatMain() {
  const [chatData, setChatData] = useState([]);
  const location = useLocation(); // useLocation 훅을 사용하여 현재 위치 정보 가져오기
  // location.state에서 newRoom이 있을 경우 채팅방 데이터 추가
  // useEffect를 사용하여 컴포넌트가 마운트될 때와 location.state가 변경될 때 실행
  // location.state가 변경될 때마다 새로운 채팅방이 추가되도록 설정
  // location.state에서 newRoom이 있을 경우 채팅방 데이터 추가

  /* 디자이너고르기에서 id에 맞게 채팅방으로 이동되고 채팅방 생성되게 하는거 하다가 안한거
  useEffect(() => {
  if (location.state?.newRoom) {
    const newRoom = location.state.newRoom;
    const newChat = {
      id: newRoom.id,
      creator: newRoom.creator,
      name: newRoom.name,
      message: newRoom.creator,
      time: formatDate(newRoom.createdAt || new Date().toISOString())
    };
    setChatData(prev => [...prev, newChat]);
  }
}, [location.state?.newRoom]);
*/
  
useEffect(() => {
  axios
    .get("http://localhost:8081/api/rooms/list", { withCredentials: true })
    .then((res) => {
      // 채팅방 목록 데이터 가공해서 setChatData
      const newData = res.data.map((room) => ({
        id: room.id, // roomID 추가
        creator : room.creator,
        name: room.name,
        message: room.creator,
        time: room.createdAt ?? "시간 정보 없음",
        
      }));
      
      setChatData(newData);
      console.log("채팅방 리스트:", newData);

    })
    .catch((err) => console.error("채팅방 목록 불러오기 실패", err));
}, []);


  const {
    filteredChats,
    recentSearches,
    isModalOpen,
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
    handleItemSelect, // 클릭시 디자인된 의류 블러움
    handleRequestselect, // 클릭시 의뢰 블러움
    
  } = useChat(chatData);

  
  const hasAddedRequestMessage = useRef(false); // useRef를 사용하여 DetailList 상태를 저장합니다.
  useEffect(() => { // React의 useEffect 훅을 사용하여 컴포넌트 마운트 및 location.state 변경 시 실행.
    const text = location.state?.messageText;
    const targetUser = location.state?.targetUser || "ㅁㄴㅇㄹ"; //  useLocation을 사용해서 DetailList에서 전달된 state 객체 가져오기
                                                              // location.state에서 targetUser 추출. 없으면 기본값 "ㅁㄴㅇㄹ" 설정.
    if (text && !hasAddedRequestMessage.current) {
      addRequestMessage(targetUser, text);
      hasAddedRequestMessage.current = true;

      // 명시적으로 ID 20으로 설정된 방으로 이동
      const targetRoom = filteredChats.find((chat) => chat.id === "20");
      if (targetRoom) {
        handleProfileClick(targetRoom); // ID 20으로 이동
      } else {
        console.error("ID 20인 방을 찾을 수 없습니다.");
      }
    }
  }, [location.state?.messageText, addRequestMessage, filteredChats, handleProfileClick]);

  const [contracts, setContracts] = useState([]);
  //의뢰가져오는거
  useEffect(() => {
    axios.get("http://localhost:8081/client/contract")
      .then((response) => {
        const mappedContracts = response.data.map(contract => ({
          id: contract.contractId,
          starredStatus: false,
          title: contract.contractTitle,
          clientId: contract.clientId,
          status: contract.status,
          date: formatDate(contract.dueDate),
          preview: contract.preview || "",
        }));
        setContracts(mappedContracts);
      })
      .catch((error) => {
        console.error("계약 데이터 가져오기 실패:", error);
      });
  }, []);

  return (
    <>
      <StyleSheet />
      <ChatLayout
        sidebarTitle="대화방"
        sidebarLinks={[
          { path: "chatmain", text: "일반 채팅방", onClick: () => handleSidebarLinkClick("chatmain") },
          { path: "report", text: "사용자 신고, 차단", onClick: () => handleSidebarLinkClick("report") },
        ]}
        Header="일반 채팅방"
      >
        <Search
          onSearch={handleSearch}
          recentSearches={recentSearches}
          onRecentSearchClick={handleRecentSearchClick}
        />
        {filteredChats.length > 0 ? (
          filteredChats.map((chat, index) => {
            
            return (
              <ChatProfile
                key={index}
                chat={chat}
                id={chat.id}
                creator={chat.creator}
                name={chat.name}
                message={chat.message}
                time={chat.time}
                onClick={() => handleProfileClick(chat)}
                extraContent={
                  currentView === "report" ? (
                    <ButtonWrapper>
                      <BlockButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBlockClick(chat.name);
                        }}
                      >
                        차단
                      </BlockButton>
                      <ReportButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReportClick(chat.name);
                        }}
                      >
                        신고
                      </ReportButton>
                    </ButtonWrapper>
                  ) : null
                }
              />
            );
          })
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}

        {isModalOpen && (
          <Room
            roomId={selectedRoomId}
            selectedUser={selectedUser}
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
        {modalOpen && (
          <CustomModal onClose={() => setModalOpen(false)}>
            <CustomModalHeader>디자인 불러오기</CustomModalHeader>
            <ItemBoxContainer>
              <ItemBox text1="맨투맨1231" text2="(Sweatshirt)"
            onClick={(item) => handleItemSelect(item)} // 여기서 (item) 정의
            
              />
              <ItemBox text1="맨투맨" text2="(Sweatshirt)" />
              <ItemBox text1="맨투맨" text2="(Sweatshirt)" />
              <ItemBox text1="맨투맨" text2="(Sweatshirt)" />
              <ItemBox text1="맨투맨" text2="(Sweatshirt)" />
              <ItemBox text1="맨투맨" text2="(Sweatshirt)" />
              <ItemBox text1="맨투맨" text2="(Sweatshirt)" />
            </ItemBoxContainer>
          </CustomModal>
        )}
        {modalOpen2 && (
          <CustomModal onClose={() => setModalOpen2(false)}>
            <CustomModalHeader
            
            >의뢰 불러오기 </CustomModalHeader>
            {contracts.map((c,index) => (
            <RequestBar key={index} onClick={(request)  => handleRequestselect(request)}
              
              title={c.title}
              date={c.date}
              />
              
            ))}
            
          </CustomModal>
        )}
      </ChatLayout>
    </>
  );
}
//아래께 채팅창 말풍선 CSS임 #dcf8c6
const styles = `

  .message.sent::after {
    content: '';
    position: absolute;
    right: -10px;
    bottom: 0;
    border: 5px solid transparent;
    border-left-color: #dcf8c6;
    border-top-color: #dcf8c6;
  }

  .time {
    font-size: 0.8em;
    color: #666;
    margin-left: 10px;
  }
`;

const StyleSheet = () => <style>{styles}</style>;

export default ChatMain;