import React, { useCallback, useRef, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  darcula,
  lightfair,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { FaCheck } from "react-icons/fa6";
const CopyToClipboardInput = ({ item }) => {
  const [copySuccess, setCopySuccess] = useState("");
  const contentref = useRef();
  const handleCopyClick = useCallback(() => {
    const inputValue =
      item.type === "url"
        ? contentref.current.innerText
        : contentref.current.textContent;
    navigator.clipboard.writeText(inputValue).then(
      () => setCopySuccess("Copied !"),
      () => setCopySuccess("Failed to copy.")
    );
    let timeout = setTimeout(() => {
      setCopySuccess("");
    }, 2000);
    return () => clearTimeout(timeout);
  }, [item.type]);
  // console.log("conten", item.content);
  return (
    <div
      className={`flex flex-col max-w-4xl h-full w-full rounded-lg border border-inherit`}
    >
      <div className="w-full min-h-[2.5rem] flex justify-end py-2 bg-gray-700 rounded-t-lg">
        <button
          className="flex relative px-4 justify-center items-center gap-3 text-sm"
          onClick={handleCopyClick}
        >
          {copySuccess ? (
            <span className=" rounded-md  flex gap-2 items-center  ">
              <FaCheck />
              {copySuccess}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              {" "}
              <i className="bi bi-copy"></i>
              Copy
            </span>
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
                {item.content}
              </SyntaxHighlighter>
            ) : (
              <p className="w-full h-full"> {item.content}</p>
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default CopyToClipboardInput;
