import { writable } from "svelte/store";

function getEnvValue(value: unknown): string | number {
  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value === "string" || typeof value === "number") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.reduce<string>((result, arrayElement, index) => {
      if (
        JSON.stringify(arrayElement) === "{}" ||
        arrayElement === null ||
        arrayElement === undefined
      ) {
        return result;
      }

      return result.concat(
        `${index > 0 ? "," : ""}${getEnvValue(arrayElement)}`
      );
    }, "");
  }

  if (typeof value === "object") {
    const entries = Object.entries(value);

    return entries.reduce((result, [key, value], index) => {
      if (
        JSON.stringify(value) === "{}" ||
        value === null ||
        value === undefined
      ) {
        return result.concat(`${key}`);
      }

      return result.concat(
        `${key},${getEnvValue(value)}${index < entries.length - 1 ? "," : ""}`
      );
    }, "");
  }

  return "";
}

function convertToEnv(value: string): string {
  if (!value) {
    return "";
  }

  let json = {};
  try {
    json = JSON.parse(value);
  } catch (e) {
    return "Incorrect JSON";
  }

  if (Array.isArray(json)) {
    return json.reduce(
      (codeValue, arrayElement) => codeValue.concat(`${arrayElement}\n`),
      ""
    );
  }

  const entries = Object.entries(json);

  return entries
    .reduce(
      (codeValue, [envName, value]) =>
        codeValue.concat(`${envName}=${getEnvValue(value)}\n`),
      ""
    )
    .trim();
}

function createConverter() {
  const { subscribe, update } = writable("");

  return {
    subscribe,
    fromJsonToEnv: (value: string) =>
      update(() => {
        return convertToEnv(value);
      }),
  } as const;
}

export const converter = createConverter();
