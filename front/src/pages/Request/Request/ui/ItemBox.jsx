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
  border: 1px solid #ECE7E7;
  border-radius: 20px;
  gap: 10px;
  padding: 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;

  /* 호버 시 살짝 떠오르는 느낌 */
  &:hover {
    border-color: #BFD7EE;
    transform: translateY(-4px);
    box-shadow: 0 10px 24px rgba(128, 161, 190, 0.22);
  }
`;

const InnerBox = styled.div`
  background-color: #F6F2F2;
  width: 87%;
  height: 180px;
  border-radius: 16px;
  margin-top: 14px;
  overflow: hidden;
`;

const DescriptionContainer = styled.div`
  align-self: flex-start;
  margin: 6px 14px 14px;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 6px;
`;

const Tag = styled.div`
  background-color: #EAF1F9;
  width: auto;
  height: auto;
  border-radius: 999px;
  color: #4A7CA8;
  font-size: 12px;
  font-weight: 600;
  padding: 5px 12px;
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
  margin: 4px 5px;
  font-size: 16px;
  font-weight: 700;
  color: #262323;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 260px;
`;

const Text2 = styled.div`
  margin: 3px 5px;
  font-size: 13px;
  color: #8B8585;
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
              color: '#B4AFAF',
              fontSize: '14px',
              fontWeight: 500,
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