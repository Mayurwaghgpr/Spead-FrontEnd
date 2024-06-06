import React, { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function WritePannel() {
  const [elements, setElements] = useState([]);
  const [isScale, setIsScale] = useState(false);
  const imageInputRef = useRef();

  const addElement = (type) => {
    const newElement = { type, data: '', id: uuidv4(),index: elements.length  };
    if (type !== 'image') {
      setElements((prev) => [...prev, newElement]);
    }
    setIsScale(false);
  };

  const handleFileChange = (event) => {
    if (event.target.files?.length > 0) {
      const file = event.target.files[0];
      const newElement = { type: 'image', file, id: uuidv4(),index: elements.length };
      setElements((prev) => [...prev, newElement]);
      imageInputRef.current.value = null;
    }
  };

  const handleTextChange = (id, value) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, data: value } : el))
    );
  };

  const removeElement = (id) => {
    setElements((prev) =>
      prev.filter((el) => el.id !== id).map((el, idx) => ({ ...el, index: idx }))
    );
  };

  const handleKeyDown = (event, id) => {
    if (event.key === 'Backspace' && !event.target.value) {
      removeElement(id);
    }
  };
  console.log(elements)
  return (
    <main className={`grid grid-cols-10 ${elements.length === 0 ?'pt-[4rem]' : 'pt-0'}`}>
      <div className='flex justify-center sm:col-start-3 sm:col-span-6 col-span-9 items-end'>
        <div className="flex justify-between bg-none items-start absolute transition-transform duration-100  mb-3 sm:left-56 sm:overflow-hidden">
          <span
            onClick={() => setIsScale((prev) => !prev)}
            className={`group h-[40px] w-[40px] bg-red-200 bg-none rounded-full border text-3xl flex justify-center items-center cursor-pointer transition-transform duration-300 ${isScale ? 'rotate-45' : 'rotate-0'}`}
          >
            <i className="bi bi-plus"></i>
          </span>
          <div className={`flex gap-2 justify-center z-40 px-2 items-center transition-transform duration-500 ${isScale ? 'translate-x-1 ' : ' translate-x-0'}`}>
            <button
              className={`border h-[40px] w-[40px] backdrop-blur-sm rounded-full items-center transition-transform duration-100 ${isScale ? 'scale-100' : 'scale-0'}`}
              onClick={() => addElement('text')}
            >
              {'abc'}
            </button>
             <button
              className={`border h-[40px] w-[40px] backdrop-blur-sm rounded-full items-center transition-transform duration-100 ${isScale ? 'scale-100' : 'scale-0'}`}
              onClick={() => addElement('url')}
            >
              {'linke'}
            </button>
             <button
              className={`border h-[40px] w-[40px] backdrop-blur-sm rounded-full items-center transition-transform duration-100 ${isScale ? 'scale-100' : 'scale-0'}`}
              onClick={() => addElement('text')}
            >
              {'abc'}
            </button>
            <button
              className={`border h-[40px] w-[40px] backdrop-blur-sm rounded-full items-center transition-transform duration-100 ${isScale ? 'scale-100' : 'scale-0'}`}
              onClick={() => addElement('text')}
            >
              {'abc'}
            </button>
            <button
              className={`border h-[40px] w-[40px] backdrop-blur-sm rounded-full items-center transition-transform duration-100 ${isScale ? 'scale-100' : 'scale-0'}`}
              onClick={() => addElement('text')}
            >
              {'abc'}
            </button>
            <label
              title="add an image"
              className={`border h-[40px] w-[40px] rounded-full backdrop-blur-sm items-center flex justify-center transition-transform duration-300 ${isScale ? 'scale-100' : 'scale-0'}`}
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
        <div className=" justify-center flex w-[900px]">
          <div className="flex  flex-col w-full gap-2">
            {elements.map((element,index) => {
              if (element.type === 'text') {
                console.log(index)
                return (
                  <div id={index} key={element.id} className={`flex items-center  gap-2 ${isScale ? 'z-0':'z-50'}`}>
                    <input
                      className={`w-full ${ index+1 === elements.length? 'border-s':''}  placeholder:text-slate-600  placeholder:text-2xl ${index===0? 'placeholder:font-medium text-3xl ':''} placeholder:font-thin  p-4 h-[4rem] bg-inherit `}
                      tabIndex={0}
                      type='url'
                      placeholder={index ===0?"title":"Enter text"}
                      value={elements.find((item) => item.id === element.id)?.data || ''}
                      onChange={(e) => handleTextChange(element.id, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, element.id)}
                    />
                  </div>
                );
              }else if (element.type === 'url') {
                console.log(index)
                return (
                  <div id={index} key={element.id} className={`flex items-center  gap-2 ${isScale ? 'z-0':'z-50'}`}>
                    <input
                      className={`w-full ${ index+1 === elements.length? 'border-s':''}  placeholder:text-slate-600  placeholder:text-2xl ${index===0? 'placeholder:font-medium text-3xl ':''} placeholder:font-thin  p-4 h-[4rem] bg-inherit `}
                      tabIndex={0}
                      type='url'
                      placeholder={index ===0?"title":"Enter text"}
                      value={elements.find((item) => item.id === element.id)?.data || ''}
                      onChange={(e) => handleTextChange(element.id, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, element.id)}
                    />
                  </div>
                );
              }else if (element.type === 'image' && element.file) {
                return (
                  <div key={element.id} className="p-4 relative">
                    <img
                      className="h-[100%] hover:border-teal-400"
                      src={URL.createObjectURL(element.file)}
                      alt="Preview"
                      contentEditable
                      onKeyDown={(e) => handleKeyDown(e, element.id)}
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

export default WritePannel;
