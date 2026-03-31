import React, { useState } from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
  display: flex;
  align-items: center;
  width: 500px;
  border: 1px solid #ccc;
  padding: 5px;
  border-radius: 10px;
  position: relative;
`;

const DropdownButton = styled.button`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: none;
  outline: none;
  background: white;
  text-align: left;
  cursor: pointer;
  color: #000;
  overflow: visible;
`;

const DropdownList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 5px 5px;
  display: ${(props) => (props.$isOpen ? "block" : "none")};
  max-height: 200px;
  overflow-y: auto;
`;

const DropdownItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;

export default function DropDown({ options, defaultSelected = "선택하세요", onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultSelected);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option); // 부모 컴포넌트에 선택된 값 전달
    }
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>
        {selected}
      </DropdownButton>
      <DropdownList $isOpen={isOpen}>
        {options.map((option, index) => (
          <DropdownItem key={index} onClick={() => handleSelect(option)}>
            {option}
          </DropdownItem>
        ))}
      </DropdownList>
    </DropdownContainer>
  );
}