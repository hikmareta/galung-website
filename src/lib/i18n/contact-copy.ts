// Interface copy remains subject to the site's content review; both policy notices are separately approved.
export const contactCopy = {
  id: {
    heading: "Kirim pesan",
    form: "Formulir kontak",
    name: "Nama",
    email: "Email",
    message: "Pesan",
    consent: "Saya telah membaca pemberitahuan privasi di atas.",
    send: "Kirim pesan",
    sending: "Mengirim…",
    preparing: "Menyiapkan formulir…",
    retry: "Coba lagi",
    check: "Periksa status pengiriman",
    reset: "Buat pesan baru",
    unavailable: "Formulir belum tersedia. Anda dapat menghubungi",
    tokenError: "Formulir gagal disiapkan. Periksa koneksi lalu coba lagi.",
    nameError: "Isi nama, maksimal 120 karakter.",
    emailError: "Isi alamat email yang valid.",
    messageError: "Isi pesan, maksimal 5.000 karakter.",
    consentError:
      "Konfirmasikan bahwa Anda telah membaca pemberitahuan privasi.",
    sent: "Pesan Anda telah diterima untuk dikirim ke tim Galung. Terima kasih.",
    rate: "Batas pengiriman tercapai. Silakan coba lagi dalam satu jam.",
    token:
      "Sesi formulir perlu diperbarui. Tunggu beberapa detik, lalu coba lagi.",
    invalid: "Periksa nama, alamat email, pesan, dan persetujuan privasi Anda.",
    failed:
      "Server email menolak pesan ini. Pesan tidak dikirim ulang otomatis. Hubungi admin@galung.id.",
    unknown:
      "Status pengiriman belum dapat dipastikan. Jangan kirim pesan yang sama lagi. Gunakan pemeriksaan status atau hubungi admin@galung.id.",
    processing:
      "Pesan sedang diproses. Periksa status tanpa mengirim ulang pesan.",
    changed:
      "ID formulir ini sudah digunakan untuk pesan lain. Periksa pesan sebelumnya atau pilih buat pesan baru.",
    server: "Layanan belum tersedia. Coba lagi atau hubungi admin@galung.id.",
  },
  en: {
    heading: "Send a message",
    form: "Contact form",
    name: "Name",
    email: "Email",
    message: "Message",
    consent: "I have read the privacy notice above.",
    send: "Send message",
    sending: "Sending…",
    preparing: "Preparing the form…",
    retry: "Try again",
    check: "Check delivery status",
    reset: "Start a new message",
    unavailable: "The form is currently unavailable. You can contact",
    tokenError:
      "The form could not be prepared. Check your connection and try again.",
    nameError: "Enter your name, up to 120 characters.",
    emailError: "Enter a valid email address.",
    messageError: "Enter a message, up to 5,000 characters.",
    consentError: "Confirm that you have read the privacy notice.",
    sent: "Your message has been accepted for delivery to the Galung team. Thank you.",
    rate: "The submission limit has been reached. Please try again in one hour.",
    token:
      "Your form session needs to be refreshed. Wait a few seconds and try again.",
    invalid:
      "Check your name, email address, message and privacy acknowledgement.",
    failed:
      "The email server rejected this message. It will not be resent automatically. Contact admin@galung.id.",
    unknown:
      "Delivery could not be confirmed. Do not send the same message again. Check its status or contact admin@galung.id.",
    processing:
      "Your message is being processed. Check its status without resending it.",
    changed:
      "This form ID has already been used for another message. Check the previous message or start a new one.",
    server: "The service is unavailable. Try again or contact admin@galung.id.",
  },
} as const;
