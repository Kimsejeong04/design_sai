// MyEditor.jsx
import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
// 플러그인 관련
import createToolbarPlugin, { Separator } from '@draft-js-plugins/static-toolbar';
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import {
  BoldButton,
  ItalicButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
} from '@draft-js-plugins/buttons';

const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;

const MyEditor = ({ children, onSendMessage }) => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [editMode, setEditMode] = useState(true);
  const plugins = [toolbarPlugin];

  const handleSend = () => {
    if (onSendMessage) {
      const content = editorState.getCurrentContent().getPlainText(); // 추가: ChatGPT
      if (content.trim() !== "") {
        onSendMessage(content); // 추가: ChatGPT
        setEditorState(EditorState.createEmpty()); // 추가: ChatGPT
      }
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', width: '60em' }}>
      {/* 상단 제목 영역 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <h3>{children}</h3>
      </div>
      {editMode && (
        <Toolbar>
          {(externalProps) => (
            <>
              <BoldButton {...externalProps} />
              <ItalicButton {...externalProps} />
              <UnderlineButton {...externalProps} />
              <CodeButton {...externalProps} />
              <Separator {...externalProps} />
              <HeadlineOneButton {...externalProps} />
              <HeadlineTwoButton {...externalProps} />
            </>
          )}
        </Toolbar>
      )}
      <div style={{ backgroundColor: '#FFFFFF', minHeight: 200, border: '1px solid #eee', padding: '10px', marginTop: 10 }}>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          plugins={plugins}
          readOnly={!editMode}
          placeholder="내용을 입력하세요..."
        />
      </div>
      <button onClick={handleSend} style={{ marginTop: 10 }}>작성 완료</button> {/* 추가: ChatGPT */}
    </div>
  );
};

export default MyEditor;
