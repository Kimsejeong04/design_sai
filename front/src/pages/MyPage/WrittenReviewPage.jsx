import React, { useState } from "react";
import ClientMypageLayout from "../../layouts/ClientMypageLayout";
import './MyPage.css'
import WrittenReviewContent from "./WrittenReview/WrittenReviewContent";

const WrittenReviewPage = () => {

  return (
    <ClientMypageLayout>
      <WrittenReviewContent/>
    </ClientMypageLayout>
  );
};

export default WrittenReviewPage;
