export const PART_SIZE = 8 * 1024 * 1024;
export const MAX_SIZE = 999_999_999;
export function validateInstaller(
  input: {
    os: string;
    architecture: string;
    filename: string;
    sizeBytes: number;
    sha256: string;
  },
  architectures: string[],
) {
  if (
    !["windows", "macos"].includes(input.os) ||
    !architectures.includes(`${input.os}:${input.architecture}`)
  )
    throw new Error(
      "Unsupported build architecture; configure approved actual builds",
    );
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]{0,119}$/.test(input.filename))
    throw new Error("Unsafe filename");
  if (
    !(input.os === "windows" ? /\.(exe|msi)$/i : /\.(dmg|pkg)$/i).test(
      input.filename,
    )
  )
    throw new Error("Unsupported installer extension");
  if (
    !Number.isSafeInteger(input.sizeBytes) ||
    input.sizeBytes < 1 ||
    input.sizeBytes > MAX_SIZE
  )
    throw new Error("Installer must be smaller than 1 GB");
  if (!/^[a-f0-9]{64}$/.test(input.sha256))
    throw new Error("Expected SHA-256 must be lowercase hexadecimal");
}
export function validMagic(filename: string, prefix: Uint8Array) {
  const hex = Buffer.from(prefix).toString("hex");
  if (/\.exe$/i.test(filename)) return hex.startsWith("4d5a");
  if (/\.msi$/i.test(filename)) return hex.startsWith("d0cf11e0a1b11ae1");
  if (/\.pkg$/i.test(filename)) return hex.startsWith("78617221");
  return false; // DMG uses a trailer, checked separately by the worker.
}
export function partLength(size: number, part: number) {
  if (!Number.isInteger(part) || part < 1 || part > Math.ceil(size / PART_SIZE))
    throw new Error("Invalid part number");
  return Math.min(PART_SIZE, size - (part - 1) * PART_SIZE);
}
export function approvedArchitectures() {
  return (process.env.DOWNLOAD_ARCHITECTURES || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}
