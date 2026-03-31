import React from "react";
import ClientMypageLayout from "../../layouts/ClientMypageLayout";
import MyInfo from "../../components/Mypage/MyInfo/MyInfo";
import { User } from "lucide-react";

const MyInfoPage = () => {
    return (
        <ClientMypageLayout
            title="내 정보"
            breadcrumb="마이페이지 > 내 정보"
            description="나의 정보를 확인하고 관리할 수 있어요."
            icon={User}
        >
            <MyInfo />
        </ClientMypageLayout>
    );
  };
  
  export default MyInfoPage;