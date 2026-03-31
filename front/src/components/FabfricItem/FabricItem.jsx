import React from "react";
import "./FabricItem.css";

function FabricItem({ fabricItemsData, selectedIds, onClickItem }) {
  if (!Array.isArray(fabricItemsData)) {
    return null; // 데이터 없으면 아무것도 렌더링하지 않음
  }
  return (
    <div className="fabric-select">
      {fabricItemsData.map((item) => {
        const isSelected = selectedIds.includes(item.id);
        return (
          <div
            key={item.id}
            className={`fabric-item ${isSelected ? "selected" : ""}`}
            onClick={() => onClickItem(item.id)}
          >
            <div className="fabric-image">
              <img src={item.imageSrc} alt={`${item.name} 원단 이미지`} />
            </div>
            <p className="fabric-name">{item.name}</p>
            <p className="fabric-desc">{item.desc}</p>
          </div>
        );
      })}
    </div>
  );
}

export default FabricItem;
