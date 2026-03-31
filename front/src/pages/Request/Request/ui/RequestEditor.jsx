// RequestEditor.jsx
import React, { useState,useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import './RequestEditor.css';

const formats = [
  'header',
  'bold','italic','underline',
  'list','bullet',
  'link','image'
];

// modules 에 toolbar.container: '#toolbar' 로 지정
const modules = {
  toolbar: {
    container: '#toolbar',
  }
};

// 툴바 컴포넌트
export function CustomToolbar() {
  return (
    <div id="toolbar">
      {/* 1) 한국어 레이블로 직접 작성 */}
      <select className="ql-header">
        <option value="1">제목1</option>
        <option value="2">제목2</option>
        {/* value="" 는 Normal(본문) */}
        <option value="" defaultValue>본문</option>
      </select>
      {/* 2) 나머지 버튼들은 기본 클래스 이름 그대로 */}
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
      <button className="ql-link" />
      <button className="ql-image" />
      <button className="ql-clean" />
    </div>
  );
}

function RequestEditor({ value, onChange }) {
  

  return (
    <div className="editor-container">
      {/* 툴바 렌더링 */}
      <CustomToolbar />
      {/* 컨테이너 id 를 modules.toolbar.container 와 매칭 */}
      <ReactQuill
        theme="snow"
        value={value}
      onChange={onChange}     // 여기를 직접 부모 함수를 호출하도록 사용
        modules={modules}
        formats={formats}
        placeholder="내용을 입력하세요…"
      />
    </div>
  );
}

export default RequestEditor;
