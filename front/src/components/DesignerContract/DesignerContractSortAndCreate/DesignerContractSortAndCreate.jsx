import React from "react";
import { Link } from "react-router-dom"; // Link 컴포넌트 임포트
import "./DesignerContractSortAndCreate.css";

const DesignerContractSortAndCreate = () => {
  return (
    <div className="sort-create-wrapper">
      <div className="sort-area">
        <label>정렬 기준:</label>
        <select>
          <option>계약일순</option>
          <option>계약금순</option>
        </select>

        <label>상태:</label>
        <select>
          <option>전체</option>
          <option>미송신</option>
          <option>미수신</option>
          <option>진행중</option>
          <option>수정건의</option>
          <option>진행중(수정완료)</option>
          <option>해지요청</option>
          <option>해지됨</option>
          <option>완료됨</option>
        </select>
      </div>

      {/* Link로 버튼을 감싸서 페이지 이동 */}
      <Link to="/designer/DesignerContractCreate">
        <button className="create-button">신규 계약 생성</button>
      </Link>
    </div>
  );
};

export default DesignerContractSortAndCreate;
