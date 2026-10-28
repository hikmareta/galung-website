import { getPayload } from "payload";
import config from "@/payload.config";
import { readEnvironment } from "@/lib/env";
import { submitContact, contactResponse } from "@/services/contact/handler";
import { sendContact } from "@/services/contact/mail";
export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    const env = readEnvironment();
    return await submitContact(
      request,
      await getPayload({ config }),
      env.origin,
      env.secret,
      sendContact,
    );
  } catch {
    return contactResponse("unavailable", 503);
  }
}
