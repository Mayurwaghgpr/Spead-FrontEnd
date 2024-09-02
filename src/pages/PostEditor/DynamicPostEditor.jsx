import React, { useCallback, useEffect, useMemo } from "react";
import WriteElements from "./component/WriteElements";
import PostPreviewEditor from "./component/PostPreviewEditor";
import { usePostCreator } from "./hooks/usePostCreator";
import { useDispatch, useSelector } from "react-redux";
import { setIsScale } from "../../redux/slices/uiSlice";
import { useSearchParams } from "react-router-dom";
import InputTypeSelector from "./component/InputTypeSelector";
import { setElements } from "../../redux/slices/postSlice";

function DynamicPostEditor() {
  const {
    addElement,
    handleFileChange,
    handleTextChange,
    handleContentEditableChange,
    imageInputRef,
    inputRefs,
    imageFiles,
    setImageFiles,
    focusedIndex,
    setFocusedIndex,
    handleKeyDown,
  } = usePostCreator();

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const { elements, beforsubmit } = useSelector((state) => state.posts);
  const { isScale } = useSelector((state) => state.ui);

  return (
    <main className="flex flex-col justify-between mt-16">
      <div
        className={`flex sm:pl-0 pl-3 sm:justify-center sm:items-center flex-col ${
          elements.length === 0 ? "pt-[4rem]" : "pt-0"
        }`}
      >
        {elements.map((element, index) => (
          <div key={element.id} className="flex justify-center items-center">
            {focusedIndex === index && element.data === "" && (
              <div
                className={`sm:flex hidden justify-between items-center mt-2 absolute transition-transform duration-100 sm:left-56 left-5 sm:overflow-hidden ${
                  isScale ? "z-20" : "z-0"
                }`}
              >
                <span
                  onClick={() => dispatch(setIsScale())}
                  title="more inputs"
                  className={`group h-[40px] z-[100] w-[40px] bg-none rounded-full border text-3xl font-extralight flex justify-center items-center cursor-pointer transition-transform duration-100 ${
                    isScale ? "rotate-0" : " rotate-45"
                  }`}
                >
                  <i className="bi bi-x"></i>
                </span>
                {
                  <InputTypeSelector
                    imageInputRef={imageInputRef}
                    addElement={addElement}
                    handleFileChange={handleFileChange}
                  />
                }
              </div>
            )}
            <div className="justify-start mt-4 flex sm:w-[900px] w-full">
              <div className="flex flex-col w-full gap-2">
                <WriteElements
                  element={element}
                  handleTextChange={handleTextChange}
                  index={index}
                  handleKeyDown={handleKeyDown}
                  handleContentEditableChange={handleContentEditableChange}
                  inputRefs={inputRefs}
                  imageInputRef={imageInputRef}
                  focusedIndex={focusedIndex}
                  setFocusedIndex={setFocusedIndex}
                />
              </div>
            </div>
          </div>
        ))}
        {beforsubmit && (
          <PostPreviewEditor
            handleTextChange={handleTextChange}
            handleContentEditableChange={handleContentEditableChange}
            imageFiles={imageFiles}
            setImageFiles={setImageFiles}
          />
        )}
      </div>
    </main>
  );
}

export default DynamicPostEditor;
