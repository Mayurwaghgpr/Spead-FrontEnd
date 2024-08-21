import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setThemeMode } from "../redux/slices/uiSlice";

function Theme() {
  const dispatch = useDispatch();

  const { ThemeMode } = useSelector((state) => state.ui);
  const LocalTheme = localStorage.getItem("ThemeMode");

  useEffect(() => {
    if (ThemeMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("ThemeMode", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("ThemeMode", "light");
    }
  }, [ThemeMode]);

  useEffect(() => {
    if (LocalTheme === "dark") {
      dispatch(setThemeMode());
    } else {
      dispatch(setThemeMode());
    }

    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [dispatch]);

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        className="sr-only peer"
        type="checkbox"
        checked={ThemeMode}
        onChange={(e) => {
          dispatch(setThemeMode());
        }}
      />
      <div className="w-16 h-7 rounded-full bg-gray-200 peer dark:bg-[#383838] relative overflow-hidden transition-colors duration-500">
        {!ThemeMode ? (
          <span className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-5 h-5 flex items-center justify-center transition-all duration-500 peer-checked:translate-x-9">
            ☀️
          </span>
        ) : (
          <span className="absolute right-1 top-1/2 transform -translate-y-1/2  rounded-full w-5 h-5 flex items-center justify-center  peer-checked:opacity-100 transition-all duration-500">
            🌑
          </span>
        )}
      </div>
    </label>
  );
}

export default Theme;
