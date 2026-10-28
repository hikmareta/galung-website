import { getPayload } from "payload";
import config from "../src/payload.config";
import { smtpConfiguration } from "../src/services/contact/configuration";
import { freshRetention } from "../src/services/contact/store";
import { contactReady } from "../src/services/contact/handler";
const payload = await getPayload({ config });
try {
  const page = await payload.find({
    collection: "pages",
    locale: "id",
    fallbackLocale: false,
    draft: false,
    overrideAccess: false,
    depth: 0,
    limit: 1,
    where: {
      and: [
        { key: { equals: "contact" } },
        { _status: { equals: "published" } },
      ],
    },
  });
  console.log(
    JSON.stringify({
      smtpFieldsComplete: !!smtpConfiguration({
        ...process.env,
        CONTACT_ENABLED: "true",
      }),
      contactEnabled: process.env.CONTACT_ENABLED === "true",
      publishedIndonesianContactPage:
        !!page.docs[0]?.title && !!page.docs[0]?.slug,
      retentionHealthy: await freshRetention(payload),
      ready: await contactReady(payload),
    }),
  );
} finally {
  await payload.destroy();
}
