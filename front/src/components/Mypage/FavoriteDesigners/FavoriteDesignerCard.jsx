import React from "react";
import "./FavoriteDesigners.css";
import { useNavigate } from "react-router-dom";

export default function FavoriteDesignerCard({ data, isChecked, onCheck }) {
  const navigate = useNavigate();

  const goToPortfolio = () => {
    navigate(`/designer/${data.id}`); // 👉 디자이너 상세 포트폴리오 페이지로 이동
  };

  return (
    <div className="designer-card">
      <input type="checkbox" checked={isChecked} onChange={onCheck} />

      <img
        src={data.profileImg}
        alt={`${data.name} 프로필`}
        className="designer-img"
        onClick={goToPortfolio}
      />

      <div className="designer-info">
        <h3 onClick={goToPortfolio}>{data.name}</h3>
        <p>{data.description}</p>
      </div>
    </div>
  );
}
