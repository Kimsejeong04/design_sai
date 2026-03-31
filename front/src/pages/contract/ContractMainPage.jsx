// ContractMainPage.jsx
import React, { useState } from "react";
import ContractLayout from "../../layouts/ContractLayout";
import ContractPage from "./ContractPage";      // 전체
import StarredPage from "./StarredPage";       // 중요

const dummyData = [
  {
    title: "계약서 1",
    preview: "이건 계약 내용의 미리보기",
    status: "계약 중",
    date: "2024-04-11",
    starredStatus: true,
  },
  {
    title: "계약서 2",
    preview: "이건 두번째 계약",
    status: "계약 완료",
    date: "2024-04-10",
    isStarstarredStatusred: false,
  },
];

const ContractMainPage = () => {
  const [contracts, setContracts] = useState(dummyData);

  const handleToggleStar = (title) => {
    setContracts((prev) =>
      prev.map((c) =>
        c.title === title ? { ...c, starredStatus: !c.starredStatus } : c
      )
    );
  };

  return (
    <ContractLayout>
      <div className="p-6">
        {/* 탭이 있다고 가정 */}
        <ContractPage
          contracts={contracts}
          handleToggleStar={handleToggleStar}
        />
        {/* 또는 */}
        {/* <StarredPage
          contracts={contracts}
          handleToggleStar={handleToggleStar}
        /> */}
      </div>
    </ContractLayout>
  );
};

export default ContractMainPage;
