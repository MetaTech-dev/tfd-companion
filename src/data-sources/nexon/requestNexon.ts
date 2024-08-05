type LanguageCode =
  | "ko"
  | "en"
  | "de"
  | "fr"
  | "ja"
  | "zh-CN"
  | "zh-TW"
  | "it"
  | "pl"
  | "pt"
  | "ru"
  | "es";

// TODO: support multiple languages
export const language_code = "en" as LanguageCode;

export default async function requestNexon({
  path,
  params,
  method = "GET",
}: {
  path: string;
  params?: { [key: string]: any };
  method?: "GET" | "POST" | "PUT" | "DELETE";
}) {
  const NEXON_API_URL = process.env.NEXON_API_URL;
  const NEXON_API_KEY = process.env.NEXON_API_KEY;

  if (!NEXON_API_URL) {
    throw new Error("NEXON_API_URL is required");
  }
  if (!NEXON_API_KEY) {
    throw new Error("NEXON_API_KEY is required");
  }

  // create url and append params
  const url = new URL(`${NEXON_API_URL}${path}`);
  if (params) {
    Object.keys(params).forEach((key) => {
      url.searchParams.append(key, params[key]);
    });
  }

  // create config
  const config: RequestInit = {
    method,
    headers: {
      "x-nxopen-api-key": NEXON_API_KEY,
      accept: "application/json",
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorData.error.message}`
      );
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
    // throw e;
  }
}
