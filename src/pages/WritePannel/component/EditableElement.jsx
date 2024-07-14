import { useCallback, useEffect } from "react";

const EditableElement = ({
  type,
  element,
  placeholder,
  index,
  setTextTool,
  setFocusedIndex,
  handleTextChange,
  handleKeyDown,
  isScale,
  inputRefs,
  extraClasses = "",
}) => {
  const handleTextSelection = useCallback(
    (event) => {
      // const input = event.target;
      // if (input) {
      //   const start = input.selectionStart;
      //   const end = input.selectionEnd;
      //   const text = input.value.substring(start, end);
      //   console.log(text);
      // }
      event.preventDefault();

      let selectedText = window.getSelection().toString().trim();
      // const start = selectedText.selectionStart;
      // const end = selectedText.selectionEnd;
      // const text = selectedText.substring(start, end);
      // console.log(start, end);
      console.log(selectedText, event.target.textContent);
      if (selectedText && event.target.textContent) {
        setTextTool(event.target.id);
      }
    },
    [setTextTool !== 0]
  );

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (!window.getSelection().toString().trim()) {
        setTextTool(null);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [setTextTool]);

  return (
    <div
      id={element.id}
      key={element.id}
      className={`flex items-center gap-2  ${extraClasses}`}
    >
      <p
        ref={(el) => (inputRefs.current[index] = el)}
        id={element.id}
        type={type}
        contentEditable
        suppressContentEditableWarning
        className={` border-l  outline-none placeholder:text-2xl placeholder:font-thin p-4 bg-inherit  ${
          type === "url" ? "type-url" : "type-text"
        }${isScale ? "z-0" : "z-30"} ${
          index === 0
            ? " text-4xl font-semibold "
            : index === 1
            ? " text-2xl "
            : "text-xl"
        }w-full`}
        // placeholder={placeholder}
        onKeyDown={(e) => handleKeyDown(e, element.id, index)}
        onBlur={(e) => handleTextChange(element.id, e.target.textContent)}
        onFocus={(e) => setFocusedIndex(index)}
        onMouseUp={handleTextSelection}
      ></p>
    </div>
  );
};

export default EditableElement;
