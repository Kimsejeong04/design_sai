import React, { useState, useEffect } from "react";
import "./Clothes.css";
import { useNavigate } from "react-router-dom";
import { Sidebar, Tabs, ItemsContainer, BreadCrumb, NextButtonWithPopup } from '../../../../components';

const items = {
  상의: [
    // { name: "티셔츠(T-shirt)", image: "/image/Clothes-item/상의/T-shirt.jpg" },
    // { name: "맨투맨(Sweatshirt)", image: "/image/Clothes-item/상의/Sweatshirt.jpg" },
    // { name: "후드(Hoodie)", image: "/image/Clothes-item/상의/hoodie.jpg" },
    // { name: "집업(Zip-up Jersey)", image: "/image/Clothes-item/상의/Zip-up.jpg" },
    {
      name: "티셔츠(T-shirt)",
      image: "/image/Clothes-item/상의/T-shirt.jpg",
      color: null,
      ratio: null,
    },
    {
      name: "맨투맨(Sweatshirt)",
      image: "/image/Clothes-item/상의/Sweatshirt.jpg",
      color: null,
      ratio: null,
    },
    {
      name: "후드(Hoodie)",
      image: "/image/Clothes-item/상의/hoodie.jpg",
      color: null,
      ratio: null,
    },
    {
      name: "집업(Zip-up Jersey)",
      image: "/image/Clothes-item/상의/Zip-up.jpg",
      color: null,
      ratio: null,
    }
  ],
  아우터: [
    {
      name: "코트(Coat)",
      image: "/image/Clothes-item/아우터/coat.jpg",
      color: null,
      ratio: null,
    },
    {
      name: "자켓(Jacket)",
      image: "/image/Clothes-item/아우터/Jacket.jpg",
      color: null,
      ratio: null,
    }
  ],
  바지: [
    {
      name: "청바지(Jeans)",
      image: "/image/Clothes-item/바지/Jeans.jpg",
      color: null,
      ratio: null,
    },
    {
      name: "슬랙스(Slacks)",
      image: "/image/Clothes-item/바지/Slacks.jpg",
      color: null,
      ratio: null,
    },
    {
      name: "조거팬츠(Jogger Pants)",
      image: "/image/Clothes-item/바지/JoggerPants.jpg",
      color: null,
      ratio: null,
    }
  ],
  원피스: [
    {
      name: "미니 원피스(Mini dress)",
      image: "/image/Clothes-item/원피스/MiniDress.jpg",
      color: null,
      ratio: null,
    },
    {
      name: "맥시 원피스(Maxi dress)",
      image: "/image/Clothes-item/원피스/MaxiDress.jpg",
      color: null,
      ratio: null,
    }
  ],
  스커트: [
    {
      name: "미니 스커트(Mini skirt)",
      image: "/image/Clothes-item/치마/MiniSkirt.jpg",
      color: null,
      ratio: null,
    },
    {
      name: "롱 스커트(Long skirt)",
      image: "/image/Clothes-item/치마/LongSkirt.jpg",
      color: null,
      ratio: null,
    }
  ],
  스니커즈: [
    {
      name: "러닝화(Running shoes)",
      image: "/image/Clothes-item/스니커즈/RunningShoes.jpg",
      color: null,
      ratio: null,
    },
    {
      name: "하이탑(High-top shoes)",
      image: "/image/Clothes-item/스니커즈/high-topShoes.jpg",
      color: null,
      ratio: null,
    }
  ],
  신발: [
    {
      name: "로퍼(Loafers)",
      image: "/image/Clothes-item/신발/loafers.jpg",
      color: null,
      ratio: null,
    },
    {
      name: "샌들(Sandals)",
      image: "/image/Clothes-item/신발/sandals.jpg",
      color: null,
      ratio: null,
    }
  ],
  가방: [
    {
      name: "백팩(BackPack)",
      image: "/image/Clothes-item/가방/backpack.jpg",
      color: null,
      ratio: null,
    },
    {
      name: "토트백(Tote bag)",
      image: "/image/Clothes-item/가방/ToteBag.jpg",
      color: null,
      ratio: null,
    }
  ],
  // ... 나머지 items
};

const Clothes = () => {
  const navigate = useNavigate();
  const categories = Object.keys(items);
  const [activeTab, setActiveTab] = useState(0);

  const [selectedItem, setSelectedItem] = useState(() => {
    const stored = localStorage.getItem("selectedClothing");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === "object" && "category" in parsed && "item" in parsed) {
          return parsed;
        }
        console.warn("잘못된 localStorage 데이터 형식, 초기화합니다.");
        localStorage.removeItem("selectedClothing");
        return null;
      } catch (e) {
        console.error("localStorage 데이터 파싱 오류:", e);
        localStorage.removeItem("selectedClothing");
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (selectedItem) {
      localStorage.setItem("selectedClothing", JSON.stringify(selectedItem));
    }
  }, [selectedItem]);

  const handleNext = () => {
    if (!selectedItem) {
      alert("의류를 선택해주세요!");
      return;
    }

    console.log("✅ 다음 페이지로 이동:", selectedItem);
    navigate("/fabric");
  };

  return (
    <div className="clothes-container">
      <div className="layout1">
        <aside>
          <Sidebar activePage={1} />
        </aside>
        <div className="content1">
          <BreadCrumb activePage={1} />
          <h3>1. 의류 종류 선택</h3>
          <hr />
          <br />
          <Tabs categories={categories} activeTab={activeTab} setActiveTab={setActiveTab} />
          <ItemsContainer
            items={items}
            activeTab={categories[activeTab]}
            selectedItem={selectedItem}
            setSelectedItem={(item) => {
              const selectedCategory = categories[activeTab];
              setSelectedItem({
                category: selectedCategory,
                item: item.name,
                name: `${selectedCategory} - ${item.name}`,
              });
            }}
          />
          <div className="footer">
            <NextButtonWithPopup
              selectedItems={selectedItem ? [selectedItem] : []}
              nextRoute="/client/fabric"
              showDetail={false}  // ⬅ 이게 핵심!
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clothes;
