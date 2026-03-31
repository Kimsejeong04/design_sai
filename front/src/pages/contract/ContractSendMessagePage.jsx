import React, { useEffect, useState } from 'react';
import ContractLayout from "../../layouts/ContractLayout";
import MessageHeader from "./SendMessageUi/Message/MessageHeader";
import Message from './SendMessageUi/Message/Message';

export default function ContractSendMessagePage() {
  // 1) 로컬스토리지 dratfRequest 키에서 드래프트 메시지를 불러와 상태에 저장
  const [messages, setMessages] = useState([]);

  
  const [clientId, setClientId] = useState(null);//6.9
  const [loading, setLoading] = useState(true);//6.9
  const [error, setError] = useState(null);//6.9

  // useEffect(() => {
  //   const raw = localStorage.getItem("dratfRequest");
  //   if (!raw) return;

  //   try {
  //     const { contractMessage } = JSON.parse(raw);
  //     // contractMessage 객체를 배열로 만들어 메시지 리스트에 세팅
  //     setMessages([contractMessage]);
  //     // 읽고 나서 삭제하려면 아래 코드 주석 해제
  //     // localStorage.removeItem("dratfRequest");
  //   } catch (e) {
  //     console.error("dratfRequest 파싱 오류:", e);
  //   }
  // }, []);

    useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("http://localhost:8081/api/user", {
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          console.log("세션 사용자 정보:", data);
          setClientId(data.username); // 세션에서 가져온 clientId
        } else {
          setError("로그인이 필요합니다.");
        }
      } catch (err) {
        console.error("세션 요청 오류:", err);
        setError("세션 정보를 가져오지 못했습니다.");
      }
    };

    fetchSession();
  }, []);

   // ✅ clientId가 있을 때 메시지 가져오기
  useEffect(() => {
    if (!clientId) return;

    const fetchMessages = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:8081/api/request-messages/sent`, {
          method: 'GET',
          credentials: 'include', // ✅ 세션 쿠키 포함
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          },
          cache: 'no-store'
        });

        if (!res.ok) {
          const errorData = await res.json();
          console.error("API 에러:", errorData);
          setError(`메시지 로딩 실패: ${res.status}`);
        } else {
          const data = await res.json();
          setMessages(data);
        }
      } catch (e) {
        console.error("Fetch 오류:", e);
        setError("메시지를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [clientId]);

  // 날짜 포맷 함수
  function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return (
    // <ContractLayout>
    //   <MessageHeader />
    //   {messages.length > 0 ? (
    //     messages.map((msg) => (
    //       <Message
    //         key={msg.id}
    //         contract={msg.contract}
    //         content={msg.content}
    //         time={msg.time}
    //         id={msg.id}
    //       />
    //     ))
    //   ) : (
    //     <p style={{ padding: '16px', textAlign: 'center' }}>전송할 메시지가 없습니다.</p>
    //   )}
    // </ContractLayout>
    <ContractLayout>
      <MessageHeader />
      {loading ? (
        <p style={{ padding: '16px', textAlign: 'center' }}>불러오는 중...</p>
      ) : error ? (
        <p style={{ color: 'red', padding: '16px', textAlign: 'center' }}>{error}</p>
      ) : messages.length > 0 ? (
        messages.map((msg) => (
          <Message
            key={msg.id}
            contract={msg.contractTitle}
            content={msg.content}
            time={formatDate(msg.sentTime)}
            id={msg.id}
            designer={msg.designerId || msg.designerName}
          />
        ))
      ) : (
        <p style={{ padding: '16px', textAlign: 'center' }}>보낸 메시지가 없습니다.</p>
      )}
    </ContractLayout>
  );
}
