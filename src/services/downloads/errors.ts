import { APIError } from "payload";
export class DownloadError extends APIError {
  readonly code: "busy" | "expired" | "not_pending";
  constructor(code: DownloadError["code"], message: string, status: number) {
    super(message, status);
    this.code = code;
  }
}
