import React from 'react';
import styled from 'styled-components';

const SearchWrapper = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchContainer = styled.div`
  
  display: flex;
  flex-direction: column;
`;

const SearchInput = styled.input`
  
  padding: 5px;
  margin-right: 10px;
`;

const InputOptions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  gap: 10px;
`;

const BoldSpan = styled.span`
  font-weight: bold;
  margin-bottom: 20px;
`;

export default function SideSearch() {
  return (
    <SearchWrapper>
      <SearchContainer>
        <BoldSpan>결과 내 검색</BoldSpan>
        <SearchInput type="text" />
        <InputOptions>
          <span>
            <input type="checkbox" />검색어 제외
          </span>
          <button>적용</button>
        </InputOptions>
      </SearchContainer>
    </SearchWrapper>
  );
}