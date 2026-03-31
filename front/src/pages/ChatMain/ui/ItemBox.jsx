// 디자인 불러오기 맨투맨 ui 
import styled from "styled-components"
import "./ChatRoom.css"
const ItemBoxContainer = styled.div`
  border: 0.5px solid;
  width: 20vh;
  height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  padding: 10px;
  background-color: ${(props) => (props.selected ? "#799fc4" : "white")};
  cursor: pointer;
`;

const InnerBox = styled.div`
  width: 90%;
  height: 100%;
  background-color: ${(props) => (props.selected ? "white" : "#799fc4")};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`;

const ItemText = styled.div`
  font-weight: bold;
  height: 35px;
`;

export default function ItemBox ({text1, text2, onClick, className}) {
  const itemData = { text1, text2 }; // 아이템 데이터 객체 생성
  return (
    <div className={className}>
<ItemBoxContainer onClick={() => onClick?.({ text1, text2 })}>
<InnerBox/>
<ItemText>
{text1}
</ItemText>
<ItemText>
{text2}
</ItemText>
</ItemBoxContainer>
</div>
  )
}
