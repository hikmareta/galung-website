import { getPayload } from "payload";
import config from "@/payload.config";
import { downloadTarget } from "@/services/downloads/public";
import { s3Storage } from "@/services/downloads/storage";
import { isLocale } from "@/lib/i18n/locales";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const locale = new URL(request.url).searchParams.get("locale") || "";
  const headers = {
    "Cache-Control": "private, no-store",
    "X-Robots-Tag": "noindex, nofollow",
  };
  if (!/^\d{1,9}$/.test(id) || !isLocale(locale))
    return Response.json(
      { error: "Invalid download request" },
      { status: 400, headers },
    );
  try {
    const payload = await getPayload({ config });
    const target = await downloadTarget(
      payload,
      s3Storage(),
      Number(id),
      locale,
    );
    if (!target)
      return Response.json(
        {
          error:
            locale === "id"
              ? "Unduhan tidak tersedia."
              : "Download unavailable.",
        },
        { status: 404, headers },
      );
    return new Response(null, {
      status: 302,
      headers: { ...headers, Location: target },
    });
  } catch {
    return Response.json(
      {
        error:
          locale === "id"
            ? "Penyimpanan tidak tersedia. Coba lagi nanti."
            : "Storage unavailable. Please try again later.",
      },
      { status: 503, headers: { ...headers, "Retry-After": "60" } },
    );
  }
}
