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
    padding: "0",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <button onClick={onClick} style={buttonStyle}>
      이전
    </button>
  );
};

export default PrevButton;
