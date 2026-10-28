import { getPayload } from "payload";
import config from "@/payload.config";
import { readEnvironment } from "@/lib/env";
import { tokenResponse, contactResponse } from "@/services/contact/handler";
export const runtime = "nodejs";
export async function GET(request: Request) {
  try {
    const env = readEnvironment();
    return await tokenResponse(
      request,
      await getPayload({ config }),
      env.origin,
      env.secret,
    );
  } catch {
    return contactResponse("unavailable", 503);
  }
}
