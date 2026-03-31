import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom'
import designerImage from '../../../../assets/desiner.png';

// 아이템 박스 컨테이너
const ItemBoxContainer = styled.div`
  width: 350px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;      
  background-color: white;
  min-height: 300px;
  border: 0.5px solid #A5A0A0; 
  border-radius: 20px;
  gap: 10px;
  margin: 20px;
  padding: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  transition: border 0.15s, box-shadow 0.15s; 
  
  /* 호버 시 테두리 추가 */
  &:hover {
    border-color: #BFD7EE; 
    border-width: 3.5px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const InnerBox = styled.div`
  background-color: #F6F2F2;
  width: 87%;
  height: 180px;
  border: 0.5px solid;
  border-color: #EBE5E5;
  border-radius: 20px;
  margin-top: 10px;
  padding: 5px;
  overflow: hidden;
`;

const DescriptionContainer = styled.div`
  align-self: flex-start;
  margin: 10px;
`;

const TagContainer = styled.div`
  display: flex;
`;

const Tag = styled.div`
  background-color: #bfd7ee;
  width: auto;
  min-width : 50px;
  height: 20px;
  border: 0.5px solid;
  border-radius: 15px;
  color: white;
  padding: 7px;
  margin: 5px;
  text-align: center;
`;

const Circle = styled.div`
  width: 40px; /* 원 크기 */
  height: 40px;
  border-radius: 50%; /* 원형 */
  overflow: hidden; /* 이미지가 원 넘지 않게 */
  margin: 5px;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* 이미지 비율 유지하면서 크기에 맞게 잘라냄 */
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 10px 0;
`;

const Text = styled.div`
  margin: 5px;
  font-weight: 1000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 180px;
`;

const Text2 = styled.div`
  margin: 5px;
  color: #6B6565;
`;


export default function ItemBox({ children,data = {} }) {
  const navigate = useNavigate();

    const {
    categoryTags = [],
    style = "",
    amount = "",
    deadline = "",
  } = data;

  // categoryTags를 안전하게 배열로 변환
  const safeTags = Array.isArray(categoryTags)
    ? categoryTags
    : typeof categoryTags === "string" && categoryTags
    ? categoryTags.split(",").map(tag => tag.trim())
    : [];

  console.log("Safe tags:", safeTags);
  

  const handleClick = () => {
    navigate('/client/RequestPost' , {state : {requestData : data }});
  };

    // 디버깅 로그 추가
  console.log("ItemBox data:", data);
  console.log("ItemBox categoryTags:", data?.categoryTags);
  console.log("ItemBox requestId:", data?.requestId);

  return (
    <ItemBoxContainer style={{ cursor: "pointer" }} onClick={handleClick}> 
      <InnerBox>
        {data?.image1Url ? (
          <img
            src={`http://localhost:8081/api/requests${data.image1Url}`}
            alt="요청 이미지"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '15px'
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#888',
              fontSize: '14px',
            }}
          >
            이미지 없음
          </div>
        )}
      </InnerBox>
      <DescriptionContainer>
          <TagContainer>
          {safeTags.length > 0 ? (
            safeTags.map((tag, index) => (
              <Tag key={index}>{`${tag}`}</Tag>
            ))
          ) : (
            <Tag>태그 없음</Tag>
          )}
        </TagContainer>
        <Text>{data?.title || "청바지 잘하시는 디자이너 찾습니다."} </Text>
        <Profile>
          <Circle>
            <ProfileImage src={designerImage} alt="의뢰인 프로필 " />
          </Circle>
          {data.requesterName || "홍길동"}
        </Profile>
        <Text2>{data?.amount || "10000원"}</Text2>
        <Text2>{data?.deadline ? `희망기한 ${data.deadline}` : "희망기한 2주"}</Text2>
      </DescriptionContainer>
    </ItemBoxContainer>
  );
}