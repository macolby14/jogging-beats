import React, { useEffect, useState } from "react"; // eslint-disable-line no-use-before-define
import { authFetch } from "../../utils/authFetch";

export const ImplicitAuthContext = React.createContext<{
  userToken: string;
  setUserToken: React.Dispatch<React.SetStateAction<string>>;
  userId: string;
}>({ userToken: "", setUserToken: () => {}, userId: "" });

interface TokenProviderProps {
  children: React.ReactNode;
}

export function ImplicitAuthProvider({ children }: TokenProviderProps) {
  const [userToken, setUserToken] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (userToken) {
      authFetch({ url: "https://api.spotify.com/v1/me", token: userToken })
        .then((resp) => resp.json())
        .then((resp) => {
          setUserId(resp.id);
          return { status: "Success (custom)" };
        });
    }
  }, [userToken]);

  return (
    <ImplicitAuthContext.Provider value={{ userToken, setUserToken, userId }}>
      {children}
    </ImplicitAuthContext.Provider>
  );
}
