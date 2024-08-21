import React, { useState } from "react";
import LangSelector from "./LangSelector";

function CodeEditor() {
  const [language, setLanguage] = useState("javascript");

  return (
    <div className="p-3 border flex flex-col gap-5 overflow-hidden">
      <LangSelector setLanguage={setLanguage} />
    </div>
  );
}

export default CodeEditor;
