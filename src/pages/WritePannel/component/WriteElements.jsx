import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EditableElement from "./EditableElement";
import TextTool from "./TextTools";
import { usePostCreator } from "../hooks/usePostCreator";
function WriteElements({
  element,
  index,
  handleKeyDown,
  setFocusedIndex,
  isScale,
  handleTextChange,
  handleContentEditableChange,
  inputRefs,
}) {
  const [textTool, setTextTool] = useState(null);

  const isCurrentTextTool = textTool?.toString() === index.toString();
  const { elements } = useSelector((state) => state.posts);
  switch (element.type) {
    case "text":
      return (
        <div className="relative flex w-full flex-col gap-2">
          <TextTool isCurrentTextTool={isCurrentTextTool} />
          <EditableElement
            type={element.type}
            element={element}
            placeholder={
              index === 0 ? "Title" : index === 1 ? "Subtitle" : "Enter text"
            }
            index={index}
            setTextTool={setTextTool}
            setFocusedIndex={setFocusedIndex}
            handleTextChange={handleTextChange}
            handleKeyDown={handleKeyDown}
            isScale={isScale}
            inputRefs={inputRefs}
          />
        </div>
      );
    case "url":
      return (
        <div className="relative flex w-full flex-col gap-2">
          <TextTool isCurrentTextTool={isCurrentTextTool} />
          <EditableElement
            type={element.type}
            element={element}
            placeholder={
              index === 0 ? "Title" : index === 1 ? "Subtitle" : "Enter URL"
            }
            index={index}
            setTextTool={setTextTool}
            setFocusedIndex={setFocusedIndex}
            handleTextChange={handleTextChange}
            handleKeyDown={handleKeyDown}
            isScale={isScale}
            inputRefs={inputRefs}
          />
        </div>
      );
    case "image":
      return (
        <div key={element.id} className="p-4 relative">
          <figure>
            <img
              className="h-[100%] min-w-full p-2"
              src={element.file}
              alt="Preview"
              id="inputimage"
              contentEditable
              onKeyDown={(e) => handleKeyDown(e, element.id, index)}
            />
            <figcaption>
              <span
                className={`text-center ${
                  element.data === "" && "text-gray-500"
                }`}
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleContentEditableChange(element.id, e)}
                onFocus={(e) => setFocusedIndex(e.target.id)}
                placeholder={
                  element.data === "" ? "Enter description" : element.data
                }
              ></span>
            </figcaption>
          </figure>
        </div>
      );
    default:
      return <input type="text" />;
  }
}

export default WriteElements;
