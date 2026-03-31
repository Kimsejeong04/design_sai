// BrandDesignSearch.jsx
import React from "react";
import "./BrandDesignSearchcss.css";

export default function BrandDesignSearch({ title, description, tags, source, thumbnail }) {
  return (
    <div className="DesignPreview">
      <div className="LeftPart">
        <div className="Lefttop">
          {thumbnail && <img src={thumbnail} alt="디자인 썸네일" className="ThumbnailImage" />}
        </div>
        <div className="Leftbottom">
          <div className="Leftbottomcontents">
            <span className="Profile" />
            기본샘플
          </div>
          <div className="Leftbottomcontents" style={{ color: "#6B6565" }}>
            by {source}
          </div>
        </div>
      </div>
      <div className="RightPart">
        <span style={{ fontWeight: "bold", fontSize: "1.25rem" }}>{title}</span>
        <br />
        <div style={{ color: "#444444", fontSize: "1.0rem"  }}>
            {description}
        </div>
        <div className="Rightbottom">
          {tags.map((tag, idx) => (
            <div className="Rightbottomcontents" key={idx}>{tag}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
