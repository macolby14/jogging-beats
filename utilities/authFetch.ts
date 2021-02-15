interface Params {
  url: string;
  token: string;
  headers?: Record<any, any>;
  body?: Record<any, any>;
}

export async function authFetch({
  url,
  token,
  headers = {},
  body = {},
}: Params) {
  if (!token) {
    throw new Error("Trying to use authFetch without token defined");
  }

  return fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });
}
