import React, { useState } from "react";
import styled from "styled-components";
import search2 from "../../../assets/search2.png";

// 검색창 컨테이너 스타일
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 12%;
  border: 3px solid #799FC4;
  border-radius: 30px;
  background-color: #fff;
  padding: 0 10px;
  margin-bottom: 30px;
  position: relative; /* 드롭다운 위치를 위한 설정 */
`;

// 검색 아이콘 스타일
const SearchIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

// 이미지 스타일
const SearchImage = styled.img`
  width: 60%;
  height: 60%;
  object-fit: contain;
`;

// 검색 입력창 스타일
const SearchInput = styled.input`
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  appearance: none !important;
  background-color: transparent !important;
  flex: 1;
  &::placeholder {
    color: #DDDDDD;
    font-weight: bold;
    font-style: italic; /* 'inter'는 오타로 보이며 'italic'으로 수정 */
    font-size: 18px;
  }
`;

// 최근 검색어 드롭다운 스타일
const RecentSearchDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #799FC4;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  padding: 10px;
  display: ${(props) => (props.isVisible ? "block" : "none")};
`;

// 최근 검색어 항목 스타일
const RecentSearchItem = styled.div`
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export default function Search({ onSearch, recentSearches, onRecentSearchClick }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // 검색어 입력 처리
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
    setIsDropdownVisible(false); // 검색 중 드롭다운 숨김
  };

  // 검색창 클릭 처리
  const handleSearchClick = () => {
    setIsDropdownVisible(true);
  };

  // 최근 검색어 클릭 처리
  const handleRecentSearchClick = (search) => {
    setSearchTerm(search);
    setIsDropdownVisible(false);
    onRecentSearchClick(search);
  };

  return (
    <SearchContainer onClick={handleSearchClick}>
      <SearchIcon>
        <SearchImage src={search2} alt="돋보기" />
      </SearchIcon>
      <SearchInput
        type="text"
        placeholder="검색어를 입력하세요."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <RecentSearchDropdown isVisible={isDropdownVisible}>
        <div style={{ fontWeight: "bold", marginBottom: "5px" }}>최근 검색어</div>
        {recentSearches.map((search, index) => (
          <RecentSearchItem
            key={index}
            onClick={() => handleRecentSearchClick(search)}
          >
            {search}
          </RecentSearchItem>
        ))}
      </RecentSearchDropdown>
    </SearchContainer>
  );
}