import React from "react";
import styled from "styled-components";

const TabsWrapper = styled.ul`
  display: flex;
  width: 100%; 
  list-style: none;
  padding: 0;
  margin: 0;
  border-bottom: 0.125rem solid #ddd; 
  text-align: center;

  li {
    width: 8.75rem;
    padding: 0.625rem 0.9375rem;
    cursor: pointer;
    border-radius: 0.9375rem 0.9375rem 0 0; 
    border: 0.05rem solid black; 
    border-bottom: none;
    background-color: #fff;
    font-weight: bold;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  li.active {
    background-color: #eee;
  }
`;

const Tabs = ({ categories, activeTab, setActiveTab }) => {
  return (
    <TabsWrapper>
      {categories.map((category, index) => (
        <li
          key={index}
          className={index === activeTab ? "active" : ""}
          onClick={() => setActiveTab(index)}
        >
          {category}
        </li>
      ))}
    </TabsWrapper>
  );
};

export default Tabs;
