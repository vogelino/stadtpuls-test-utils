import fetch from "node-fetch";
import { SignupLoginResponse, ApiAuthResponsePayload } from "./index";

export async function login({
  email,
  password,
  url,
  anonKey,
}: {
  email: string;
  password: string;
  url: URL;
  anonKey: string;
}): Promise<SignupLoginResponse> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    apikey: anonKey,
  };
  const body = JSON.stringify({ email, password });

  const response = await fetch(url.href, {
    method: "POST",
    headers,
    body,
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  if (response.status === 200) {
    const json = (await response.json()) as ApiAuthResponsePayload;
    return { token: json.access_token, id: json.user.id };
  } else {
    throw new Error(await response.json());
  }
}
