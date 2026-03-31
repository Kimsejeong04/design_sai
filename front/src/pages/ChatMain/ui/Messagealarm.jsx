import React from "react";
import styled from "styled-components";
import 메시지알림 from "../../../assets/메시지알림.png";
const AlarmWrapper = styled.div`
  background-color:rgb(255, 255, 255);
  border-radius: 10px;
  display: ${(props) => (props.visible ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  width: 100%;
  padding : 10px;
`;

const AlarmText = styled.div`
  
  font-size: 16px;
  color: #333;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-weight: bold;
  
`;
const MessageImg = styled.img`
 
 
  border : 2px solid #ccc;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  margin-right: 10px;
  align-self: center;
  
`
const SuccessMessage = styled.p`
  margin: 0;
  font-size: 16px;
  color: green;
  font-weight: bold;
`;


export default function Messagealarm({ contract, visible, setVisible,isAccepted }) {
  const { title, designer, date } = contract || {};
if (!visible) return null;
  return (
    <AlarmWrapper visible={visible}>
      <MessageImg src={메시지알림} alt="Designer" />
      <AlarmText>  <span style={{fontSize : '12px'}}>{designer}</span>
      <p>주문상품명(의뢰명): {title || "기본메시지"}</p>
      <span style={{color: 'gray' , fontSize : '12px'}}>총주문금액/희망기한: {date || "날짜 없음"}</span></AlarmText>
    {isAccepted && <SuccessMessage>수락을 하였습니다</SuccessMessage>}
    </AlarmWrapper>
  );
}