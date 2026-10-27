import React, { useEffect, useReducer, useState } from "react";
import { TextInputUI, Tag } from "../../components";
import styled from "styled-components";

const tagReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TAG":
      return [...state, action.payload];
    case "REMOVE_TAG":
      return state.filter((tag) => tag !== action.payload);
    case "SET_TAGS":
      return action.payload;
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

const TagManager = ({ placeholder = "태그 입력", onTagsUpdate, initialTags = [] }) => {
  const [tags, dispatch] = useReducer(tagReducer, []);
  const [tagInput, setTagInput] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  useEffect (() => {
    dispatch({
      type: "SET_TAGS",
      payload: initialTags
    });
  }, [initialTags]);

  const handleAddTag = (trimmed) => {
    const updatedTags = [...tags, trimmed];
    dispatch({ type: "ADD_TAG", payload: trimmed });
    console.log("Tags updated (add):", updatedTags);
    if (onTagsUpdate) onTagsUpdate(updatedTags);
  };

  const handleTagChange = (e) => {
    let newValue = e.target.value;
    // 글자 수는 여전히 자바스크립트 단에서 20자로 제한됩니다! (안전함)
    if (!isComposing && newValue.length > 20) {
      newValue = newValue.substring(0, 20);
    }
    setTagInput(newValue);
  };

  const handleTagEnter = (text) => {
    const trimmed = text.trim();
    
    if (trimmed !== "") {
      if (tags.length >= 5) {
        alert("키워드는 최대 5개까지만 등록할 수 있습니다.");
        return; 
      }
      
      if (tags.includes(trimmed)) {
        alert("이미 등록된 키워드입니다.");
        setTagInput(""); 
        return;
      }

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
    console.log("Tags updated (remove):", updatedTags);
    if (onTagsUpdate) onTagsUpdate(updatedTags);
  };

  return (
    <div>
      <TextInputUI
        value={tagInput}
        /* 💡 글자 수 UI를 없애기 위해 maxLength={20}을 제거했습니다 */
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