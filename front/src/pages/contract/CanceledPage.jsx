import Canceledlist from "./Canceledlist";
import ContractLayout from "../../layouts/ContractLayout";
import React,  {useEffect,useState} from "react"
import {useLocation} from "react-router-dom"

export default  function CanceledPage() {
const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const triggerCanceledList = searchParams.get("triggerCanceledList") === "true";
  // const contract = searchParams.get("contract") ? JSON.parse(searchParams.get("contract")) : null;
  // const [isListGenerated, setIsListGenerated] = useState(false);
  const [items, setItems] = useState([]);



  useEffect(() => {
    // 1) localStorage에서 배열로 읽어오기
    const rawArr = localStorage.getItem("canceledRequests");
    if (rawArr) {
      try {
        setItems(JSON.parse(rawArr));
      } catch (e) {
        console.error("canceledRequests parsing error:", e);
      }
    }
  }, []);
 

  return (
    <div>
  <ContractLayout>
    
     {items.length === 0 
        ? (
          <p style={{ padding: 16 }}>
            취소된 요청이 없습니다.
          </p>
        ) 
        : (
          items.map(item => (
            <Canceledlist key={item.id} item={item} />
          ))
        )
      }

  </ContractLayout>
    </div>
  )
}