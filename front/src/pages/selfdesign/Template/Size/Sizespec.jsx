import React, { useState, useEffect } from "react";
import "./Sizespeccss.css";
import { SizeController, SizeControllerRow } from "../../../../components";
import ClothesTest from "./ClothesPants/ClothesTest";
import "./Sizespec.css"
function Sizespec({ selectedSize, setSelectedSize = () => {} }) {
  const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

  // ClothesTest 상태 정의
  const [neckY, setNeckY] = useState(18);
  const [neckXOffset, setNeckXOffset] = useState(15);
  const [shoulderOffset, setShoulderOffset] = useState(38);
  const [chestOffset, setChestOffset] = useState(82);
  const [bodyLength, setBodyLength] = useState(67);
  const [armLengthFactor, setArmLengthFactor] = useState(20);
  const [upperWidthOffset, setUpperWidthOffset] = useState(0);
  const [lowerWidthOffset, setLowerWidthOffset] = useState(90);
  const [topBodyHeight, setTopBodyHeight] = useState(18);

  // 초기 행 데이터 배열
  const initialRows = [
    { category: "A", label: "총 기장", values: [65, 67, 69, 71, 73, 75, 77], type: "highlight", key: "bodyLength" },
    { category: "B", label: "가슴 단면", values: [82, 86, 90, 94, 98, 102, 106], type: "highlight", key: "chestOffset" },
    { category: "C", label: "밑단 단면", values: [90, 94, 98, 102, 106, 110, 114], type: "highlight", key: "lowerWidthOffset" },
    { category: "D", label: "소매 기장", values: [20, 21, 22, 23, 24, 25, 26], type: "highlight", key: "armLengthFactor" },
    { category: "E", label: "어깨 단면", values: [38, 40, 42, 44, 46, 48, 50], type: "normal", key: "shoulderOffset" },
    { category: "F", label: "허리 단면", values: [70, 72, 74, 76, 78, 80, 82], type: "normal" },
    { category: "G", label: "암홀 (직선)", values: [18, 20, 22, 24, 26, 28, 30], type: "normal", key: "topBodyHeight" },
    { category: "J", label: "목 파임", values: [18, 19, 20, 21, 22, 23, 24], type: "normal", key: "neckY" },
    { category: "K", label: "목 너비", values: [15, 16, 17, 18, 19, 20, 21], type: "normal", key: "neckXOffset" },
  ];

  const [rows, setRows] = useState(initialRows);
  const [editable, setEditable] = useState({
    xs: true,
    s: false,
    m: false,
    l: false,
    xl: false,
    "2xl": false,
    "3xl": false,
  });

  const resetValues = () => {
    setNeckY(18);
    setNeckXOffset(15);
    setShoulderOffset(38);
    setChestOffset(82);
    setBodyLength(67);
    setArmLengthFactor(20);
    setLowerWidthOffset(90);
    setTopBodyHeight(18);
  };

  useEffect(() => {
    if (selectedSize === null) {
      setEditable({
        xs: true,
        s: false,
        m: false,
        l: false,
        xl: false,
        "2xl": false,
        "3xl": false,
      });
      const savedRows = localStorage.getItem("sizeSpecRows");
      if (savedRows) {
        try {
          setRows(JSON.parse(savedRows));
        } catch (e) {
          console.error("localStorage rows 파싱 오류:", e);
          setRows(initialRows);
        }
      } else {
        setRows(initialRows);
      }
    }
  }, [selectedSize]);

  useEffect(() => {
    const newRows = rows.map(row => {
      if (row.key === "bodyLength") return { ...row, values: [bodyLength, ...row.values.slice(1)] };
      if (row.key === "chestOffset") return { ...row, values: [chestOffset, ...row.values.slice(1)] };
      if (row.key === "lowerWidthOffset") return { ...row, values: [lowerWidthOffset, ...row.values.slice(1)] };
      if (row.key === "armLengthFactor") return { ...row, values: [armLengthFactor , ...row.values.slice(1)] };
      if (row.key === "shoulderOffset") return { ...row, values: [shoulderOffset, ...row.values.slice(1)] };
      if (row.key === "topBodyHeight") return { ...row, values: [topBodyHeight, ...row.values.slice(1)] };
      if (row.key === "neckY") return { ...row, values: [neckY, ...row.values.slice(1)] };
      if (row.key === "neckXOffset") return { ...row, values: [neckXOffset, ...row.values.slice(1)] };
      return row;
    });
    setRows(newRows);
  }, [bodyLength, chestOffset, lowerWidthOffset, armLengthFactor, shoulderOffset, topBodyHeight, neckY, neckXOffset]);

  const handleCellClick = (size) => {
    if (typeof setSelectedSize !== "function") {
      console.error("setSelectedSize가 함수가 아닙니다");
      return;
    }
    const sizeIndex = sizes.indexOf(size.toUpperCase());
    if (sizeIndex === -1) return;

    const newEditable = { ...editable };
    Object.keys(newEditable).forEach((key) => {
      newEditable[key] = key === size.toLowerCase();
    });
    setEditable(newEditable);
    setSelectedSize(size.toLowerCase());

    rows.forEach((row) => {
      const value = row.values[sizeIndex];
      if (row.key === "bodyLength") setBodyLength(value);
      if (row.key === "chestOffset") setChestOffset(value);
      if (row.key === "lowerWidthOffset") setLowerWidthOffset(value);
      if (row.key === "armLengthFactor") setArmLengthFactor(value);
      if (row.key === "shoulderOffset") setShoulderOffset(value);
      if (row.key === "topBodyHeight") setTopBodyHeight(value);
      if (row.key === "neckY") setNeckY(value);
      if (row.key === "neckXOffset") setNeckXOffset(value);
    });
  };

  const handleInputChange = (rowIndex, event) => {
    const newRows = [...rows];
    const newValue = event.target.value;
    const valueToUse = newValue.trim() === "" ? "0" : newValue;

    if (!isNaN(valueToUse)) {
      const numericValue = parseFloat(valueToUse);
      const diff = numericValue - rows[rowIndex].values[0];
      newRows[rowIndex].values = rows[rowIndex].values.map((value, index) => value + diff * index);
      newRows[rowIndex].values[0] = numericValue;

      if (newRows[rowIndex].key === "bodyLength") setBodyLength(numericValue);
      if (newRows[rowIndex].key === "chestOffset") setChestOffset(numericValue);
      if (newRows[rowIndex].key === "lowerWidthOffset") setLowerWidthOffset(numericValue);
      if (newRows[rowIndex].key === "armLengthFactor") setArmLengthFactor(numericValue);
      if (newRows[rowIndex].key === "shoulderOffset") setShoulderOffset(numericValue);
      if (newRows[rowIndex].key === "topBodyHeight") setTopBodyHeight(numericValue);
      if (newRows[rowIndex].key === "neckY") setNeckY(numericValue);
      if (newRows[rowIndex].key === "neckXOffset") setNeckXOffset(numericValue);
      
      setRows(newRows);
    }
  };

  const applyDiffToRow = (rowIndex, diff) => {
    const newRows = [...rows];
    const currentValue = newRows[rowIndex].values[0];
    newRows[rowIndex].values = newRows[rowIndex].values.map((value, idx) =>
      typeof value === "number" ? value + diff * idx : value
    );
    newRows[rowIndex].values[0] = currentValue + diff;

    if (newRows[rowIndex].key === "bodyLength") setBodyLength(currentValue + diff);
    if (newRows[rowIndex].key === "chestOffset") setChestOffset(currentValue + diff);
    if (newRows[rowIndex].key === "lowerWidthOffset") setLowerWidthOffset(currentValue + diff);
    if (newRows[rowIndex].key === "armLengthFactor") setArmLengthFactor(currentValue + diff);
    if (newRows[rowIndex].key === "shoulderOffset") setShoulderOffset(currentValue + diff);
    if (newRows[rowIndex].key === "topBodyHeight") setTopBodyHeight(currentValue + diff);
    if (newRows[rowIndex].key === "neckY") setNeckY(currentValue + diff);
    if (newRows[rowIndex].key === "neckXOffset") setNeckXOffset(currentValue + diff);

    setRows(newRows);
  };

  const handleIncrementRow = (rowIndex) => applyDiffToRow(rowIndex, 1);
  const handleDecrementRow = (rowIndex) => applyDiffToRow(rowIndex, -1);

  useEffect(() => {
    try {
      localStorage.setItem("sizeSpecRows", JSON.stringify(rows));
    } catch (e) {
      console.error("localStorage 저장 오류:", e);
    }
  }, [rows]);

  return (
    <div className="table-container">
      <ClothesTest
        neckY={neckY}
        setNeckY={setNeckY}
        neckXOffset={neckXOffset}
        setNeckXOffset={setNeckXOffset}
        shoulderOffset={shoulderOffset}
        setShoulderOffset={setShoulderOffset}
        chestOffset={chestOffset}
        setChestOffset={setChestOffset}
        bodyLength={bodyLength}
        setBodyLength={setBodyLength}
        armLengthFactor={armLengthFactor}
        setArmLengthFactor={setArmLengthFactor}
        upperWidthOffset={upperWidthOffset}
        setUpperWidthOffset={setUpperWidthOffset}
        lowerWidthOffset={lowerWidthOffset}
        setLowerWidthOffset={setLowerWidthOffset}
        topBodyHeight={topBodyHeight}
        setTopBodyHeight={setTopBodyHeight}
        resetValues={resetValues}
      />

      <table className="sizespec-table">
        <thead>
          <tr>
            <th style={{ width: "150px" }} colSpan={2}>
              (단위 : cm)
            </th>
            {sizes.map((size, index) => (
              <th
                key={index}
                onClick={() => handleCellClick(size.toLowerCase())}
                className={selectedSize === size.toLowerCase() ? "active" : ""}
                style={{ cursor: "pointer" }}
              >
                {size.toLowerCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={row.type}>
              <td className="category">{row.category}</td>
              <td>{row.label}</td>
              {row.colspan ? (
                <td colSpan={row.colspan} className="merged-cell">
                  {row.values[0]}
                </td>
              ) : (
                row.values.map((value, colIndex) => (
                  <td key={colIndex}>
                    {colIndex === 0 ? (
                      <input
                        type="text"
                        value={value}
                        onChange={(event) => handleInputChange(rowIndex, event)}
                        style={{ width: "30px" }}
                      />
                    ) : (
                      typeof value === "number" ? value.toFixed(1) : value
                    )}
                  </td>
                ))
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Sizespec;