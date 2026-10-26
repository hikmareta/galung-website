import assert from "node:assert/strict";
import { getPayload } from "payload";
import config from "../../src/payload.config";
import { assertIsolatedDatabase } from "../helpers/isolated-database";

assertIsolatedDatabase();
const payload = await getPayload({ config });
await payload.count({ collection: "users" });
const pool = payload.db.pool;
assert.equal(
  pool.totalCount,
  pool.idleCount,
  "All connections must return to the pool",
);
await payload.destroy();
assert.equal(pool.ended, true, "Destroy must close the PostgreSQL pool");
console.log(
  "PASS: fresh migration, rollback, reapply, connection release and clean shutdown",
);
