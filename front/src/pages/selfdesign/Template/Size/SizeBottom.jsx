import React, { useState, useEffect } from "react";
import "./SizeBottom.css";
import ClothesTest from "./ClothesPants/ClothesTest"; 

function SizeBottom({ selectedSize, setSelectedSize, actionRef }) {
  const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

  const [pantsLength, setPantsLength] = useState(95);
  const [waistOffset, setWaistOffset] = useState(35);
  const [hipOffset, setHipOffset] = useState(45); // 엉덩이 단면 추가!
  const [thighOffset, setThighOffset] = useState(28);
  const [crotchLength, setCrotchLength] = useState(25);
  const [hemOffset, setHemOffset] = useState(20);

  const initialRowsBottom = [
    { category: "A", label: "총 기장", values: [91, 93, 95, 97, 99, 101, 103], type: "highlight", key: "pantsLength" },
    { category: "B", label: "허리 단면", values: [31, 33, 35, 37, 39, 41, 43], type: "highlight", key: "waistOffset" },
    { category: "C", label: "엉덩이 단면", values: [41, 43, 45, 47, 49, 51, 53], type: "highlight", key: "hipOffset" },
    { category: "D", label: "허벅지 단면", values: [24, 26, 28, 30, 32, 34, 36], type: "normal", key: "thighOffset" },
    { category: "E", label: "밑위 길이", values: [23, 24, 25, 26, 27, 28, 29], type: "normal", key: "crotchLength" },
    { category: "F", label: "밑단 단면", values: [18, 19, 20, 21, 22, 23, 24], type: "normal", key: "hemOffset" },
  ];

  const [rowsBottom, setRowsBottom] = useState(initialRowsBottom);
  const [editable, setEditable] = useState({
    xs: true, s: false, m: false, l: false, xl: false, "2xl": false, "3xl": false,
  });

  const resetValues = () => {
    setPantsLength(95);
    setWaistOffset(35);
    setHipOffset(45);
    setThighOffset(28);
    setCrotchLength(25);
    setHemOffset(20);
  };

  useEffect(() => {
    if (actionRef) {
      actionRef.current = { triggerReset: resetValues };
    }
  }, [actionRef]);

  // 상태 변수가 바뀌면 표에 반영
  useEffect(() => {
    setRowsBottom(prevRows => prevRows.map(row => {
      if (row.key === "pantsLength") return { ...row, values: [pantsLength, ...row.values.slice(1)] };
      if (row.key === "waistOffset") return { ...row, values: [waistOffset, ...row.values.slice(1)] };
      if (row.key === "hipOffset") return { ...row, values: [hipOffset, ...row.values.slice(1)] };
      if (row.key === "thighOffset") return { ...row, values: [thighOffset, ...row.values.slice(1)] };
      if (row.key === "crotchLength") return { ...row, values: [crotchLength, ...row.values.slice(1)] };
      if (row.key === "hemOffset") return { ...row, values: [hemOffset, ...row.values.slice(1)] };
      return row;
    }));
  }, [pantsLength, waistOffset, hipOffset, thighOffset, crotchLength, hemOffset]);

  // 로컬 스토리지에서 표 데이터 불러오기
  useEffect(() => {
    if (selectedSize === null) {
      setEditable({ xs: true, s: false, m: false, l: false, xl: false, "2xl": false, "3xl": false });
      const savedRows = localStorage.getItem("sizeSpecRowsBottom");
      if (savedRows) {
        try { setRowsBottom(JSON.parse(savedRows)); } 
        catch (e) { setRowsBottom(initialRowsBottom); }
      } else {
        setRowsBottom(initialRowsBottom);
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

    rowsBottom.forEach(row => {
      const val = row.values[idx];
      if (row.key === "pantsLength") setPantsLength(val);
      if (row.key === "waistOffset") setWaistOffset(val);
      if (row.key === "hipOffset") setHipOffset(val);
      if (row.key === "thighOffset") setThighOffset(val);
      if (row.key === "crotchLength") setCrotchLength(val);
      if (row.key === "hemOffset") setHemOffset(val);
    });
  };

  // 인풋박스 직접 입력 시 연동
  const handleInputChange = (rowIndex, event) => {
    const newRows = [...rowsBottom];
    const newValue = event.target.value;
    const valueToUse = newValue.trim() === '' ? '0' : newValue;

    if (!isNaN(valueToUse)) {
      const numericValue = parseFloat(valueToUse);
      const diff = numericValue - rowsBottom[rowIndex].values[0];
      newRows[rowIndex].values = rowsBottom[rowIndex].values.map((v, i) => v + diff * i);
      newRows[rowIndex].values[0] = numericValue;

      const key = newRows[rowIndex].key;
      if (key === "pantsLength") setPantsLength(numericValue);
      if (key === "waistOffset") setWaistOffset(numericValue);
      if (key === "hipOffset") setHipOffset(numericValue);
      if (key === "thighOffset") setThighOffset(numericValue);
      if (key === "crotchLength") setCrotchLength(numericValue);
      if (key === "hemOffset") setHemOffset(numericValue);

      setRowsBottom(newRows);
    }
  };

  // 표 내용 로컬 스토리지에 자동 저장
  useEffect(() => {
    try {
      localStorage.setItem("sizeSpecRowsBottom", JSON.stringify(rowsBottom));
    } catch (e) {
      console.error("localStorage 저장 오류:", e);
    }
  }, [rowsBottom]);

  return (
    <div style={{justifyContent : "center"}} className="table-container2">
      
      <ClothesTest
        clothingType="바지"
        pantsLength={pantsLength} setPantsLength={setPantsLength}
        waistOffset={waistOffset} setWaistOffset={setWaistOffset}
        hipOffset={hipOffset} setHipOffset={setHipOffset}
        thighOffset={thighOffset} setThighOffset={setThighOffset}
        crotchLength={crotchLength} setCrotchLength={setCrotchLength}
        hemOffset={hemOffset} setHemOffset={setHemOffset}
        resetValues={resetValues}
      />

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
            {rowsBottom.map((row, rowIndex) => (
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

export default SizeBottom;