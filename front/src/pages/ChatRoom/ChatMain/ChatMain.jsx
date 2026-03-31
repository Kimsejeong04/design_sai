import React, { useState } from "react";
import ChatLayout from "./ui/ChatLayout";
import Search from "./ui/Search";
import ChatProfile from "./ui/ChatProfile";
import { Modal } from "../../../utils"; // Modal 경로에 맞게 조정
import styled from "styled-components";
import Room from "../Room/Room";

const ModalTitle = styled.p`
  margin: 0; /* p 태그의 마진 제거 */
  background-color: black;
  h2 {
    margin: 0; /* h2 태그의 기본 마진 제거 */
    color: white; /* 가독성을 위해 텍스트 색상 변경 */
  }
`;



const chatData = [
  { name: "Cody Fisher", message: "how it going?", time: "12:00 p.m." },
  { name: "Jane Cooper", message: "What the latest news?", time: "10:53 a.m." },
  { name: "Annette Black", message: "I dont eat, so I dont have a favorite food.", time: "2023-11-09" },
];

function ChatMain() {
  const [filteredChats, setFilteredChats] = useState(chatData);
  const [recentSearches, setRecentSearches] = useState(["Ralph Edwards", "hello"]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  console.log("렌더링된 채팅 리스트:", filteredChats);  // 여기

  const handleSearch = (term) => {
    if (term) {
      const filtered = chatData.filter((chat) =>
        chat.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredChats(filtered);
    } else {
      setFilteredChats(chatData);
    }
  };

  const handleRecentSearchClick = (search) => {
    handleSearch(search);
    setRecentSearches((prev) => [search, ...prev.filter((item) => item !== search)].slice(0, 5));
  };

  const handleProfileClick = (name) => {
    setSelectedUser(name);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <ChatLayout
      sidebarTitle="대화방"
      sidebarLinks={[{ path: "#", text: "일반 채팅방" }, { path: "#", text: "사용자 신고, 차단" }]}
      Header="일반 채팅방"
    >
      <Search
        onSearch={handleSearch}
        recentSearches={recentSearches}
        onRecentSearchClick={handleRecentSearchClick}
      />
      {filteredChats.length > 0 ? (
        filteredChats.map((chat, index) => (
          <ChatProfile
            key={index}
            name={chat.name}
            message={chat.message}
            time={chat.time}
            onClick={handleProfileClick} // 클릭 시 모달 열기
          />
        ))
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
      {isModalOpen && (
        <Room onClose={handleCloseModal} showCloseButton={false}>
       <h2>{selectedUser}의 프로필</h2>
          <p>여기에 사용자 정보를 표시할 수 있습니다.</p>
        </Room>
      )}
    </ChatLayout>
  );
}

export default ChatMain;