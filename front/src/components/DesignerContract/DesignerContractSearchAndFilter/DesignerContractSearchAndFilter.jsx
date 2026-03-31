import React from "react";
import "./DesignerContractSearchAndFilter.css";

const DesignerContractSearchAndFilter = () => {
  return (
    <div className="search-filter-wrapper">
      <div className="input-group">
        <label>의뢰인명</label>
        <input type="text" placeholder="의뢰인명 검색" />
      </div>
      <div className="input-group">
        <label>계약일</label>
        <input type="date" />
      </div>
      <div className="input-group">
        <label>계약금</label>
        <input type="text" placeholder="계약금 검색" />
      </div>
      
      {/* 계약기간 묶음 */}
      <div className="input-group">
        <label>계약기간</label>
        <div className="period-group">
          <input type="date" />
          <span className="tilde">~</span>
          <input type="date" />
        </div>
      </div>

      {/* 검색 버튼 */}
      <button className="search-button">검색</button>
    </div>
  );
};

export default DesignerContractSearchAndFilter;
