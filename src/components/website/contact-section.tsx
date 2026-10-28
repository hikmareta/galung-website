import { getPayload } from "payload";
import config from "@/payload.config";
import { contactReady } from "@/services/contact/handler";
import { ContactForm } from "./contact-form";
export async function ContactSection({ locale }: { locale: "id" | "en" }) {
  let ready = false;
  try {
    ready = await contactReady(await getPayload({ config }), locale);
  } catch {
    /* Render an honest unavailable state. */
  }
  return <ContactForm key={locale} ready={ready} locale={locale} />;
}
