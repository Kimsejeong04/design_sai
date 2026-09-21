import React from "react";
import styled from "styled-components";
import image from "../../../../assets/image51.png"
const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  background-color: #f5f5f5;
  border-radius: 16px;
  padding: 32px;
  gap: 20px;
`;

const LeftSection = styled.div`
  flex: 2;
  text-align: center;
`;

const Title = styled.h2`
  max-width: 100%;
  font-size: 28px;
  margin: 0 0 16px;
`;

const SubTitle = styled.p`
  font-size: 16px;
  color: #666;
  display: flex;
  gap: 20px; /* 라벨들 사이 간격 */
  justify-content: center;
`;

/* 에스터리스크(*)에만 스타일 적용할 컴포넌트 */
const Asterisk = styled.span`
  color: #ff6600;
  font-weight: bold;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageFrame = styled.div`
  width: 220px;
  height: 220px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 16px;
  overflow: hidden;
`;

const StyledImage = styled.img`
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
`;

/* 라벨 배열 예시 */
// 라벨과 데이터 키 매핑
const labelConfigs = [
  {
    label: "카테고리",
    dataKey: "categoryTags",
    format: (value) => (Array.isArray(value) ? value.join(", ") : value || ""),
  },
  {
    label: "원하는 스타일",
    dataKey: "style",
    format: (value) => value || "",
  },
  {
    label: "원하는 금액",
    dataKey: "amount",
    format: (value) => value || "",
  },
];

export default function PostContent({data = {} }) {

 const {
    requestId = "",
    title = "",
    categoryTags = "",
    style = "",
    amount = "",
    deadline = "",
    description = "",
    image1Url = "",
    image2Url = "", // 오타 수정
    image3Url = "",
    selectedItem = [null]
  } = data;

  return (
    <Container>
      <LeftSection>
        <Title>{data?.title || "청바지 무릎부분 센스있게 작성하실 분 구합니다!"}</Title>
        <SubTitle>
          {labelConfigs.map(({label, dataKey, format }, i) => (
            <React.Fragment key={i}>
              {label} : {format(data[dataKey])}
              
              <Asterisk>*</Asterisk>
            </React.Fragment>
          ))}
        </SubTitle>
      </LeftSection>

      <RightSection>
        <ImageFrame>
          <StyledImage
            src={selectedItem.imageUrl || image} alt="이미지가 없습니다"/> {/*의뢰작성에서 디자인한 이미지 선택했으면imageUrl 이미지 표시  */}
        </ImageFrame>
      </RightSection>
    </Container>
  );
}