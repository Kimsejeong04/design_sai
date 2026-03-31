// MessageDetailPage.jsx
import { useLocation } from "react-router-dom";
import ContractLayout from '../../layouts/ContractLayout.jsx'
import MessageDetail from './SendMessageUi/MessageDetail.jsx'
import MessageList from './SendMessageUi/Message/MessageList.jsx'

export default function MessageDetailPage() {
  const { state } = useLocation();
  const {contract, content, time, id} = state || {}; // state가 undefined일 수 있으므로 기본값 설정
  console.log("MessageDetailPage: Received contract:", contract);
  console.log("MessageDetailPage: Received state:", state);
  console.log("MessageDetailPage: Extracted values - contract:", contract, "content:", content, "time:", time, "id:", id);

  return (
    <div>
      <ContractLayout>
        
        <MessageDetail
        contract={contract}
        content={content}
        time={time}
        id={id}
          />
        {/* 현재 계약을 제외한 다른 계약 메시지 리스트 표시 */}
        {contract && <MessageList excludeContractId={contract.id} />}
      </ContractLayout>
    </div>
  );
}