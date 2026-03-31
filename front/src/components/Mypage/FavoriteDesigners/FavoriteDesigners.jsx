import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaSearch } from "react-icons/fa";
import "./FavoriteDesigners.css";
import designerimg from "../../../assets/desiner.png";

export default function FavoriteDesigners() {
  const [designers, setDesigners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortOrder, setSortOrder] = useState("recent");

  useEffect(() => {
    async function fetchDesigners() {
      try {
        const res = await fetch("http://localhost:8081/api/posts/wishlist", {
          method: "GET",
          credentials: "include",
        });
          console.log(res.data);
        if (res.ok) {
          const data = await res.json(); // [{ postnum, id, contents }]
          setDesigners(data);
          setSelectedIds([]); // 초기엔 아무것도 선택 안됨
        }
      } catch (e) {
        console.error("찜 목록 불러오기 실패", e);
      }
    }
    fetchDesigners();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDesigners = designers.filter((designer) =>
    designer.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedDesigners = [...filteredDesigners].sort((a, b) => {
    if (sortOrder === "name") {
      return a.id.localeCompare(b.id, "ko");
    } else {
      return b.postnum - a.postnum;
    }
  });

  const handleSelect = (postnum) => {
    setSelectedIds((prev) =>
      prev.includes(postnum)
        ? prev.filter((id) => id !== postnum)
        : [...prev, postnum]
    );
  };

  const handleSelectAll = () => {
    const visibleIds = filteredDesigners.map((d) => d.postnum);
    const isAllSelected = visibleIds.every((id) => selectedIds.includes(id));
    if (isAllSelected) {
      setSelectedIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
    } else {
      const newSelected = [...new Set([...selectedIds, ...visibleIds])];
      setSelectedIds(newSelected);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedIds.map((postnum) =>
          fetch(`http://localhost:8081/api/posts/unlike/${postnum}`, {
            method: "POST",
            credentials: "include",
          })
        )
      );
      setDesigners((prev) => prev.filter((d) => !selectedIds.includes(d.postnum)));
      setSelectedIds([]);
    } catch (e) {
      console.error("선택 삭제 중 오류 발생:", e);
    }
  };

  const handleDeleteAll = async () => {
    try {
      const allIds = designers.map((d) => d.postnum);
      await Promise.all(
        allIds.map((postnum) =>
          fetch(`http://localhost:8081/api/posts/unlike/${postnum}`, {
            method: "POST",
            credentials: "include",
          })
        )
      );
      setDesigners([]);
      setSelectedIds([]);
    } catch (e) {
      console.error("전체 삭제 중 오류 발생:", e);
    }
  };

  const isAllVisibleSelected =
    filteredDesigners.length > 0 &&
    filteredDesigners.every((d) => selectedIds.includes(d.postnum));

  return (
    <div className="favorites-container">
      <div className="top-bar">
        <div className="top-row">
          <div className="search-input">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="디자이너 이름 검색"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
            <option value="recent">최근 찜한 순</option>
            <option value="name">이름순</option>
          </select>
          <button onClick={handleDeleteSelected}>선택 삭제</button>
          <button onClick={handleDeleteAll}>전체 삭제</button>
        </div>

        <div className="bottom-row">
          <div className="checkbox-all">
            <input
              type="checkbox"
              checked={isAllVisibleSelected}
              onChange={handleSelectAll}
            />
            <label>전체 선택</label>
          </div>
          <span className="count">선택됨: {selectedIds.length}명</span>
        </div>
      </div>

      <div className="designer-list">
        {sortedDesigners.length === 0 ? (
          <p>검색 결과가 없습니다.</p>
        ) : (
          sortedDesigners.map((designer) => (
            <div key={designer.postnum} className="designer-card">
              <span
                className="heart-checkbox"
                onClick={() => handleSelect(designer.postnum)}
              >
                {selectedIds.includes(designer.postnum) ? (
                  <FaHeart color="#ff5b5b" />
                ) : (
                  <FaRegHeart color="#aaa" />
                )}
              </span>
              <img src={designer.image || designerimg} alt={designer.id} />
              <div className="info">
                <h4>{designer.id}</h4>
                <p>{designer.contents}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
