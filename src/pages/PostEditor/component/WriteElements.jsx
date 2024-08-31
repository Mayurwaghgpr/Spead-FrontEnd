import React from "react";
import EditableParagraph from "./EditableParagraph";
import CodeEditor from "../../../component/WriterTools/codeEditor";
// import PostFigure from "./PostFigure";
// import { setFocusedIndex } from "../../../redux/slices/uiSlice";

const WriteElements = ({
  element,
  index,
  handleKeyDown,
  handleTextChange,
  handleContentEditableChange,
  inputRefs,
  focusedIndex,
  setFocusedIndex,
}) => {
  // console.log("wriet");
  switch (element.type) {
    case "text":
    case "url":
      return (
        <EditableParagraph
          inputRefs={inputRefs}
          element={element}
          index={index}
          handleTextChange={handleTextChange}
          handleKeyDown={handleKeyDown}
          focusedIndex={focusedIndex}
          setFocusedIndex={setFocusedIndex}
        />
      );

    case "code":
      return <CodeEditor />;

    case "image":
      return (
        <figure
          key={element.id}
          // ref={(el) => (inputRefs.current[index] = el)}
          onFocus={() => setFocusedIndex(index)}
          className="p-4"
          onKeyDown={(e) => handleKeyDown(e, element.id, index)}
        >
          <img
            className="h-[100%] min-w-full p-2"
            src={element.file}
            alt="Preview"
            id="inputimage"
            contentEditable
          />
          <figcaption>
            <span
              className={`text-center ${
                element.data === "" && "text-gray-500"
              }`}
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleContentEditableChange(element.id, e, index)}
              placeholder={
                element.data === "" ? "Enter description" : element.data
              }
            ></span>
          </figcaption>
        </figure>
      );

    default:
      return <input type="text" />;
  }
};

export default WriteElements;
