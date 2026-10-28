// Loopback-only, TLS SMTP sink. It never relays mail. Public test key is not a production credential.
import { createServer, type TLSSocket } from "node:tls";
import { readFileSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
export async function startSMTP(captureFile: string) {
  const messages: { envelope: string[]; data: string }[] = [];
  const sockets = new Set<TLSSocket>();
  const server = createServer(
    {
      key: readFileSync(
        new URL("../fixtures/smtp-localhost.test-key.txt", import.meta.url),
      ),
      cert: readFileSync(
        new URL("../fixtures/smtp-localhost.test-cert.crt", import.meta.url),
      ),
    },
    (socket) => {
      sockets.add(socket);
      socket.on("close", () => sockets.delete(socket));
      socket.on("error", () => {});
      socket.write("220 localhost test SMTP sink\r\n");
      let buffer = "";
      let receiving = false;
      let data: string[] = [];
      let envelope: string[] = [];
      socket.setEncoding("utf8");
      socket.on("data", async (chunk) => {
        buffer += String(chunk);
        while (buffer.includes("\r\n")) {
          const end = buffer.indexOf("\r\n");
          const line = buffer.slice(0, end);
          buffer = buffer.slice(end + 2);
          if (receiving) {
            if (line !== ".") {
              data.push(line);
              continue;
            }
            receiving = false;
            messages.push({ envelope, data: data.join("\r\n") });
            await mkdir(path.dirname(captureFile), { recursive: true });
            await writeFile(captureFile, JSON.stringify(messages));
            socket.write("250 message accepted locally\r\n");
            data = [];
            envelope = [];
            continue;
          }
          if (/^EHLO /i.test(line))
            socket.write("250-localhost\r\n250 AUTH PLAIN\r\n");
          else if (/^AUTH PLAIN /i.test(line))
            socket.write("235 authenticated for local test\r\n");
          else if (/^(MAIL FROM|RCPT TO):/i.test(line)) {
            envelope.push(line);
            socket.write("250 OK\r\n");
          } else if (line === "DATA") {
            receiving = true;
            socket.write("354 end with dot\r\n");
          } else if (line === "QUIT") socket.end("221 bye\r\n");
          else socket.write("250 OK\r\n");
        }
      });
    },
  );
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  if (!address || typeof address === "string")
    throw new Error("Missing SMTP sink port");
  return {
    port: address.port,
    close: async () => {
      for (const socket of sockets) socket.destroy();
      await new Promise<void>((resolve) => server.close(() => resolve()));
    },
  };
}
