import { useState } from "react";
import ContractList from "../../contract/ContractList";

const Starred = () => {
  const [contracts, setContracts] = useState([
    {
      starredStatus: true,
      title: "디자인 계약서 1",
      preview: "3페이지 분량 / 클라이언트 서명 완료",
      status: "진행중",
      date: "2025.04.11",
    },
    {
      starredStatus: false,
      title: "위탁계약서",
      preview: "초안 전달 / 검토 중",
      status: "완료",
      date: "2025.04.05",
    },
    {
      starredStatus: true,
      title: "프로젝트 계약서",
      preview: "계약 해지 요청 / 내용 확인 필요",
      status: "해지",
      date: "2025.03.30",
    },
  ]);

  // 별 클릭 시 상태 토글
  const handleToggleStar = (index) => {
    const updated = [...contracts];
    updated[index].starredStatus = !updated[index].starredStatus;
    setContracts(updated);
  };

  // 중요 계약만 필터링
  const starredContracts = contracts.filter((c) => c.starredStatus);

  return (
    <div>
      <h2 className="text-xl font-semibold">중요 계약들</h2>
      <ContractList
        contracts={starredContracts}
        onToggleStar={(index) => {
          // 실제 전체 contracts에서 index를 찾아서 업데이트해야 하므로
          // starredContracts[index]를 전체 배열의 index로 매핑
          const contractToUpdate = starredContracts[index];
          const realIndex = contracts.findIndex(c => c.title === contractToUpdate.title);
          handleToggleStar(realIndex);
        }}
      />
    </div>
  );
};

export default Starred;
