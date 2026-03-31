contract 폴더
  - 의뢰인 계약관리 폴더
  - 주소: http://localhost:3000/client/contract
  - src\components\contract
      -ContractItem 폴더: 단일 계약항목 관련
      -ContractList 폴더: 계약서들 리스트
      -ContractSearchAndFilter 폴더: 검색과 필터 관련
      -ContractSidebar 폴더: 사이드바 컴포넌트
  - src\pages\contract
      -전체계약, 중요, 계약서 상세 관련 
  - src\layouts\ContractLayout.jsx => 계약관리 레이아웃
DesignerContract
  - 디자이너 계약서 관리 관련 폴더
  - 주소: http://localhost:3000/designer/DesignerContractManage
  - src\components\DesignerContract
      -DesignerContractList 폴더: 디자이너 계약서들의 리스트
      -DesignerContractSearchAndFilter 폴더: 검색과 필터 관련
      -DesignerContractSidebar 폴더: 사이드바
      -DesignerContractSortAndCreate 폴더: 정렬과 상태에 해당하는 컴포넌트
  - src\pages\DesignerContract
     -디자이너쪽 계약서 관리의 해당하는 컴포넌트를 아우르는 파일
DesignerContractCreate
  - 디자이너 계약서 작성 관련 폴더
  - 주소: http://localhost:3000/designer/DesignerContractCreate
  - src\components\DesignerContractCreate
      -  DesignerContractInputSection.jsx => 계약서에서 입력 관련 컴포넌트
      -  DesignerContractFileUpload.jsx => 파일업로드 관련 컴포넌트
      -  DesignerContractEditor.jsx => 텍스트편집기 관련 컴포넌트
      -  DesignerContractCreate.module.css => 디자이너-계약관리-계약서 작성에서만 사용하는 css파일
  - src\pages\DesignerContractCreate
      -DesignerContractCreatePage.jsx => 계약서 작성 관련 컴포넌트를 아우르는 페이지 파일 


src/pages/contract
1.ContractDetailPage.jsx => 계약관리 누르면 보이는 상세 페이지
2.ContractSendMessagePage.jsx => 보낸 메시지 목록 보는 페이지 
3,MessageDetailPage.jsx => 메시지 누르면 보이는 상세페이지

src/pages/contract/Message
1.Message.jsx => 계약 메시지 컴포넌트
1.Message.css
2.MessageHeader.jsx => 메세지 헤더 컴포넌트
2.MessageHeader.css
3.MessageList.jsx => 메세지 보이는 리스트 컴포넌트
3.MessageList.css

src/pages/contract/DetailUI
1.DetailList.jsx => 계약관리 상세 리스트 컴포넌트
1.DetailList.css


*05.13.화요일*
1. 의뢰인, 디자이너 메인페이지 ui 수정(이미지나 글귀들 추가)
2. 메뉴바 폰트크기 조절
3. 직접의류디자인(템플릿, 파일업로드, 브랜드) 이미지 필요한 부분의 이미지 집어넣음
  -원단선택: 원단선택하고 넘어갈때 팝업에 선택한 원단이 뜨지 않음(수정필요)
  -최종확인: 교수님이 말씀하신 이미지나 내용 채워야하는거는 추가 진행 필요
  -파일업로드: 이미지 크기가 크면 비율 그대로 작아지게 만들어야함(수정필요)
4. 단위 고정단위인 px에서 rem으로 단위 바꾸는 중

*05.19.월요일*
1. pages\selfdesign\Template\Fabric\Fabric.jsx 
   -Fabric.jsx 파일에 원단 색상 선택할 수 있는 부분 옆에다가 혼합률 선택 가능한 기능 추가함.
2. pages\selfdesign\Template\FinalConfirmation\FinalConfirmation.jsx
   -FinalConfirmation.jsx 파일에 앞서서 선택한 옷 카테고리, 원단(이미지/이름/혼합률/색상), 사이즈, 메모란 추가하며 ui 수정함.
  -selectedFabric: 선택한 원단 목록
  -selectedColors: 각 원단의 색상 값 (Hex 코드)
  -selectedRatios: 각 원단의 혼합률 (숫자값)
