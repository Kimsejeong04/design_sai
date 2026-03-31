import React from "react";
import ClientMypageLayout from "../../../layouts/ClientMypageLayout";
import MyDesignsRequests from "../../../components/Mypage/MyDesignsRequests/MyDesignsRequests";
import { PenLine } from "lucide-react";

const MyDesignsRequestsPage = () => {
  return (
    <ClientMypageLayout
      title="디자인 & 의뢰"
      breadcrumb="마이페이지 > 디자인 & 의뢰"
      description="의뢰한 디자인 내역을 확인하고 관리할 수 있어요."
      icon={PenLine}
    >
      <MyDesignsRequests />
    </ClientMypageLayout>
  );
};

export default MyDesignsRequestsPage;
