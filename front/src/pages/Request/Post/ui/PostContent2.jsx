import React from "react";
import styled from "styled-components";
import { ButtonCategory } from "../../../../components";

const Container = styled.div`
  display: flex;
  background-color: white;
  border-top: 2px solid;    /* 위쪽 테두리 */
  border-bottom: 2px solid; /* 아래쪽 테두리 */
  height: 100px;
  margin: 40px;
  
`;


const Text = styled.p`
  display: flex;
  justify-content: flex-start;
  align-items: center; /* 수직 중앙 정렬 */
  padding-left: 20px;
  width:100%;
  font-size : 25px;
  color: black;
`;

const ButtonContainer = styled.div`
display:flex;
align-items: center;
`;


export default function PostContent2({data}) {
  return (
    <>
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
    <ButtonCategory amount={data.amount}/>
    </ButtonContainer>
    </Container>
    
    <Container>
    <Text>{data?.deadline || "희망 마감기한"}</Text>
    <ButtonContainer>
    <ButtonCategory deadline={data.deadline}/>
    </ButtonContainer>
    </Container>
    
    
    </>
  );
}