import React, { useEffect, useState } from "react";
import axios from "axios";

const DesignView = () => {
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    axios.post("/api/designs/mydesigns", {}, { withCredentials: true })
      .then((res) => {
        setDesigns(res.data);
      })
      .catch((err) => {
        console.error("디자인 불러오기 실패", err);
      });
  }, []);

  return (
    <div>
      {designs.length === 0 ? (
        <p>저장된 디자인이 없습니다.</p>
      ) : (
        <div className="design-list">
          {designs.map((design) => (
            <div key={design.designId} className="design-card">
              <h4>{design.designName}</h4>
              <p>의류 종류: {design.clothingType}</p>
              <p>사이즈: {design.size}</p>
              {/* 원단이나 색상도 보여줄 수 있어 */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DesignView;
