import React, { useRef, useState, useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { setSubmit, setElements } from "../../redux/slices/postSlice";
import WriteElements from "./WriteElements";

import { debounce } from "../../utils/debouce";
import PostPreviewEditor from "./component/PostPreviewEditor";

const DEFAULT_ELEMENT = { type: "text", data: "", id: uuidv4(), index: 0 };

function WritePannel() {
  const { submit, elements, beforsubmit } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [isScale, setIsScale] = useState(false);
  const [textTool, setTextTool] = useState(null);
  const imageInputRef = useRef();
  const inputRefs = useRef([]);

  const addElement = useCallback(
    (type) => {
      const newElement = {
        type,
        data: "",
        id: uuidv4(),
        index: elements.length,
      };
      dispatch(setElements([...elements, newElement]));
      setTimeout(() => {
        if (inputRefs.current[elements.length]) {
          inputRefs.current[elements.length].focus();
        }
      }, 0);
      setIsScale(false);
    },
    [elements, dispatch]
  );

  const handleFileChange = useCallback(
    (event) => {
      const file = event.target.files?.[0];
      if (file) {
        const newElement = {
          type: "image",
          file,
          data: "",
          id: uuidv4(),
          index: elements.length,
        };
        //adding image file element deppending on the last element in elements Array
        const updatedElements =
          elements[elements.length - 1]?.data === "" && //if last element data is empty
          !elements[elements.length - 1]?.file //is last element is not file
            ? [...elements.slice(0, -1), newElement] //then set new image on the last index
            : [...elements, newElement]; //els add after the last element

        dispatch(setElements(updatedElements));
        imageInputRef.current.value = null;
        setTimeout(() => {
          if (inputRefs.current[elements.length]) {
            inputRefs.current[elements.length].focus();
          }
        }, 0);
      }
    },
    [elements, dispatch]
  );

  const debouncedUpdateElements = useCallback(
    debounce((updatedElements) => {
      dispatch(setElements(updatedElements));
    }),
    [dispatch]
  );

  const handleTextChange = useCallback(
    (id, value) => {
      const updatedElements = elements.map((el) =>
        el.id === id ? { ...el, data: value } : el
      );
      debouncedUpdateElements(updatedElements);
    },
    [elements, debouncedUpdateElements]
  );

  const removeElement = useCallback(
    (id) => {
      const updatedElements = elements
        .filter((el) => el.id !== id)
        .map((el, idx) => ({ ...el, index: idx }));
      dispatch(setElements(updatedElements));
    },
    [elements, dispatch]
  );

  const handleKeyDown = useCallback(
    (event, id, index) => {
      if (event.key === "Backspace" && !event.target.value) {
        removeElement(id);
        setTimeout(() => {
          if (index > 0) {
            const ref = event.target.file
              ? imageInputRef.current[index - 1]
              : inputRefs.current[index - 1];
            ref?.focus();
          }
        }, 0);
      } else if (event.key === "Enter") {
        addElement("text");
        setTimeout(() => {
          inputRefs.current[index + 1]?.focus();
        }, 0);
      }
    },
    [removeElement, addElement]
  );

  const handleTextSelection = useCallback((event) => {
    const { selectionStart, selectionEnd } = event.target;
    setTextTool(selectionStart !== selectionEnd ? event.target.id : null);
  }, []);

  const handleContentEditableChange = useCallback(
    (id, event) => {
      const value = event.target.textContent;
      const updatedElements = elements.map((el) =>
        el.id === id ? { ...el, data: value } : el
      );
      dispatch(setElements(updatedElements));
    },
    [elements, dispatch]
  );

  console.log(elements);
  console.log("first");
  return (
    <main
      className={`grid grid-cols-10 ${
        elements.length === 0 ? "pt-[4rem]" : "pt-0"
      }`}
    >
      <div className="flex justify-center sm:col-start-3 col-start-1 sm:col-span-6 col-span-10 items-end">
        <div className="flex z-50 justify-between bg-none items-start absolute transition-transform duration-100 mb-3 sm:left-56 sm:overflow-hidden">
          <span
            onClick={() => setIsScale((prev) => !prev)}
            title="more inputs"
            className={`group h-[40px] w-[40px] bg-red-200 bg-none rounded-full border text-3xl flex justify-center items-center cursor-pointer transition-transform duration-300 ${
              isScale ? "rotate-45" : "rotate-0"
            }`}
          >
            <i className="bi bi-plus"></i>
          </span>
          <div
            className={`flex gap-2 justify-center px-2 items-center transition-transform duration-500 ${
              isScale ? "translate-x-1 z-50" : "translate-x-0 -z-1"
            }`}
          >
            <button
              title="text"
              className={`border h-[40px] w-[40px] backdrop-blur-sm rounded-full items-center transition-transform duration-100 ${
                isScale ? "scale-100" : "scale-0"
              }`}
              onClick={() => addElement("text")}
            >
              {"abc"}
            </button>
            <button
              className={`border h-[40px] w-[40px] backdrop-blur-sm rounded-full items-center transition-transform duration-100 ${
                isScale ? "scale-100" : "scale-0"
              }`}
              onClick={() => addElement("url")}
            >
              {"link"}
            </button>
            <label
              title="add an image"
              className={`border h-[40px] w-[40px] rounded-full backdrop-blur-sm items-center flex justify-center transition-transform duration-300 ${
                isScale ? "scale-100" : "scale-0"
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
        <div className="justify-center mt-4 flex sm:w-[900px] w-[100%]">
          <div className="flex flex-col w-full gap-2">
            {elements.map((element, index) => (
              <WriteElements
                key={element.id}
                element={element}
                index={index}
                handleTextChange={handleTextChange}
                handleKeyDown={handleKeyDown}
                handleTextSelection={handleTextSelection}
                handleContentEditableChange={handleContentEditableChange}
                inputRefs={inputRefs}
                textTool={textTool}
                isScale={isScale}
              />
            ))}
          </div>
        </div>
      </div>
      {beforsubmit && (
        <PostPreviewEditor
          handleTextChange={handleTextChange}
          handleContentEditableChange={handleContentEditableChange}
        />
      )}
    </main>
  );
}

export default WritePannel;
