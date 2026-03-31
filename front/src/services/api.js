import axios from "axios";

const BASE_URL = "http://localhost:8081"; // 스프링 부트 서버 주소

// 이미지 업로드
// 이미지 업로드
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${BASE_URL}/files/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true, // 🔥 이 줄 추가
    });
    return response.data;
  } catch (error) {
    console.error("이미지 업로드 실패:", error);
    throw error;
  }
};

// 업로드된 이미지 목록 가져오기
export const fetchImages = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/files/list`, {
      withCredentials: true, // 🔥 여기도 추가하는 게 안전 (세션 필요할 수도 있어서)
    });
    return response.data;
  } catch (error) {
    console.error("이미지 목록 불러오기 실패:", error);
    throw error;
  }
};
