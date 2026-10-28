import {
  S3Client,
  CreateMultipartUploadCommand,
  UploadPartCommand,
  ListPartsCommand,
  CompleteMultipartUploadCommand,
  AbortMultipartUploadCommand,
  HeadObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
export interface InstallerStorage {
  begin(key: string): Promise<string>;
  signPart(
    key: string,
    uploadId: string,
    part: number,
    size: number,
  ): Promise<string>;
  parts(
    key: string,
    uploadId: string,
  ): Promise<{ part: number; size: number; etag: string }[]>;
  complete(
    key: string,
    uploadId: string,
    parts: { part: number; etag: string }[],
  ): Promise<string>;
  abort(key: string, uploadId: string): Promise<void>;
  head(key: string, version: string): Promise<{ size: number; etag: string }>;
  read(key: string, version: string): Promise<AsyncIterable<Uint8Array>>;
  download(key: string, version: string, filename: string): Promise<string>;
}
export function s3Storage(): InstallerStorage {
  const {
    DOWNLOAD_S3_ENDPOINT: endpoint,
    DOWNLOAD_S3_BUCKET: Bucket,
    DOWNLOAD_S3_ACCESS_KEY: accessKeyId,
    DOWNLOAD_S3_SECRET_KEY: secretAccessKey,
  } = process.env;
  if (!endpoint || !Bucket || !accessKeyId || !secretAccessKey)
    throw new Error("Installer storage is not configured");
  const url = new URL(endpoint);
  if (
    url.protocol !== "https:" &&
    !(
      process.env.NODE_ENV !== "production" &&
      ["127.0.0.1", "localhost"].includes(url.hostname)
    )
  )
    throw new Error("Storage requires HTTPS");
  const client = new S3Client({
    endpoint,
    region: process.env.DOWNLOAD_S3_REGION || "us-east-1",
    forcePathStyle: true,
    credentials: { accessKeyId, secretAccessKey },
    requestChecksumCalculation: "WHEN_REQUIRED",
    responseChecksumValidation: "WHEN_REQUIRED",
    maxAttempts: 2,
    requestHandler: { connectionTimeout: 5000, requestTimeout: 300000 },
  });
  const object = (Key: string, VersionId?: string) => ({
    Bucket,
    Key,
    VersionId,
  });
  return {
    async begin(key) {
      const result = await client.send(
        new CreateMultipartUploadCommand({
          ...object(key),
          ContentType: "application/octet-stream",
          CacheControl: "private, no-store",
        }),
      );
      if (!result.UploadId) throw new Error("Missing upload ID");
      return result.UploadId;
    },
    signPart: (key, UploadId, PartNumber, ContentLength) =>
      getSignedUrl(
        client,
        new UploadPartCommand({
          ...object(key),
          UploadId,
          PartNumber,
          ContentLength,
        }),
        { expiresIn: 300 },
      ),
    async parts(key, UploadId) {
      const result = await client.send(
        new ListPartsCommand({ ...object(key), UploadId, MaxParts: 1000 }),
      );
      if (result.IsTruncated) throw new Error("Too many parts");
      return (result.Parts || []).map((p) => ({
        part: p.PartNumber!,
        size: p.Size!,
        etag: p.ETag!,
      }));
    },
    async complete(key, UploadId, parts) {
      const result = await client.send(
        new CompleteMultipartUploadCommand({
          ...object(key),
          UploadId,
          MultipartUpload: {
            Parts: parts.map((p) => ({ PartNumber: p.part, ETag: p.etag })),
          },
        }),
      );
      if (!result.VersionId || result.VersionId === "null")
        throw new Error("Bucket versioning must be enabled");
      return result.VersionId;
    },
    async abort(key, UploadId) {
      await client.send(
        new AbortMultipartUploadCommand({ ...object(key), UploadId }),
      );
    },
    async head(key, version) {
      const result = await client.send(
        new HeadObjectCommand(object(key, version)),
        { abortSignal: AbortSignal.timeout(10000) },
      );
      return { size: result.ContentLength ?? -1, etag: result.ETag || "" };
    },
    async read(key, version) {
      const result = await client.send(
        new GetObjectCommand(object(key, version)),
      );
      if (!result.Body) throw new Error("Missing object");
      return result.Body as AsyncIterable<Uint8Array>;
    },
    download: (key, version, filename) =>
      getSignedUrl(
        client,
        new GetObjectCommand({
          ...object(key, version),
          ResponseContentType: "application/octet-stream",
          ResponseContentDisposition: `attachment; filename="${filename}"`,
        }),
        { expiresIn: 60 },
      ),
  };
}
