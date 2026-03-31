import React from "react";
import styled from "styled-components";
import close from "../../../assets/닫기.png";
import partner from "../../../assets/partner.png";
import warn from "../../../assets/warn.png";
import cloud from "../../../assets/cloud.png";
import profile from "../../../assets/profile.png";
import userblock from "../../../assets/userblock.png";
import userreport from "../../../assets/userreport.png";

const SideMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background-color: #799fc4;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;
  z-index: 10;
`;

const CloseButton = styled.button`
  all: unset;
  align-self: flex-end;
  width: 20px;
  height: 20px;
  background-image: url(${close});
  background-size: 30px 30px;
  background-repeat: no-repeat;
  background-position: center;
  border: 3px solid white;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
  &:hover {
    opacity: 0.8;
  }
`;

const Title = styled.p`
  display: flex;
  justify-content: flex-start;
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin: 10px;
  margin-top: 40px;
  gap: 10px;
`;

const ProfileContainer = styled.div`
  width: 90%;
  min-height: 100px;
  border: none;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  background-color: #94b9dc;
  margin: 0 auto;
  padding: 10px;
`;

const ProfileImg = styled.img`
  width: 40px;
  object-fit: cover;
`;

const Profile = styled.button`
  all: unset;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 50%;
  color: white;
  gap: 10px;
  margin-left: 10px;
  font-weight: bold;
`;

const Profile2 = styled.button`
  all: unset;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 50%;
  color: white;
  gap: 10px;
  margin-left: 10px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #799fc4;
  }
`;

function SideMenu({ isOpen, onClose, setModalOpen, setModalOpen2, selectedUser, onBlock, onReport }) {
  return (
    <SideMenuContainer isOpen={isOpen}>
      <CloseButton onClick={onClose}></CloseButton>
      <Title>
        <ProfileImg src={partner} alt="sample" /> 대화상대
      </Title>
      <ProfileContainer>
        <Profile>
          <ProfileImg src={profile} />Sample
        </Profile>
        <Profile>
          <ProfileImg src={profile} />Sample2
        </Profile>
      </ProfileContainer>
      <Title>
        <ProfileImg src={warn} alt="sample" />사용자
      </Title>
      <ProfileContainer>
        <Profile2 onClick={onBlock}>
          <ProfileImg src={userblock} />사용자 차단
        </Profile2>
        <Profile2 onClick={onReport}>
          <ProfileImg src={userreport} />사용자 신고
        </Profile2>
      </ProfileContainer>
      <Title>
        <ProfileImg src={cloud} alt="sample" />불러오기
      </Title>
      <ProfileContainer>
        <Profile2 onClick={() => setModalOpen2(true)}>의뢰 불러오기</Profile2>
        <Profile2 onClick={() => setModalOpen(true)}>디자인 불러오기</Profile2>
      </ProfileContainer>
    </SideMenuContainer>
  );
}

export default SideMenu;