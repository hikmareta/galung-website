// Both near-form notices approved by the user on 27 October 2026.
export const contactPolicy = {
  revision: "id-2026-10-27",
  recipient: "admin@galung.id",
  retentionDays: 30,
  paragraphs: [
    "Kami menggunakan nama, alamat email, dan isi pesan yang Anda kirim untuk menanggapi pertanyaan Anda tentang Galung. Mohon jangan menyertakan kata sandi, informasi pembayaran, atau data pribadi sensitif dalam pesan.",
    "Pesan akan diteruskan ke admin@galung.id. Salinan pesan yang disimpan di situs direncanakan dihapus setelah 30 hari. Penghapusan salinan di situs tidak otomatis menghapus salinan di kotak email penerima.",
    "Untuk pertanyaan tentang pesan atau data yang Anda kirim, hubungi admin@galung.id.",
  ],
} as const;
export const contactNotices = {
  id: {
    revision: contactPolicy.revision,
    paragraphs: contactPolicy.paragraphs,
  },
  en: {
    revision: "en-2026-10-27",
    paragraphs: [
      "We use the name, email address and message you submit to respond to your questions about Galung. Please do not include passwords, payment details or sensitive personal data.",
      "Your message will be forwarded to admin@galung.id. The copy stored on the website is scheduled for deletion after 30 days. Deleting the website copy does not automatically delete copies in the recipient’s email inbox.",
      "For questions about your message or personal data, contact admin@galung.id.",
    ],
  },
} as const;

export type ContactInput = {
  name: string;
  email: string;
  message: string;
  locale: "id" | "en";
  privacyRevision: string;
  token: string;
  website: string;
  submissionId: string;
};
function forbiddenControls(value: string, multiline = false) {
  return Array.from(value).some((character) => {
    const code = character.charCodeAt(0);
    return (
      code === 127 || (code < 32 && !(multiline && [9, 10, 13].includes(code)))
    );
  });
}
export function validateContact(value: unknown): ContactInput | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const data = value as Record<string, unknown>;
  if (
    ![
      "name",
      "email",
      "message",
      "token",
      "website",
      "privacyRevision",
      "submissionId",
    ].every((key) => typeof data[key] === "string")
  )
    return null;
  const name = (data.name as string).trim();
  const email = (data.email as string).trim();
  const message = (data.message as string).trim();
  if (
    !name ||
    name.length > 120 ||
    forbiddenControls(name) ||
    email.length > 254 ||
    !/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9.-]*[A-Za-z0-9])?\.[A-Za-z]{2,63}$/.test(
      email,
    ) ||
    !message ||
    message.length > 5000 ||
    forbiddenControls(message, true) ||
    (data.locale !== "id" && data.locale !== "en") ||
    data.privacyRevision !== contactNotices[data.locale].revision ||
    data.consent !== true ||
    (data.website as string).length > 200 ||
    (data.token as string).length > 300 ||
    !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(
      data.submissionId as string,
    )
  )
    return null;
  return {
    name,
    email,
    message,
    locale: data.locale,
    token: data.token as string,
    website: data.website as string,
    privacyRevision: data.privacyRevision as string,
    submissionId: data.submissionId as string,
  };
}
