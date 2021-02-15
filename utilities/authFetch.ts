interface Params {
  url: string;
  token: string;
  body?: Record<any, any> | null;
  method?: "GET" | "POST";
}

export async function authFetch({
  url,
  token,
  method = "GET",
  body = null,
}: Params) {
  if (!token) {
    throw new Error("Trying to use authFetch without token defined");
  }

  const fetchOptions: any = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method,
  };

  if (body) {
    fetchOptions.body = JSON.stringify(body);
  }

  return fetch(url, fetchOptions);
}
