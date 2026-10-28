import { createServer } from "node:https";
import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
// Local S3 protocol fixture, not evidence of a real provider's signature/IAM semantics.
export async function startInstallerStorage() {
  const uploads = new Map<
    string,
    { key: string; parts: Map<number, Buffer> }
  >();
  const objects = new Map<string, { version: string; body: Buffer }>();
  let putBytes = 0;
  let unavailable = false;
  const server = createServer(
    {
      key: readFileSync("tests/fixtures/smtp-localhost.test-key.txt"),
      cert: readFileSync("tests/fixtures/smtp-localhost.test-cert.crt"),
    },
    async (req, res) => {
      const url = new URL(req.url!, "https://localhost");
      const key = decodeURIComponent(url.pathname);
      res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
      res.setHeader("Access-Control-Allow-Methods", "PUT,GET,HEAD,POST,DELETE");
      res.setHeader("Access-Control-Allow-Headers", "*");
      res.setHeader("Access-Control-Expose-Headers", "ETag");
      if (req.method === "OPTIONS") {
        res.end();
        return;
      }
      const chunks = [];
      if (url.pathname === "/fixture-outage") {
        unavailable = url.searchParams.get("enabled") === "true";
        res.end();
        return;
      }
      if (unavailable) {
        res.writeHead(503);
        res.end();
        return;
      }
      for await (const chunk of req) chunks.push(chunk);
      const body = Buffer.concat(chunks);
      const uploadId = url.searchParams.get("uploadId");
      const upload = uploadId ? uploads.get(uploadId) : undefined;
      if (req.method === "POST" && url.searchParams.has("uploads")) {
        const id = randomUUID();
        uploads.set(id, { key, parts: new Map() });
        res.setHeader("Content-Type", "application/xml");
        res.end(
          `<InitiateMultipartUploadResult><UploadId>${id}</UploadId></InitiateMultipartUploadResult>`,
        );
        return;
      }
      if (uploadId && (!upload || upload.key !== key)) {
        res.writeHead(404);
        res.end();
        return;
      }
      if (upload && req.method === "PUT") {
        upload.parts.set(Number(url.searchParams.get("partNumber")), body);
        putBytes += body.length;
        res.setHeader("ETag", `"part-${url.searchParams.get("partNumber")}"`);
        res.end();
        return;
      }
      if (upload && req.method === "GET") {
        res.setHeader("Content-Type", "application/xml");
        res.end(
          `<ListPartsResult><IsTruncated>false</IsTruncated>${[
            ...upload.parts.entries(),
          ]
            .sort((a, b) => a[0] - b[0])
            .map(
              ([n, p]) =>
                `<Part><PartNumber>${n}</PartNumber><ETag>"part-${n}"</ETag><Size>${p.length}</Size></Part>`,
            )
            .join("")}</ListPartsResult>`,
        );
        return;
      }
      if (upload && req.method === "POST") {
        const version = randomUUID();
        objects.set(key, {
          version,
          body: Buffer.concat(
            [...upload.parts.entries()]
              .sort((a, b) => a[0] - b[0])
              .map(([, p]) => p),
          ),
        });
        uploads.delete(uploadId!);
        res.setHeader("x-amz-version-id", version);
        res.setHeader("Content-Type", "application/xml");
        res.end(
          '<CompleteMultipartUploadResult><ETag>"completed"</ETag></CompleteMultipartUploadResult>',
        );
        return;
      }
      if (upload && req.method === "DELETE") {
        uploads.delete(uploadId!);
        res.writeHead(204);
        res.end();
        return;
      }
      if (url.pathname === "/fixture-stats") {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ putBytes }));
        return;
      }
      const object = objects.get(key);
      if (!object || url.searchParams.get("versionId") !== object.version) {
        res.writeHead(404);
        res.end();
        return;
      }
      res.setHeader("Content-Length", object.body.length);
      res.setHeader("ETag", '"completed"');
      res.setHeader("x-amz-version-id", object.version);
      res.setHeader("Content-Type", "application/octet-stream");
      if (url.searchParams.has("response-content-disposition"))
        res.setHeader(
          "Content-Disposition",
          url.searchParams.get("response-content-disposition")!,
        );
      res.end(req.method === "HEAD" ? undefined : object.body);
    },
  );
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (!address || typeof address === "string")
    throw new Error("Missing fixture address");
  return {
    endpoint: `https://localhost:${address.port}`,
    close: () =>
      new Promise<void>((resolve, reject) => {
        server.closeAllConnections();
        server.close((error) => (error ? reject(error) : resolve()));
      }),
  };
}
