import React from "react";
import { Routes, Route } from "react-router-dom";
import ClientLayout from "./ClientLayout";
import DesignerLayout from "./DesignerLayout";
import { Mainp, CosMain, BrandDP, Clothes, Fabric, Size, Upload, FinalConfimation, Request, RequestWriting, RequestPost, ChatMain, ChoseDesigner, SignIn, SignIn2} from "./pages";
import Home from "./pages/Home";
import Welcome from './pages/Login/Welcome';
import Back from './Back';
import DesignerCosMain from './pages/DesignerCosMain/DesignerCosMain';
import Dmypage from "./pages2/Mypage/Dmypage";
import Portfolio from './pages2/Mypage/Portfolio';
import ReportPage from './pages/ChatMain/ReportPage';
import FavoriteDesignersPage from "./pages/MyPage/FavoriteDesigners/FavoriteDesignersPage";
import MyInfoPage from "./pages/MyPage/MyInfoPage";
import MyDesignsRequestsPage from "./pages/MyPage/MyDesignsRequests/MyDesignsRequestsPage";
import ContractPage from "./pages/contract/ContractPage";
import StarredPage from "./pages/contract/StarredPage";
import SignSucess from './pages/Login/SignSucess';
import DesignerContractManagePage from "./pages/DesignerContract/DesignerContractManagePage";
import DesignerContractCreatePage from "./pages/DesignerContractCreate/DesignerContractCreatePage";
import ContractDetailPage from "./pages/contract/ContractDetailPage";
import ContractList from "./components/contract/ContractList/ContractList";
import ContractSendMessagePage from './pages/contract/ContractSendMessagePage';
import MessageDetailPage from './pages/contract/MessageDetailPage';
import GoodSignUp from './pages/Login/GoodSignUp';
import CanceledPage from "./pages/contract/CanceledPage";
import MyProgressPage from "./pages/MyPage/MyProgressPage";
import WrittenReviewPage from './pages/MyPage/WrittenReviewPage';

import DesignerRequest from "./pages2/Request/DesignerRequest";
import DesignerRequestPost from "./pages2/Request/DesignerRequestPost"
import OngoingRequestsPage from "./pages2/Mypage/OngoingRequestsPage";
import CompletedRequestPage from "./pages2/Mypage/CompletedRequestPage";
import EditRequestsPage from "./pages2/Mypage/EditRequestsPage";
import DesignerContractList from "./components/DesignerContract/DesignerContractList/DesignerContractList";
import DContractDetail from "./components/DesignerContract/DesignerContractList/DContractDetail";
import DMyInfoPage from "./pages2/Mypage/DMyInfoPage";
import DeliveryPage from "./pages2/Mypage/DeliveryPage";
import DeliveryDetail from "./pages2/Mypage/ui/Delivery/DeliveryDetail";
import dummyDeliveries from './pages2/Mypage/ui/Delivery/dummyDeliveries';
import DesignerReceivedReviewsPage from "./pages2/Mypage/DesignerReceivedReviewsPage";
import ClothesTest from "./pages/selfdesign/Template/Size/ClothesPants/ClothesTest";
import DeliveryRegister from "./pages2/Mypage/ui/Delivery/DeliveryRegister";
import DeliveryTracking from "./pages2/Mypage/ui/Delivery/DeliveryTracking";
import FavoritePage from "./pages2/Mypage/FavoritePage";
import FavoriteRequests from "./components/Request/FavoriteRequests"; 
import ProductionListPage from "./pages2/Mypage/ProductionListPage";

