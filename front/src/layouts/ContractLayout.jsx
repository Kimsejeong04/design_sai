import React, { useState } from "react";
import ContractSidebar from "../components/contract/ContractSidebar/ContractSidebar";

const ContractLayout = ({ children }) => {
  return (
    <div className="flex">
      <ContractSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default ContractLayout;
