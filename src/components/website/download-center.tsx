import { getPayload } from "payload";
import config from "@/payload.config";
import type { Locale } from "@/lib/i18n/locales";
import { publicInstallers } from "@/services/downloads/public";
export async function DownloadCenter({ locale }: { locale: Locale }) {
  const id = locale === "id";
  const cards = await getPayload({ config })
    .then((payload) => publicInstallers(payload, locale))
    .catch(() => null);
  if (!cards) {
    return (
      <p role="alert">
        {id
          ? "Daftar unduhan tidak tersedia. Muat ulang untuk mencoba lagi."
          : "Downloads unavailable. Reload to try again."}
      </p>
    );
  }
  return (
    <section aria-label={id ? "Unduhan Galung" : "Galung downloads"}>
      <p className="image-note">
        {id
          ? "Contoh antarmuka unduhan — belum ditinjau"
          : "Sample download interface copy — unreviewed"}
      </p>
      {!cards.length && (
        <p role="status">
          {id
            ? "Belum ada installer terverifikasi yang tersedia."
            : "No verified installers are available yet."}
        </p>
      )}
      <div className="card-grid">
        {cards.map((card) => (
          <article className="card card-content" key={card.id}>
            <h2>
              {card.os === "windows" ? "Windows" : "macOS"} ·{" "}
              {card.architecture}
            </h2>
            <p>
              Galung {card.version} ·{" "}
              {new Intl.NumberFormat(id ? "id-ID" : "en-GB").format(
                card.sizeBytes,
              )}{" "}
              {id ? "bita" : "bytes"}
            </p>
            <p style={{ whiteSpace: "pre-wrap" }}>{card.changelog}</p>
            <p style={{ overflowWrap: "anywhere" }}>
              SHA-256: <code>{card.sha256}</code>
            </p>
            <a
              className="button button--primary"
              style={{
                overflowWrap: "anywhere",
                whiteSpace: "normal",
                maxWidth: "100%",
              }}
              href={`/api/downloads/${card.id}?locale=${locale}`}
            >
              {id ? "Unduh" : "Download"} {card.filename}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
