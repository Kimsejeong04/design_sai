// NextButtonUI.jsx
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
  type: "button";
  width: 120px;
  height: 40px;
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  background-color: #799FC4;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 20px;
  text-align: center;
  color: white;
  &:hover {
    background-color: #9dbbd5;
  }
`;

const NextButtonUI = ({to, onClick, children, className}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (onClick) onClick();
    if (to) navigate(to)
  }

  return <Button className={className} type="button" onClick={handleClick}>
      {children || "다음"}
    </Button>
};

export default NextButtonUI;
