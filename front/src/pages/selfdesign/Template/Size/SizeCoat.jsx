import React, { useState, useEffect } from "react";
import "./SizeBottom.css";
import ClothesTest from "./ClothesPants/ClothesTest"; 

function SizeCoat({ selectedSize, setSelectedSize, actionRef, clothingType }) {
  const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

  const [bodyLength, setBodyLength] = useState(101);         // 총 기장
  const [shoulderOffset, setShoulderOffset] = useState(42);  // 어깨 단면
  const [chestOffset, setChestOffset] = useState(110);       // 가슴 단면
  const [lowerWidthOffset, setLowerWidthOffset] = useState(120); // 밑단 단면
  const [armLengthFactor, setArmLengthFactor] = useState(22); // 소매 기장
  const [topBodyHeight, setTopBodyHeight] = useState(24);    // 암홀
  const [neckY, setNeckY] = useState(18);                    // 목 파임
  const [neckXOffset, setNeckXOffset] = useState(15);        // 목 너비

  const initialRowsCoat = [
    { category: "A", label: "총 기장", values: [95, 98, 101, 104, 107, 110, 113], type: "highlight", key: "bodyLength" },
    { category: "B", label: "어깨 단면", values: [38, 40, 42, 44, 46, 48, 50], type: "highlight", key: "shoulderOffset" },
    { category: "C", label: "가슴 단면", values: [102, 106, 110, 114, 118, 122, 126], type: "highlight", key: "chestOffset" },
    { category: "D", label: "밑단 단면", values: [112, 116, 120, 124, 128, 132, 136], type: "normal", key: "lowerWidthOffset" },
    { category: "E", label: "소매 기장", values: [20, 21, 22, 23, 24, 25, 26], type: "normal", key: "armLengthFactor" },
    { category: "F", label: "암홀 (직선)", values: [22, 23, 24, 25, 26, 27, 28], type: "normal", key: "topBodyHeight" },
    { category: "G", label: "목 파임", values: [17, 17.5, 18, 18.5, 19, 19.5, 20], type: "normal", key: "neckY" },
    { category: "H", label: "목 너비", values: [14, 14.5, 15, 15.5, 16, 16.5, 17], type: "normal", key: "neckXOffset" },
  ];

  const [rowsCoat, setRowsCoat] = useState(initialRowsCoat);
  const [editable, setEditable] = useState({
    xs: true, s: false, m: false, l: false, xl: false, "2xl": false, "3xl": false,
  });

  const resetValues = () => {
    setBodyLength(101);
    setShoulderOffset(42);
    setChestOffset(110);
    setLowerWidthOffset(120);
    setArmLengthFactor(22);
    setTopBodyHeight(24);
    setNeckY(18);
    setNeckXOffset(15);
  };

  useEffect(() => {
    if (actionRef) {
      actionRef.current = { triggerReset: resetValues };
    }
  }, [actionRef]);

  // 상태 변수가 바뀌면 표에 반영
  useEffect(() => {
    setRowsCoat(prevRows => prevRows.map(row => {
      if (row.key === "bodyLength") return { ...row, values: [bodyLength, ...row.values.slice(1)] };
      if (row.key === "shoulderOffset") return { ...row, values: [shoulderOffset, ...row.values.slice(1)] };
      if (row.key === "chestOffset") return { ...row, values: [chestOffset, ...row.values.slice(1)] };
      if (row.key === "lowerWidthOffset") return { ...row, values: [lowerWidthOffset, ...row.values.slice(1)] };
      if (row.key === "armLengthFactor") return { ...row, values: [armLengthFactor, ...row.values.slice(1)] };
      if (row.key === "topBodyHeight") return { ...row, values: [topBodyHeight, ...row.values.slice(1)] };
      if (row.key === "neckY") return { ...row, values: [neckY, ...row.values.slice(1)] };
      if (row.key === "neckXOffset") return { ...row, values: [neckXOffset, ...row.values.slice(1)] };
      return row;
    }));
  }, [bodyLength, shoulderOffset, chestOffset, lowerWidthOffset, armLengthFactor, topBodyHeight, neckY, neckXOffset]);

  // 로컬 스토리지에서 표 데이터 불러오기
  useEffect(() => {
    if (selectedSize === null) {
      setEditable({ xs: true, s: false, m: false, l: false, xl: false, "2xl": false, "3xl": false });
      const savedRows = localStorage.getItem("sizeSpecRowsCoat");
      if (savedRows) {
        try { setRowsCoat(JSON.parse(savedRows)); } 
        catch (e) { setRowsCoat(initialRowsCoat); }
      } else {
        setRowsCoat(initialRowsCoat);
      }
    }
  }, [selectedSize]);

  // 상단 사이즈 클릭 시 캔버스 연동
  const handleCellClick = (size) => {
    const idx = sizes.indexOf(size.toUpperCase());
    if (idx === -1) return;

    setSelectedSize(size.toLowerCase());

    const newEditable = {};
    sizes.forEach(sz => newEditable[sz.toLowerCase()] = (sz === size));
    setEditable(newEditable);

    rowsCoat.forEach(row => {
      const val = row.values[idx];
      if (row.key === "bodyLength") setBodyLength(val);
      if (row.key === "shoulderOffset") setShoulderOffset(val);
      if (row.key === "chestOffset") setChestOffset(val);
      if (row.key === "lowerWidthOffset") setLowerWidthOffset(val);
      if (row.key === "armLengthFactor") setArmLengthFactor(val);
      if (row.key === "topBodyHeight") setTopBodyHeight(val);
      if (row.key === "neckY") setNeckY(val);
      if (row.key === "neckXOffset") setNeckXOffset(val);
    });
  };

  const handleInputChange = (rowIndex, event) => {
    const newRows = [...rowsCoat];
    const newValue = event.target.value;
    const valueToUse = newValue.trim() === '' ? '0' : newValue;

    if (!isNaN(valueToUse)) {
      const numericValue = parseFloat(valueToUse);
      const diff = numericValue - rowsCoat[rowIndex].values[0];
      newRows[rowIndex].values = rowsCoat[rowIndex].values.map((v, i) => v + diff * i);
      newRows[rowIndex].values[0] = numericValue;

      const key = newRows[rowIndex].key;
      if (key === "bodyLength") setBodyLength(numericValue);
      if (key === "shoulderOffset") setShoulderOffset(numericValue);
      if (key === "chestOffset") setChestOffset(numericValue);
      if (key === "lowerWidthOffset") setLowerWidthOffset(numericValue);
      if (key === "armLengthFactor") setArmLengthFactor(numericValue);
      if (key === "topBodyHeight") setTopBodyHeight(numericValue);
      if (key === "neckY") setNeckY(numericValue);
      if (key === "neckXOffset") setNeckXOffset(numericValue);

      setRowsCoat(newRows);
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem("sizeSpecRowsCoat", JSON.stringify(rowsCoat));
    } catch (e) {
      console.error("localStorage 저장 오류:", e);
    }
  }, [rowsCoat]);

  return (
    <div style={{justifyContent : "center"}} className="table-container2">
      <div id="capture-target" style={{ backgroundColor: "#ffffff", padding: "10px" }}>
        <ClothesTest
          clothingType={clothingType || "아우터"}
          bodyLength={bodyLength} setBodyLength={setBodyLength}
          shoulderOffset={shoulderOffset} setShoulderOffset={setShoulderOffset}
          chestOffset={chestOffset} setChestOffset={setChestOffset}
          lowerWidthOffset={lowerWidthOffset} setLowerWidthOffset={setLowerWidthOffset}
          armLengthFactor={armLengthFactor} setArmLengthFactor={setArmLengthFactor}
          topBodyHeight={topBodyHeight} setTopBodyHeight={setTopBodyHeight}
          neckY={neckY} setNeckY={setNeckY}
          neckXOffset={neckXOffset} setNeckXOffset={setNeckXOffset}
          resetValues={resetValues}
        />
      </div>

      <div className="size-right-section">
        <table className="sizespec-table">
          <thead>
            <tr>
              <th colSpan={2}>(단위: cm)</th>
              {sizes.map(sz => (
                <th
                  key={sz}
                  onClick={() => handleCellClick(sz)}
                  className={selectedSize === sz.toLowerCase() ? "active" : ""}
                  style={{ cursor: "pointer" }}
                >
                  {sz.toLowerCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowsCoat.map((row, rowIndex) => (
              <tr key={rowIndex} className={row.type}>
                <td className="category">{row.category}</td>
                <td>{row.label}</td>
                {row.colspan ? (
                  <td colSpan={row.colspan} className="merged-cell">{row.values[0]}</td>
                ) : (
                  row.values.map((value, colIndex) => (
                    <td key={colIndex}>
                      {colIndex === 0 ? (
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => handleInputChange(rowIndex, e)}
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
    </div>
  );
}

export default SizeCoat;