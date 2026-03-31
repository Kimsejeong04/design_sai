import React, { useEffect, useState } from "react";
import ContractLayout from "../../layouts/ContractLayout";
import ContractList from "../../components/contract/ContractList/ContractList";
import axios from 'axios';

const StarredPage = () => {
  const [starredContracts, setStarredContracts] = useState([]);

  useEffect(() => {
    const savedContracts = localStorage.getItem('starredContracts');
    if (savedContracts) {
      setStarredContracts(JSON.parse(savedContracts));  // 로컬 저장소에서 중요 계약 목록 가져오기
    } else {
      // 중요 계약 목록이 로컬 저장소에 없으면 API로 가져오기
      axios.get('http://localhost:8081/client/contract')
        .then(response => {
          const starred = response.data.filter(contract => contract.starredStatus === true);
          setStarredContracts(starred);
          localStorage.setItem('starredContracts', JSON.stringify(starred));  // 로컬 저장소에 저장
        })
        .catch(error => console.error('계약 목록 불러오기 실패:', error));
    }
  }, []);

  return (
    <ContractLayout>
      <div className="p-6">
        <ContractList
          mode="중요"
          contracts={starredContracts}
        />
      </div>
    </ContractLayout>
  );
};

export default StarredPage;
