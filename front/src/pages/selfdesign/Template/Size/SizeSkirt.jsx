import React, { useState, useEffect } from "react";
import "./SizeBottom.css"; // 기존 바지 CSS를 그대로 재사용
import ClothesTest from "./ClothesPants/ClothesTest"; 

function SizeSkirt({ selectedSize, setSelectedSize, actionRef, clothingType}) {
  const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

  // 1. 스커트용 상태 변수
  const [waistOffset, setWaistOffset] = useState(35); // 허리 단면
  const [lowerWidthOffset, setLowerWidthOffset] = useState(50); // 밑단 단면
  const [bodyLength, setBodyLength] = useState(45); // 총 기장

  // 2. 스커트용 표 데이터
  const initialRowsSkirt = [
    { category: "A", label: "총 기장", values: [40, 42, 45, 47, 50, 52, 55], type: "highlight", key: "bodyLength" },
    { category: "B", label: "허리 단면", values: [31, 33, 35, 37, 39, 41, 43], type: "highlight", key: "waistOffset" },
    { category: "C", label: "밑단 단면", values: [45, 47, 50, 52, 55, 57, 60], type: "normal", key: "lowerWidthOffset" },
  ];

  const [rowsSkirt, setRowsSkirt] = useState(initialRowsSkirt);
  
  const resetValues = () => {
    setBodyLength(45);
    setWaistOffset(35);
    setLowerWidthOffset(50);
  };

  useEffect(() => {
    if (actionRef) {
      actionRef.current = { triggerReset: resetValues };
    }
  }, [actionRef]);

  // 변수 변경 시 표 데이터 동기화
  useEffect(() => {
    setRowsSkirt(prevRows => prevRows.map(row => {
      if (row.key === "bodyLength") return { ...row, values: [bodyLength, ...row.values.slice(1)] };
      if (row.key === "waistOffset") return { ...row, values: [waistOffset, ...row.values.slice(1)] };
      if (row.key === "lowerWidthOffset") return { ...row, values: [lowerWidthOffset, ...row.values.slice(1)] };
      return row;
    }));
  }, [bodyLength, waistOffset, lowerWidthOffset]);

  // 로컬 스토리지 불러오기
  useEffect(() => {
    if (selectedSize === null) {
      const savedRows = localStorage.getItem("sizeSpecRowsSkirt");
      if (savedRows) {
        try { setRowsSkirt(JSON.parse(savedRows)); } 
        catch (e) { setRowsSkirt(initialRowsSkirt); }
      } else {
        setRowsSkirt(initialRowsSkirt);
      }
    }
  }, [selectedSize]);

  const handleCellClick = (size) => {
    const idx = sizes.indexOf(size.toUpperCase());
    if (idx === -1) return;
    setSelectedSize(size.toLowerCase());

    rowsSkirt.forEach(row => {
      const val = row.values[idx];
      if (row.key === "bodyLength") setBodyLength(val);
      if (row.key === "waistOffset") setWaistOffset(val);
      if (row.key === "lowerWidthOffset") setLowerWidthOffset(val);
    });
  };

  const handleInputChange = (rowIndex, event) => {
    const newRows = [...rowsSkirt];
    const val = parseFloat(event.target.value);
    if (!isNaN(val)) {
      newRows[rowIndex].values[0] = val;
      const key = newRows[rowIndex].key;
      if (key === "bodyLength") setBodyLength(val);
      if (key === "waistOffset") setWaistOffset(val);
      if (key === "lowerWidthOffset") setLowerWidthOffset(val);
      setRowsSkirt(newRows);
    }
  };

  useEffect(() => {
    localStorage.setItem("sizeSpecRowsSkirt", JSON.stringify(rowsSkirt));
  }, [rowsSkirt]);

  return (
    <div style={{justifyContent: "center"}} className="table-container2">
      <div id="capture-target" style={{ backgroundColor: "#ffffff", padding: "10px" }}>
        <ClothesTest
          clothingType={clothingType || "스커트"}
          bodyLength={bodyLength}
          setBodyLength={setBodyLength}
          waistOffset={waistOffset}
          setWaistOffset={setWaistOffset}
          lowerWidthOffset={lowerWidthOffset}
          setLowerWidthOffset={setLowerWidthOffset}
          resetValues={resetValues}
        />
      </div>

      <div className="size-right-section">
        <table className="sizespec-table">
          <thead>
            <tr>
              <th colSpan={2}>(단위: cm)</th>
              {sizes.map(sz => (
                <th key={sz} onClick={() => handleCellClick(sz)} className={selectedSize === sz.toLowerCase() ? "active" : ""} style={{ cursor: "pointer" }}>
                  {sz.toLowerCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowsSkirt.map((row, rowIndex) => (
              <tr key={rowIndex} className={row.type}>
                <td className="category">{row.category}</td>
                <td>{row.label}</td>
                {row.values.map((value, colIndex) => (
                  <td key={colIndex}>
                    {colIndex === 0 ? (
                      <input type="text" value={value} onChange={(e) => handleInputChange(rowIndex, e)} style={{ width: "30px" }} />
                    ) : (
                      typeof value === "number" ? value.toFixed(1) : value
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SizeSkirt;