import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/logout", {
        method: "POST",
        credentials: "include", // ✅ 세션 쿠키 포함
      });
  
      if (response.ok) {
        // ✅ localStorage에서 사용자 정보 삭제
        localStorage.removeItem("id");
        localStorage.removeItem("name");
        localStorage.removeItem("usertype");

        console.log("로그아웃 성공");

        // ✅ 로그인 페이지로 이동
        navigate("/");
      } else {
        console.error("로그아웃 실패");
      }
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  };

  return <button onClick={handleLogout}>로그아웃</button>;
};

export default LogoutButton;