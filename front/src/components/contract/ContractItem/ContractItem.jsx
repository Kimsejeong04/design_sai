import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./ContractItem.css";

const ContractItem = ({ contract, onToggleStar, onClick, to, style }) => {
  const { starredStatus, title, preview, status, date } = contract;
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick();
    if (to) navigate(to);
  };

  const statusText = status || "";

  return (
    <div
      className={`contract-item${starredStatus ? " active" : ""}`}
      onClick={onClick || handleClick}
      style={style}
    >
      <div className="contract-left">
        <div className="contract-star" onClick={(e) => e.stopPropagation()}>
          <Star
            className={`star-icon ${starredStatus ? "active" : ""}`}
            size={22}
            onClick={onToggleStar}
          />
        </div>
        <div className="contract-text">
          <h3 className="contract-title">{title}</h3>
          {preview && <p className="contract-preview">{preview}</p>}
        </div>
      </div>
      <div className="contract-right">
        {statusText && (
          <span className={`contract-status ${statusText.toLowerCase()}`}>
            {statusText}
          </span>
        )}
        <p className="contract-date">{date}</p>
      </div>
    </div>
  );
};

export default ContractItem;