// import React, { useState, useEffect } from 'react';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import './MyDesignsRequests.css';
// import axios from 'axios';

// const MyDesignsRequests = ({ username: propUsername }) => {
//   const [activeTab, setActiveTab] = useState('design');
//   const [selectedCategory, setSelectedCategory] = useState('template');
//   const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);
//   const [selectedDesignItem, setSelectedDesignItem] = useState(null);
//   const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
//   const [selectedOrderItem, setSelectedOrderItem] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [username, setUsername] = useState(propUsername);
//   const [designs, setDesigns] = useState([]);
//   const [userFiles, setUserFiles] = useState([]);
//   const [orderItems, setOrderItems] = useState([]);

//   const colorMap = { "#ff0000": "빨간", "#00ff00": "초록", "#0000ff": "파란", "#ff9900": "주황", "#0099ff": "하늘" };

//   useEffect(() => {
//     if (!propUsername) {
//       const fetchSession = async () => {
//         try {
//           const res = await fetch("http://localhost:8081/api/user", { credentials: 'include' });
//           if (!res.ok) throw new Error("세션 없음");
//           const data = await res.json();
//           if (data.username) setUsername(data.username);
//         } catch (err) {
//           console.warn("세션 정보 없음:", err);
//         }
//       };
//       fetchSession();
//     }
//   }, [propUsername]);

//   useEffect(() => {
//     if (username) {
//       fetchMyDesigns();
//       fetchUserFiles();
//       fetchUserOrders();
//     }
//   }, [username]);

//   const fetchMyDesigns = () => {
//     if (!username) return;
//     axios.post('http://localhost:8081/api/designs/mydesigns', { username })
//       .then((res) => setDesigns(res.data))
//       .catch((err) => console.error('디자인 불러오기 실패', err));
//   };

//   const fetchUserFiles = async () => {
//     if (!username) return;
//     try {
//       const response = await fetch(`http://localhost:8081/files/userimg?username=${username}`);
//       if (response.ok) {
//         const data = await response.json();
//         setUserFiles(data);
//       }
//     } catch (error) {
//       console.error('파일 가져오기 에러:', error);
//     }
//   };

//   const fetchUserOrders = () => {
//   if (!username) return;
//   axios.get(`http://localhost:8081/api/requests/user?username=${username}`)
//     .then((res) => {
//       setOrderItems(res.data || []);
//     })
//     .catch((err) => {
//       console.error('의뢰 불러오기 실패:', err);
//     });
// };

//   const getColorName = (colorCode) => colorMap[colorCode] || colorCode;
//   const closeModal = () => setIsModalOpen(false);
//   const closeDesignModal = () => setIsDesignModalOpen(false);
//   const closeOrderModal = () => setIsOrderModalOpen(false);

//   const parseColors = (json) => {
//     try {
//       const parsed = JSON.parse(json);
//       return Array.isArray(parsed) && parsed.length > 0 ? getColorName(parsed[0].color) : '색상 없음';
//     } catch (e) {
//       return '색상 없음';
//     }
//   };

//   const formatDateTime = (datetime) => {
//     try {
//       const date = new Date(datetime);
//       const year = date.getFullYear();
//       const month = (date.getMonth() + 1).toString().padStart(2, '0');
//       const day = date.getDate().toString().padStart(2, '0');
//       const hours = date.getHours().toString().padStart(2, '0');
//       return `${year}-${month}-${day} ${hours}시`;
//     } catch (e) {
//       return '';
//     }
//   };

//   const parseFabric = (json) => {
//     try {
//       const list = JSON.parse(json);
//       return Array.isArray(list) ? list.join(', ') : '';
//     } catch (e) {
//       return '';
//     }
//   };

//   const handleCardClick = (item) => {
//     setSelectedItem(item);
//     setIsModalOpen(true);
//   };

//   const handleDesignCardClick = (item) => {
//     setSelectedDesignItem(item);
//     setIsDesignModalOpen(true);
//   };

//   const handleOrderCardClick = (item) => {
//     setSelectedOrderItem(item);
//     setIsOrderModalOpen(true);
//   };

//   const handleDeleteOrder = (id) => {
//     setOrderItems((prev) => prev.filter((item) => item.id !== id));
//   };

