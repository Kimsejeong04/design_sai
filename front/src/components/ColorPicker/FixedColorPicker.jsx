import React, { useState } from "react";
import { BlockPicker } from "react-color";
import "./FixedColorPicker.css";

const colorLabels = {
  "#ff0000": "빨강",
  "#00ff00": "초록",
  "#0000ff": "파랑",
  "#ff9900": "주황",
  "#0099ff": "하늘",
};

const FixedColorPicker = ({
  initialColor = "#ff0000",
  onColorChange,
  presetColors = ["#ff0000", "#00ff00", "#0000ff", "#ff9900", "#0099ff"],
}) => {
  const [color, setColor] = useState(initialColor);

  const handleChangeComplete = (colorResult) => {
    setColor(colorResult.hex);
    if (onColorChange) {
      onColorChange(colorResult.hex);
    }
  };

  return (
    <div className="color-picker-container">
      <BlockPicker
        className="custom-block-picker"
        width={120}
        color={color}
        colors={presetColors}
        onChangeComplete={handleChangeComplete}
      />

      {/* 원하는 위치에 내가 만든 라벨 표시 */}
      <div className="color-label">
        {colorLabels[color] ?? color /* 색상 이름 매핑, 없으면 hex */}
      </div>
    </div>
  );
};

export default FixedColorPicker;
