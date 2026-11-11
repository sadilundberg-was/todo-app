
async function parseResponse(response) {
  if (response.status === 204) return null;

  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      (payload && typeof payload === "object" && payload.error) ||
      response.statusText ||
      "Request failed";
    throw new Error(message);
  }

  return payload;
}

export const api = {
  async get(path) {
    const response = await fetch(path, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    return parseResponse(response);
  },

  async post(path, body) {
    const response = await fetch(path, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return parseResponse(response);
  },

  async patch(path, body) {
    const response = await fetch(path, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return parseResponse(response);
  },

  async delete(path) {
    const response = await fetch(path, {
      method: "DELETE",
      headers: { Accept: "application/json" },
    });
    return parseResponse(response);
  },
};
