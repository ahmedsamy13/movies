import { useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  const setStoredValue = (val) => {
    setValue((prev) => {
      const newValue = typeof val === "function" ? val(prev) : val;
      localStorage.setItem(key, JSON.stringify(newValue));
      return newValue;
    });
  };

  return [value, setStoredValue];
}
// const [theme, setTheme] = useLocalStorage("theme", "light");
// const [cart, setCart] = useLocalStorage("cart", []);
