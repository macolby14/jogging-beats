import { useContext } from "react";
import { TokenContext } from "../components/TokenProvider";

export function useAuthFetch() {
  const token = useContext(TokenContext);

  const authFetch = async (url: string) =>
    fetch(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

  return authFetch;
}
