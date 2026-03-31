import React from "react";
import styled from "styled-components";


const ButtonContainer = styled.button`
width: 100px;
height: 35px;
background-color: #799FC4;
color: white;
border-radius: 5px;
border : #799FC4;
margin: 10px;
`;
export default function Button ({children, onClick}) {
  return (
    <>
    
    <ButtonContainer onClick={onClick}>
      {children}
    </ButtonContainer>
    
    
    </>
  )
}
