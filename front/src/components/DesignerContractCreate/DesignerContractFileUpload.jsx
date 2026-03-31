import React, { useState } from "react";
import styles from "./DesignerContractCreate.module.css";

const DesignerContractFileUpload = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="designer-file-upload"
      />
      <label htmlFor="designer-file-upload" className={styles.fileUploadBox}>
        + 파일 업로드
      </label>

      <div className={styles.fileList}>
        {files.map((file, index) => (
          <div key={index} className={styles.fileItem}>
            <div style={{ flex: 1 }}>
              <strong>{file.name}</strong> ({(file.size / 1024).toFixed(1)} KB)
            </div>
            <button
              onClick={() => handleRemoveFile(index)}
              className={styles.fileRemoveButton}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignerContractFileUpload;
