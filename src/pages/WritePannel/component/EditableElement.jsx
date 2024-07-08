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
      let selectedText = window.getSelection().toString().trim();
      console.log(selectedText, event.target.id);

      setTextTool(selectedText !== "" ? event.target.id : null);
    },
    [setTextTool]
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
      id={index}
      key={element.id}
      className={`flex items-center gap-2 ${
        isScale ? "z-0" : "z-50"
      } ${extraClasses}`}
    >
      <p
        ref={(el) => (inputRefs.current[index] = el)}
        id={index}
        type={type}
        contentEditable
        suppressContentEditableWarning
        className={`w-full outline-none placeholder:text-2xl placeholder:font-thin p-4 bg-inherit ${
          type === "url" ? "type-url" : "type-text"
        }`}
        placeholder={placeholder}
        onKeyDown={(e) => handleKeyDown(e, element.id, index)}
        onBlur={(e) => handleTextChange(element.id, e.target.textContent)}
        onFocus={(e) => setFocusedIndex(e.target.id)}
        onSelect={handleTextSelection}
      ></p>
    </div>
  );
};

export default EditableElement;
