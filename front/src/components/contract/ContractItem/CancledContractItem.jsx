import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./ContractItem.css";

const CancledContractItem = ({ cancledcontract, onToggleStar, onClick, to }) => {
  const { starredStatus, title, preview, status, date } = cancledcontract;
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick();
    if (to) navigate(to);
  };

  return (
    <div className="contract-item" onClick={onClick || handleClick}>
      <div className="contract-left">
        <div className="contract-star" onClick={(e) => e.stopPropagation()}>
          <Star
            className={`star-icon ${starredStatus ? "active" : ""}`}
            size={23}
            onClick={onToggleStar}
          />
        </div>
        <div className="contract-text">
          <h3 className="contract-title">{title}</h3>
          <p className="contract-preview">{preview}</p>
        </div>
      </div>
      <div className="contract-right">
        <p className={`contract-status ${status.toLowerCase()}`}>{status}</p>
        <p className="contract-date">{date}</p>
      </div>
    </div>
  );
};

export default CancledContractItem;