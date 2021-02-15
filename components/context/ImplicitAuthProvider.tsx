import React, { useEffect, useState } from "react"; // eslint-disable-line no-use-before-define
import { authFetch } from "../../utilities/authFetch";

export const ImplicitAuthContext = React.createContext<{
  userToken: string;
  setUserToken: React.Dispatch<React.SetStateAction<string>>;
}>({ userToken: "", setUserToken: () => {} });

interface TokenProviderProps {
  children: React.ReactNode;
}

export function ImplicitAuthProvider({ children }: TokenProviderProps) {
  const [userToken, setUserToken] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (userToken) {
      authFetch("https://api.spotify.com/v1/me", userToken)
        .then((resp) => resp.json())
        .then((resp) => console.log(`User Request resp: ${resp}`));
    }
  }, [userToken]);

  return (
    <ImplicitAuthContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </ImplicitAuthContext.Provider>
  );
}
