// SizeControllerRow.jsx
import React from "react";
import "./SizeControllerRow.css"; // 해당 컴포넌트 전용 CSS 파일

/**
 * SizeControllerRow 컴포넌트
 * @param {Object} props
 * @param {Object} props.row - 테이블의 행 데이터 (예: 총 기장 데이터)
 * @param {number} props.rowIndex - 행의 인덱스
 * @param {function} props.onIncrement - 행의 첫번째 값을 증가시키는 함수
 * @param {function} props.onDecrement - 행의 첫번째 값을 감소시키는 함수
 */
const SizeControllerRow = ({ row, rowIndex, onIncrement, onDecrement, className}) => {
  return (
    <div className={`size-controller-row ${className}`}>
      <span className="row-label">{row.label}</span>
      <button onClick={() => onDecrement(rowIndex)} className="control-button">↓</button>
      <span className="row-value">{row.values[0]}</span>
      <button onClick={() => onIncrement(rowIndex)} className="control-button">↑</button>
    </div>
  );
};

export default SizeControllerRow;
