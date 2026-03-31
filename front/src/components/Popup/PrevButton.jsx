import React from "react";

const PrevButton = ({ onClick }) => {
  const buttonStyle = {
    width: "120px",
    height: "40px",
    backgroundColor: "#799fc4",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    margin: "20px 0 0 0",
    padding: "10px 20px",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
  };

  return (
    <button onClick={onClick} style={buttonStyle}>
      이전
    </button>
  );
};

export default PrevButton;
