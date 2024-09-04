import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setThemeMode } from "../../redux/slices/uiSlice";

function Theme() {
  const dispatch = useDispatch();

  const { ThemeMode } = useSelector((state) => state.ui);
  const LocalTheme = localStorage.getItem("ThemeMode");

  useEffect(() => {
    if (ThemeMode === "dark") {
      document.documentElement.classList.add(ThemeMode);
      localStorage.setItem("ThemeMode", ThemeMode);
    } else if (ThemeMode === "light") {
      document.documentElement.classList.remove(ThemeMode);
      localStorage.setItem("ThemeMode", ThemeMode);
    } else if (ThemeMode === "system") {
      document.documentElement.classList.remove(ThemeMode);
      localStorage.setItem("ThemeMode", ThemeMode);
    }
  }, [ThemeMode]);

  useEffect(() => {
    if (LocalTheme === "dark") {
      dispatch(setThemeMode(LocalTheme));
    } else if (LocalTheme === "light") {
      dispatch(setThemeMode(LocalTheme));
    }
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [dispatch]);
  const Modes = [
    { name: "Dark mode", value: "dark" },
    { name: "Light mode", value: "light" },
    { name: "System", value: "system" },
  ];
  console.log(ThemeMode);
  return (
    <ul className="bg-inherit border p-2 rounded-lg flex flex-col gap-2 text-sm w-fit ">
      {Modes.map((mode) => (
        <li
          className=" flex justify-start items-center gap-1 w-full p-1"
          onClick={() => {
            dispatch(setThemeMode(mode.value));
          }}
          key={mode.value}
        >
          <span
            className={` w-5 transition-all  delay-200 ${
              ThemeMode === mode.value ? "opacity-100" : "opacity-0"
            }`}
          >
            ✔️
          </span>
          {mode.name}
        </li>
      ))}
    </ul>
  );
}

export default Theme;
