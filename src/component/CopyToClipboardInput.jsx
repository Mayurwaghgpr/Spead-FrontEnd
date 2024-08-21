import React, { useCallback, useRef, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  darcula,
  lightfair,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

const CopyToClipboardInput = ({ type, language = "java", code }) => {
  const [copySuccess, setCopySuccess] = useState("");
  const contentref = useRef();
  const handleCopyClick = useCallback(() => {
    const inputValue =
      type === "url"
        ? contentref.current.innerText
        : contentref.current.textContent;
    navigator.clipboard.writeText(inputValue).then(
      () => setCopySuccess("Copied!"),
      () => setCopySuccess("Failed to copy.")
    );
    setTimeout(() => {
      setCopySuccess("");
    }, 2000);
  }, [type]);

  //   const code = `
  // import React from 'react';

  // const HelloWorld = () => {
  //   return <h1>Hello, world!</h1>;
  // };

  // export default HelloWorld;
  //   `;

  return (
    <div className={`flex flex-col max-w-4xl h-full w-full rounded-lg border`}>
      <div className="w-full flex justify-end py-2 bg-slate-400 rounded-t-lg">
        <button
          className="flex px-4 justify-center items-center gap-3 text-sm"
          onClick={handleCopyClick}
        >
          <i className="bi bi-copy"></i> {copySuccess ? copySuccess : "Copy"}
        </button>
      </div>
      <div className="w-full shadow-inner rounded-b-lg">
        {
          <div className=" rounded-b-lg overflow-hidden  " ref={contentref}>
            <SyntaxHighlighter
              language={language}
              style={darcula}
              wrapLines={true}
              showLineNumbers={true}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        }
      </div>
    </div>
  );
};

export default CopyToClipboardInput;