//   const handleTabClick = (tab) => setActiveTab(tab);

//   const handleCategoryChange = async (event) => {
//     const selected = event.target.value;
//     setSelectedCategory(selected);
//     if (selected === 'pattern') {
//       await fetchUserFiles();
//     } else {
//       setUserFiles([]);
//       fetchMyDesigns();
//     }
//   };

//   const filteredDesigns = designs.filter((item) => item.category === selectedCategory);

//   return (
//     <div>
//       <div className="tabs">
//         <button className={`tab-button ${activeTab === 'design' ? 'active' : ''}`} onClick={() => handleTabClick('design')}>디자인</button>
//         <button className={`tab-button ${activeTab === 'order' ? 'active' : ''}`} onClick={() => handleTabClick('order')}>의뢰</button>
//       </div>

//       <div className="tab-content">
//         {activeTab === 'design' && (
//           <div className="tab">
//             <div className="dropdown">
//               <select onChange={handleCategoryChange} value={selectedCategory}>
//                 <option value="template">템플릿 디자인</option>
//                 <option value="pattern">디자인 파일 업로드</option>
//               </select>
//             </div>
//             <div className="card-container">
//               {selectedCategory === 'template' && filteredDesigns.map((item) => {
//                   console.log("🎨 designImageBase64:", item.designImageBase64); // ✅ 여기에 추가!

//                   return (
//                     <div key={item.designId} className="card" onClick={() => handleCardClick(item)}>
//                       {item.designImageBase64 ? (
//                         <img
//                           src={item.designImageBase64}
//                           alt={item.designName}
//                           className="card-image"
//                           style={{ width: "100%", height: "auto" }}
//                         />
//                       ) : (
//                         <div>이미지 없음</div>
//                       )}
//                       <h3>{item.designName}</h3>
//                       <p>{item.clothingType}</p>
//                     </div>
//                   );
//                 })}

//               {selectedCategory === 'pattern' && (
//                 userFiles.length > 0 ? (
//                   <div className="card-container">
//                     {userFiles.map((item) => (
//                       <div key={item.fileName} className="card" onClick={() => handleDesignCardClick(item)}>
//                         <img src={`http://localhost:8081/image/${item.designId}`} alt={item.fileName} className="card-image" />
//                         <p>{item.uploadedAt}</p>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p>해당 카테고리에 저장된 파일이 없습니다.</p>
//                 )
//               )}
//             </div>
//           </div>
//         )}

//         {activeTab === 'order' && (
//           <div className="tab">
//             <div className="card-container">
//               {orderItems.length > 0 ? orderItems.map((item) => (
//                 <div key={item.requestId} className="order-card" onClick={() => handleOrderCardClick(item)}>
//                   <span className="delete-btn" onClick={() => handleDeleteOrder(item.requestId)}>
//                     <i className="fas fa-trash-alt"></i>
//                   </span>
//                   <h3>{item.title}</h3>
//                   <p>마감: {item.deadline}</p>
//                 </div>
//               )) : (
//                 <p>작성한 의뢰가 없습니다.</p>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       {isModalOpen && selectedItem && (
//         <div className="modal-overlay" onClick={closeModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <span className="close-btn" onClick={closeModal}>&times;</span>
//             <h2>{selectedItem.designName}</h2>
//             {selectedItem.designImageBase64 ? (
//               <img
//                 src={selectedItem.designImageBase64}
//                 alt={selectedItem.designName}
//                 className="card-image"
//               />
//             ) : (
//               <p>이미지 없음</p>
//             )}
//             <p><strong>의류 종류:</strong> {selectedItem.clothingType}</p>
//             <p><strong>원단:</strong> {parseFabric(selectedItem.fabricJson)}</p>
//             <p><strong>사이즈:</strong> {selectedItem.size}</p>
//             <p><strong>제작일:</strong> {formatDateTime(selectedItem.createdAt)}</p>
//             <p><strong>색상:</strong> {parseColors(selectedItem.colorsJson)}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyDesignsRequests;


import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './MyDesignsRequests.css';
import axios from 'axios';

