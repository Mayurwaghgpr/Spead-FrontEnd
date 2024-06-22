import React, {
  useRef,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Usercontext from "../../context/UserContext";
function WritePannel() {
  const { submit, setSubmit } = useContext(Usercontext);
  const [elements, setElements] = useState([
    { type: "text", data: "", id: uuidv4(), index: 0 },
  ]);
  const [isScale, setIsScale] = useState(false);
  const [textTool, setTextTool] = useState();
  const imageInputRef = useRef();
  const abortControllerRef = useRef(null);
  const inputRefs = useRef([]);

  const addElement = useCallback(
    (type) => {
      const newElement = {
        type,
        data: "",
        id: uuidv4(),
        index: elements.length,
      };
      if (type !== "image") {
        setElements((prev) => [...prev, newElement]);
      }
      setIsScale(false);
    },
    [elements]
  );

  const handleFileChange = useCallback(
    (event) => {
      if (event.target.files?.length > 0) {
        const file = event.target.files[0];
        const newElement = {
          type: "image",
          file,
          data: "",
          id: uuidv4(),
          index: elements.length,
        };
        setElements((prev) => {
          const lastElement = prev[prev.length - 1];
          if (lastElement?.data === "" && !lastElement.file) {
            const newArray = [...prev.slice(0, prev.length - 1), newElement];
            return newArray;
          }
          return [...prev, newElement];
        });
        imageInputRef.current.value = null;
      }
    },
    [elements]
  );

  const handleTextChange = useCallback((id, value) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, data: value } : el))
    );
  }, []);

  const removeElement = useCallback((id) => {
    setElements((prev) =>
      prev
        .filter((el) => el.id !== id)
        .map((el, idx) => ({ ...el, index: idx }))
    );
  }, []);

  const handleKeyDown = useCallback(
    (event, id, index) => {
      if (event.key === "Backspace" && !event.target.value) {
        removeElement(id);
        setTimeout(() => {
          if (index > 0) {
            inputRefs.current[index - 1]?.focus();
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

  const handleTextselection = (event) => {
    const input = event.target;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const selectedText = input.value.substring(start, end);
    if (selectedText) {
      console.log(selectedText);
      console.log(event.target.id);
      setTextTool(event.target.id);
    } else {
      setTextTool(null);
    }
  };

  useEffect(() => {
    if (elements.find((p) => p.data === "")) {
      setSubmit(false);
    }
    if (submit) {
      (async () => {
        // const topic = prompt('Topic');
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        console.log("submit");
        const token = localStorage.getItem("token");
        const formData = new FormData();

        const textElements = elements.filter((el) => el.type !== "image");
        const imageElements = elements.filter((el) => el.type === "image");
        console.log("text", textElements);
        console.log("image", imageElements);
        formData.append("blog", JSON.stringify(textElements));
        formData.append("Topic", "Science");
        imageElements.forEach((element, index) => {
          console.log("this", element);
          formData.append(`image-${element.index}`, element.file);
          formData.append(`description-${element.index}`, element.data);
        });

        for (let pair of formData.entries()) {
          console.log(
            pair[0] + ": " + (pair[1] instanceof File ? pair[1].name : pair[1])
          );
        }

        try {
          const response = await axios.post(
            "http://localhost:3000/posts/posts",
            formData,
            {
              signal: abortControllerRef.current?.signal,
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.status === 201) {
            console.log("Success:", response.data);
            alert("New Blog " + response.data.message + " fully created");
            setElements([{ type: "text", data: "", id: uuidv4(), index: 0 }]);
            setSubmit(false);
          }
        } catch (error) {
          if (error.response) {
            console.error("Error:", error.response.data.error);
          } else {
            console.error("An error occurred. Please try again.");
          }
        }
      })();
    }
  }, [submit, setSubmit]);
  return (
    <>
      <main
        className={`grid grid-cols-10 ${
          elements.length === 0 ? "pt-[4rem]" : "pt-0"
        }`}
      >
        <div className="flex justify-center sm:col-start-3 col-start-1 sm:col-span-6 col-span-10 items-end">
          <div className="flex justify-between bg-none items-start absolute transition-transform duration-100 mb-3 sm:left-56 sm:overflow-hidden">
            <span
              onClick={() => setIsScale((prev) => !prev)}
              title="more inputs"
              className={`group h-[40px] w-[40px] bg-red-200 z-50 bg-none rounded-full border text-3xl flex justify-center  items-center cursor-pointer transition-transform duration-300 ${
                isScale ? "rotate-45" : "rotate-0"
              }`}
            >
              <i className="bi bi-plus"></i>
            </span>
            <div
              className={`flex gap-2 justify-center z-40 px-2 items-center transition-transform duration-500 ${
                isScale ? "translate-x-1 " : " translate-x-0"
              }`}
            >
              <button
                title="text"
                className={`border h-[40px] w-[40px] backdrop-blur-sm rounded-full items-center transition-transform duration-100 ${
                  isScale ? "scale-100 " : "scale-0"
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
          <div className=" justify-center mt-4 flex sm:w-[900px] w-[100%]">
            <div className="flex flex-col w-full gap-2">
              {elements.map((element, index) => {
                switch (element.type) {
                  case "text":
                    return (
                      <div
                        id={index}
                        key={element.id}
                        className={` relative flex items-center flex-col  gap-2 ${
                          isScale ? "z-0" : "z-50"
                        }`}
                      >
                        <div
                          className={` bg-slate-300 justify-evenly items-center  w-[230px] rounded-md h-[40px] z-50 after:w-[10px] after:h-[10px] after:rotate-45 after:left-[115px] after:top-[35px]  after:bg-inherit after:absolute transition-transform duration-100 absolute -top-8 ${
                            textTool?.toString() === index.toString()
                              ? "scale-100 flex"
                              : " scale-0 hidden"
                          }`}
                        >
                          <div className="flex w-full justify-evenly items-center ">
                            <div>B</div>
                            <div>i</div>
                            <div>T</div>
                            <div>t</div>
                          </div>
                        </div>
                        <input
                          ref={(el) => (inputRefs.current[index] = el)}
                          id={index}
                          onSelect={handleTextselection}
                          className={`w-full ${
                            index + 1 === elements.length ? "border-s" : ""
                          }  outline-none placeholder:text-slate-600 z-0 placeholder:text-2xl ${
                            index === 0
                              ? "placeholder:font-medium text-3xl"
                              : ""
                          } placeholder:font-thin  p-4 h-[4rem] bg-inherit `}
                          type="text"
                          placeholder={
                            index === 0
                              ? "Title"
                              : index === 1
                              ? "Subtitle"
                              : "Enter text"
                          }
                          value={
                            elements.find((item) => item.id === element.id)
                              ?.data || ""
                          }
                          onChange={(e) =>
                            handleTextChange(element.id, e.target.value)
                          }
                          onKeyDown={(e) => handleKeyDown(e, element.id, index)}
                        />
                      </div>
                    );
                  case "url":
                    return (
                      <div
                        id={index}
                        key={element.id}
                        className={`flex items-center  gap-2 ${
                          isScale ? "z-0" : "z-50"
                        }`}
                      >
                        <input
                          ref={(el) => (inputRefs.current[index] = el)}
                          className={`w-full ${
                            index + 1 === elements.length ? "border-s" : ""
                          }  placeholder:text-2xl ${
                            index === 0
                              ? "placeholder:font-extrabold text-9xl"
                              : ""
                          } placeholder:font-thin  p-4  bg-inherit `}
                          type="url"
                          placeholder={
                            index === 0
                              ? "Title"
                              : index === 1
                              ? "Subtitle"
                              : "Enter URL"
                          }
                          value={
                            elements.find((item) => item.id === element.id)
                              ?.data || ""
                          }
                          onChange={(e) =>
                            handleTextChange(element.id, e.target.value)
                          }
                          onKeyDown={(e) => handleKeyDown(e, element.id, index)}
                        />
                      </div>
                    );
                  case "image":
                    return (
                      <div key={element.id} className="p-4 relative">
                        <img
                          className="h-[100%] p-2"
                          src={URL.createObjectURL(element.file)}
                          alt="Preview"
                          id="inputimage"
                          contentEditable
                          onKeyDown={(e) => handleKeyDown(e, element.id)}
                        />
                        <p
                          className={` text-center  ${
                            element.data === "" && "text-gray-500"
                          }`}
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) =>
                            handleContentEditableChange(element.id, e)
                          }
                        >
                          {element.data == ""
                            ? "Enter description"
                            : element.data}
                        </p>
                      </div>
                    );
                  default:
                    return <input type="text" />;
                }
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default WritePannel;
