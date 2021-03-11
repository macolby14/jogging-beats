/*
https://www.joshwcomeau.com/snippets/react-hooks/use-sticky-state/
Use local storage instead of global state for persisting some state between pages
*/

import React from "react";

export function useStickyState<T>(defaultValue: T, key: string) {
  const [value, setValue] = React.useState(() => {
    if (typeof window === "undefined") {
      return defaultValue;
    }
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}
