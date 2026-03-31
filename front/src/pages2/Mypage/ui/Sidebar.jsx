// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import styles from './DesignerSidebar.module.css';

// export default function DesignerSidebar() {
//   const location = useLocation();

//   // 서브메뉴 열림 상태 관리 (기본값은 현재 경로가 제작관리 관련일 때 열림)
//   const [isProductionOpen, setIsProductionOpen] = useState(false);

//   // 제작관리 관련 서브경로 배열 선언 (컴포넌트 안에)
//   const productionSubPaths = [
//     "/designer/production/history",
//     "/designer/OngoingRequests",
//     "/designer/CompletedRequest",
//     "/designer/EditRequests"
//   ];

//   // 현재 경로가 서브메뉴 중 하나인지 체크
//   const isSubMenuSelected = productionSubPaths.some(path => location.pathname === path);

//   // 제작관리 메뉴에 적용할 클래스 및 원 표시 조건
//   const productionActiveClass = (location.pathname.startsWith("/designer/production") || isSubMenuSelected) ? styles.active : "";


//   // location 변경 시, 제작관리 관련 경로면 서브메뉴 자동 오픈
//   useEffect(() => {
//     if (location.pathname.startsWith("/designer/production")) {
//       setIsProductionOpen(true);
//     } else {
//       setIsProductionOpen(false);
//     }
//   }, [location.pathname]);

//   // 제작관리 메뉴 클릭 시 토글 함수
//   const toggleProductionMenu = () => {
//     setIsProductionOpen(prev => !prev);
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>마이페이지</h2>
//       <hr/>
//       <ul className={styles.menuList}>
//         <li className={styles.menuItem}>
//           <Link
//             to="/designer/DMyInfo"
//             className={`${styles.link} ${location.pathname === "/designer/DMyInfo" ? styles.active : ""}`}
//           >
//             내 정보
//           </Link>
//         </li>
//         <li className={styles.menuItem}>
//           <Link
//             to="/designer/DMyPage"
//             className={`${styles.link} ${location.pathname === "/designer/DMyPage" ? styles.active : ""}`}
//           >
//             포트폴리오 관리
//           </Link>
//         </li>
//         <li className={styles.menuItem}>
//           <Link
//             to="/designer/Delivery"
//             className={`${styles.link} ${location.pathname === "/designer/Delivery" ? styles.active : ""}`}
//           >
//             배송내역
//           </Link>
//         </li>
//         <li className={styles.menuItem}>
//           <Link
//             to="/designer/DesignerReceivedReviews"
//             className={`${styles.link} ${location.pathname === "/designer/DesignerReceivedReviews" ? styles.active : ""}`}
//           >
//             작성된 후기
//           </Link>
//         </li>
//         <li className={styles.menuItem}>
//           {/* 제작관리 메뉴는 클릭 시 서브메뉴 토글 */}
//           <div
//             onClick={toggleProductionMenu}
//             className={`${styles.link} ${productionActiveClass}`}
//             style={{ cursor: "pointer", userSelect: "none", display: "flex", alignItems: "center" }}
//           >
//             {isSubMenuSelected && (
//               <span style={{
//                 display: "inline-block",
//                 width: 8,
//                 height: 8,
//                 borderRadius: "50%",
//               }} />
//             )}
//             제작관리
//           </div>
//           {/* isProductionOpen이 true일 때만 서브메뉴 보여주기 */}
//           {isProductionOpen && (
//             <ul className={styles.subMenu}>
//               <li>
//                 <Link
//                   to="/designer/OngoingRequests"
//                   className={`${styles.subLink} ${
//                     location.pathname === "/designer/OngoingRequests" ? styles.subActive : ""
//                   }`}
//                 >
//                   진행중인 의뢰내역
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/designer/CompletedRequest"
//                   className={`${styles.subLink} ${
//                     location.pathname === "/designer/CompletedRequest" ? styles.subActive : ""
//                   }`}
//                 >
//                   완료된 의뢰 관리
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/designer/EditRequests"
//                   className={`${styles.subLink} ${
//                     location.pathname === "/designer/EditRequests" ? styles.subActive : ""
//                   }`}
//                 >
//                   내가 보낸 수정요청사항
//                 </Link>
//               </li>
//             </ul>
//           )}
//         </li>
//       </ul>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from './DesignerSidebar.module.css';
import FavoritePage from '../FavoritePage';

