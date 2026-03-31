// Sizespec.jsx
import React, { useState, useEffect } from "react";
import { SizeController,SizeControllerRow } from "../../../../components"; // 기존 SizeController (전체 컨트롤러)
import "./SizeBottom.css"
import PantsOutlineCanvas from "./ClothesPants/PantsCanvas";

function SizeBottom({ selectedSize, setSelectedSize }) {
  // 상단 헤더에 표시할 사이즈 배열
  const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

  // const [totalLength, setTotalLength] = useState(97);
  // const [waistCircumference, setWaistCircumference] = useState(72);
  // const [hipCircumference, setHipCircumference] = useState(88);
  // const [rise, setRise] = useState(26);
  // const [thighWidth, setThighWidth] = useState(27);
  // const [hemCircumference, setHemCircumference] = useState(34);

   const [waistWidth, setWaistWidth] = useState(72); // 허리단면
    const [rise, setRise] = useState(26);              // 밑위
    const [length, setLength] = useState(97);         // 총장
    const [thighWidth, setThighWidth] = useState(27);  // 허벅지단면
    const [hemWidth, setHemWidth] = useState(34);  


  // 초기 행 데이터 배열
  const initialRowsBottom = [
    { category: "A", label: "총길이", values: [97, 98, 99, 100, 102, 104, 106], type: "highlight" ,key: "length" },
    { category: "B", label: "허리단면", values: [72, 76, 80, 84, 88, 92, 96], type: "highlight" ,key: "waistWidth" },
    { category: "C", label: "밑위길이", values: [26, 27, 28, 29, 30, 31, 32], type: "highlight", key : "rise"},
    { category: "D", label: "허벅지단면", values: [27, 28, 30, 31, 33, 34, 46], type: "normal" ,key : "thighWidth"},
    { category: "E", label: "밑단단면", values: [34, 35, 36, 37, 38, 39, 40], type: "normal" ,key:"hemWidth"},

  ];

  // rows 상태: 입력값 변경 및 증감 기능을 위해 상태 관리
  const [rowsBottom, setRowsBottom] = useState(initialRowsBottom);

    const resetValues = () => {
    setLength(97);
    setWaistWidth(72);
    setRise(26);
    setThighWidth(27);
    setHemWidth(34);
  
  };
  
  useEffect(() => {
   setRowsBottom(rows =>
     rows.map(row => {
       switch (row.key) {
         case "length":
           return { ...row, values: [length, ...row.values.slice(1)] };
         case "waistWidth":
           return { ...row, values: [waistWidth, ...row.values.slice(1)] };
         case "rise":
           return { ...row, values: [rise, ...row.values.slice(1)] };
         case "thighWidth":
           return { ...row, values: [thighWidth, ...row.values.slice(1)] };
         case "hemWidth":
           return { ...row, values: [hemWidth, ...row.values.slice(1)] };
         default:
           return row;
       }
     })
   );
 }, [length, waistWidth, rise, thighWidth, hemWidth]);


  const [editable, setEditable] = useState({
    xs: true,
    s: false,
    m: false,
    l: false,
    xl: false,
    "2xl": false,
    "3xl": false,
  });

  useEffect(() => {
    // selectedSize가 null일 경우 editable 상태와 테이블 값 초기화
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
            // localStorage에서 rows 로드 또는 초기화
      const savedRows = localStorage.getItem("sizeSpecRowsBottom");
      if (savedRows) {
        try {
          setRowsBottom(JSON.parse(savedRows));
        } catch (e) {
          console.error("localStorage rows 파싱 오류:", e);
          setRowsBottom(initialRowsBottom);
        }
      } else {
        setRowsBottom(initialRowsBottom);
      }
    }
  }, [selectedSize]);

  // useEffect(() => {
  //   // selectedSize가 null일 경우 editable 상태와 테이블 값 초기화
  //   if (selectedSize === null) {
  //     setEditable({
  //       xs: true,
  //       s: false,
  //       m: false,
  //       l: false,
  //       xl: false,
  //       "2xl": false,
  //       "3xl": false,
  //     });
  //     // 테이블의 값도 초기화
  //     setRows(initialRows);
  //   }
  // }, [selectedSize]);

  const handleCellClick = (size) => {
  const idx = sizes.indexOf(size.toUpperCase());
  if (idx === -1) return;

  // 1) selectedSize 세팅 (소문자!)
  setSelectedSize(size.toLowerCase());

  // 2) canvas 상태 업데이트
  setLength(     rowsBottom[0].values[idx] );
  setWaistWidth( rowsBottom[1].values[idx] );
  setRise(       rowsBottom[2].values[idx] );
  setThighWidth( rowsBottom[3].values[idx] );
  setHemWidth(   rowsBottom[4].values[idx] );

  // 3) editable 상태 토글 (옵션)
  const newEditable = {};
  sizes.forEach(sz => newEditable[sz.toLowerCase()] = (sz === size));
  setEditable(newEditable);
};




  // 텍스트 입력 변경 처리 함수
  const handleInputChange = (rowIndex, event) => {
    const newRows = [...rowsBottom];
    const newValue = event.target.value;

    const valueToUse = newValue.trim() === '' ? '0' : newValue;

    // 값이 숫자일 경우만 처리
    if (!isNaN(valueToUse)) {
      const numericValue = parseFloat(valueToUse);
      const diff = numericValue - rowsBottom[rowIndex].values[0];
      newRows[rowIndex].values = rowsBottom[rowIndex].values.map((value, index) => value + diff * index);
      newRows[rowIndex].values[0] = numericValue; // 첫 번째 값만 변경

      // 해당 행의 key에 따라 상태 업데이트+     // 2) 부모 state (캔버스) 동기화
     const key = rowsBottom[rowIndex].key;
     if (key === "length")      setLength(numericValue);
     if (key === "waistWidth")  setWaistWidth(numericValue);
     if (key === "rise")        setRise(numericValue);
     if (key === "thighWidth")  setThighWidth(numericValue);
     if (key === "hemWidth")    setHemWidth(numericValue);      

      setRowsBottom(newRows);
    } else {
      event.preventDefault();
    }
  };

  // 특정 행(rowIndex)의 첫번째 값을 증감하는 로직
  const applyDiffToRow = (rowIndex, diff) => {
    const newRows = [...rowsBottom];
    const currentValue = newRows[rowIndex].values[0];
    newRows[rowIndex].values = newRows[rowIndex].values.map((value, idx) =>
      typeof value === "number" ? value + diff * idx : value
    );
    newRows[rowIndex].values[0] = currentValue + diff;

    if (newRows[rowIndex].key === "length")    setLength(currentValue + diff);
    if (newRows[rowIndex].key === "waistWidth") setWaistWidth(currentValue + diff);
    if (newRows[rowIndex].key === "rise")       setRise(currentValue + diff);
    if (newRows[rowIndex].key === "thighWidth") setThighWidth(currentValue + diff);
    if (newRows[rowIndex].key === "hemWidth")   setHemWidth(currentValue + diff);


    setRowsBottom(newRows);
  };

  const handleIncrementRow = (rowIndex) => {
    applyDiffToRow(rowIndex, 1);
  };

  const handleDecrementRow = (rowIndex) => {
    applyDiffToRow(rowIndex, -1);
  };

  // "총 기장" 행의 인덱스 찾기
  const totalLengthIndex = rowsBottom.findIndex((row) => row.category === "A");

    // rows가 변경될 때 localStorage에 저장
  useEffect(() => {
    try {
      localStorage.setItem("sizeSpecRowsBottom", JSON.stringify(rowsBottom));
    } catch (e) {
      console.error("localStorage 저장 오류:", e);
    }
  }, [rowsBottom]);


  return (
    <div style={{justifyContent : "center"}} className="table-container2">
      

    <PantsOutlineCanvas
          waistWidth={waistWidth}
          setWaistWidth={setWaistWidth}
          rise={rise}
          setRise={setRise}
          length={length}
          setLength={setLength}
          thighWidth={thighWidth}
          setThighWidth={setThighWidth}
          hemWidth={hemWidth}
          setHemWidth={setHemWidth}
          resetValues={resetValues}
        />



      

      {/* 사이즈 스펙 테이블 */}
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

      {/* SizeController를 별도로 사용하지 않고, "총 기장" 컨트롤러는 위에서 따로 관리 */}
    </div>
  );
}

export default SizeBottom;