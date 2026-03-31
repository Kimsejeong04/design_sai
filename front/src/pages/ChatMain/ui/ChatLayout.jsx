import React from "react";
import styled from "styled-components";

const LayOut = styled.div`
  width: 100%;
  display: flex;
`;

const Sidebar = styled.div`
  padding: 20px;
  margin: 10px;
  width: 250px;
  background-color: #fff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const SideBarH2 = styled.h2`
  color: #799fc4;
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const SidebarHr = styled.hr`
  margin: 10px 0;
  border: 0;
  border-top: 1px solid #ccc;
`;

const SideBarUL = styled.ul`
  list-style: none;
  padding: 0;
`;

const SidebarUlLi = styled.li`
  margin: 10px 0;
`;

const SidebarUlLiA = styled.a`
  text-decoration: none;
  color: #333;
  font-weight: bold;
  display: block;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    color: #799fc4;
  }
`;

const Body = styled.div`
  background-color: white;
  width: 100%;
`;

const BodyH2 = styled.h1`
  margin: 40px;
  padding: 30px;
`;

const Content = styled.div`
  margin: 0 auto;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
`;

export function ChatSidebar({ title, links }) {
  return (
    <Sidebar>
      <SideBarH2>{title}</SideBarH2>
      <SidebarHr />
      <SideBarUL>
        {links.map((link, index) => (
          <SidebarUlLi key={index}>
            <SidebarUlLiA href={link.path} onClick={(e) => {
              e.preventDefault(); // 기본 링크 동작 방지
              if (link.onClick) link.onClick(); // onClick 호출
            }}>
              {link.text}
            </SidebarUlLiA>
          </SidebarUlLi>
        ))}
      </SideBarUL>
    </Sidebar>
  );
}

export function ChatBody({ Header, children }) {
  return (
    <Body>
      <BodyH2 style={{ color: "#799FC4" }}>{Header}</BodyH2>
      <Content>{children}</Content>
    </Body>
  );
}

export default function ChatLayout({ children, sidebarTitle, sidebarLinks, Header }) {
  return (
    <LayOut>
      <ChatSidebar title={sidebarTitle} links={sidebarLinks} />
      <ChatBody Header={Header}>{children}</ChatBody>
    </LayOut>
  );
}