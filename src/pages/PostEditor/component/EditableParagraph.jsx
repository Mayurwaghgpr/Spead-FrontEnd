import React, { memo, useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextTools from "./TextTools";
const EditableParagraph = ({
  element,
  index,
  handleKeyDown,
  inputRefs,
  handleTextChange,
  focusedIndex,
  setFocusedIndex,
}) => {
  const [showToolbar, setShowToolbar] = useState(false);
  const dispatch = useDispatch();

  const applyStyle = useCallback((style, value = null) => {
    document.execCommand(style, false, value);
  }, []);

  const handleSelectedText = useCallback(() => {
    const selectedText = window.getSelection().toString();
    setShowToolbar(!!selectedText);
  }, []);

  const handleFocus = useCallback(() => {
    dispatch(setFocusedIndex(index));
  }, [dispatch, index]);

  return (
    <div className="relative">
      {showToolbar && <TextTools applyStyle={applyStyle} />}
      <p
        ref={(el) => (inputRefs.current[index] = el)}
        contentEditable="true"
        suppressContentEditableWarning
        onInput={(e) => handleTextChange(element.id, e.target.innerHTML)}
        onKeyDown={(e) => handleKeyDown(e, element.id, index)}
        onFocus={handleFocus}
        onMouseUp={handleSelectedText}
        onKeyUp={handleSelectedText}
        className={`border-l border-gray-300 p-2 w-full min-h-10 z-10 outline-none cursor-text`}
      ></p>
    </div>
  );
};

export default memo(EditableParagraph);
