import fetch from "node-fetch";

export async function logout({
  url,
  userToken,
  anonKey,
}: {
  userToken: string;
  url: URL;
  anonKey: string;
}): Promise<boolean> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    apikey: anonKey,
    Authorization: `Bearer ${userToken}`,
  };

  const response = await fetch(url.href, {
    method: "POST",
    headers,
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  if (response.status === 204) {
    return true;
  } else {
    throw new Error(await response.json());
  }
}
