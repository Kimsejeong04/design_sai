import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px; /* 콘텐츠의 최대 너비를 제한 */
  min-height: 85vh;
  margin: 0 auto; /* 좌우 중앙 정렬 */
  margin-top: 50px;
  padding: 20px; /* 내부 여백 추가 */
  border-radius: 10px;
  background-color: white; /* 배경색 추가 (이미지와 유사하게) */
  box-shadow: 0 2px 4px rgba(107, 105, 105, 0.1); /* 그림자 효과 추가 */
`;

const Title = styled.p`
  display: flex;
  justify-content: flex-start;
  font-size: 24px;
  font-weight: bold; /* 폰트 굵기 추가 */
  margin-bottom: 50px; /* 제목과 콘텐츠 사이 간격 */
`;




export default function Content({children}) {
  return (
    <Container>
      <Title>포트폴리오 관리</Title>
      {children}
    </Container>
  );
}