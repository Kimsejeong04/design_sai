import { useEffect, useState } from "react";
import { fetchImages } from "../services/api";
import Canvas from "./Canvas/Canvas";  // 캔버스 컴포넌트를 불러옵니다

const ImageList = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // 클릭한 이미지 상태

  const loadImages = async () => {
    try {
      const data = await fetchImages();
      setImages(data);
    } catch (error) {
      alert("이미지를 불러오지 못했습니다.");
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleImageClick = (img) => {
    setSelectedImage(img.fileName); // 클릭된 이미지의 이름을 상태로 설정
  };

  return (
    <div>
      <h2>내가 업로드한 이미지</h2>
      <button onClick={loadImages}>새로고침</button>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {images.map((img, index) => (
          <img
            key={index}
            src={`http://localhost:8081/files/view/${img.fileName}`} // 백엔드에서 이미지 제공
            alt="업로드된 이미지"
            style={{ width: "150px", height: "150px", margin: "10px", cursor: 'pointer' }}
            onClick={() => handleImageClick(img)} // 이미지 클릭 시 클릭한 이미지 설정
          />
        ))}
      </div>
      {/* 선택된 이미지가 있을 때 캔버스를 렌더링 */}
      {selectedImage && <Canvas backgroundImage={selectedImage} />}
    </div>
  );
};

export default ImageList;
