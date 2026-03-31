import React from "react";
import styles from "./DesignerContractCreate.module.css";

const DesignerContractInputSection = ({ contractData, setContractData, handleFeeChange }) => {
  // 계약 의뢰
  const handleContractTitleChange = (e) => {
    setContractData({ ...contractData, contractTitle: e.target.value });
  };

  const handleClientNameChange = (e) => {
    setContractData({ ...contractData, clientId: e.target.value });
  };

  const handleStartDateChange = (e) => {
    setContractData({ ...contractData, startDate: e.target.value });
  };

  const handleEndDateChange = (e) => {
    setContractData(prev => ({
      ...prev,
      endDate: e.target.value,
      dueDate: e.target.value
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputRow}>
        <label className={styles.label}>
          의뢰 제목 <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          value={contractData.contractTitle || ""}
          placeholder="계약 의뢰를 입력하세요"
          className={styles.input}
          onChange={handleContractTitleChange}
        />
        <button className={styles.browseButton}>찾아보기</button>
      </div>

      <div className={styles.inputRow}>
        <label className={styles.label}>
          계약인(의뢰인) <span style={{ color: "red" }}>*</span>
        </label>
        <input autoFocus
          type="text"
          value={contractData.clientId || ""}
          name="clientName"
          placeholder="계약인 이름을 입력하세요"
          className={styles.input}
          onChange={handleClientNameChange}
        />
      </div>

      <div className={styles.inputRow}>
        <label className={styles.label}>
          계약 기간 <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="date"
          value={contractData.startDate || ""}
          className={styles.dateInput}
          onChange={handleStartDateChange}
        />
        ~
        <input
          type="date"
          value={contractData.endDate || ""}
          className={styles.dateInput}
          onChange={handleEndDateChange}
        />
      </div>

      <div className={styles.inputRow}>
        <label className={styles.label}>
          계약금 <span style={{ color: "red" }}>*</span>
        </label>
        <div className={styles.moneyWrapper}>
          <input
            type="text"
            value={contractData.requestFee || ""}
            placeholder="계약금을 입력하세요"
            className={styles.moneyInput}
            onChange={handleFeeChange}
          />
          <span className={styles.moneyUnit}>₩</span>
        </div>
      </div>
    </div>
  );
};

export default DesignerContractInputSection;