import React, { useState } from "react";
import styled from "styled-components";

const SearchBarContainer = styled.div`
  
  background-color: white;
  display: flex;
  align-items: center;
  gap: 0;
  border: 2px solid #bfd7ee;
  border-radius: 50px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 700px;
  height: 50px;
  overflow: hidden;
`;

const DropdownContainer = styled.div`
  border-right: 2px solid #bfd7ee;
  padding: 0;
  margin: 0;
  border-radius: 50px;
  overflow: hidden;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dropdown = styled.select`
  padding: 8px;
  border: none;
  outline: none;
  background: transparent;
  border-radius: 50px 0 0 50px;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  padding: 8px;
  border: none;
  outline: none;
  
`;

const SearchButton = styled.button`
  background-color: white;
  color: black;
  padding: 8px;
  height: 20px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2px;

  &:hover {
    background-color: white;
  }
`;

export default function SearchBar2() {
  const [selectedOption, setSelectedOption] = useState("선택하세요");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    alert(`선택한거: ${selectedOption}, 검색어: ${searchTerm}`);
  };

  return (
    <SearchBarContainer>
      <DropdownContainer>
        <Dropdown
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="선택하세요">이미지소스</option>
          <option value="패션잡지">패션잡지</option>
          <option value="포트폴리오">포트폴리오</option>
          <option value="기본샘플">기본샘플</option>
        </Dropdown>
      </DropdownContainer>
      <SearchInput
        type="text"
        placeholder="검색어 입력"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <SearchButton onClick={handleSearch}>검색</SearchButton>
    </SearchBarContainer>
  );
}
