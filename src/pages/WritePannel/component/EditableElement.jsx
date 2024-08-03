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
      event.preventDefault();
      const selectedText = window.getSelection().toString().trim();
      if (selectedText) {
        setTextTool(event.target.id);
      }
    },
    [setTextTool]
  );

  useEffect(() => {
    const handleDocumentClick = () => {
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
      className={`flex items-center gap-2 ${extraClasses}`}
    >
      <p
        ref={(el) => (inputRefs.current[index] = el)}
        id={element.id}
        type={type}
        contentEditable
        suppressContentEditableWarning
        className={`border-l outline-none placeholder:text-2xl placeholder:font-thin p-4 bg-inherit ${
          type === "url" ? "type-url" : "type-text"
        }${isScale ? "z-0" : "z-30"} ${
          index === 0
            ? "text-4xl font-semibold"
            : index === 1
            ? "text-2xl"
            : "text-xl"
        } w-full`}
        onKeyDown={(e) => handleKeyDown(e, element.id, index)}
        onBlur={(e) => handleTextChange(element.id, e.target.textContent)}
        onFocus={() => setFocusedIndex(index)}
        onMouseUp={handleTextSelection}
        placeholder={placeholder}
      ></p>
    </div>
  );
};

export default EditableElement;
