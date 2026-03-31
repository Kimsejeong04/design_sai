import styled from "styled-components";
import closeIcon from "../../assets/휴지통.png";

const Container = styled.button`
  display: flex;
  margin: 0 auto;
  width: 100%;
  margin-top: 40px;
  border-radius: 10px;
  border: 1px solid;
  padding: 10px;
  background-color:rgb(255, 255, 255);
  cursor: pointer;
  color : black;
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
  width: 30px;
  object-fit: contain;
  cursor: pointer;
`;

export default function RequestBar({ title, date, onClick, onCloseClick, showClose = true, className }) {
  const RequestDate = {title, date};
  console.log("RequestBar Props:", { title, date }); // prop 확인
  return (
    
    <Container className={className} onClick={() => onClick?.({ title, date })}>
      <Text1>
        <h2 style={{fontSize: '20px'}}>{title}</h2>
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