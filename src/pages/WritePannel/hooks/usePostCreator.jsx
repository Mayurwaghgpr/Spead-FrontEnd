import { useState, useCallback, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { setElements } from "../../../redux/slices/postSlice";
import { debounce } from "../../../utils/debounce";

export const usePostCreator = () => {
  const { elements } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [isScale, setIsScale] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(elements.length);
  const [imageFiles, setImageFiles] = useState([]);
  const imageInputRef = useRef();
  const inputRefs = useRef([]);
  // console.log("imageFiles", imageFiles);
  const addElement = useCallback(
    (type) => {
      const newElement = {
        type,
        data: "",
        id: uuidv4(),
      };
      let previousElements = [...elements];
      let newIndex;

      if (focusedIndex !== null && focusedIndex >= 0) {
        previousElements.splice(focusedIndex + 1, 0, newElement);
        previousElements = previousElements.map((el, idx) => ({
          ...el,
          index: idx,
        }));
        newIndex = focusedIndex + 1;
        setFocusedIndex(newIndex);
      } else {
        newElement.index = elements.length;
        previousElements.push(newElement);
        newIndex = elements.length;
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

        let previousElements = [...elements];
        let newIndex;

        if (focusedIndex !== null && focusedIndex >= 0) {
          previousElements.splice(focusedIndex + 1, 0, newElement);
          previousElements = previousElements.map((el, idx) => ({
            ...el,
            index: idx,
          }));
          newIndex = focusedIndex + 1;
          setFocusedIndex(newIndex);
        } else {
          newIndex = elements.length;
          newElement.index = newIndex;
          previousElements.push(newElement);
        }

        setImageFiles((prev) => [
          ...prev,
          { ...newElement, file: file, index: newIndex },
        ]);
        dispatch(setElements(previousElements));
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

  const handleContentEditableChange = useCallback(
    (id, event) => {
      const value = event.target.textContent;
      const updatedElements = elements.map((el) =>
        el.id === id ? { ...el, data: value } : el
      );
      dispatch(setElements(updatedElements));

      setImageFiles((prev) =>
        prev.map((el) => (el.id === id ? { ...el, data: value } : el))
      );
    },
    [elements, dispatch]
  );

  return {
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
  };
};
