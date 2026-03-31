// SelfManagedTextInputUI.jsx
import React, { useState } from "react";
import {TextInputUI} from '../../components'

const SelfManagedTextInputUI = (props) => {

  /* 06.23 value을 내부에서 관리하고 있어, 의뢰등록하기 금액입력때 쉼표가 작동을 안 함.
  const [text, setText] = useState("");

  // 내부 상태 변경 처리
  const handleChange = (e) => {
    setText(e.target.value);
    // 필요하면 부모로부터 전달된 onChange도 호출
    if (props.onChange) {
      props.onChange(e);
    }
  };
  */
  

  // 엔터키 입력 처리
  const handleEnter = (inputValue) => {
    // 필요하면 부모로부터 전달된 onEnter도 호출
    if (props.onEnter) {
      props.onEnter(inputValue);
    }
  };

  return (
    <TextInputUI
      {...props}
      //value={text}
      //onChange={handleChange}
      onEnter={handleEnter}
      
    />
  );
};

export default SelfManagedTextInputUI;
