import { useState, useEffect } from "react";
import {TDebounceValue} from "./types";

function useDebounce(
  value: TDebounceValue,
  delay: number = 300
): TDebounceValue {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
