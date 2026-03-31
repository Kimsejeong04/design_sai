import React, { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useNavigate } from "react-router-dom";
import "./ChatRoom.css"; 
const ChatPage = ({ roomId, messages, setMessages }) => {
  const [client, setClient] = useState(null);
  const [message, setMessage] = useState("");
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState(null); // ✅ 방 정보 상태 추가
  const messageEndRef = useRef(null);
  const navigate = useNavigate();
  // const hasJoined = useRef(false); // 입장 메시지 중복 방지를 위한 플래그
    useEffect(() => {
    console.log("URL에서 받은 roomId:", roomId);
  }, [roomId]);

  useEffect(() => {
    const checkSessionAndLoadMessages = async () => {
      try {
        const res = await fetch("http://localhost:8081/api/checkSession", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.username) {
          setUsername(data.username);

          const msgRes = await fetch(`http://localhost:8081/api/messages/${roomId}`);
          const msgs = await msgRes.json();
          // setMessages(msgs); // 이전 메시지 저장

          const loadedMessages = Array.isArray(msgs) ? msgs : [];
          // 서버에서 가져온 메시지(msg)를 배열로 먼저 처리 하고 msg가 배열로 아닌경우 빈 배열로 초기화 
          setMessages((prev) => { //setMessages를 사용하여 상태 업데이트, // prev는 이전 상태를 나타냄 
             
            const prevMessages = Array.isArray(prev) ? prev : [];
            // 중복 입장 메시지 필터링
            const filteredLoadedMessages = loadedMessages.filter(
              (msg) => !(msg.type === "JOIN" && msg.sender === data.username)
            );
            return [...filteredLoadedMessages, ...prevMessages];
          });

          const roomRes = await fetch(`http://localhost:8081/api/rooms/${roomId}`);
          const roomData = await roomRes.json();
          setRoom(roomData);
          console.log("룸데이터터:", roomData);
          
        } else {
          alert("로그인이 필요합니다.");
          navigate("/");
        }
      } catch (err) {
        console.error("세션 확인 실패:", err);
        alert("세션 확인 중 오류 발생");
        navigate("/");
      }
    };
    checkSessionAndLoadMessages();
  
  // , [roomId, navigate, setMessages]); // username 의존성 제거

  // useEffect(() => {
    
    if (!username) return; // 이미 client가 있으면 재연결 방지 if (!username || client) return;

    const socket = new SockJS("http://localhost:8081/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("WebSocket 연결 성공");

        stompClient.subscribe(`/topic/chat/${roomId}`, (msg) => {
          const receivedMessage = JSON.parse(msg.body);
          //setMessages((prev) => [...prev, receivedMessage]);  //텍스트중복
        });
          // 중복 입장 메시지 방지
          // if (receivedMessage.type === "JOIN" && receivedMessage.sender === username && hasJoined.current) {
          //   return;
          // }
        //   setMessages((prev) => {
        //     const prevMessages = Array.isArray(prev) ? prev : [];
        //     return [...prevMessages, receivedMessage];
        //   });
        //   if (receivedMessage.type === "JOIN" && receivedMessage.sender === username) {
        //     hasJoined.current = true;
        //   }
        // });

        stompClient.publish({
          destination: `/app/chat.addUser/${roomId}`,
          body: JSON.stringify({
            sender: username,
            content: `${username} 님이 입장하셨습니다.`,
            type: "JOIN",
          }),
        });

        setConnected(true);
      },
      onDisconnect: () => {
        console.log("WebSocket 연결 종료");
        setConnected(false);
        // hasJoined.current = false; // 연결 해제 시 플래그 초기화
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
      setClient(null);
    };
  }, [username, roomId]); // setMessages 제거

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" }); {/*messageEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });*/}
    }
  }, [messages]);

  const sendMessage = () => {
    if (client && connected && message.trim() !== "") {
      const newMessage = { sender: username, content: message, type: "CHAT" };
      client.publish({
        destination: `/app/chat.sendMessage/${roomId}`,  // ✅ 전송 주소 수정
        body: JSON.stringify(newMessage),
      });
      // setMessages 호출 제거: WebSocket에서 수신된 메시지만 추가됨
      setMessage("");
    }
  };

  const handleLogout = async () => {
    try {
      // WebSocket으로 퇴장 메시지 전송
      if (client && connected) {
        client.publish({
          destination: "/app/chat",  /*destination: `/app/chat.sendMessage/${roomId}`, 이게머지*/
          body: JSON.stringify({
            sender: username,
            content: `${username} 님이 퇴장하셨습니다.`,
            type: "LEAVE",
          }),
        });
      }
      await fetch("http://localhost:8081/api/logout", {
        method: "POST",
        credentials: "include",
      });
      navigate("/"); // 로그아웃 후 홈으로
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  const handleLeave = () => {
    if (client && connected) {
      client.publish({
        destination: `/app/chat.sendMessage/${roomId}`,
        body: JSON.stringify({
          sender: username,
          content: `${username} 님이 나가셨습니다.`,
          type: "LEAVE",
          roomId: roomId,
        }),
      });
    }
    navigate("/EnterChatRoom"); // 목록 페이지로 이동
  };
  const handleDeleteRoom = async () => {
    const confirmDelete = window.confirm("정말 이 채팅방을 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:8081/api/rooms/delete/${roomId}`, {
        method: "DELETE",
        credentials: "include",
      });

      navigate("/EnterChatRoom");
    } catch (error) {
      console.error("채팅방 삭제 실패:", error);
      alert("삭제에 실패했습니다.");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    // FormData 내용 로그 출력
     formData.forEach((value, key) => {
      console.log(key, value);
    });
    
    const res = await fetch("http://localhost:8081/files/upload", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const uploadedFileName = await res.text();
    if (client && connected) {
      client.publish({
        destination: `/app/chat.sendMessage/${roomId}`,
        body: JSON.stringify({
          sender: username,
          type: "IMAGE",
          fileName: uploadedFileName.split(": ")[1],
          roomId: roomId,

        }),

      });

    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:8081/files/upload", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const uploadedFileName = await res.text();
    if (client && connected) {
      client.publish({
        destination: `/app/chat.sendMessage/${roomId}`,
        body: JSON.stringify({
          sender: username,
          type: "FILE",
          fileName: uploadedFileName.split(": ")[1],
          roomId: roomId,
        }),
      });
    }
  };

  

  return (
    <div>
      <style>
        {`
          .custom-scroll {
            height: 500px;
            width: 100%;
            overflow-y: auto;
            scrollbar-width: none;
            -ms-overflow-style: none;
            display: flex;
            flex-direction: column;
          }
          .custom-scroll::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      {room && room.creator === username && (
        <button onClick={handleDeleteRoom}>채팅방 삭제</button>
      )}

      <div className="custom-scroll">
        {Array.isArray(messages) ? (
          messages.length > 0 ? (
            messages.map((msg, index) => {
              if (msg.type === "IMAGE") {
                return (
                  <p key={index} className="message image"> 
                    <strong>{msg.sender}:</strong>
                    <br />
                    <img
                      src={`http://localhost:8081/files/view/${msg.fileName}`}
                      alt="업로드 이미지"
                      style={{ maxWidth: "200px" }}
                    />
                  </p>
                );
              } else if (msg.type === "FILE") {
                return (
                  <p key={index} className="message file">
                    <strong>{msg.sender}:</strong>
                    <br />
                    <a
                      href={`http://localhost:8081/files/view/${msg.fileName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={msg.fileName}
                    >
                      {msg.fileName}
                    </a>
                  </p>
                );
              } else if (msg.component) {
                return (
                  <div key={index} className="message sent" style={{ margin: "5px 0" }}>
                    {React.cloneElement(msg.component, { visible: msg.visible })}
                    {msg.time && (
                      <span style={{ fontSize: 12, color: "#666", marginLeft: 8 }}>
                        {msg.time}
                      </span>
                    )}
                  </div>
                );
              } else {
                return (
                  <p key={index} className="message chat">
                    <strong>{msg.sender}:</strong> {msg.content}
                  </p>
                );
              }
            })
          ) : (
            <p>메시지가 없습니다.</p>
          )
        ) : (
          <p>메시지 로딩 중...</p>
        )}
        <div ref={messageEndRef} />
      </div>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="메시지 입력"
      />
      <button onClick={sendMessage}>전송</button>
      <br />
      <button onClick={() => document.getElementById("image-upload").click()}>
        이미지 업로드
      </button>
      <input
        type="file"
        accept="image/*"
        id="image-upload"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
      <button onClick={() => document.getElementById("file-upload").click()}>
        파일 업로드
      </button>
      <input
        type="file"
        id="file-upload"
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default ChatPage;
