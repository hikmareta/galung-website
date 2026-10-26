import { getPayload } from "payload";
import config from "../src/payload.config";
const email = process.env.BOOTSTRAP_ADMIN_EMAIL;
const password = process.env.BOOTSTRAP_ADMIN_PASSWORD;
if (!email || !password || password.length < 16)
  throw new Error(
    "Set operator email and a unique password of at least 16 characters",
  );
async function main(email: string, password: string) {
  const payload = await getPayload({ config });
  try {
    const existing = await payload.count({
      collection: "users",
      overrideAccess: true,
    });
    if (existing.totalDocs !== 0)
      throw new Error(
        "Bootstrap is only permitted on an empty users collection; use authenticated user management",
      );
    await payload.create({
      collection: "users",
      overrideAccess: true,
      context: { bootstrapAdmin: true },
      data: {
        email,
        password,
        name: "Administrator",
        role: "super-admin",
        active: true,
      },
    });
    console.log(
      "Administrator created. Remove bootstrap credentials from the environment.",
    );
  } finally {
    await payload.destroy();
  }
}
main(email, password).catch((error: unknown) => {
  console.error(
    error instanceof Error ? error.message : "Administrator creation failed",
  );
  process.exitCode = 1;
});
