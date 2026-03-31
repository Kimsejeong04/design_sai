import React from "react";
import styled from "styled-components";
import profile from "../../../assets/profile.png";

const ProfileContainer = styled.button`
  width: 100%;
  height: 200px;
  background-color: white;
  border: 0.5px solid #ccc;
  display: flex;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;
  appearance: none;
  outline: none;
  text-align: left;
  font-size: 16px;
  line-height: normal;
  &:hover {
    background-color: #f5f5f5;
  }
  &:focus {
    border-color: #799fc4;
  }
`;

const ProfileWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex: 1;
`;

const Profile = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  margin: 10px;
  border-radius: 50%;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ProfileTitle = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 24px;
  color: #000;
`;

const ProfileContext = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
`;

const ChatTime = styled.p`
  font-size: 14px;
  color: #666;
  margin-left: auto;
  align-self: center;
`;

const ExtraContentWrapper = styled.div`
  margin-left: 10px;
  align-self: center;
`;

export default function ChatProfile({ name, message, id, time, onClick, extraContent, chat, creator }) {
  return (
    <ProfileContainer onClick={() => onClick(chat)}>
      <ProfileWrapper>
        <Profile src={profile} alt="프로필" />
        <TextWrapper>
          <ProfileTitle>{name || "이름 없음"}</ProfileTitle>
          <ProfileContext>{message}</ProfileContext>
        </TextWrapper>
      </ProfileWrapper>
      <ChatTime>{id}</ChatTime>
      {extraContent && <ExtraContentWrapper>{extraContent}</ExtraContentWrapper>}
    </ProfileContainer>
  );
}