import { getPayload } from "payload";
import config from "../src/payload.config";
import { maintainContact } from "../src/services/contact/store";
const payload = await getPayload({ config });
let timer: ReturnType<typeof setTimeout> | undefined;
let stopping = false;
let wake: (() => void) | undefined;
function stop() {
  stopping = true;
  if (timer) clearTimeout(timer);
  wake?.();
}
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
try {
  do {
    const { removed, reconciled } = await maintainContact(payload);
    console.log(
      `Contact maintenance completed; deleted ${removed} expired website records; reconciled ${reconciled} audit receipts.`,
    );
    if (!process.argv.includes("--worker") || stopping) break;
    await new Promise<void>((resolve) => {
      wake = resolve;
      timer = setTimeout(resolve, 3600000);
    });
  } while (!stopping);
} finally {
  await payload.destroy();
}
