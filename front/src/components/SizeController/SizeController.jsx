import React from "react";


const SizeController = ({ rows, onUpdate }) => {
  // 각 행의 첫번째 값(예: XS)에 대해 증감 버튼을 누르면, diff에 따라 나머지 값들이 자동 조정됨
  const handleIncrement = (rowIndex) => {
    const newRows = [...rows];
    const currentValue = newRows[rowIndex].values[0];
    const diff = 1; // 증감량 (필요에 따라 변경)
    newRows[rowIndex].values = newRows[rowIndex].values.map((value, idx) =>
      typeof value === "number" ? value + diff * idx : value
    );
    newRows[rowIndex].values[0] = currentValue + diff; // 첫번째 값 업데이트
    onUpdate(newRows);
  };

  const handleDecrement = (rowIndex) => {
    const newRows = [...rows];
    const currentValue = newRows[rowIndex].values[0];
    const diff = -1; // 감소량
    newRows[rowIndex].values = newRows[rowIndex].values.map((value, idx) =>
      typeof value === "number" ? value + diff * idx : value
    );
    newRows[rowIndex].values[0] = currentValue + diff;
    onUpdate(newRows);
  };

  return (
    <div className="size-controller">
      {/* 총 9개 항목만 제어 (목 너비, 목 파임 등 disabled 타입은 제외) */}
      {rows.slice(0, 9).map((row, index) => (
        <div key={row.category} className="size-controller-row">
          <span className="row-label">{row.label}</span>
          <button onClick={() => handleDecrement(index)} className="control-button">-</button>
          <span className="row-value">{row.values[0]}</span>
          <button onClick={() => handleIncrement(index)} className="control-button">+</button>
        </div>
      ))}
    </div>
  );
};

export default SizeController;
