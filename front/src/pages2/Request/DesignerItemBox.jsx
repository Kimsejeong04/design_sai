import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import designerImage from "../../assets/desiner.png";
import React, { useState, useEffect } from "react";

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
  
  &:hover {
    border-color: #BFD7EE; 
    border-width: 3.5px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const InnerBox = styled.div`
  background-color: #F6F2F2;
  width: 87%;
  height: 45%;
  border: 0.5px solid;
  border-color: #EBE5E5;
  border-radius: 20px;
  margin-top: 10px;
  padding: 5px;

  display: flex;
  justify-content: center;
  align-items: center;
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
  height: 20px;
  border: 0.5px solid;
  border-radius: 15px;
  color: white;
  padding: 7px;
  margin: 5px;
  text-align: center;
`;

const Circle = styled.div`
  width: 40px; 
  height: 40px;
  border-radius: 50%; 
  overflow: hidden; 
  margin: 5px;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; 
  border-radius: 50%;
  background: #f0f0f0;
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

const LikeButton = styled.button`
  margin-top: 10px;
  padding: 6px 14px;
  background-color: #a0cfff;
  border: none;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e03e5d;
  }
`;

const InnerBoxImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  object-fit: cover;
  background-color: #f0f0f0;
`;

export default function DesignerItemBox({ children, data, propUsername }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [username, setUsername] = useState(propUsername || "");

  useEffect(() => {
    if (!propUsername) {
      const fetchSession = async () => {
        try {
          const res = await fetch("http://localhost:8081/api/user", {
            credentials: "include",
          });
          if (!res.ok) throw new Error("세션 없음");
          const data = await res.json();
          if (data.username) {
            setUsername(data.username);
          }
        } catch (err) {
          console.warn("세션 정보 없음:", err);
        }
      };
      fetchSession();
    } else {
      setUsername(propUsername);
    }
  }, [propUsername]);

  const handleClick = () => {
    navigate("/designer/DesignerRequestPost", { state: { requestData: data } });
  };

  const handleLike = async (e) => {
    e.stopPropagation();

    if (!data?.requestId) {
      alert("의뢰 ID를 찾을 수 없습니다. 찜하기 실패.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8081/designer/favorite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          requestId: data.requestId,
          username,
        }),
      });

      if (res.ok) {
        setLiked(true);
        alert("찜 완료!");
      } else if (res.status === 401) {
        alert("로그인이 필요합니다.");
      } else {
        const errorText = await res.text();
        alert(`찜 실패: ${errorText}`);
      }
    } catch (err) {
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <ItemBoxContainer style={{ cursor: "pointer" }} onClick={handleClick}>
      <InnerBox>
        {data?.image1Url ? (
          <img
            src={`http://localhost:8081/api/requests${data.image1Url}`}
            alt="요청 이미지"
            style={{
              width: '100%',
              maxHeight: '120px',
              objectFit: 'cover',
              borderRadius: '15px',
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
          <Tag>{data?.categoryTags || "태그"}</Tag>
        </TagContainer>
        <Text>{data?.title || "의뢰 제목을 입력해주세요."}</Text>

        <Profile>
          <Circle>
            <ProfileImage src={designerImage} alt="디자이너 프로필" />
          </Circle>
          {data.requesterName || "홍길동"}
        </Profile>

        <Text2>{data?.amount || "10000원"}</Text2>
        <Text2>{data?.deadline ? `희망기한 ${data.deadline}` : "희망기한 2주"}</Text2>
        <LikeButton onClick={handleLike} liked={liked}>
          {liked ? "❤️ 찜 완료" : "🤍 찜하기"}
        </LikeButton>
      </DescriptionContainer>
    </ItemBoxContainer>
  );
}
