import React from "react";
import { SideMenu, SearchBar2 } from "../../../components";
import BrandDesignSearch from "../../../components/BrandDesign/BrandDesignSearch";
import brandDesignData from "../../../components/BrandDesign/brandDesignData";

import "./BrandDPcss.css";

export default function BrandDP() {
  return (
    <div className="WholeWrapper">
      <div className="ContentsWrapper">
        <div className="Content3">
          <SideMenu />
          <div className="SearchandResult">
            <h2>브랜드 디자인으로 검색</h2>
            <SearchBar2 />
            <div style={{ marginTop: "50px" }}>
              {brandDesignData.map((data) => (
                <BrandDesignSearch
                  key={data.id}
                  title={data.title}
                  description={data.description}
                  tags={data.tags}
                  source={data.source}
                  thumbnail={data.thumbnail}
                />
              ))}
              <p style={{ marginTop: "30px" }}>&lt; 1 2 3 4 5 &gt;</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
