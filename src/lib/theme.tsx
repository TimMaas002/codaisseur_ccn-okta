import React, { createContext, useState } from "react";

export type Theme = {
  fontFamily: string;
  colors: {
    backgroundColor: string;
    textColor: string;
    toolbarBackgroundColor: string;
  };
};

const initialTheme = {
  fontFamily: "sans-serif",
  colors: {
    backgroundColor: "white",
    textColor: "#00c",
    toolbarBackgroundColor: "#555",
  },
};

const otherTheme = {
  fontFamily: "sans-serif",
  colors: {
    backgroundColor: "grey",
    textColor: "white",
    toolbarBackgroundColor: "black",
  },
};

export const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
}>({
  theme: initialTheme,
  toggle: () => {
    // noop
  },
});

export function ThemeProvider(props: { children?: React.ReactNode }) {
  const [theme, setTheme] = useState(initialTheme);

  const toggle = () => {
    theme === otherTheme ? setTheme(initialTheme) : setTheme(otherTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
