import axios from 'axios';
import { useEffect, useState } from 'react';
import FavoriteItem from "./FavoriteItem";
function FavoriteRequests({ propUsername }) {
  const [username, setUsername] = useState(propUsername || '');
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  

  // 🔐 세션에서 username 가져오기
  useEffect(() => {
    if (!propUsername) {
      const fetchSession = async () => {
        try {
          const res = await fetch("http://localhost:8081/api/user", {
            credentials: 'include', // 세션 쿠키 포함
          });
          if (!res.ok) throw new Error("세션 없음");
          const data = await res.json();
          if (data.username) {
            console.log("✅ 세션에서 username 획득:", data.username);
            setUsername(data.username);
          } else {
            console.warn("❗ 세션은 있지만 username 없음");
            setLoading(false);
          }
        } catch (err) {
          console.warn("⚠️ 세션 정보 없음:", err);
          setLoading(false);
        }
      };
      fetchSession();
    } else {
      setLoading(false); // props로 username이 주어진 경우 바로 false 처리
    }
  }, [propUsername]);

  // 📝 username이 설정되면 찜 목록 요청
  useEffect(() => {
    if (!username) return;
    // axios.get("/mock-favorites.json") //테스트 json 파일  
    axios.get(`http://localhost:8081/designer/favorites/${username}`, 
      {withCredentials: true})//세선쿠키전달 
    .then(res => {
      console.log("📦 찜 목록 응답 데이터:", res.data);
      setFavorites(res.data);
    })
    .catch(err => {
      console.error('❌ 찜한 의뢰 목록 불러오기 실패:', err);
      if (err.response && err.response.status === 401) {
        alert("찜 목록을 보려면 로그인이 필요합니다.");
      } else {
        alert("찜 목록을 불러오는 데 실패했습니다.");
      }
    });
  }, [username]);

  // if (loading) {
  //   return <div>🔄 로그인 확인 중...</div>;
  // }

  return (
    <div>
      <h2>❤️ 찜한 의뢰 목록</h2>
      <ul>
  {favorites.length > 0 ? (
          favorites.map((item, index) => {
            // categoryTags가 "제발,되라,되어라" 같은 문자열로 들어온다면
            const tagsArray = Array.isArray(item.categoryTags)
              ? item.categoryTags
              : item.categoryTags.split(',').map(tag => tag.trim());

            return (
              <FavoriteItem
                key={item.requestId}
                favorite={item}
                title={item.title}
                amount={item.amount}
                deadline={item.deadline}
                description={item.description}
                categoryTags={tagsArray}
                style={item.style}
              />
            );
          })
        ) : (
          <li>찜한 의뢰가 없습니다.</li>
        )}
      </ul>
    </div>
  );
}

export default FavoriteRequests;