// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from "react";

export const TokenContext = React.createContext("");

interface TokenProviderProps {
  children: React.ReactNode;
}

export function TokenProvider({ children }: TokenProviderProps) {
  const [token, setToken] = useState("");

  useEffect(() => {
    let isCancelled = false;

    if (token === "") {
      fetch(`/api/token`)
        .then((response) => response.json())
        .then((body) => {
          if (!isCancelled) {
            setToken(body.access_token);
          }
        });
    }

    return function cleanup() {
      isCancelled = true;
    };
  }, [token]);

  return (
    <TokenContext.Provider value={token}>{children}</TokenContext.Provider>
  );
}
