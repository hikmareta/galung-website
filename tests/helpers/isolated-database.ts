export function assertIsolatedDatabase(
  env: Record<string, string | undefined> = process.env,
): void {
  const name = new URL(
    env.DATABASE_URL || "postgresql://invalid/",
  ).pathname.slice(1);
  if (
    env.GALUNG_TEST_DATABASE !== name ||
    !/^galung_test_(integration|e2e|database)_[a-f0-9]{16}$/.test(name)
  ) {
    throw new Error(
      "Tests require the disposable database runner; use the package test commands",
    );
  }
}
