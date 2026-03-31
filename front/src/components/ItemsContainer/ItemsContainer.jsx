import React from "react";
import styled from "styled-components";

const itemContainer = styled``;

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  padding: 1.875rem 3.125rem;  /* 30px 50px */
  border: 0.05rem solid black;  /* 0.8px */
  position: relative;
  box-sizing: border-box;
`;

const ItemBox = styled.div`
  width: 100%;
  max-width: 16.125rem;
  height: 19.25rem;  /* 260px */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.625rem;  /* 10px */
  padding: 0.625rem;  /* 10px */
  background-color: ${(props) => (props.selected ? "#799fc4" : "white")};
  cursor: pointer;
`;

const InnerBox = styled.div`
  width: 95%;
  height: 78%;
  background-color: ${(props) => (props.selected ? "white" : "#799fc4")};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.625rem; 
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
`;

const ItemText = styled.div`
  font-weight: bold;
  font-size: 1.28rem;  /* 1.28rem */
  height: 2.1875rem;  /* 35px */
  color: ${(props) => (props.selected ? "#FFFFFF" : "#000000")};
`;

const NextButton = styled.button`
  position: absolute;
  width: 6.25rem;  /* 100px */
  height: 2.1875rem;  /* 35px */
  bottom: 1.25rem;  /* 20px */
  right: 1.875rem;  /* 30px */
  padding: 0.625rem 1.25rem;  /* 10px 20px */
  border: none;
  background-color: #9dbbd5;
  font-size: 0.925rem;  /* 14.8px */
  cursor: pointer;
  border-radius: 1.25rem;  /* 20px */
  text-align: center;

  &:hover {
    background-color: #bbb;
  }
`;

const ItemsContainer = ({ items, activeTab, selectedItem, setSelectedItem }) => {
  return (
    <itemContainer>
    <Container>
      {items[activeTab]?.map((item, index) => (
        <ItemBox
          key={index}
          selected={selectedItem?.item === item.name}
          onClick={() => setSelectedItem(item)}
        >
          <InnerBox
            selected={selectedItem?.item === item.name}
            image={item.image}
          />
          <ItemText selected={selectedItem?.item === item.name}>
            {item.name}
          </ItemText>
        </ItemBox>
      ))}
    </Container>
    </itemContainer>
  );
};

export default ItemsContainer;
