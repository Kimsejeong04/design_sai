// src/pages/MyPage/FavoriteDesignersPage.jsx
import React from "react";
import ClientMypageLayout from "../../../layouts/ClientMypageLayout";
import FavoriteDesigners from "../../../components/Mypage/FavoriteDesigners/FavoriteDesigners";
import { Heart } from "lucide-react";

const FavoriteDesignersPage = () => {
    return (
        <ClientMypageLayout
        title="찜한 디자이너"
        breadcrumb="마이페이지 > 찜한 디자이너"
        icon={Heart}
        >
            <FavoriteDesigners />
        </ClientMypageLayout>
    );
  };
  
  export default FavoriteDesignersPage;