const MyDesignsRequests = ({ username: propUsername }) => {
  const [activeTab, setActiveTab] = useState('design');
  const [selectedCategory, setSelectedCategory] = useState('template');
  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);
  const [selectedDesignItem, setSelectedDesignItem] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrderItem, setSelectedOrderItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기/닫기 상태
  const [selectedItem, setSelectedItem] = useState(null); // 선택된 카드 항목
  const [username, setUsername] = useState(propUsername);
  const [designs, setDesigns] = useState([]);
  const [userFiles, setUserFiles] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
    
  //   { id: 1, client: "홍길동", title: "청바지 전문 디자이너 구해요", category: "바지 > 청바지", style: "캐쥬얼", price: "10만원 이하", deadline: "디자이너와 협의 후 결정", createdAt: "2025/01/01", description: "상세설명 예시글상세설명 예시글상세설명 예시글상세설명 예시글상세설명 예시글상세설명 예시글상세설명" },
  //   { id: 2, client: "김민지", title: "포스터 디자인 의뢰합니다", category: "그래픽 > 포스터", style: "모던, 깔끔한 느낌", price: "15만원 내외", deadline: "2025/04/30까지", createdAt: "2025/03/25", description: "행사용 포스터 디자인 부탁드립니다. 배경은 어두운 톤, 텍스트 강조해주세요." },
  //   { id: 3, client: "이준호", title: "로고 제작 요청", category: "브랜딩 > 로고", style: "심플, 미니멀", price: "20만원 이하", deadline: "디자이너와 조율", createdAt: "2025/02/15", description: "스타트업 브랜드 로고가 필요합니다. 심볼 중심으로 제작되면 좋겠습니다." },
  //   { id: 4, client: "박서연", title: "앱 UI 디자인 부탁드려요", category: "UX/UI > 앱 디자인", style: "귀엽고 직관적인 디자인", price: "30만원 이상", deadline: "2025/05/10까지", createdAt: "2025/03/05", description: "건강 관리 앱 메인 화면 위주로 디자인 필요합니다. 컬러 가이드는 전달드릴게요." },
  //   { id: 5, client: "정하늘", title: "패키지 디자인 의뢰합니다", category: "제품 디자인 > 패키지", style: "빈티지 스타일", price: "25만원", deadline: "2025/06/01까지", createdAt: "2025/04/01", description: "수제 쿠키 브랜드의 패키지 디자인이 필요합니다. 예쁜 타이포와 따뜻한 색감 부탁드려요." },
  //   { id: 6, client: "최유진", title: "유튜브 썸네일 디자이너 구해요", category: "디지털 > 썸네일", style: "눈에 띄는 스타일", price: "1건당 5천원", deadline: "상시", createdAt: "2025/04/05", description: "채널 썸네일 제작하실 분 구해요. 텍스트 강조, 컬러풀하게 해주시면 좋겠어요!" }
  // ]);
  // const designItems = {
  //   template: [
  //     { id: 1, name: '맨투맨1', description: '맨투맨1 설명', image: '/images/맨투맨1.jpg', date: '2025-04-01', size: 'L', designName: '캐주얼 맨투맨', fabric: '면 100%', color: '회색', clothingType: '맨투맨' },
  //     { id: 2, name: '맨투맨2', description: '맨투맨2 설명', image: '/images/맨투맨2.jpg', date: '2025-04-02', size: 'M', designName: '심플 맨투맨', fabric: '면 80%, 폴리 20%', color: '블랙', clothingType: '맨투맨' },
  //     { id: 3, name: '맨투맨3', description: '맨투맨3 설명', image: '/images/맨투맨3.jpg', date: '2025-04-03', size: 'XL', designName: '루즈핏 맨투맨', fabric: '면 60%, 폴리 40%', color: '아이보리', clothingType: '맨투맨' },,
  //     { id: 7, name: '스커트', description: '가벼운 느낌의 롱 스커트', image: '/images/스커트.jpg', date: '2025-03-18', size: 'L', designName: '플레어 롱 스커트', fabric: '폴리에스터 80%, 스판덱스 20%', color: '블랙', clothingType: '스커트' },
  //     { id: 8, name: '니트', description: '부드럽고 따뜻한 니트', image: '/images/니트.jpg', date: '2025-02-22', size: 'M', designName: '터틀넥 니트', fabric: '울 60%, 나일론 40%', color: '그레이', clothingType: '니트' },
  //   ],
  //   pattern: [
  //     { id: 1, name: '자켓', description: '자켓 설명', image: '/images/자켓.jpg', date: '2025-03-20', size: 'M', designName: '클래식 자켓', fabric: '울 50%, 폴리 50%', color: '네이비', clothingType: '자켓' },
  //     { id: 2, name: '치마1', description: '치마1 설명', image: '/images/치마1.jpg', date: '2025-03-22', size: 'S', designName: '플레어 스커트', fabric: '면 100%', color: '연핑크', clothingType: '스커트' },
  //     { id: 3, name: '치마2', description: '치마2 설명', image: '/images/치마2.jpg', date: '2025-03-25', size: 'M', designName: '에이라인 스커트', fabric: '린넨 100%', color: '아이보리', clothingType: '스커트' },
  //     { id: 9, name: '재킷', description: '봄에 입기 좋은 재킷', image: '/images/재킷.jpg', date: '2025-04-05', size: 'S', designName: '카멜 재킷', fabric: '폴리에스터 100%', color: '카멜', clothingType: '자켓' },
  //     { id: 10, name: '블라우스', description: '여성스러운 디자인의 블라우스', image: '/images/블라우스.jpg', date: '2025-03-12', size: 'M', designName: '레이스 블라우스', fabric: '면 100%', color: '화이트', clothingType: '블라우스' },
  //   ],
  // };
  const colorMap = { "#ff0000": "빨강", "#00ff00": "초록", "#0000ff": "파랑", "#ff9900": "주황", "#0099ff": "하늘" };

