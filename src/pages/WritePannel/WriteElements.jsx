import React from "react";
import { useSelector, useDispatch } from "react-redux";
function WriteElements({
  element,
  index,
  handleTextChange,
  handleKeyDown,
  handleTextSelection,
  handleContentEditableChange,
  inputRefs,
  textTool,
  isScale,
}) {
  const isCurrentTextTool = textTool?.toString() === index.toString();
  const { elements } = useSelector((state) => state.posts);

  switch (element.type) {
    case "text":
      return (
        <div
          id={index}
          key={element.id}
          className={`relative flex items-center flex-col gap-2 ${
            isScale ? "z-0" : "z-50"
          }`}
        >
          <div
            className={`bg-slate-300 justify-evenly items-center w-[230px] rounded-md h-[40px] z-50 transition-transform duration-100 absolute -top-8 ${
              isCurrentTextTool ? "scale-100 flex" : "scale-0 hidden"
            }`}
          >
            <div className="flex w-full justify-evenly items-center">
              <div>B</div>
              <div>i</div>
              <div>T</div>
              <div>t</div>
            </div>
          </div>
          <input
            ref={(el) => (inputRefs.current[index] = el)}
            id={index}
            onSelect={handleTextSelection}
            className={`w-full ${
              index + 1 === elements.length ? "border-s" : ""
            } outline-none placeholder:text-slate-600 z-0 placeholder:text-2xl ${
              index === 0
                ? " placeholder:text-4xl placeholder:font-light placeholder:font-serif "
                : ""
            } placeholder:font-thin p-4 h-[4rem] bg-inherit`}
            type="text"
            placeholder={
              index === 0 ? "Title" : index === 1 ? "Subtitle" : "Enter text"
            }
            // value={elements.find((item) => item.id === element.id)?.data || ""}
            onKeyDown={(e) => handleKeyDown(e, element.id, index)}
            onChange={(e) => handleTextChange(element.id, e.target.value)}
          />
        </div>
      );
    case "url":
      return (
        <div
          id={index}
          key={element.id}
          className={`flex items-center gap-2 ${isScale ? "z-0" : "z-50"}`}
        >
          <input
            ref={(el) => (inputRefs.current[index] = el)}
            id={index}
            className={`w-full ${
              index + 1 === elements.length ? "border-s" : ""
            } placeholder:text-2xl ${
              index === 0 ? "placeholder:font-extrabold text-9xl" : ""
            } placeholder:font-thin p-4 bg-inherit`}
            type="url"
            placeholder={
              index === 0 ? "Title" : index === 1 ? "Subtitle" : "Enter URL"
            }
            // value={elements.find((item) => item.id === element.id)?.data || ""}
            onKeyDown={(e) => handleKeyDown(e, element.id, index)}
            onChange={(e) => handleTextChange(element.id, e.target.value)}
          />
        </div>
      );
    case "image":
      return (
        <div key={element.id} className="p-4 relative">
          <img
            className="h-[100%] p-2"
            src={URL.createObjectURL(element.file)}
            alt="Preview"
            id="inputimage"
            contentEditable
            onKeyDown={(e) => handleKeyDown(e, element.id, index)}
          />
          <p
            className={`text-center ${element.data === "" && "text-gray-500"}`}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleContentEditableChange(element.id, e)}
          >
            {element.data === "" ? "Enter description" : element.data}
          </p>
        </div>
      );
    default:
      return <input type="text" />;
  }
}

export default WriteElements;
