import React from 'react';
import styled from 'styled-components';
import SideSearch from './SideSearch';
import SideMenuBar from './SideMenuBar';

const SideContainer = styled.div`
  width: 250px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  margin: 15px;
`;

const Wrapper = styled.div`
  width: 250px;
  height: auto;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

export default function SideMenu() {
  return (
    <SideContainer>
      <Wrapper>
        <SideSearch />
        <SideMenuBar />
      </Wrapper>
    </SideContainer>
  );
}