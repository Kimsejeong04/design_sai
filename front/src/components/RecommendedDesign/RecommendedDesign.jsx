// RecommendedDesign.jsx
import React from "react";
import "./RecommendedDesign.css";

const designList = [
    {
        id: 1,
        image: "/image/RecommendDesign/추천디자인1.jpg",
        title: "모던 자켓 스타일",
        text: "#상의 #자켓 #모던"
    },
    {
        id: 2,
        image: "/image/RecommendDesign/추천디자인2.jpg",
        title: "캐주얼 후디",
        text: "#상의 #후드티 #편안함"
    },
    {
        id: 3,
        image: "/image/RecommendDesign/추천디자인3.jpg",
        title: "오버핏 셔츠",
        text: "#상의 #셔츠 #오버핏"
    },
    {
        id: 4,
        image: "/image/RecommendDesign/추천디자인4.jpg",
        title: "클래식 블레이저",
        text: "#상의 #블레이저 #클래식"
    },
    {
        id: 5,
        image: "/image/RecommendDesign/추천디자인5.jpg",
        title: "크롭 니트",
        text: "#상의 #니트 #크롭"
    },
    {
        id: 6,
        image: "/image/RecommendDesign/추천디자인6.jpg",
        title: "트렌치 스타일",
        text: "#상의 #트렌치코트 #봄"
    }
];

const RecommendedDesign = () => {
    return (
        <div className="RecommendedDesign-container">
            {designList.map((design) => (
                <div className="RecommDes" key={design.id}>
                    <div className="RecommDesImg">
                        <img src={design.image} alt={design.title} />
                    </div>
                    <div className="RecommDes2">
                        <h3 className="RecommDes-title">{design.title}</h3>
                        <p className="RecommDes-text">{design.text}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RecommendedDesign;
