import {
  JSX,
  createContext,
  PropsWithChildren,
  useState,
  useContext,
} from "react";

export enum THEME {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

type TTheme = THEME.LIGHT | THEME.DARK;

interface IThemeContext {
  theme: TTheme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [theme, setTheme] = useState<TTheme>(THEME.LIGHT);

  const toggleTheme = (): void => {
    setTheme(
      (prevTheme): THEME =>
        prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
    );
  };
  return (
    //key value 값이 같을때, theme:theme 대신, theme 로 축약해 사용 가능
    <ThemeContext.Provider value={{ theme: theme, toggleTheme: toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): IThemeContext => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be use winthin a ThemeProvider");
  }

  return context; //19분 23초
};
