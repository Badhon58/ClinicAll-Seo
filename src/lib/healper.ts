import pako from "pako";

export const compressString = (input: any) => {
  // Convert the input string to a Uint8Array (UTF-8 encoded bytes)
  const inputBytes = new TextEncoder().encode(input);

  // Compress the bytes using zlib
  const compressedBytes = pako.deflate(inputBytes);

  // Convert Uint8Array to a regular array of numbers
  const compressedArray = Array.from(compressedBytes);

  // Convert the compressed bytes to a Base64 string
  const base64String = btoa(String.fromCharCode.apply(null, compressedArray));

  return base64String;
};

export const generateRandomString = (length: any) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
};

export const formatDurationTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    secs.toString().padStart(2, "0"),
  ].join(":");
};