export default function DesignerSidebar() {
  const location = useLocation();

  // 서브메뉴 열림 상태 관리 (기본값은 현재 경로가 제작관리 관련일 때 열림)
  const [isProductionOpen, setIsProductionOpen] = useState(false);

  // 제작관리 관련 서브경로 배열 선언 (컴포넌트 안에)
  const productionSubPaths = [
    "/designer/ProductionList",  
    "/designer/OngoingRequests",
    "/designer/CompletedRequest",
    "/designer/EditRequests"
  ];

  // 현재 경로가 서브메뉴 중 하나인지 체크
  const isSubMenuSelected = productionSubPaths.some(path => location.pathname === path);

  // 제작관리 메뉴에 적용할 클래스 및 원 표시 조건
  const productionActiveClass = (location.pathname.startsWith("/designer/production") || isSubMenuSelected) ? styles.active : "";


  // location 변경 시, 제작관리 관련 경로면 서브메뉴 자동 오픈
  useEffect(() => {
    if (location.pathname.startsWith("/designer/production")) {
      setIsProductionOpen(true);
    } else {
      setIsProductionOpen(false);
    }
  }, [location.pathname]);

  // 제작관리 메뉴 클릭 시 토글 함수
  const toggleProductionMenu = () => {
    setIsProductionOpen(prev => !prev);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>마이페이지</h2>
      <hr/>
      <ul className={styles.menuList}>
        <li className={styles.menuItem}>
          <Link
            to="/designer/DMyInfo"
            className={`${styles.link} ${location.pathname === "/designer/DMyInfo" ? styles.active : ""}`}
          >
            내 정보
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link
            to="/designer/DMyPage"
            className={`${styles.link} ${location.pathname === "/designer/DMyPage" ? styles.active : ""}`}
          >
            포트폴리오 관리
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link
            to="/designer/Delivery"
            className={`${styles.link} ${location.pathname === "/designer/Delivery" ? styles.active : ""}`}
          >
            배송내역
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link
            to="/designer/DesignerReceivedReviews"
            className={`${styles.link} ${location.pathname === "/designer/DesignerReceivedReviews" ? styles.active : ""}`}
          >
            작성된 후기
          </Link>
        </li>
        <li className={styles.menuItem}>
          {/* 제작관리 메뉴는 클릭 시 서브메뉴 토글 */}
          <div
            onClick={toggleProductionMenu}
            className={`${styles.link} ${productionActiveClass}`}
            style={{ cursor: "pointer", userSelect: "none", display: "flex", alignItems: "center" }}
          >
            {isSubMenuSelected && (
              <span style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: "50%",
              }} />
            )}
            제작관리
          </div>
          {/* isProductionOpen이 true일 때만 서브메뉴 보여주기 */}
          {isProductionOpen && (
            <ul className={styles.subMenu}>
              <li>
                <Link
                  to="/designer/ProductionList"
                  className={`${styles.subLink} ${
                    location.pathname === "/designer/ProductionList" ? styles.subActive : ""
                  }`}
                >
                  제작내역
                </Link>
              </li>
              <li>
                <Link
                  to="/designer/OngoingRequests"
                  className={`${styles.subLink} ${
                    location.pathname === "/designer/OngoingRequests" ? styles.subActive : ""
                  }`}
                >
                  진행중인 의뢰내역
                </Link>
              </li>
              <li>
                <Link
                  to="/designer/CompletedRequest"
                  className={`${styles.subLink} ${
                    location.pathname === "/designer/CompletedRequest" ? styles.subActive : ""
                  }`}
                >
                  완료된 의뢰 관리
                </Link>
              </li>
              <li>
                <Link
                  to="/designer/EditRequests"
                  className={`${styles.subLink} ${
                    location.pathname === "/designer/EditRequests" ? styles.subActive : ""
                  }`}
                >
                  내가 보낸 수정요청사항
                </Link>
              </li>
            </ul>
          )}
          <li className={styles.menuItem}>
          <Link
            to="/designer/FavoritePage"
            className={`${styles.link} ${location.pathname === "/designer/FavoritePage" ? styles.active : ""}`}
          >
            찜한 의뢰 목록
          </Link>
        </li>
        </li>
      </ul>
    </div>
  );
}