import React from "react";

function LangSelector({ setLanguage }) {
  const languages = [
    { name: "JavaScript", value: "javascript" },
    { name: "Python", value: "python" },
    { name: "CSS", value: "css" },
    { name: "HTML", value: "markup" },
  ];

  return (
    <select
      onChange={(e) => setLanguage(e.target.value)}
      className="p-2 border rounded max-w-[10rem] "
    >
      {languages.map((lang) => (
        <option className="w-full" key={lang.value} value={lang.value}>
          {lang.name}
        </option>
      ))}
    </select>
  );
}

export default LangSelector;
