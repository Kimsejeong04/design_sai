import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { FaHeart, FaRegHeart, FaSearch } from "react-icons/fa";
import "./FavoriteDesigners.css";
import designerimg from "../../../assets/desiner.png";

const REMOVE_MS = 300;

export default function FavoriteDesigners() {
  const [designers, setDesigners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortOrder, setSortOrder] = useState("recent");
  const [removingIds, setRemovingIds] = useState([]);

  const cardRefs = useRef({});
  const prevPos = useRef({});

  useEffect(() => {
    async function fetchDesigners() {
      try {
        const res = await fetch("http://localhost:8081/api/posts/wishlist", {
          method: "GET",
          credentials: "include",
        });
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

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredDesigners = designers.filter((designer) =>
    designer.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedDesigners = [...filteredDesigners].sort((a, b) => {
    if (sortOrder === "name") {
      return a.id.localeCompare(b.id, "ko");
    }
    return b.postnum - a.postnum;
  });

  // 카드 "순서"가 바뀔 때만 미끄러지는 효과 (하트 선택 때는 실행 안 됨)
  const orderKey = sortedDesigners.map((d) => d.postnum).join(",");
  useLayoutEffect(() => {
    const newPos = {};
    sortedDesigners.forEach((d) => {
      const el = cardRefs.current[d.postnum];
      if (!el) return;
      const pos = { left: el.offsetLeft, top: el.offsetTop };
      newPos[d.postnum] = pos;
      const prev = prevPos.current[d.postnum];
      if (prev && (prev.left !== pos.left || prev.top !== pos.top)) {
        el.style.transition = "none";
        el.style.transform = `translate(${prev.left - pos.left}px, ${
          prev.top - pos.top
        }px)`;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.style.transition = "transform 0.35s ease";
            el.style.transform = "";
          });
        });
      }
    });
    prevPos.current = newPos;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderKey]);

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
      setSelectedIds([...new Set([...selectedIds, ...visibleIds])]);
    }
  };

  const removeWithAnimation = (ids) => {
    setRemovingIds(ids);
    setTimeout(() => {
      setDesigners((prev) => prev.filter((d) => !ids.includes(d.postnum)));
      setSelectedIds([]);
      setRemovingIds([]);
    }, REMOVE_MS);
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;
    try {
      await Promise.all(
        selectedIds.map((postnum) =>
          fetch(`http://localhost:8081/api/posts/unlike/${postnum}`, {
            method: "POST",
            credentials: "include",
          })
        )
      );
      removeWithAnimation([...selectedIds]);
    } catch (e) {
      console.error("선택 삭제 중 오류 발생:", e);
    }
  };

  const handleDeleteAll = async () => {
    if (designers.length === 0) return;
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
      removeWithAnimation(allIds);
    } catch (e) {
      console.error("전체 삭제 중 오류 발생:", e);
    }
  };

  const isAllVisibleSelected =
    filteredDesigners.length > 0 &&
    filteredDesigners.every((d) => selectedIds.includes(d.postnum));

  return (
    <div className="fav-wrap">
      <div className="fav-toolbar">
        <div className="fav-search">
          <FaSearch className="fav-search-icon" />
          <input
            type="text"
            placeholder="디자이너 이름 검색"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <select
          className="fav-select"
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
        >
          <option value="recent">최근 찜한 순</option>
          <option value="name">이름순</option>
        </select>
        <div className="fav-actions">
          <button
            type="button"
            className="fav-btn fav-btn-primary"
            onClick={handleDeleteSelected}
            disabled={selectedIds.length === 0}
          >
            선택 삭제
          </button>
          <button
            type="button"
            className="fav-btn fav-btn-danger"
            onClick={handleDeleteAll}
            disabled={designers.length === 0}
          >
            전체 삭제
          </button>
        </div>
      </div>

      <div className="fav-subbar">
        <label className="fav-check-all">
          <input
            type="checkbox"
            checked={isAllVisibleSelected}
            onChange={handleSelectAll}
          />
          전체 선택
        </label>
        <span className="fav-count">
          선택됨 <strong>{selectedIds.length}</strong>명 · 전체 {designers.length}명
        </span>
      </div>

      {sortedDesigners.length === 0 ? (
        <div className="fav-empty">
          <FaRegHeart className="fav-empty-icon" />
          <p>
            {designers.length === 0
              ? "아직 찜한 디자이너가 없어요."
              : "검색 결과가 없습니다."}
          </p>
        </div>
      ) : (
        <div className="fav-grid">
          {sortedDesigners.map((designer) => {
            const selected = selectedIds.includes(designer.postnum);
            const removing = removingIds.includes(designer.postnum);
            return (
              <div
                key={designer.postnum}
                ref={(el) => (cardRefs.current[designer.postnum] = el)}
                className={`fav-card${selected ? " selected" : ""}${
                  removing ? " removing" : ""
                }`}
              >
                <img
                  className="fav-avatar"
                  src={designer.image || designerimg}
                  alt={designer.id}
                />
                <div className="fav-info">
                  <h4>{designer.id}</h4>
                  <p>{designer.contents}</p>
                </div>
                <span
                  className={`fav-heart${selected ? " on" : ""}`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={selected}
                  aria-label={`${designer.id} 선택`}
                  onClick={() => handleSelect(designer.postnum)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSelect(designer.postnum);
                    }
                  }}
                >
                  <FaRegHeart className="heart-off" />
                  <FaHeart className="heart-on" />
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}