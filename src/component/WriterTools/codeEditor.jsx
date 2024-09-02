import React, { useState, useRef } from "react";
import LangSelector from "./LangSelector";
import Editor from "@monaco-editor/react";
import { setThemeMode } from "../../redux/slices/uiSlice";
import { useSelector } from "react-redux";

function CodeEditor({
  element,
  index,
  handleKeyDown,
  inputRefs,
  handleTextChange,
  setFocusedIndex,
}) {
  const [language, setLanguage] = useState("javascript");
  const { ThemeMode } = useSelector((state) => state.ui);
  // Ref to hold the Monaco editor instance
  const editorRef = useRef(null);

  return (
    <div
      className="p-5 border flex flex-col gap-5 overflow-scroll h-[30rem] focus:border-green-200 outline-none "
      onFocus={() => setFocusedIndex(index)}
      contentEditable
      suppressContentEditableWarning
      onKeyDown={(e) => {
        if (e.key === "Backspace" || e.key === "Enter" || e.key === "delete")
          handleKeyDown(e, element.id, index);
      }}
      ref={(editor) => (inputRefs.current[index] = editor)}
    >
      <LangSelector setLanguage={setLanguage} />
      <Editor
        height="500px"
        language={language}
        value={element.data}
        theme={ThemeMode ? "vs-dark" : "light"}
        onMount={(editor) => {
          editorRef.current = editor;
        }}
        onChange={(value) => {
          handleTextChange(element.id, value, language);
        }}
      />
    </div>
  );
}

export default CodeEditor;
