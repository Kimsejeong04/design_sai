import styled from "styled-components";
import closeIcon from "../../assets/휴지통.png";

/* 🎨 UI만 수정:
   - margin-top: 40px 제거 (리스트 wrapper의 gap과 이중으로 겹쳐서 간격이 컸던 원인)
   - hover/focus 스타일 직접 정의 (브라우저 기본 파란 포커스색 대신, 은은한 hover + 흰 글자) */
const Container = styled.button`
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid #d0d0d0;
  padding: 12px 16px;
  background-color: #ffffff;
  cursor: pointer;
  color: #222;
  transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;

  &:hover,
  &:focus,
  &:focus-visible {
    background-color: #6b8cae;
    border-color: #6b8cae;
    color: #ffffff;
    outline: none;
  }

  &:hover h2,
  &:focus h2,
  &:focus-visible h2 {
    color: #ffffff;
  }
`;

const Text1 = styled.p`
  width: 70%;
  margin: 0;
  font-size: 1px;
`;

const Text2 = styled.p`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  
  margin: 0;
`;

const CloseIcon = styled.img`
  display: flex;
  width: 22px;
  object-fit: contain;
  cursor: pointer;
`;

export default function RequestBar({ title, date, onClick, onCloseClick, showClose = true, className }) {
  const RequestDate = {title, date};
  console.log("RequestBar Props:", { title, date }); // prop 확인
  return (
    
    <Container className={className} onClick={() => onClick?.({ title, date })}>
      <Text1>
        <h2 style={{fontSize: '16px', margin: 0}}>{title}</h2>
      </Text1>
      <Text2>{date}</Text2>
      {showClose && (
        <CloseIcon
          src={closeIcon}
          alt="닫기"
          onClick={(e) => {
            e.stopPropagation();
            onCloseClick?.();
          }}
        />
      )}
    </Container>
  );
}