import {
  createHash,
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";
// Receipt identity is not an authentication credential and must survive session-secret rotation.
export function receiptDigest(value: string) {
  return createHash("sha256").update(value).digest("hex");
}
export function digest(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("hex");
}
export function equalSecret(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}
export function issueToken(secret: string, now = Date.now()) {
  const value = `${now}.${randomBytes(24).toString("hex")}`;
  return `${value}.${digest(value, secret)}`;
}
export function validToken(token: string, secret: string, now = Date.now()) {
  const match = /^(\d{13})\.([a-f0-9]{48})\.([a-f0-9]{64})$/.exec(token);
  if (!match) return false;
  const age = now - Number(match[1]);
  return (
    age >= 3000 &&
    age <= 30 * 60 * 1000 &&
    equalSecret(match[3], digest(`${match[1]}.${match[2]}`, secret))
  );
}
export async function boundedJSON(request: Request) {
  if (
    !request.headers
      .get("content-type")
      ?.toLowerCase()
      .startsWith("application/json")
  )
    throw new Error("media");
  if (Number(request.headers.get("content-length") || 0) > 32768)
    throw new Error("size");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("invalid");
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 32768) {
        await reader.cancel();
        throw new Error("size");
      }
      chunks.push(value);
    }
    return JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown;
  } finally {
    reader.releaseLock();
  }
}