3. pages\DesignerContractCreatePage\\DesignerContractCreatePage.jsx
   계약서작성페이지 더 세세하게 세부사항 내용들 추가 (계약 내용 샘플, 작업 범위 체크란, 개인 정보 동의 체크란, 서명)
	-개인정보 동의에 체크해야지, 작성저장버튼이 활성화 됨
  -추가로 수정한 관련 페이지: DesignerContractEditor.jsx

*05.26.월*
1. page2\Mypage\OngoingRequestsPage.jsx
page2\Mypage\ui\OngoingRequests.jsx
 :제작관리에 "진행중인 의뢰내역"
-EditRequestModal.jsx : 수정요청사항 전달 팝업
-ProgressModal.jsx : 진행도 등록 팝업

2. page2\Mypage\ui\CompletedRequestPage.jsx
page2\Mypage\CompletedRequest.jsx
 :제작관리에 "완료된 의뢰 관리"

3. page2\Mypage\ui\EditRequestsPage.jsx
page2\Mypage\ditRequests.jsx
 :제작관리에 "내가 보낸 수정요청사항"
-EditRequestViewModal : 수정요청사항 자세히 보는 팝업

4. src\components\DesignerContractCreate폴더에 있는
-DesignerContractInputSection.jsx => 계약서 주요 컴포넌트
-DesignerContractEditor.jsx => 에디터 부분 코드
-sampleTemplates.jsx(새로 추가함) => 계약조건사항 샘플관련 
-DesignerContractFileUpload.jsx => 파일업로드 코드
-DesignerContractCreate.module.css => 계약서 작성 관련 css 모음

5/27일 충돌파일
front/src/RouterComponent.js,
front/src/components/DesignerContract/DesignerContractList/DesignerContractList.jsx

//챗지피티 랑 대화한 내용
이거 구현하려면 3d 이미지로 해야할거 같긴해서.. 좀 힘들거 같긴해요 ㅠ
export default Sizespec;
export defulat SizeControllerRow;

나는 지금 이 sizespec.jsx 코드에 SizeControllerRow라는 컴포넌트를 이용해서 이미지의 크기를 표현하고 있어 controller-rowA에 SizeControllerRow는 이미지의 총기장의 크기를 표현한 SizeControllerRow컴포넌트이고 controller-rowB에 SizeControllerRow는 이미지의 가슴단면의 크기를 표현한 SizeControllerRow컴포넌트야 이렇게 해서 총기장, 가슴단면, 소매기장, 어깨 단면, 허리 단면, 암홀(직선) , 소매단 단면, 소매통 단면의 이미지가 하나의 이미지 /image/size.png 에 있고 필요하다면 이 이미지들을 총기장, 가슴단면, 소매기장, 어깨 단면, 허리 단면, 암홀(직선) , 소매단 단면, 소매통 단면 의 이미지를 추가할 계획도 있어 현재는 나는 지금 이 코드에 SizeControllerRow라는 컴포넌트를 이용해서 이미지의 크기를 표현만 하고 실제로 크기를 증감할때는 이미지가 늘어나거나 줄어들지는 않아 그래서 나는 크기를 증감할때 이미지가 늘어나거나 줄어들게 하는 기능을 추가하고싶어 그 방법을 자세히 과정을 설명해줘


핵심 포인트
1. CM_TO_PX 상수

 “1cm를 몇 px로 환산할지”를 CM_TO_PX로 정의했습니다.

예제에선 1cm = 5px로 가정했습니다. 이 값을 디자인에 맞춰 조절하세요.

2. 각 항목별 이미지 크기 상태 (imgHeightA, imgWidthB, …)

