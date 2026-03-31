import React from "react";
import { useLocation } from "react-router-dom";
import { FaClipboardList, FaUndo } from "react-icons/fa";
import "./DesignerContractSidebar.css";

export default function DesignerContractSidebar({ selectedMenu, setSelectedMenu }) {
  const location = useLocation();

  return (
    <div className="sidebar">
      <h2 style={{ color: "#799FC4" }}>계약서 관리</h2>
      <hr />
      <ul>
        <li className={selectedMenu === "계약서 조회" ? "active" : ""}>
          <div className="sidebar-link-without-badge" onClick={() => setSelectedMenu("계약서 조회")}>
            <div className="icon-text">
              <FaClipboardList className="sidebar-icon" />
              <span>계약서 조회</span>
            </div>
          </div>
        </li>

        <li className={selectedMenu === "환불처리" ? "active" : ""}>
          <div className="sidebar-link-without-badge" onClick={() => setSelectedMenu("환불처리")}>
            <div className="icon-text">
              <FaUndo className="sidebar-icon" />
              <span>환불처리</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
