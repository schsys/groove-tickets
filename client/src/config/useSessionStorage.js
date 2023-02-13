import { useState, useEffect } from "react";

export const useSessionStorage = (key) => {
  const [value, setValue] = useState(
    sessionStorage.getItem(key) || null
  );

  useEffect(() => {
    sessionStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};