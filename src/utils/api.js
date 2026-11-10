/**
 * Shared HTTP client used by every feature API module.
 *
 * Features never call `fetch` directly — they go through this helper so
 * base URL, headers, and error handling stay in one place.
 */
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
  get(path) {
    return fetch(path, {
      method: "GET",
      headers: { Accept: "application/json" },
    }).then(parseResponse);
  },

  post(path, body) {
    return fetch(path, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(parseResponse);
  },

  patch(path, body) {
    return fetch(path, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(parseResponse);
  },

  delete(path) {
    return fetch(path, {
      method: "DELETE",
      headers: { Accept: "application/json" },
    }).then(parseResponse);
  },
};
