import React, { lazy, Suspense, useCallback, useEffect, useMemo } from "react";

import WriteElements from "./component/WriteElements";

import { usePostCreator } from "./hooks/usePostCreator";
import { useDispatch, useSelector } from "react-redux";
import { setIsScale } from "../../redux/slices/uiSlice";
import { useSearchParams } from "react-router-dom";
import LoaderScreen from "../../component/loaders/loaderScreen";
const PostPreviewEditor = lazy(() => import("./component/PostPreviewEditor"));
const InputTypeSelector = lazy(() => import("./component/InputTypeSelector"));

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
    <main className="flex flex-col justify-between mt-16 ">
      <div className={`flex  justify-center items-center  flex-col mt-4`}>
        {elements.map((element, index) => (
          <div
            key={element.id}
            className="flex relative justify-start items-center gap-2  xl:w-[60rem] lg:w-[50rem] w-full px-2 "
          >
            {focusedIndex === index && element.data === "" && (
              <div
                className={`flex justify-between  items-center  transition-transform duration-100 sm:overflow-hidden`}
              >
                <span
                  onClick={() => dispatch(setIsScale())}
                  title="more inputs"
                  className={` w-[2.5rem] z-10 rounded-full border text-3xl font-extralight flex justify-center items-center cursor-pointer transition-transform duration-100 ${
                    isScale ? "rotate-0" : " rotate-45"
                  }`}
                >
                  <i className="bi bi-x"></i>
                </span>
              </div>
            )}
            <InputTypeSelector
              imageInputRef={imageInputRef}
              addElement={addElement}
              handleFileChange={handleFileChange}
            />
            <div className="flex w-full  min-h-10">
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
        ))}
        <Suspense fallback={<LoaderScreen />}>
          {beforsubmit && (
            <PostPreviewEditor
              handleTextChange={handleTextChange}
              handleContentEditableChange={handleContentEditableChange}
              imageFiles={imageFiles}
              setImageFiles={setImageFiles}
            />
          )}
        </Suspense>
      </div>
    </main>
  );
}

export default DynamicPostEditor;
