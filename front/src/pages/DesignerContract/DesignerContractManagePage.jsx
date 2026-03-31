import React from "react";
import { FaClipboardList } from "react-icons/fa";  // 아이콘 임포트
import DesignerContractSidebar from "../../components/DesignerContract/DesignerContractSidebar/DesignerContractSidebar";
import DesignerContractSearchAndFilter from "../../components/DesignerContract/DesignerContractSearchAndFilter/DesignerContractSearchAndFilter";
import DesignerContractSortAndCreate from "../../components/DesignerContract/DesignerContractSortAndCreate/DesignerContractSortAndCreate";
import DesignerContractList from "../../components/DesignerContract/DesignerContractList/DesignerContractList";
import "./DesignerContractManagePage.css";

const DesignerContractManagePage = () => {
  return (
    <div className="page-wrapper">
      {/* 왼쪽 사이드바 */}
      <DesignerContractSidebar />

      {/* 오른쪽 본문 */}
      <div className="main-content">
        {/* 제목 */}
        <h1 className="page-header" style={{ fontSize: "27px", display: "flex", alignItems: "center", marginBottom: "40px" }}>
          {/* 아이콘 추가 */}
          <FaClipboardList style={{ marginRight: "15px", fontSize: "36px" }} />
          계약서 조회
        </h1>

        {/* 검색 및 필터 */}
        <DesignerContractSearchAndFilter />
        
        {/* 구분선 추가 (간격을 더 넓게) */}
        <hr style={{ margin: "30px 0" }} />

        {/* 정렬 및 신규 생성 버튼 */}
        <DesignerContractSortAndCreate />

        {/* 계약서 리스트 */}
        <DesignerContractList />
      </div>
    </div>
  );
};

export default DesignerContractManagePage;
