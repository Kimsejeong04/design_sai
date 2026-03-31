import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  padding: 2rem;
  max-width: 960px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: left;
  color: #799FC4;
`;

const ContractCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  background: #fdfdfd;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.05);
`;

const ContractTitle = styled.h2`
  font-size: 1.4rem;
  border-bottom: 0.25rem solid #a0c4ff;
  display: inline-block;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
  color: #333A56;
`;

const StepContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StepItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StepImage = styled.img`
  width: 5.5rem;
  height: 5.5rem;
  filter: ${({ grayscale }) => (grayscale ? "grayscale(100%)" : "none")};
`;

const StepLabel = styled.div`
  margin-top: 0.5rem;
  font-size: 1rem;
  color: ${({ active }) => (active ? "#000" : "#aaa")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
`;

const Arrow = styled.span`
  font-size: 1.5rem;
  margin: 0 1rem;
  color: #799fc4;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const PageButton = styled.button`
  padding: 0.4rem 0.8rem;
  border: 1px solid #ccc;
  background-color: ${({ active }) => (active ? "#799FC4" : "#fff")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  border-radius: 50%;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #799fc4;
    color: #fff;
  }
`;

// 단계 정보 정의
const steps = [
  { label: "디자인하기", image: "/image/Progress/sketch.png" },
  { label: "본뜨기", image: "/image/Progress/knitting.png" },
  { label: "마감하기", image: "/image/Progress/successful.png" },
  { label: "포장하기", image: "/image/Progress/package.png" },
];

export default function ProductionList({ username: propUsername }) { //6.21 username : 세션에서 얻어오기
  const [contracts, setContracts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [username, setUsername] = useState(propUsername);

  
useEffect(() => {
  if (!propUsername) {
    const fetchSession = async () => {
      try {
        const res = await fetch("http://localhost:8081/api/user", { credentials: 'include' });
        if (!res.ok) throw new Error(`세션 요청 실패: ${res.status}`);
        const data = await res.json();
        console.log("세션 데이터:", data);
        if (data.username) setUsername(data.username);
      } catch (err) {
        console.warn("세션 정보 없음:", err);
      }
    };
    fetchSession();
  }
}, [propUsername]);

useEffect(() => { 
  const fetchContracts = async () => {
    if (!username) {
      console.warn("username이 없습니다. API 호출 생략.");
      return;
    }
    try {
      const response = await axios.get(`http://localhost:8081/api/progress/designer/contracts/${username}`);
      console.log("제작 내역 데이터:", response.data);
      setContracts(response.data);
    } catch (error) {
      console.error("제작 내역 불러오기 실패:", error);
    }
  };
  fetchContracts();
}, [username]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentContracts = contracts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(contracts.length / itemsPerPage);

  return (
    <Container>
      <PageTitle>제작 내역</PageTitle>

      {currentContracts.map((contract) => (
        <ContractCard key={contract.id}>
          <ContractTitle>{contract.contractTitle}</ContractTitle>

          <StepContainer>
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <StepItem>
                  <StepImage
                    src={step.image}
                    alt={step.label}
                    grayscale={index !== (contract.step || 0)}  //진행중인 단계만 색깔, 나머지는 흑백
                  />
                  <StepLabel active={index === (contract.step || 0)}>
                    {step.label}
                  </StepLabel>
                </StepItem>
                {index < steps.length - 1 && <Arrow>→</Arrow>}
              </React.Fragment>
            ))}
          </StepContainer>
        </ContractCard>
      ))}

      {/* 페이지네이션 */}
      <Pagination>
        {Array.from({ length: totalPages }, (_, i) => (
          <PageButton
            key={i}
            active={i + 1 === currentPage}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </PageButton>
        ))}
      </Pagination>
    </Container>
  );
}
