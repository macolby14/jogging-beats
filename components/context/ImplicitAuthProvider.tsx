import React, { useState } from "react"; // eslint-disable-line no-use-before-define

export const ImplicitAuthContext = React.createContext<{
  userToken: string;
  setUserToken: React.Dispatch<React.SetStateAction<string>>;
}>({ userToken: "", setUserToken: () => {} });

interface TokenProviderProps {
  children: React.ReactNode;
}

export function ImplicitAuthProvider({ children }: TokenProviderProps) {
  const [userToken, setUserToken] = useState("");

  return (
    <ImplicitAuthContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </ImplicitAuthContext.Provider>
  );
}