예를 들어 A(총기장) 항목의 첫 번째 숫자값이 65cm라면 65 × CM_TO_PX = 325px 높이로 렌더링.

버튼 클릭 시 1cm 단위로 더해지거나 뺀 뒤, applyDiffToRow에서 해당 상태를 바로 업데이트합니다.

3. 부위별 전용 투명 배경 PNG 이미지

“총기장 전용”, “가슴 단면 전용”, “소매 기장 전용” 등 각각의 부위만 강조된 별도의 PNG(또는 SVG) 파일을 미리 준비해야 합니다.

이렇게 하면 position: absolute; top:0; left:0;으로 겹쳐 두었을 때, 오직 강조 영역(예: 가슴 단면 윤곽선)만 확대/축소되어 보입니다.

맨 아래에는 “전체 실루엣”만 있는 size-base.png를 두어, 배경 없이도 윤곽선만 보이는 구조로 할 수 있고, 필요하다면 베이스 실루엣 위에 겹쳐서 그립니다.

4. applyDiffToRow 내부에서 이미지 크기 상태 업데이트

rows[rowIndex].category를 체크해서 “A, B, D, E, G, H, I”에 해당하면, 그 항목에 대한 setImgHeightA, setImgWidthB 등을 호출하도록 분기.

이 분기 덕분에 버튼을 누르면 자동으로 imgHeightA나 imgWidthB 상태가 바뀌고, 리렌더링하면서 <img> 스타일도 곧바로 반영됩니다.

5. CSS transition 속성

transition: "height 0.2s ease" 또는 transition: "width 0.2s ease"를 넣으면, 숫자를 바꿀 때마다 이미지 크기가 부드럽게 애니메이션됩니다

6. 전체코드 제공 
// src/pages/selfdesign/Template/Size/Sizespec.jsx
import React, { useState, useEffect } from "react";
import "./Sizespeccss.css";
import { SizeControllerRow } from "../../../../components"; // SizeControllerRow 컴포넌트만 사용

