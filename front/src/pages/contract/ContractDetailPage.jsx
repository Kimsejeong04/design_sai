import { useParams, useLocation, useNavigate } from "react-router-dom";
import ContractLayout from "../../layouts/ContractLayout";
import DetailList from "./DetailUi/DetailList.jsx";
import { useState } from "react";

export default function ContractDetailPage() {
  const { id } = useParams();  // URL에서 contractId 추출
  const { state } = useLocation();  // 다른 상태에서 전달된 데이터 받기
  const navigate = useNavigate();

  // 상태 초기화
  const [starredStatus, setstarredStatus] = useState(state?.contract?.starredStatus ?? false);
  const toggleStar = () => setstarredStatus(!starredStatus);

  const contract = {
    ...state?.contract,
    starredStatus: starredStatus,
  };

  return (
    <div>
      <ContractLayout>
        <DetailList contractId={id} contract={contract} onToggleStar={toggleStar} />
      </ContractLayout>
    </div>
  );
}
