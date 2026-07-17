import React, { useState, useEffect } from "react";
import "./SizeBottom.css";
import ClothesTest from "./ClothesPants/ClothesTest"; 

function SizeDress({ selectedSize, setSelectedSize, actionRef, clothingType }) {
  const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

  const [neckY, setNeckY] = useState(18);
  const [neckXOffset, setNeckXOffset] = useState(15);
  const [bodyLength, setBodyLength] = useState(85);         // 총 기장
  const [shoulderOffset, setShoulderOffset] = useState(38); // 어깨 단면
  const [chestOffset, setChestOffset] = useState(90);       // 가슴 단면
  const [waistWidth, setWaistWidth] = useState(55);         // 허리 단면 
  const [lowerWidthOffset, setLowerWidthOffset] = useState(110); // 밑단 단면 
  const [armLengthFactor, setArmLengthFactor] = useState(18); // 소매 기장 
  const [topBodyHeight, setTopBodyHeight] = useState(20);   // 암홀

  const initialRowsDress = [
    { category: "A", label: "총 기장", values: [81, 83, 85, 87, 89, 91, 93], type: "highlight", key: "bodyLength" },
    { category: "B", label: "어깨 단면", values: [34, 36, 38, 40, 42, 44, 46], type: "highlight", key: "shoulderOffset" },
    { category: "C", label: "가슴 단면", values: [82, 86, 90, 94, 98, 102, 106], type: "highlight", key: "chestOffset" },
    { category: "D", label: "허리 단면", values: [55, 59, 63, 67, 71, 75, 79], type: "normal", key: "waistWidth" },
    { category: "E", label: "밑단 단면", values: [102, 106, 110, 114, 118, 122, 126], type: "normal", key: "lowerWidthOffset" },
    { category: "F", label: "소매 기장", values: [18, 19, 20, 21, 22, 23, 24], type: "normal", key: "armLengthFactor" },
    { category: "F", label: "암홀 (직선)", values: [20, 21, 22, 23, 24, 25, 26], type: "normal", key: "topBodyHeight" },
    { category: "H", label: "목 파임", values: [18, 18.5, 19, 19.5, 20, 20.5, 21], type: "normal", key: "neckY" },
    { category: "I", label: "목 너비", values: [15, 16, 17, 18, 19, 20, 21], type: "normal", key: "neckXOffset" },
  ];

  const [rowsDress, setRowsDress] = useState(initialRowsDress);
  const [editable, setEditable] = useState({
    xs: true, s: false, m: false, l: false, xl: false, "2xl": false, "3xl": false,
  });

  const resetValues = () => {
    setNeckY(18);
    setNeckXOffset(15);
    setBodyLength(85);
    setShoulderOffset(38);
    setChestOffset(90);
    setWaistWidth(55);
    setLowerWidthOffset(110);
    setArmLengthFactor(18);
    setTopBodyHeight(20);
  };

  useEffect(() => {
    if (actionRef) {
      actionRef.current = { triggerReset: resetValues };
    }
  }, [actionRef]);

  // 상태 변수가 바뀌면 표에 반영
  useEffect(() => {
    setRowsDress(prevRows => prevRows.map(row => {
      if (row.key === "bodyLength") return { ...row, values: [bodyLength, ...row.values.slice(1)] };
      if (row.key === "shoulderOffset") return { ...row, values: [shoulderOffset, ...row.values.slice(1)] };
      if (row.key === "chestOffset") return { ...row, values: [chestOffset, ...row.values.slice(1)] };
      if (row.key === "waistWidth") return { ...row, values: [waistWidth, ...row.values.slice(1)] };
      if (row.key === "lowerWidthOffset") return { ...row, values: [lowerWidthOffset, ...row.values.slice(1)] };
      if (row.key === "armLengthFactor") return { ...row, values: [armLengthFactor, ...row.values.slice(1)] };
      if (row.key === "topBodyHeight") return { ...row, values: [topBodyHeight, ...row.values.slice(1)] };
      if (row.key === "neckY") return { ...row, values: [neckY, ...row.values.slice(1)] };
      if (row.key === "neckXOffset") return { ...row, values: [neckXOffset, ...row.values.slice(1)] };
      return row;
    }));
  }, [bodyLength, shoulderOffset, chestOffset, waistWidth, lowerWidthOffset, armLengthFactor, topBodyHeight]);

  // 로컬 스토리지에서 표 데이터 불러오기
  useEffect(() => {
    if (selectedSize === null) {
      setEditable({ xs: true, s: false, m: false, l: false, xl: false, "2xl": false, "3xl": false });
      const savedRows = localStorage.getItem("sizeSpecRowsDress");
      if (savedRows) {
        try { setRowsDress(JSON.parse(savedRows)); } 
        catch (e) { setRowsDress(initialRowsDress); }
      } else {
        setRowsDress(initialRowsDress);
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

    rowsDress.forEach(row => {
      const val = row.values[idx];
      if (row.key === "bodyLength") setBodyLength(val);
      if (row.key === "shoulderOffset") setShoulderOffset(val);
      if (row.key === "chestOffset") setChestOffset(val);
      if (row.key === "waistWidth") setWaistWidth(val);
      if (row.key === "lowerWidthOffset") setLowerWidthOffset(val);
      if (row.key === "armLengthFactor") setArmLengthFactor(val);
      if (row.key === "topBodyHeight") setTopBodyHeight(val);
      if (row.key === "neckY") setNeckY(val);
      if (row.key === "neckXOffset") setNeckXOffset(val);
    });
  };

  // 인풋박스 직접 입력 시 연동
  const handleInputChange = (rowIndex, event) => {
    const newRows = [...rowsDress];
    const newValue = event.target.value;
    const valueToUse = newValue.trim() === '' ? '0' : newValue;

    if (!isNaN(valueToUse)) {
      const numericValue = parseFloat(valueToUse);
      const diff = numericValue - rowsDress[rowIndex].values[0];
      newRows[rowIndex].values = rowsDress[rowIndex].values.map((v, i) => v + diff * i);
      newRows[rowIndex].values[0] = numericValue;

      const key = newRows[rowIndex].key;
      if (key === "bodyLength") setBodyLength(numericValue);
      if (key === "shoulderOffset") setShoulderOffset(numericValue);
      if (key === "chestOffset") setChestOffset(numericValue);
      if (key === "waistWidth") setWaistWidth(numericValue);
      if (key === "lowerWidthOffset") setLowerWidthOffset(numericValue);
      if (key === "armLengthFactor") setArmLengthFactor(numericValue);
      if (key === "topBodyHeight") setTopBodyHeight(numericValue);
      if (key === "neckY") setNeckY(numericValue);
      if (key === "neckXOffset") setNeckXOffset(numericValue);

      setRowsDress(newRows);
    }
  };

  // 표 내용 로컬 스토리지에 자동 저장
  useEffect(() => {
    try {
      localStorage.setItem("sizeSpecRowsDress", JSON.stringify(rowsDress));
    } catch (e) {
      console.error("localStorage 저장 오류:", e);
    }
  }, [rowsDress]);

  return (
    <div style={{justifyContent : "center"}} className="table-container2">
      <div id="capture-target" style={{ backgroundColor: "#ffffff", padding: "10px" }}>
        <ClothesTest
          clothingType={clothingType || "원피스"}
          neckY={neckY} setNeckY={setNeckY}
          neckXOffset={neckXOffset} setNeckXOffset={setNeckXOffset}
          bodyLength={bodyLength} setBodyLength={setBodyLength}
          shoulderOffset={shoulderOffset} setShoulderOffset={setShoulderOffset}
          chestOffset={chestOffset} setChestOffset={setChestOffset}
          waistWidth={waistWidth} setWaistWidth={setWaistWidth}
          lowerWidthOffset={lowerWidthOffset} setLowerWidthOffset={setLowerWidthOffset}
          armLengthFactor={armLengthFactor} setArmLengthFactor={setArmLengthFactor}
          topBodyHeight={topBodyHeight} setTopBodyHeight={setTopBodyHeight}
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
            {rowsDress.map((row, rowIndex) => (
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

export default SizeDress;