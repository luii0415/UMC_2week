import { JSX } from "react";
import { THEME, useTheme } from "./context/ThemeProvider";
import clsx from "clsx";

export default function ThemeContent(): JSX.Element {
  const { theme, toggleTheme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;
  return (
    <div
      className={clsx(
        "p-4 h-dvh w-full",
        isLightMode ? "bg-white" : "bg-gray-800"
      )}
    >
      <h1
        className={clsx(
          "text-wxl font-blod",
          isLightMode ? "text-black" : "text-white"
        )}
      >
        Theme Content
      </h1>
      {/*lorem 입력으로 아래 글 자동완성 가능*/}
      <p className={clsx("mt-2", isLightMode ? "text-black" : "text-white")}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus eos
        quae, adipisci a hic deserunt mollitia ad quasi facere animi,
        exercitationem aliquid voluptatem cupiditate cumque! Assumenda,
        repudiandae. Nostrum, laborum culpa.
      </p>
    </div>
  );
}
