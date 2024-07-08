import React, { useRef, useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { setElements } from "../../redux/slices/postSlice";
import WriteElements from "./component/WriteElements";
import { debounce } from "../../utils/debouce";
import PostPreviewEditor from "./component/PostPreviewEditor";

function WritePannel() {
  const { elements, beforsubmit } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [isScale, setIsScale] = useState(false);

  const [focusedIndex, setFocusedIndex] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const imageInputRef = useRef();
  const inputRefs = useRef([]);

  const addElement = useCallback(
    (type) => {
      const newElement = {
        type,
        data: "",
        id: uuidv4(),
      };
      let previousElements = [...elements];
      let newIndex;
      if (focusedIndex !== null) {
        previousElements.splice(focusedIndex + 1, 0, newElement);
        previousElements = previousElements.map((el, idx) => ({
          ...el,
          index: idx,
        }));
        newIndex = Number(focusedIndex) + 1;
      } else {
        newElement.index = elements.length;
        previousElements.push(newElement);
      }

      dispatch(setElements(previousElements));

      setTimeout(() => {
        if (inputRefs.current[newIndex]) {
          inputRefs.current[newIndex].focus();
        }
      }, 0);

      setIsScale(false);
    },
    [elements, dispatch, focusedIndex]
  );

  const handleFileChange = useCallback(
    (event) => {
      const file = event.target.files[0];
      if (file) {
        const newElement = {
          type: "image",
          file: URL.createObjectURL(file),
          data: "",
          id: uuidv4(),
        };

        let prevElements = [...elements];
        let newIndex;

        if (focusedIndex !== null) {
          prevElements.splice(focusedIndex + 1, 0, newElement);
          prevElements = prevElements.map((el, idx) => ({
            ...el,
            index: idx,
          }));
          newIndex = Number(focusedIndex) + 1;
          setFocusedIndex(newIndex);
        } else {
          newIndex = Number(elements.length);
          newElement.index = newIndex;
          prevElements.push(newElement);
        }

        setImageFiles((prev) => [
          ...prev,
          { ...newElement, file: file, index: newIndex },
        ]);
        dispatch(setElements(prevElements));
        imageInputRef.current.value = null;

        setTimeout(() => {
          if (inputRefs.current[newIndex]) {
            inputRefs.current[newIndex].focus();
          }
        }, 0);
      }
    },
    [elements, dispatch, focusedIndex]
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
      const updatedimagefile = imageFiles
        .filter((el) => el.id !== id)
        .map((el, idx) => ({ ...el, index: idx }));
      setImageFiles(updatedimagefile);
      setFocusedIndex(null);
    },
    [elements, dispatch]
  );

  const handleKeyDown = useCallback(
    (event, id, index) => {
      console.log();
      if (
        event.key === "Backspace" &&
        !event.target.innerText &&
        elements.length > 1
      ) {
        removeElement(id);
        setTimeout(() => {
          if (index > 0) {
            const ref = inputRefs.current[index - 1];
            ref?.focus();
          }
        }, 0);
      } else if (event.key === "Enter") {
        event.preventDefault();
        addElement("text");
        setFocusedIndex(index);
      }
    },
    [removeElement, addElement, elements]
  );
  // console.log(elements);

  const handleContentEditableChange = useCallback(
    (id, event) => {
      const value = event.target.textContent;
      console.log(value);
      const updatedElements = elements.map((el) =>
        el.id === id ? { ...el, data: value } : el
      );
      dispatch(setElements(updatedElements));

      setImageFiles(
        imageFiles.map((el) => (el.id === id ? { ...el, data: value } : el))
      );
    },
    [elements, dispatch]
  );

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
        <div className="justify-center mt-4 flex sm:w-[900px] w-full">
          <div className="flex flex-col w-full gap-2">
            {elements.map((element, index) => (
              <WriteElements
                key={element.id}
                element={element}
                index={index}
                handleTextChange={handleTextChange}
                handleKeyDown={handleKeyDown}
                handleContentEditableChange={handleContentEditableChange}
                inputRefs={inputRefs}
                isScale={isScale}
                setFocusedIndex={setFocusedIndex}
              />
            ))}
          </div>
        </div>
      </div>
      {beforsubmit && (
        <PostPreviewEditor
          handleTextChange={handleTextChange}
          handleContentEditableChange={handleContentEditableChange}
          imageFiles={imageFiles}
          setImageFiles={setImageFiles}
        />
      )}
    </main>
  );
}

export default WritePannel;
