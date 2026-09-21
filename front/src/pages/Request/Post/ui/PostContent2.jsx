import React from "react";
import styled from "styled-components";
import { ButtonCategory } from "../../../../components";

const List = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border: 1px solid #E5E0E0;
  border-radius: 12px;
  height: 76px;
  box-sizing: border-box;
  padding: 0 20px;
`;


const Text = styled.p`
  display: flex;
  justify-content: flex-start;
  align-items: center; /* 수직 중앙 정렬 */
  margin: 0;
  font-size : 18px;
  font-weight: 600;
  color: #262323;
`;

const ButtonContainer = styled.div`
display:flex;
align-items: center;
`;


export default function PostContent2({data}) {
  return (
    <List>
    <Container>
    <Text>{data?.categoryTags || "카테고리"}</Text>
     <ButtonContainer>
     <ButtonCategory categoryTags={data?.categoryTags}/>
     </ButtonContainer>
    </Container>

    <Container>
    <Text>{data?.style || "원하는스타일"}</Text>
    <ButtonContainer>
    <ButtonCategory style={data?.style}/>
    </ButtonContainer>
    </Container>

    <Container>
    <Text>{data?.amount || "원하는 금액"}</Text>
    <ButtonContainer>
    <ButtonCategory amount={data.amount} label="가격"/>
    </ButtonContainer>
    </Container>

    <Container>
    <Text>{data?.deadline || "희망 마감기한"}</Text>
    <ButtonContainer>
    <ButtonCategory deadline={data.deadline} label="날짜"/>
    </ButtonContainer>
    </Container>


    </List>
  );
}