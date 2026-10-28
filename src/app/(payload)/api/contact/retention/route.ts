import { getPayload } from "payload";
import config from "@/payload.config";
import { equalSecret } from "@/services/contact/security";
import { maintainContact } from "@/services/contact/store";
import { contactResponse } from "@/services/contact/handler";
export const runtime = "nodejs";
export async function POST(request: Request) {
  const secret = process.env.CONTACT_MAINTENANCE_SECRET;
  if (
    !secret ||
    secret.length < 32 ||
    !equalSecret(request.headers.get("authorization") || "", `Bearer ${secret}`)
  )
    return contactResponse("forbidden", 403);
  try {
    const result = await maintainContact(await getPayload({ config }));
    return Response.json(result, {
      headers: { "Cache-Control": "private, no-store" },
    });
  } catch {
    return contactResponse("unavailable", 503);
  }
}
