// TextInputUI.jsx
import React from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width:100%;
  max-width: 500px;
  border: 1px solid #ccc;
  padding: 5px;
  border-radius: 10px;
  background-color: white;
`;

const InputBox = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: none;
  outline: none;
  background-color: white;
`;

const Counter = styled.p`
  font-size: 14px;
  color: ${(props) => (props.isMax ? "red" : "#666")};
  margin-left: 10px;
  white-space: nowrap;
`;

const TextInputUI = ({
  value,
  maxLength,
  onChange,
  onEnter,
  onCompositionStart,
  onCompositionEnd,
  ...props
}) => {
  const inputValue = value ?? "";
  const length = inputValue.length;

  const handleKeyDown = (e) => {
    // IME(한글 조합) 중일 때는 Enter 처리를 막음
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      if (onEnter) {
        onEnter(inputValue);
        e.preventDefault();
      }
    }
    // 전달된 onKeyDown 호출
    if (props.onKeyDown) {
      props.onKeyDown(e);
    }
  };

  return (
    <InputContainer>
      <InputBox
        type="text"
        value={inputValue}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        maxLength={maxLength} // 기본 글자 수 제한 (IME 조합 시 이슈가 있을 수 있음)
        onCompositionStart={onCompositionStart}
        onCompositionEnd={onCompositionEnd}
        
        {...props}
      />
      <Counter isMax={length === maxLength}>
        {length} / {maxLength}
      </Counter>
    </InputContainer>
  );
};

export default TextInputUI;
