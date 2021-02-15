export async function authFetch(url: string, token: string) {
  if (!token) {
    throw new Error("Trying to use authFetch without token defined");
  }

  return fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}
