import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react"; // eslint-disable-line no-use-before-define

export const ImplicitAuthContext = React.createContext("");

interface TokenProviderProps {
  children: React.ReactNode;
}

export function ImplicitAuthProvider({ children }: TokenProviderProps) {
  const [userToken, setUserToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (router.query) {
      console.log(router.query);
    }
  }, [userToken]);

  return (
    <ImplicitAuthContext.Provider value={userToken}>
      {children}
    </ImplicitAuthContext.Provider>
  );
}
