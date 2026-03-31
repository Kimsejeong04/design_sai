import React, { useState } from "react";
import ContractLayout from "../../layouts/ContractLayout";
import ContractList from "../../components/contract/ContractList/ContractList";

const ContractPage = ({ contracts, handleToggleStar }) => {

  return (
    <ContractLayout>
      <div className="p-6">
        <ContractList
          mode="전체"
          contracts={contracts}
          handleToggleStar={handleToggleStar}
      />
      </div>
    </ContractLayout>
  );
};

export default ContractPage;
