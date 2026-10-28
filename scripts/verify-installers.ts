import { getPayload } from "payload";
import config from "../src/payload.config";
import { s3Storage } from "../src/services/downloads/storage";
import { verifyAsset } from "../src/services/downloads/workflow";
const payload = await getPayload({ config });
try {
  const storage = s3Storage();
  const pending = await payload.find({
    collection: "releaseAssets",
    where: { uploadStatus: { equals: "uploaded" } },
    limit: 100,
    depth: 0,
  });
  let failures = 0;
  for (const asset of pending.docs) {
    try {
      await verifyAsset(payload, storage, asset.id);
      console.log(`Verified installer ${asset.id}`);
    } catch {
      failures++;
      console.error(
        `Installer ${asset.id}: verification failed or storage unavailable; inspect private record`,
      );
    }
  }
  if (failures) process.exitCode = 1;
} finally {
  await payload.destroy();
}
