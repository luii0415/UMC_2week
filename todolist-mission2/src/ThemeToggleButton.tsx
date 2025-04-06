import React, { JSX } from "react"; // rfc 하면 기본 세팅 자동완성
import clsx from "clsx";
import { THEME, useTheme } from "./context/ThemeProvider";

export default function ThemeToggleButton(): JSX.Element {
  const { theme, toggleTheme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;
  return (
    <button
      onClick={toggleTheme}
      className={clsx("px-4 py-2 mt-4 rounded-md transtition-all", {
        "bg-black text-white": !isLightMode,
        "bg-white text-black": isLightMode,
      })}
    >
      {isLightMode ? "다크모드" : "라이트모드"}
    </button>
  );
}