useEffect(() => {
    setUsername("client1004"); //프론트용 테스트용으로 "client1004" 고정 6.10
  }, []);
useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/current-user', {
          method: 'GET',
          credentials: 'include',  // 쿠키를 포함시켜 세션을 전달
        });
          if (response.ok) {
          const data = await response.json();
          console.log(data.username);
          setUsername(data.username);  // 로그인한 사용자 이름을 상태에 저장
        } else {
          console.error('로그인된 사용자가 없습니다.');
        }
      } catch (error) {
        console.error('사용자 정보 가져오기 실패:', error);
      }
    };
    

    fetchUsername();
  }, []);
  useEffect(() => {  
    if (username) {
      console.log("📦 fetchMyDesigns 호출, 현재 username:", username);
      fetchMyDesigns();
    }
  }, [username]);

  
  const fetchMyDesigns = () => { 
    try {
      const mockDesigns = JSON.parse(localStorage.getItem("mockDesigns") || "[]");
      console.log("Raw mockDesigns:", mockDesigns); // 모든 데이터 확인
      setDesigns(mockDesigns); // username 필터링 제거
      console.log("🎯 모킹된 디자인 데이터:", mockDesigns);
    } catch (err) {
      console.error("❌ 디자인 불러오기 실패", err);
      setDesigns([]);
    }
  };
   const fetchUserFiles = async () => {
    if (!username) {
      console.error('사용자 정보가 없습니다.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8081/files/userimg?username=${username}`);
      
      if (response.ok) {
        const data = await response.json();
        setUserFiles(data);
      } else {
        console.error('파일 가져오기 실패');
      }
    } catch (error) {
      console.error('파일 가져오기 에러:', error);
    }
  };

  const fetchUserOrders = () => {
  if (!username) return;
  axios.get(`http://localhost:8081/api/requests/user?username=${username}`)
    .then((res) => {
      setOrderItems(res.data || []);
    })
    .catch((err) => {
      console.error('의뢰 불러오기 실패:', err);
    });
};


  /* 템플릿으로 디자인하기 저장하면 사이즈조절한옷 마이페이지에 보이는거 프론트에서 되나 테스트하려고 잠깐 주석처리한고 6.10
  */
  useEffect(() => {
    if (!propUsername) {
      const fetchSession = async () => {
        try {
          const res = await fetch("http://localhost:8081/api/user", {
            credentials: 'include',
          });
          if (!res.ok) throw new Error("세션 없음");
          const data = await res.json();
          if (data.username) {
            console.log("✅ 세션에서 username 획득:", data.username);
            setUsername(data.username);
          } else {
            console.warn("❗ 세션은 있지만 username 없음");
          }
        } catch (err) {
          console.warn("⚠️ 세션 정보 없음:", err);
        }
      };
      fetchSession();
    }
  }, [propUsername]);

  useEffect(() => {
    if (username) {
      console.log("📦 fetchMyDesigns 호출, 현재 username:", username);
      fetchMyDesigns();
      console.log("📂 fetchUserFiles 호출, 현재 username:", username);
      fetchUserFiles();
      fetchUserOrders();
    }
  }, [username]);

  /*const fetchMyDesigns = () => { //프론트 테스트 하기위해 주석처리 6.10
    if (!username) {
      console.warn("⚠️ 사용자 이름이 없어 디자인을 불러올 수 없습니다.");
      return;
    }
    axios.post('http://localhost:8081/api/designs/mydesigns', { username })
      .then((res) => {
        console.log('🎯 받은 디자인 데이터:', res.data);
        setDesigns(res.data);
      })
      .catch((err) => {
        console.error('❌ 디자인 불러오기 실패', err);
      });
  };*/

  /*const fetchUserFiles = async () => {
    if (!username) {
      console.error('🛑 사용자 이름이 없어 파일을 가져올 수 없습니다.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8081/files/userimg?username=${username}`);
      if (response.ok) {
        const data = await response.json();
        setUserFiles(data);
      } else {
        console.error('❌ 파일 가져오기 실패:', response.status);
      }
    } catch (error) {
      console.error('⚠️ 파일 가져오기 에러:', error);
    }
  };*/
/*템플릿으로 디자인하기 저장하면 사이즈조절한옷 마이페이지에 보이는거 프론트에서 되나 테스트하려고 잠깐 주석처리한고 요기까지 */

  const getColorName = (colorCode) => colorMap[colorCode] || colorCode;
  const closeModal = () => setIsModalOpen(false);
  const parseColors = (json) => {
    try {
      const parsed = JSON.parse(json);
      return Array.isArray(parsed) && parsed.length > 0 ? getColorName(parsed[0].color) : '색상 없음';
    } catch (e) {
      console.error("색상 파싱 오류:", e);
      return '색상 없음';
    }
  };
  const formatDateTime = (datetime) => {
    try {
      const date = new Date(datetime);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const hours = date.getHours().toString().padStart(2, '0');
      // return `<span class="math-inline">\{year\}\-</span>{month}-${day} ${hours}시`; 6.10
          return `${year}년 ${month}-${day} ${hours}시`;
    } catch (e) {
      return '';
    }
  };
  const filteredDesigns = designs.filter((item) => item.category === selectedCategory);

  const handleTabClick = (tab) => setActiveTab(tab);

  const handleCategoryChange = async (event) => {
    const selected = event.target.value;
    setSelectedCategory(selected);

    if (selected === 'pattern') {
      await fetchUserFiles();
    } else if (selected === 'template') {
      setUserFiles([]);
      fetchMyDesigns();
    } else {
      setUserFiles([]);
    }
  };
  const parseFabric = (json) => {
    try {
      const list = JSON.parse(json);
      return Array.isArray(list) ? list.join(', ') : '';
    } catch (e) {
      return '';
    }
  };

  const handleDesignCardClick = (item) => {
    setSelectedDesignItem({
    ...item,
    image: `http://localhost:8081/files/view/${item.fileName}`
  });
    setIsDesignModalOpen(true);
  };

  const handleOrderCardClick = (item) => {
    setSelectedOrderItem(item);
    setIsOrderModalOpen(true);
  };
  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };
  const closeDesignModal = () => setIsDesignModalOpen(false);
  const closeOrderModal = () => setIsOrderModalOpen(false);
  const handleDeleteOrder = (id) => {
    setOrderItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div>
      <div className="tabs">
        <button className={`tab-button ${activeTab === 'design' ? 'active' : ''}`} onClick={() => handleTabClick('design')}>디자인</button>
        <button className={`tab-button ${activeTab === 'order' ? 'active' : ''}`} onClick={() => handleTabClick('order')}>의뢰</button>
      </div>

      <div className="tab-content">
        {activeTab === 'design' && (
          <div className="tab">
            <div className="dropdown">
              <select onChange={handleCategoryChange} value={selectedCategory}>
                <option value="template">템플릿 디자인</option>
                <option value="pattern">디자인 파일 업로드</option>
              </select>
            </div>
            <div className="card-container">
              {selectedCategory === 'template' && (
                filteredDesigns.length === 0 ? (
                  <p>해당 카테고리에 저장된 디자인이 없습니다.</p>
                ) : (
                  <div className="card-container">
                    {filteredDesigns.map((item) => (
                      <div key={item.designId} className="card" onClick={() => handleCardClick(item)}>
                          {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.designName}
                            className="card-image"
                            style={{ width: "100%", height: "auto" }}
                          />
                        ) : (
                          <div>이미지 없음</div>
                        )}
                        <h3>{item.designName}</h3>
                        <p>{item.clothingType}</p>
                        
                      </div>
                    ))}
                  </div>
                )
              )}

              {selectedCategory === 'pattern' && (
                userFiles.length > 0 ? (
                  <div className="card-container">
                    {userFiles.map((item) => (
                      <div key={item.fileName} className="card" onClick={() => handleDesignCardClick(item)}>
                        <img src={`http://localhost:8081/files/view/${item.fileName}`} alt={item.fileName} className="card-image" />
                        <p>{item.uploadedAt}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>해당 카테고리에 저장된 파일이 없습니다.</p>
                )
              )}
            </div>
          </div>
        )}

        {activeTab === 'order' && (
          <div className="tab">
            <div className="card-container">
              {orderItems.map((item) => (
                <div key={item.id} className="order-card" onClick={() => handleOrderCardClick(item)}>
                  <span className="delete-btn" onClick={() => handleDeleteOrder(item.id)}>
                    <i className="fas fa-trash-alt"></i>
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.createdAt}</p> 
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Design Modal */}
      {isDesignModalOpen && selectedDesignItem && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeDesignModal}>&times;</span>
            <h2>{selectedDesignItem.name}</h2>
            <p className="modal-date">{selectedDesignItem.date}</p>
            <div className="modal-details">
              <p><img src={selectedDesignItem.image} alt={"임시"} className="modal-image" /></p>
              <p><strong>작성일:</strong> {selectedDesignItem.uploadedAt}</p>
              {/*<p><strong>디자인 이름:</strong> {selectedDesignItem.designName}</p>
              <p><strong>원단:</strong> {selectedDesignItem.fabric}</p>
              <p><strong>색상:</strong> {selectedDesignItem.color}</p>
              <p><strong>의류 종류:</strong> {selectedDesignItem.clothingType}</p>*/}
              
            </div>
          </div>
        </div>
      )}
      
      {isModalOpen && selectedItem && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={closeModal}>&times;</span>
            <h2>{selectedItem.designName}</h2>
            {selectedItem.imageUrl ? (
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.designName}
                className="modal-image"
                style={{ width: "100%", height: "auto" }}
              />
            ) : (
              <p>이미지 없음</p>
            )}
            <p><strong>의류 종류:</strong> {selectedItem.clothingType}</p>
            <p><strong>원단:</strong> {parseFabric(selectedItem.fabricJson)}</p>
            <p><strong>사이즈:</strong> {selectedItem.size}</p>
            <p><strong>제작일:</strong> {formatDateTime(selectedItem.createdAt)}</p>
            <p><strong>색상:</strong> {parseColors(selectedItem.colorsJson)}</p>
          </div>
        </div>
      )}
      {/* Order Modal */}
      {isOrderModalOpen && selectedOrderItem && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeOrderModal}>&times;</span>
            <h2>{selectedOrderItem.title}</h2>
            <p><strong>작성자(고객):</strong> {selectedOrderItem.username}</p>
            <p><strong>카테고리:</strong> {selectedOrderItem.categoryTags}</p>
            <p><strong>스타일:</strong> {selectedOrderItem.style}</p>
            <p><strong>예상 금액:</strong> {selectedOrderItem.amount}</p>
            <p><strong>마감일:</strong> {selectedOrderItem.deadline}</p>
            <p><strong>설명:</strong> {selectedOrderItem.description}</p></div>
         </div>
      )}
    </div>
  );
};

export default MyDesignsRequests;