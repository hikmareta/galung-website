import { APIError } from "payload";
export function validateImage(file: {
  data: Buffer;
  mimetype: string;
  size: number;
}) {
  if (file.size > 8 * 1024 * 1024)
    throw new APIError("Images must be at most 8 MiB", 400);
  const data = file.data;
  const valid =
    file.mimetype === "image/png"
      ? data
          .subarray(0, 8)
          .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
      : file.mimetype === "image/jpeg"
        ? data[0] === 255 && data[1] === 216 && data[2] === 255
        : file.mimetype === "image/webp" &&
          data.toString("ascii", 0, 4) === "RIFF" &&
          data.toString("ascii", 8, 12) === "WEBP";
  if (!valid)
    throw new APIError(
      "Image signature does not match its allowed MIME type",
      400,
    );
}