const RouterComponent = () => {
  

  return (
    <Routes>
      {/* 루트 경로 */}
      <Route path="/" element={<Mainp />} />
      <Route path="Welcome" element={<Welcome />} />
      <Route path="SignIn" element={<SignIn />} />
      <Route path="SignIn2" element={<SignIn2 />} />
      <Route path="SignSucess" element={<SignSucess />} />
      <Route path="/contracts" element={<ContractList />} /> {/* 최상위 경로로 이동 */}
      <Route path="/GoodSign" element={<GoodSignUp />} />

      {/* 의뢰인 페이지 경로 */}
      <Route
        path="/client/*"
        element={
          <ClientLayout>
            <Routes>
              <Route path="/" element={<Mainp />} />
              <Route path="CosMain" element={<CosMain />} />
              <Route path="BrandDP" element={<BrandDP />} />
              <Route path="Clothes" element={<Clothes />} />
              <Route path="Fabric" element={<Fabric />} />
              <Route path="Size" element={<Size />} />
              <Route path="Upload" element={<Upload />} />
              <Route path="FinalConfirmation" element={<FinalConfimation />} />
              <Route path="Request" element={<Request />} />
              <Route path="RequestWriting" element={<RequestWriting />} />
              <Route path="RequestPost" element={<RequestPost />} />
              <Route path="Home" element={<Home />} />
              <Route path="ChatMain" element={<ChatMain />} />
              <Route path="ReportPage" element={<ReportPage />} />
              <Route path="ChoseDesigner" element={<ChoseDesigner />} />
              <Route path="FavoriteDesigners" element={<FavoriteDesignersPage />} />
              <Route path="FavoriteDesignersPage" element={<FavoriteDesignersPage />} />
              <Route path="MyInfo" element={<MyInfoPage />} />
              <Route path="MyDesignsRequests" element={<MyDesignsRequestsPage />} />
              <Route path="contract" element={<ContractPage />} />
              <Route path="starred" element={<StarredPage />} />
              <Route path="contract/:id" element={<ContractDetailPage />} /> {/* /client은 제외 */}
              <Route path="contract/MessageDetailPage/:id" element={<MessageDetailPage />} /> {/* MessageDetail 경로 추가 */}
              <Route path="ContractSendMessagePage" element={<ContractSendMessagePage />} />
              <Route path="ContractSendMessagePage/:id" element={<ContractSendMessagePage />} />
              <Route path="ContractDetailPage" element={<ContractDetailPage />} />
              <Route path="CanceledPage" element={<CanceledPage /> } />
              <Route path="MyProgressPage" element={<MyProgressPage />} />
              <Route path="WrittenReviewPage" element={<WrittenReviewPage />} />
              <Route path="ClothesText" element={<ClothesTest/>} />
            </Routes>
          </ClientLayout>
        }
      />

      {/* 디자이너 페이지 경로 */}
      <Route path="/designer/*" 
        element={
        <DesignerLayout>
          <Routes>
            <Route path="DesignerCosMain" element={<DesignerCosMain />} />
            <Route path="Back" element={<Back />} />
            <Route path="Dmypage" element={<Dmypage />} />
            <Route path="Portfolio" element={<Portfolio />} />
            <Route path="DesignerContractManage" element={<DesignerContractManagePage />}/>
            <Route path="DesignerContractCreate" element={<DesignerContractCreatePage />}/>
            <Route path="DesignerRequest" element={<DesignerRequest /> } />
            <Route path="DesignerRequestPost" element={<DesignerRequestPost />} />
            <Route path="OngoingRequests" element={<OngoingRequestsPage/>}/>
            <Route path="CompletedRequest" element={<CompletedRequestPage/>}/>
            <Route path="EditRequests" element={<EditRequestsPage/>}/>
            <Route path="DContractDetail" element={<DContractDetail/>}/>
            <Route path="DesignerContractList" element={<DesignerContractList/>}/>
            <Route path="designer/contract/:roomId" element={<DContractDetail/>}/>
            <Route path="DMyInfo" element={<DMyInfoPage/>}/>
            <Route path="Delivery" element={<DeliveryPage/>}/>
            <Route path="DesignerReceivedReviews" element={<DesignerReceivedReviewsPage />} />
            <Route path="Delivery/detail" element={<DeliveryDetail />} />
            <Route path="delivery/register/:contractId" element={<DeliveryRegister />} />
            <Route path="delivery/tracking/:contractId" element={<DeliveryTracking />} />
            <Route path="FavoritePage" element={<FavoritePage />}/>
            <Route path="FavoriteRequests" element={<FavoriteRequests />} />
            <Route path="ProductionList" element={<ProductionListPage/>}/>
            <Route path="ChatMain" element={<ChatMain />} />
           </Routes>
        </DesignerLayout>
      } />
    </Routes>
  );
};

export default RouterComponent;