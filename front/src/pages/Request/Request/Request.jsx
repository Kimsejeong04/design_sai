import React from "react";
import axios from 'axios';
import styled from "styled-components";
import ContentHeader from '../ui/ContentHeader';
import ItemBox from './ui/ItemBox';
import {useState, useEffect} from 'react'
import SearchRequest from "../../../pages2/Request/SearchRequest";
import "./Request.css"
import RequestLayOut from "./RequestLayOut"

export default function Request({headerText = "의뢰 등록하기"}) {
   const [requestItems, setRequestItems] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
     const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가


  // localStorage에서 requestData 가져오기
  // useEffect(() => {
  //   const storedData = localStorage.getItem("requestData");
  //   if (storedData) {
  //     try {
  //       const parsedData = JSON.parse(storedData);
  //       if (Array.isArray(parsedData)) {
  //         setRequestItems(parsedData);
  //       }
  //     } catch (error) {
  //       console.error("requestData 파싱 오류:", error);
  //     }
  //   }
  // }, []);


  useEffect(() => {
    axios.get("http://localhost:8081/api/requests")
      .then(response => {
        setRequestItems(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("API 요청 실패:", err);
        setError("데이터를 불러오는 데 실패했습니다.");
        setLoading(false);
      });
  }, []);
const filteredItems = requestItems.filter((item) =>
    item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    
    <>
      <div className="clientrequest-header">
        <div className="clientrequest-titlecontainer">
          <h1>{headerText}</h1>
        <div><SearchRequest searchTerm={searchTerm} setSearchTerm={setSearchTerm} children={"의뢰제목 검색"}/></div>
        </div>
        <div className=""></div>
        <div className="cientrequest-titlecontainer2">
            <ContentHeader/></div>
        </div>
        <RequestLayOut>
        
 
        {filteredItems.length > 0 ? (
          // requestData가 있으면 동적으로 ItemBox 렌더링
          filteredItems.slice().reverse().map((item, index) => (
            <ItemBox key={index} data={item} /> 
            //props으로 "http://localhost:8081/api/requests"받아온 item data객체로 받음 
          ))
        ) : (
          // requestData가 없으면 기본 ItemBox 표시 또는 빈 상태
          <>
         
          </>
        )}
      </RequestLayOut>
    </>
  );
}