import React, { useEffect, useState } from "react"; // eslint-disable-line no-use-before-define

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
      fetch("https://api.spotify.com/v1/me", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      })
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
