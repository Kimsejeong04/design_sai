// Tag.jsx
import React from "react";
import styled from "styled-components";

const TagContainer = styled.div`
  width : auto%;
  background-color: #e0e0e0;
  border-radius: 20px;
  padding: 5px 10px;
  margin-right: 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`;

const RemoveButton = styled.button`
  margin-left: 8px;
  background: none;
  border: none;
  cursor: pointer;
`;

const Tag = ({ text, onRemove }) => {
  return (
    <TagContainer>
      {text}
      <RemoveButton onClick={() => onRemove(text)}>×</RemoveButton>
    </TagContainer>
  );
};

export default Tag;
