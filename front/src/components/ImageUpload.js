import { useState } from "react";
import { uploadImage } from "../services/api";

const ImageUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("파일을 선택하세요!");
      return;
    }

    try {
      await uploadImage(file);
      alert("이미지 업로드 성공!");
      {/*onUploadSuccess();*/} // 업로드 후 목록 갱신 이미지업로드 성공 뒤 이미지업로드실패떠서 이거 주석처리해놓음
    } catch (error) {
      alert("이미지 업로드 실패?");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>이미지 업로드</button>
    </div>
  );
};

export default ImageUpload;
