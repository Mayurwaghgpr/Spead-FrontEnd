import React, { useState, useRef } from "react";
import LangSelector from "./LangSelector";
import Editor from "@monaco-editor/react";

function CodeEditor({
  element,
  index,
  handleKeyDown,
  inputRefs,
  handleTextChange,
  setFocusedIndex,
}) {
  const [language, setLanguage] = useState("javascript");

  // Create a ref to hold the editor instance
  const editorRef = useRef(null);

  return (
    <div className="p-3 border flex flex-col gap-5 overflow-hidden">
      <LangSelector setLanguage={setLanguage} />
      <Editor
        height="500px"
        language={language}
        value={element.data}
        onMount={(editor) => {
          // Set the editor instance to the ref
          editorRef.current = editor;
          inputRefs.current[index] = editor; // Keep it compatible with your existing refs
        }}
        onFocus={() => setFocusedIndex(index)}
        onKeyDown={(e) => handleKeyDown(e, element.id, index)}
        theme="vs-dark" // You can change the theme to 'light' or any other theme available
        onChange={(value) => {
          handleTextChange(element.id, value, language);
        }}
      />
    </div>
  );
}

export default CodeEditor;