function Sizespec({ selectedSize, setSelectedSize }) {
  // 0. “1cm → 몇 px” 비율 (임의값)
  const CM_TO_PX = 5;

  // 1. 상단 헤더에 표시할 사이즈 배열
  const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

  // 2. 초기 행 데이터 배열 (A~K)
  const initialRows = [
    { category: "A", label: "총 기장", values: [65, 67, 69, 71, 73, 75, 77], type: "highlight" },
    { category: "B", label: "가슴 단면", values: [82, 86, 90, 94, 98, 102, 106], type: "highlight" },
    { category: "C", label: "밑단 단면", values: [90, 94, 98, 102, 106, 110, 114], type: "highlight" },
    { category: "D", label: "소매 기장", values: [20, 21, 22, 23, 24, 25, 26], type: "highlight" },
    { category: "E", label: "어깨 단면", values: [38, 40, 42, 44, 46, 48, 50], type: "normal" },
    { category: "F", label: "허리 단면", values: [70, 72, 74, 76, 78, 80, 82], type: "normal" },
    { category: "G", label: "암홀 (직선)", values: [18, 18.5, 19, 19.5, 20, 20.5, 21], type: "normal" },
    { category: "H", label: "소매단 단면", values: [12, 12.5, 13, 13.5, 14, 14.5, 15], type: "normal" },
    { category: "I", label: "소매통 단면", values: [14, 14.5, 15, 15.5, 16, 16.5, 17], type: "normal" },
    {
      category: "J",
      label: "목 너비",
      values: Array(7).fill("디자인 선택 후 산출"),
      type: "disabled",
      colpan: 7,
    },
    {
      category: "K",
      label: "목 파임",
      values: Array(7).fill("디자인 선택 후 산출"),
      type: "disabled",
      colspan: 7,
    },
  ];

  // 3. rows 상태: 입력값 변경 및 증감 기능을 위해 상태 관리
  const [rows, setRows] = useState(initialRows);

  // 4. 부위별 이미지 크기 상태 (초기값은 initialRows 값 × CM_TO_PX)
  const [imgHeightA, setImgHeightA] = useState(initialRows[0].values[0] * CM_TO_PX);
  const [imgWidthB, setImgWidthB] = useState(initialRows[1].values[0] * CM_TO_PX);
  const [imgHeightD, setImgHeightD] = useState(initialRows[3].values[0] * CM_TO_PX);
  const [imgWidthE, setImgWidthE] = useState(initialRows[4].values[0] * CM_TO_PX);
  const [imgWidthG, setImgWidthG] = useState(initialRows[6].values[0] * CM_TO_PX);
  const [imgWidthH, setImgWidthH] = useState(initialRows[7].values[0] * CM_TO_PX);
  const [imgWidthI, setImgWidthI] = useState(initialRows[8].values[0] * CM_TO_PX);

  // 5. editable 상태 (고정)
  const [editable, setEditable] = useState({
    xs: true,
    s: false,
    m: false,
    l: false,
    xl: false,
    "2xl": false,
    "3xl": false,
  });

  // 6. 특정 행(rowIndex)의 첫번째 값을 증감 및 이미지 크기 상태 업데이트
  const applyDiffToRow = (rowIndex, diff) => {
    const newRows = [...rows];
    const currentValue = newRows[rowIndex].values[0];

    // 나머지 값들(diff 적용)까지 업데이트
    newRows[rowIndex].values = newRows[rowIndex].values.map((value, idx) =>
      typeof value === "number" ? value + diff * idx : value
    );
    const newFirst = currentValue + diff;
    newRows[rowIndex].values[0] = newFirst;
    setRows(newRows);

    // 어느 카테고리인지 판별해서 이미지 크기 업데이트
    const cat = newRows[rowIndex].category;
    const newPx = newFirst * CM_TO_PX;

    switch (cat) {
      case "A":
        setImgHeightA(newPx);
        break;
      case "B":
        setImgWidthB(newPx);
        break;
      case "D":
        setImgHeightD(newPx);
        break;
      case "E":
        setImgWidthE(newPx);
        break;
      case "G":
        setImgWidthG(newPx);
        break;
      case "H":
        setImgWidthH(newPx);
        break;
      case "I":
        setImgWidthI(newPx);
        break;
      default:
        break;
    }
  };

  const handleIncrementRow = (rowIndex) => {
    applyDiffToRow(rowIndex, 1);
  };
  const handleDecrementRow = (rowIndex) => {
    applyDiffToRow(rowIndex, -1);
  };

  // 7. rows 변경 시 localStorage에 저장
  useEffect(() => {
    try {
      localStorage.setItem("sizeSpecRows", JSON.stringify(rows));
    } catch (e) {
      console.error("localStorage 저장 오류:", e);
    }
  }, [rows]);

  // 8. 렌더링
  return (
    <div className="table-container">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* 이미지 오버레이 영역 (width=600px 고정) */}
      <div className="imgContainer" style={{ position: "relative", width: "600px", height: "auto" }}>
        {/** 1) 베이스 실루엣 이미지 **/}
        <img
          className="img-base"
          src="/image/size-base.png"
          alt="베이스 실루엣"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "600px",
            height: "auto",
            zIndex: 0,
          }}
        />

        {/** 2) 총기장 전용 이미지 (A) **/}
        <img
          className="img-length"
          src="/image/size-length.png"
          alt="총기장"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "auto",
            height: `${imgHeightA}px`,
            transition: "height 0.2s ease",
            zIndex: 1,
          }}
        />

        {/** 3) 가슴 단면 전용 이미지 (B) **/}
        <img
          className="img-chest"
          src="/image/size-chest.png"
          alt="가슴 단면"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${imgWidthB}px`,
            height: "auto",
            transition: "width 0.2s ease",
            zIndex: 2,
          }}
        />

        {/** 4) 소매 기장 전용 이미지 (D) **/}
        <img
          className="img-sleeve"
          src="/image/size-sleeve.png"
          alt="소매 기장"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "auto",
            height: `${imgHeightD}px`,
            transition: "height 0.2s ease",
            zIndex: 3,
          }}
        />

        {/** 5) 어깨 단면 전용 이미지 (E) **/}
        <img
          className="img-shoulder"
          src="/image/size-shoulder.png"
          alt="어깨 단면"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${imgWidthE}px`,
            height: "auto",
            transition: "width 0.2s ease",
            zIndex: 4,
          }}
        />

        {/** 6) 암홀 전용 이미지 (G) **/}
        <img
          className="img-armhole"
          src="/image/size-armhole.png"
          alt="암홀"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${imgWidthG}px`,
            height: "auto",
            transition: "width 0.2s ease",
            zIndex: 5,
          }}
        />

        {/** 7) 소매단 단면 전용 이미지 (H) **/}
        <img
          className="img-cuff"
          src="/image/size-cuff.png"
          alt="소매단"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${imgWidthH}px`,
            height: "auto",
            transition: "width 0.2s ease",
            zIndex: 6,
          }}
        />

        {/** 8) 소매통 단면 전용 이미지 (I) **/}
        <img
          className="img-sleeve-open"
          src="/image/size-sleeve-open.png"
          alt="소매통"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${imgWidthI}px`,
            height: "auto",
            transition: "width 0.2s ease",
            zIndex: 7,
          }}
        />

        {/** ▲ 부위별 투명배경 이미지 오버레이 끝 ▲ **/}

        {/** ▼ 영역별 컨트롤러(A, B, C, D, E, G, H, I) 렌더링 ▼ **/}
        {rows.find((row) => row.category === "A") && (
          <div className="controller-rowA">
            <SizeControllerRow
              row={rows.find((row) => row.category === "A")}
              rowIndex={rows.findIndex((row) => row.category === "A")}
              onIncrement={handleIncrementRow}
              onDecrement={handleDecrementRow}
            />
          </div>
        )}
        {rows.find((row) => row.category === "B") && (
          <div className="controller-rowB">
            <SizeControllerRow
              row={rows.find((row) => row.category === "B")}
              rowIndex={rows.findIndex((row) => row.category === "B")}
              onIncrement={handleIncrementRow}
              onDecrement={handleDecrementRow}
            />
          </div>
        )}
        {rows.find((row) => row.category === "C") && (
          <div className="controller-rowC">
            <SizeControllerRow
              row={rows.find((row) => row.category === "C")}
              rowIndex={rows.findIndex((row) => row.category === "C")}
              onIncrement={handleIncrementRow}
              onDecrement={handleDecrementRow}
            />
          </div>
        )}
        {rows.find((row) => row.category === "D") && (
          <div className="controller-rowD">
            <SizeControllerRow
              row={rows.find((row) => row.category === "D")}
              rowIndex={rows.findIndex((row) => row.category === "D")}
              onIncrement={handleIncrementRow}
              onDecrement={handleDecrementRow}
            />
          </div>
        )}
        {rows.find((row) => row.category === "E") && (
          <div className="controller-rowE">
            <SizeControllerRow
              row={rows.find((row) => row.category === "E")}
              rowIndex={rows.findIndex((row) => row.category === "E")}
              onIncrement={handleIncrementRow}
              onDecrement={handleDecrementRow}
            />
          </div>
        )}
        {rows.find((row) => row.category === "G") && (
          <div className="controller-rowG">
            <SizeControllerRow
              row={rows.find((row) => row.category === "G")}
              rowIndex={rows.findIndex((row) => row.category === "G")}
              onIncrement={handleIncrementRow}
              onDecrement={handleDecrementRow}
            />
          </div>
        )}
        {rows.find((row) => row.category === "H") && (
          <div className="controller-rowH">
            <SizeControllerRow
              row={rows.find((row) => row.category === "H")}
              rowIndex={rows.findIndex((row) => row.category === "H")}
              onIncrement={handleIncrementRow}
              onDecrement={handleDecrementRow}
            />
          </div>
        )}
        {rows.find((row) => row.category === "I") && (
          <div className="controller-rowI">
            <SizeControllerRow
              row={rows.find((row) => row.category === "I")}
              rowIndex={rows.findIndex((row) => row.category === "I")}
              onIncrement={handleIncrementRow}
              onDecrement={handleDecrementRow}
            />
          </div>
        )}
        {/** ▲ 컨트롤러 영역 끝 ▲ **/}
      </div>

      {/** ▼ 사이즈 스펙 테이블 ▼ **/}
      <table className="sizespec-table">
        <thead>
          <tr>
            <th style={{ width: "150px" }} colSpan={2}>
              (단위 : cm)
            </th>
            {sizes.map((size, index) => (
              <th
                key={index}
                onClick={() => setSelectedSize(size)}
                className={selectedSize === size ? "active" : ""}
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
                row.values.map((value, cellIdx) => (
                  <td key={cellIdx}>
                    {cellIdx === 0 ? (
                      <input
                        type="text"
                        value={value}
                        onChange={(event) => {
                          const raw = event.target.value.trim() === "" ? "0" : event.target.value;
                          if (!isNaN(raw)) {
                            const numericValue = parseFloat(raw);
                            const diff = numericValue - rows[rowIndex].values[0];
                            applyDiffToRow(rowIndex, diff);
                          } else {
                            event.preventDefault();
                          }
                        }}
                        style={{ width: "30px" }}
                      />
                    ) : typeof value === "number" ? (
                      value.toFixed(1)
                    ) : (
                      value
                    )}
                  </td>
                ))
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {/** ▲ 테이블 영역 끝 ▲ **/}
    </div>
  );
}

export default Sizespec;
*6.3.화*
1. pages2\Mypage\DMyInfoPage.jsx - 디자이너 마이페이지(내정보의 레이아웃 컴포넌트)
2.pages2\Mypage\ui\DMyInfo\DMyInfo.jsx - 디자이너 마이페이지(내정보-프로필, 개인정보, 이력사항 컴포넌트들을 다루는 상위 컴포넌트)
-pages2\Mypage\ui\DMyInfo\DMyInfo.css
-pages2\Mypage\ui\DMyInfo\ProfileSection.jsx - 디자이너 마이페이지(내정보-프로필 컴포넌트)
-pages2\Mypage\ui\DMyInfo\PersonalInfoSection.jsx - 디자이너 마이페이지(내정보-개인정보 컴포넌트)
3. pages2\Mypage\ui\DMyInfo\CaeerSection.jsx - 디자이너 마이페이지(내정보- 이력사항 컴포넌트)
-pages2\Mypage\ui\DMyInfo\EducationModal.jsx - 이력사항의 학력추가 버튼 모달
-pages2\Mypage\ui\DMyInfo\CertificateModal.jsx - 이력사항의 자격증추가 버튼 모달 
4. pages2\Mypage\ui\DesignerReceivedReviews.jsx - 디자이너 마이페이지 작성된 후기 컴포넌트
-pages2\Mypage\DesignerReceivedReviewsPage.jsx - 작성된 후기 레이아웃
-pages2\Mypage\ui\DesignerReceivedReviews.css - 
5. pages2\Mypage\ui\DeliveryPage - 배송조회 본문 부분 컴포넌트
-pages2\Mypage\DeliveryPage - 디자이너 마이페이지 배송조회 레이아웃
-pages2\Mypage\ui\DeliveryCard - 배송조회 계약별 배송부분 컴포넌트 조각
-DeliveryDetailDeliveryDetail - 배송상세보기 버튼 클릭 시, 나오는 페이지(미완성)
6.components\DesignerContractCreate\DesignerContractEditor.jsx - 디자이너 계약서 작성 샘플문구 카테고리별로(미리보기 미완성)
