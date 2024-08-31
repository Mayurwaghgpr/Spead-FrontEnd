import React, { useCallback, useRef, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  darcula,
  lightfair,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

const CopyToClipboardInput = ({ item }) => {
  const [copySuccess, setCopySuccess] = useState("");
  const contentref = useRef();
  const handleCopyClick = useCallback(() => {
    const inputValue =
      item.type === "url"
        ? contentref.current.innerText
        : contentref.current.textContent;
    navigator.clipboard.writeText(inputValue).then(
      () => setCopySuccess("Copied!"),
      () => setCopySuccess("Failed to copy.")
    );
    let timeout = setTimeout(() => {
      setCopySuccess("");
    }, 2000);
    return () => clearTimeout(timeout);
  }, [item.type]);

  return (
    <div className={`flex flex-col max-w-4xl h-full w-full rounded-lg border`}>
      <div className="w-full flex justify-end py-2 bg-slate-400 rounded-t-lg">
        <button
          className="flex relative px-4 justify-center items-center gap-3 text-sm"
          onClick={handleCopyClick}
        >
          <i className="bi bi-copy"></i>{" "}
          {copySuccess ? (
            <span className=" absolute -top-2 -right-20 rounded-md   bg-gray-700 p-2 ">
              {copySuccess}
            </span>
          ) : (
            "Copy"
          )}
        </button>
      </div>
      <div className="w-full shadow-inner rounded-b-lg">
        {
          <div className=" rounded-b-lg overflow-hidden  " ref={contentref}>
            {item.type === "code" ? (
              <SyntaxHighlighter
                language={item.lang}
                style={darcula}
                wrapLines={true}
                showLineNumbers={true}
              >
                {item.Content}
              </SyntaxHighlighter>
            ) : (
              <p className="w-full h-full"> {item.Content}</p>
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default CopyToClipboardInput;
