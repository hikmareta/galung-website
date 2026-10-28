import { smtpConfiguration } from "./configuration.ts";
import nodemailer from "nodemailer";
import { contactPolicy, type ContactInput } from "./policy.ts";
import { ContactDeliveryError } from "./delivery.ts";
export function contactTransport(forVerification = false) {
  const smtp = smtpConfiguration(
    forVerification ? { ...process.env, CONTACT_ENABLED: "true" } : process.env,
  );
  if (!smtp) throw new Error("Contact SMTP unavailable");
  return {
    from: smtp.from,
    transport: nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      requireTLS: true,
      auth: { user: smtp.user, pass: smtp.pass },
      tls: { minVersion: "TLSv1.2", rejectUnauthorized: true },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 15000,
      disableFileAccess: true,
      disableUrlAccess: true,
      logger: false,
      debug: false,
    }),
  };
}
export async function sendContact(data: ContactInput, reference: number) {
  const { from, transport } = contactTransport();
  try {
    const result = await transport.sendMail({
      from: { name: "Galung", address: from },
      to: contactPolicy.recipient,
      replyTo: data.email,
      subject: `${data.locale === "id" ? "Pesan kontak Galung" : "Galung contact message"} #${reference}`,
      text: `Referensi: ${reference}\nNama: ${data.name}\nEmail: ${data.email}\n\n${data.message}\n\nSalinan situs disimpan selama 30 hari. Penyimpanan email dikelola terpisah.`,
    });
    if (
      !result.accepted?.some(
        (address) => String(address).toLowerCase() === contactPolicy.recipient,
      )
    )
      throw new ContactDeliveryError("failed");
  } catch (error) {
    if (error instanceof ContactDeliveryError) throw error;
    const details = error as { code?: string; responseCode?: number };
    const rejected =
      details?.code === "EAUTH" ||
      (typeof details?.responseCode === "number" &&
        details.responseCode >= 500 &&
        details.responseCode <= 599);
    throw new ContactDeliveryError(rejected ? "failed" : "unknown");
  } finally {
    transport.close();
  }
}
