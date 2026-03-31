import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaClipboardList, FaEnvelope, FaStar, FaPaperPlane } from "react-icons/fa";
import "./ContractSidebar.css";

export default function ContractSidebar({ unreadCount, starredCount, sentCount }) {
  const location = useLocation();

  return (
    <div className="sidebar">
      <h2 style={{ color: "#799FC4" }}>계약 관리</h2>
      <hr />
      <ul>
        <li className={location.pathname === "/client/contract" ? "active" : ""}>
          <Link to="/client/contract" className="sidebar-link-with-badge">
          <div className="icon-text">
            <FaClipboardList className="sidebar-icon" />
            <span>전체 계약</span>
          </div>
          </Link>
        </li>

        <li className={location.pathname === "/client/CanceledPage" ? "active" : ""}>
          <Link to="/client/CanceledPage" className="sidebar-link-with-badge">
            <div className="icon-text">
              <FaEnvelope className="sidebar-icon" />
              <span>안 읽음</span>
            </div>
            {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
          </Link>
        </li>

        <li className={location.pathname === "/client/starred" ? "active" : ""}>
          <Link to="/client/starred" className="sidebar-link-with-badge">
            <div className="icon-text">
              <FaStar className="sidebar-icon" />
              <span>중요</span>
            </div>
            {starredCount > 0 && <span className="badge">{starredCount}</span>}
          </Link>
        </li>

        <li className={location.pathname === "/client/ContractSendMessagePage" ? "active" : ""}>
          <Link to="/client/ContractSendMessagePage" className="sidebar-link-with-badge">
            <div className="icon-text">
              <FaPaperPlane className="sidebar-icon" />
              <span>보낸 메세지</span>
            </div>
            {sentCount > 0 && <span className="badge">{sentCount}</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
}