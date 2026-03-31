import { useState } from "react";
import ImageUpload from "../components/ImageUpload";
import ImageList from "../components/ImageList";

const Home = () => {
  const [refresh, setRefresh] = useState(false);

  const handleUploadSuccess = () => {
    setRefresh((prev) => !prev); // 이미지 업로드 후 새로고침 트리거
  };

  return (
    <div>
      <h1>이미지 업로드 및 조회</h1>
      <ImageUpload onUploadSuccess={handleUploadSuccess} />
      <ImageList key={refresh} />
    </div>
  );
};

export default Home;
