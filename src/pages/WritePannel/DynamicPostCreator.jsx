import React, { useCallback } from "react";
import WriteElements from "./component/WriteElements";
import PostPreviewEditor from "./component/PostPreviewEditor";
import { usePostCreator } from "./hooks/usePostCreator";
import { setElements } from "../../redux/slices/postSlice";
import { useDispatch, useSelector } from "react-redux";
import Ibutton from "../../component/Ibutton";
function DynamicPostCreator() {
  const {
    isScale,
    setIsScale,
    addElement,
    handleFileChange,
    handleTextChange,
    handleContentEditableChange,
    imageInputRef,
    inputRefs,
    imageFiles,
    setImageFiles,
    setFocusedIndex,
    focusedIndex,
  } = usePostCreator();
  const dispatch = useDispatch();
  const { elements, beforsubmit } = useSelector((state) => state.posts);
  console.log(elements);
  const removeElement = useCallback(
    (id) => {
      const updatedElements = elements
        .filter((el) => el.id !== id)
        .map((el, idx) => ({ ...el, index: idx }));
      dispatch(setElements(updatedElements));
      const updatedImageFiles = imageFiles
        .filter((el) => el.id !== id)
        .map((el, idx) => ({ ...el, index: idx }));
      setImageFiles(updatedImageFiles);
    },
    [elements, dispatch, imageFiles]
  );

  const handleKeyDown = useCallback(
    (event, id, index) => {
      if (
        event.key === "Backspace" &&
        !event.target.innerText &&
        elements.length > 0
      ) {
        removeElement(id);
        setTimeout(() => {
          if (index >= 0) {
            inputRefs.current[index - 1]?.focus();
          }
        }, 0);
      } else if (event.shiftKey && event.key === "Enter") {
        // Handle Shift + Enter to add new line in input
      } else if (event.key === "Enter") {
        event.preventDefault();
        addElement("text");
        setFocusedIndex(index);
        setTimeout(() => {
          if (index >= 0) {
            inputRefs.current[index + 1]?.focus();
          }
        }, 0);
      }
    },
    [removeElement, addElement, elements]
  );
  console.log("focused index", focusedIndex);
  // console.log(beforSubmit);
  return (
    <main className=" h-screen flex flex-col justify-between">
      <Ibutton />
      <div
        className={` flex sm:pl-0  pl-3 sm:justify-center sm:items-center flex-col ${
          elements.length === 0 ? "pt-[4rem]" : "pt-0"
        }`}
      >
        {elements.map((element, index) => (
          <div key={index} className="flex justify-center  items-center">
            {focusedIndex === index && (
              <div
                className={`sm:flex hidden  justify-between bg-none items-start absolute transition-transform duration-100 sm:left-56 left-5  sm:overflow-hidden ${
                  isScale ? "z-20" : "z-0"
                }`}
              >
                <span
                  onClick={() => setIsScale((prev) => !prev)}
                  title="more inputs"
                  className={`group h-[40px] z-[100]  w-[40px] bg-none rounded-full border text-3xl flex justify-center items-center cursor-pointer transition-transform duration-300 ${
                    isScale ? "rotate-45" : "rotate-0"
                  }`}
                >
                  <i className="bi bi-plus"></i>
                </span>
                <div
                  className={`flex gap-2 justify-center px-5 items-end  transition-all duration-300 ease-linear ${
                    isScale
                      ? " translate-x-1 z-10 opacity-100"
                      : " -translate-x-17 opacity-0 -z-50"
                  }`}
                >
                  <button
                    title="text"
                    className={`border h-[30px] w-[30px] text-xs backdrop-blur-0  rounded-full items-center transition-all duration-300 ease-linear${
                      isScale
                        ? "scale-100 opacity-100"
                        : "scale-0 opacity-0 -z-50"
                    }`}
                    onClick={() => addElement("text")}
                  >
                    {"abc"}
                  </button>
                  <button
                    className={`border h-[30px] w-[30px] text-xs backdrop-blur-0  rounded-full items-center transition-all duration-300 ease-linear ${
                      isScale
                        ? "scale-100 opacity-100"
                        : "scale-0 opacity-0 -z-50"
                    }`}
                    onClick={() => addElement("url")}
                  >
                    {"link"}
                  </button>
                  <label
                    title="add an image"
                    className={`border h-[30px] w-[30px] text-xs rounded-full backdrop-blur-0  items-center flex justify-center transition-all duration-300 ease-linear ${
                      isScale
                        ? "scale-100 opacity-100"
                        : "scale-0 opacity-0 -z-50"
                    }`}
                    htmlFor="imgbtn"
                  >
                    <i className="bi bi-image"></i>
                  </label>
                  <input
                    ref={imageInputRef}
                    className="hidden"
                    id="imgbtn"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            )}
            <div className="justify-start mt-4 flex  sm:w-[900px] w-full">
              <div className="flex flex-col w-full gap-2">
                <WriteElements
                  key={element.id}
                  element={element}
                  removeElement={removeElement}
                  index={index}
                  handleTextChange={handleTextChange}
                  handleKeyDown={handleKeyDown}
                  handleContentEditableChange={handleContentEditableChange}
                  inputRefs={inputRefs}
                  isScale={isScale}
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

      <div
        className={`flex sm:hidden  sticky gap-2 justify-center px-5 bottom-0 items-end  transition-all duration-300 ease-linear `}
      >
        <button
          title="text"
          className={`border h-[30px] w-[30px] text-xs backdrop-blur-0  rounded-full items-center transition-all duration-300 ease-linear`}
          onClick={() => addElement("text")}
        >
          {"abc"}
        </button>
        <button
          className={`border h-[30px] w-[30px] text-xs backdrop-blur-0  rounded-full items-center transition-all duration-300 ease-linear `}
          onClick={() => addElement("url")}
        >
          {"link"}
        </button>
        <label
          title="add an image"
          className={`border h-[30px] w-[30px] text-xs rounded-full backdrop-blur-0  items-center flex justify-center transition-all duration-300 ease-linear `}
          htmlFor="imgbtn"
        >
          <i className="bi bi-image"></i>
        </label>
        <input
          ref={imageInputRef}
          className="hidden"
          id="imgbtn"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </main>
  );
}
export default DynamicPostCreator;
