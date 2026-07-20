import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import "./Sizespeccss.css";
import "./Sizespec.css";
// import { SizeController, SizeControllerRow } from "../../../../components"; // (필요시 주석 해제)
import ClothesTest from "./ClothesPants/ClothesTest";

const Sizespec = forwardRef(({ selectedSize, setSelectedSize, clothingType = () => {} }, ref) => {
  const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

  // ── 상의(top) 관련 state ──
  const [neckY, setNeckY] = useState(18);
  const [neckXOffset, setNeckXOffset] = useState(15);
  const [shoulderOffset, setShoulderOffset] = useState(38);
  const [chestOffset, setChestOffset] = useState(82);
  const [bodyLength, setBodyLength] = useState(67);
  const [armLengthFactor, setArmLengthFactor] = useState(20);
  const [upperWidthOffset, setUpperWidthOffset] = useState(0);
  const [lowerWidthOffset, setLowerWidthOffset] = useState(90);
  const [topBodyHeight, setTopBodyHeight] = useState(18);

  // ── 바지(pants) 관련 state ──
  const [pantsLength, setPantsLength] = useState(100);
  const [waistOffset, setWaistOffset] = useState(70);
  const [hipOffset, setHipOffset] = useState(95);
  const [thighOffset, setThighOffset] = useState(60);
  const [crotchLength, setCrotchLength] = useState(25);
  const [hemOffset, setHemOffset] = useState(35);

  const initialTopRows = [
    { category: "A", label: "총 기장", values: [65, 67, 69, 71, 73, 75, 77], type: "highlight", key: "bodyLength" },
    { category: "B", label: "가슴 단면", values: [82, 86, 90, 94, 98, 102, 106], type: "highlight", key: "chestOffset" },
    { category: "C", label: "밑단 단면", values: [90, 94, 98, 102, 106, 110, 114], type: "highlight", key: "lowerWidthOffset" },
    { category: "D", label: "소매 기장", values: [20, 21, 22, 23, 24, 25, 26], type: "highlight", key: "armLengthFactor" },
    { category: "E", label: "어깨 단면", values: [38, 40, 42, 44, 46, 48, 50], type: "normal", key: "shoulderOffset" },
    { category: "G", label: "암홀 (직선)", values: [18, 20, 22, 24, 26, 28, 30], type: "normal", key: "topBodyHeight" },
    { category: "J", label: "목 파임", values: [18, 19, 20, 21, 22, 23, 24], type: "normal", key: "neckY" },
    { category: "K", label: "목 너비", values: [15, 16, 17, 18, 19, 20, 21], type: "normal", key: "neckXOffset" },
  ];

  // 바지용 초기 행 데이터 (상의와 동일한 패턴, 실제 수치는 디자인 스펙에 맞게 조정 필요)
  const initialPantsRows = [
    { category: "A", label: "바지 기장", values: [95, 98, 100, 103, 106, 109, 112], type: "highlight", key: "pantsLength" },
    { category: "B", label: "허리 단면", values: [70, 73, 76, 79, 82, 85, 88], type: "highlight", key: "waistOffset" },
    { category: "C", label: "엉덩이 단면", values: [95, 98, 101, 104, 107, 110, 113], type: "highlight", key: "hipOffset" },
    { category: "D", label: "허벅지 단면", values: [60, 62, 64, 66, 68, 70, 72], type: "highlight", key: "thighOffset" },
    { category: "E", label: "밑위 길이", values: [25, 26, 27, 28, 29, 30, 31], type: "normal", key: "crotchLength" },
    { category: "F", label: "밑단 단면", values: [35, 36, 37, 38, 39, 40, 41], type: "normal", key: "hemOffset" },
  ];

  const [rows, setRows] = useState(initialTopRows);
  const [editable, setEditable] = useState({
    xs: true, s: false, m: false, l: false, xl: false, "2xl": false, "3xl": false,
  });

  const isPants = clothingType && clothingType.includes("바지");

  // 초기화 함수
  const resetValues = () => {
    // 상의
    setNeckY(18);
    setNeckXOffset(15);
    setShoulderOffset(38);
    setChestOffset(82);
    setBodyLength(67);
    setArmLengthFactor(20);
    setLowerWidthOffset(90);
    setTopBodyHeight(18);
    // 바지
    setPantsLength(100);
    setWaistOffset(70);
    setHipOffset(95);
    setThighOffset(60);
    setCrotchLength(25);
    setHemOffset(35);
  };

  useImperativeHandle(ref, () => ({
    triggerReset: () => {
      resetValues();
    }
  }));

  // 로컬 스토리지에서 데이터 불러오기 (상의/바지 종류에 따라 기본값 분기)
  useEffect(() => {
    if (selectedSize === null) {
      setEditable({ xs: true, s: false, m: false, l: false, xl: false, "2xl": false, "3xl": false });

      const savedRows = localStorage.getItem("sizeSpecRows");
      const defaultRows = isPants ? initialPantsRows : initialTopRows;

      if (savedRows) {
        try {
          setRows(JSON.parse(savedRows));
        } catch (e) {
          console.error("localStorage rows 파싱 오류:", e);
          setRows(defaultRows);
        }
      } else {
        setRows(defaultRows);
      }
    }
  }, [selectedSize, clothingType]);

  // 상태 변수가 변경되면 표에 반영
  useEffect(() => {
    const newRows = rows.map(row => {
      // 상의
      if (row.key === "bodyLength") return { ...row, values: [bodyLength, ...row.values.slice(1)] };
      if (row.key === "chestOffset") return { ...row, values: [chestOffset, ...row.values.slice(1)] };
      if (row.key === "lowerWidthOffset") return { ...row, values: [lowerWidthOffset, ...row.values.slice(1)] };
      if (row.key === "armLengthFactor") return { ...row, values: [armLengthFactor, ...row.values.slice(1)] };
      if (row.key === "shoulderOffset") return { ...row, values: [shoulderOffset, ...row.values.slice(1)] };
      if (row.key === "topBodyHeight") return { ...row, values: [topBodyHeight, ...row.values.slice(1)] };
      if (row.key === "neckY") return { ...row, values: [neckY, ...row.values.slice(1)] };
      if (row.key === "neckXOffset") return { ...row, values: [neckXOffset, ...row.values.slice(1)] };
      // 바지
      if (row.key === "pantsLength") return { ...row, values: [pantsLength, ...row.values.slice(1)] };
      if (row.key === "waistOffset") return { ...row, values: [waistOffset, ...row.values.slice(1)] };
      if (row.key === "hipOffset") return { ...row, values: [hipOffset, ...row.values.slice(1)] };
      if (row.key === "thighOffset") return { ...row, values: [thighOffset, ...row.values.slice(1)] };
      if (row.key === "crotchLength") return { ...row, values: [crotchLength, ...row.values.slice(1)] };
      if (row.key === "hemOffset") return { ...row, values: [hemOffset, ...row.values.slice(1)] };
      return row;
    });
    setRows(newRows);
  }, [
    bodyLength, chestOffset, lowerWidthOffset, armLengthFactor, shoulderOffset, topBodyHeight, neckY, neckXOffset,
    pantsLength, waistOffset, hipOffset, thighOffset, crotchLength, hemOffset,
  ]);

  // 상단 사이즈 클릭 핸들러
  const handleCellClick = (size) => {
    if (typeof setSelectedSize !== "function") return;
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
      // 상의
      if (row.key === "bodyLength") setBodyLength(value);
      if (row.key === "chestOffset") setChestOffset(value);
      if (row.key === "lowerWidthOffset") setLowerWidthOffset(value);
      if (row.key === "armLengthFactor") setArmLengthFactor(value);
      if (row.key === "shoulderOffset") setShoulderOffset(value);
      if (row.key === "topBodyHeight") setTopBodyHeight(value);
      if (row.key === "neckY") setNeckY(value);
      if (row.key === "neckXOffset") setNeckXOffset(value);
      // 바지
      if (row.key === "pantsLength") setPantsLength(value);
      if (row.key === "waistOffset") setWaistOffset(value);
      if (row.key === "hipOffset") setHipOffset(value);
      if (row.key === "thighOffset") setThighOffset(value);
      if (row.key === "crotchLength") setCrotchLength(value);
      if (row.key === "hemOffset") setHemOffset(value);
    });
  };

  // 표 직접 입력 핸들러
  const handleInputChange = (rowIndex, event) => {
    const newRows = [...rows];
    const newValue = event.target.value;
    const valueToUse = newValue.trim() === "" ? "0" : newValue;

    if (!isNaN(valueToUse)) {
      const numericValue = parseFloat(valueToUse);
      const diff = numericValue - rows[rowIndex].values[0];
      newRows[rowIndex].values = rows[rowIndex].values.map((value, index) => value + diff * index);
      newRows[rowIndex].values[0] = numericValue;

      const key = newRows[rowIndex].key;
      // 상의
      if (key === "bodyLength") setBodyLength(numericValue);
      if (key === "chestOffset") setChestOffset(numericValue);
      if (key === "lowerWidthOffset") setLowerWidthOffset(numericValue);
      if (key === "armLengthFactor") setArmLengthFactor(numericValue);
      if (key === "shoulderOffset") setShoulderOffset(numericValue);
      if (key === "topBodyHeight") setTopBodyHeight(numericValue);
      if (key === "neckY") setNeckY(numericValue);
      if (key === "neckXOffset") setNeckXOffset(numericValue);
      // 바지
      if (key === "pantsLength") setPantsLength(numericValue);
      if (key === "waistOffset") setWaistOffset(numericValue);
      if (key === "hipOffset") setHipOffset(numericValue);
      if (key === "thighOffset") setThighOffset(numericValue);
      if (key === "crotchLength") setCrotchLength(numericValue);
      if (key === "hemOffset") setHemOffset(numericValue);

      setRows(newRows);
    }
  };

  // 표 데이터가 변경될 때 로컬스토리지 저장
  useEffect(() => {
    try {
      localStorage.setItem("sizeSpecRows", JSON.stringify(rows));
    } catch (e) {
      console.error("localStorage 저장 오류:", e);
    }
  }, [rows]);

  return (
    <div className="table-container">
      <div id="capture-target" style={{ backgroundColor: "#ffffff", padding: "10px" }}>
        <ClothesTest
          clothingType={clothingType}
          neckY={neckY} setNeckY={setNeckY}
          neckXOffset={neckXOffset} setNeckXOffset={setNeckXOffset}
          shoulderOffset={shoulderOffset} setShoulderOffset={setShoulderOffset}
          chestOffset={chestOffset} setChestOffset={setChestOffset}
          bodyLength={bodyLength} setBodyLength={setBodyLength}
          armLengthFactor={armLengthFactor} setArmLengthFactor={setArmLengthFactor}
          upperWidthOffset={upperWidthOffset} setUpperWidthOffset={setUpperWidthOffset}
          lowerWidthOffset={lowerWidthOffset} setLowerWidthOffset={setLowerWidthOffset}
          topBodyHeight={topBodyHeight} setTopBodyHeight={setTopBodyHeight}
          pantsLength={pantsLength} setPantsLength={setPantsLength}
          waistOffset={waistOffset} setWaistOffset={setWaistOffset}
          hipOffset={hipOffset} setHipOffset={setHipOffset}
          thighOffset={thighOffset} setThighOffset={setThighOffset}
          crotchLength={crotchLength} setCrotchLength={setCrotchLength}
          hemOffset={hemOffset} setHemOffset={setHemOffset}
          resetValues={resetValues}
        />
      </div>

      <table className="sizespec-table">
        <thead>
          <tr>
            <th style={{ width: "150px" }} colSpan={2}>(단위 : cm)</th>
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
});

export default Sizespec;