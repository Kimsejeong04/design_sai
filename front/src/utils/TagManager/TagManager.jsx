import React, { useReducer, useState } from "react";
import { TextInputUI, Tag } from "../../components";
import styled from "styled-components";

const tagReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TAG":
      return [...state, action.payload];
    case "REMOVE_TAG":
      return state.filter((tag) => tag !== action.payload);
    default:
      return state;
  }
};

const TagListContainer = styled.div`
  width: 100%;
  max-width: 412px;
  min-width: 412px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const TagManager = ({ placeholder = "태그 입력", onTagsUpdate }) => {
  const [tags, dispatch] = useReducer(tagReducer, []);
  const [tagInput, setTagInput] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  const handleAddTag = (trimmed) => {
    const updatedTags = [...tags, trimmed];
    dispatch({ type: "ADD_TAG", payload: trimmed });
    console.log("Tags updated (add):", updatedTags); // 디버깅 로그
    if (onTagsUpdate) onTagsUpdate(updatedTags);
  };

  const handleTagChange = (e) => {
    let newValue = e.target.value;
    if (!isComposing && newValue.length > 20) {
      newValue = newValue.substring(0, 20);
    }
    setTagInput(newValue);
  };

  const handleTagEnter = (text) => {
    const trimmed = text.trim();
    if (trimmed !== "") {
      handleAddTag(trimmed);
      setTagInput("");
    }
  };

  const handleTagCompositionStart = () => setIsComposing(true);

  const handleTagCompositionEnd = (e) => {
    setIsComposing(false);
    let newValue = e.target.value;
    if (newValue.length > 20) {
      newValue = newValue.substring(0, 20);
    }
    setTagInput(newValue);
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    dispatch({ type: "REMOVE_TAG", payload: tagToRemove });
    console.log("Tags updated (remove):", updatedTags); // 디버깅 로그
    if (onTagsUpdate) onTagsUpdate(updatedTags);
  };

  return (
    <div>
      <TextInputUI
        value={tagInput}
        maxLength={20}
        onChange={handleTagChange}
        onEnter={handleTagEnter}
        onCompositionStart={handleTagCompositionStart}
        onCompositionEnd={handleTagCompositionEnd}
        placeholder={placeholder}
      />
      <TagListContainer>
        {tags.map((tag, index) => (
          <Tag key={index} text={tag} onRemove={() => handleRemoveTag(tag)} />
        ))}
      </TagListContainer>
    </div>
  );
};

export default TagManager;