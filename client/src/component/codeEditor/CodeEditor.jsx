import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import "./CodeEditor.css";

export const CodeEditor = ({
  language,
  code,
  readOnly = false,
  handleCodeChange,
}) => {
  return (
    <div className="code">
      <Editor
        defaultLanguage={language}
        value={code}
        onChange={handleCodeChange}
        options={{ readOnly }}
      />
    </div>
  );
};
