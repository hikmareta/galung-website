import assert from "node:assert/strict";
import { getPayload } from "payload";
import config from "../../src/payload.config";
import { assertIsolatedDatabase } from "../helpers/isolated-database";
assertIsolatedDatabase();
const payload = await getPayload({ config });
try {
  const users = [];
  for (const role of ["super-admin", "editor", "publisher"] as const) {
    users.push(
      await payload.create({
        collection: "users",
        context: { bootstrapAdmin: true },
        data: {
          name: role,
          email: `${role}@editorial.invalid`,
          password: "Editorial-Test-Password-2026!",
          role,
          active: true,
        },
      }),
    );
  }
  const [admin, editor, publisher] = users.map((user) => ({
    ...user,
    collection: "users" as const,
  }));
  await assert.rejects(
    payload.create({
      collection: "media",
      user: editor,
      overrideAccess: false,
      data: { alt: "Invalid image", attribution: "Test" },
      file: {
        data: Buffer.from("executable"),
        mimetype: "image/png",
        name: "bad.png",
        size: 10,
      },
    }),
  );
  const media = await payload.create({
    collection: "media",
    user: editor,
    overrideAccess: false,
    data: { alt: "ID image sample", attribution: "Original test pixel" },
    file: {
      data: Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=",
        "base64",
      ),
      mimetype: "image/png",
      name: "editorial-pixel.png",
      size: 68,
    },
  });
  assert.equal(
    (await payload.find({ collection: "media", overrideAccess: false }))
      .totalDocs,
    0,
  );
  await payload.update({
    collection: "media",
    id: media.id,
    user: editor,
    overrideAccess: false,
    locale: "en",
    data: { alt: "EN image sample" },
  });
  await payload.update({
    collection: "media",
    id: media.id,
    user: publisher,
    overrideAccess: false,
    data: { approved: true },
  });
  assert.equal(
    (await payload.find({ collection: "media", overrideAccess: false }))
      .totalDocs,
    1,
  );
  const page = await payload.create({
    collection: "pages",
    user: editor,
    overrideAccess: false,
    locale: "id",
    draft: true,
    data: {
      key: "home",
      slug: "home",
      title: "ID sample",
      layout: [
        { blockType: "hero", headline: "ID hero", media: media.id },
        { blockType: "featureGrid", headline: "ID features" },
      ],
    },
  });
  assert.equal(
    (await payload.find({ collection: "pages", overrideAccess: false }))
      .totalDocs,
    0,
  );
  await assert.rejects(
    payload.update({
      collection: "pages",
      id: page.id,
      user: editor,
      overrideAccess: false,
      data: { _status: "published", reviewedLocales: ["id", "en"] },
    }),
  );
  await assert.rejects(
    payload.create({
      collection: "users",
      user: editor,
      overrideAccess: false,
      data: {
        name: "Escalation",
        active: true,
        email: "denied@editorial.invalid",
        password: "Editorial-Test-Password-2026!",
        role: "super-admin",
      },
    }),
  );
  await payload.update({
    collection: "pages",
    id: page.id,
    locale: "en",
    draft: true,
    user: editor,
    overrideAccess: false,
    data: {
      title: "EN sample",
      slug: "home",
      layout: page.layout!.map((block, i) => ({
        ...block,
        headline: `EN ${i}`,
      })),
    },
  });
  await assert.rejects(
    payload.delete({
      collection: "media",
      id: media.id,
      user: admin,
      overrideAccess: false,
    }),
  );
  const en = await payload.findByID({
    collection: "pages",
    id: page.id,
    locale: "en",
    draft: true,
    user: editor,
    overrideAccess: false,
  });
  await payload.update({
    collection: "pages",
    id: page.id,
    locale: "en",
    draft: true,
    user: editor,
    overrideAccess: false,
    data: { layout: [...en.layout!].reverse() },
  });
  const id = await payload.findByID({
    collection: "pages",
    id: page.id,
    locale: "id",
    draft: true,
    user: editor,
    overrideAccess: false,
  });
  assert.equal(id.layout![0].blockType, "featureGrid");
  assert.equal(id.layout![0].headline, "ID features");
  await payload.update({
    collection: "pages",
    id: page.id,
    user: publisher,
    overrideAccess: false,
    data: { _status: "published", reviewedLocales: ["id", "en"] },
  });
  assert.equal(
    (
      await payload.find({
        collection: "pages",
        overrideAccess: false,
        locale: "en",
      })
    ).docs[0].title,
    "EN sample",
  );
  await payload.update({
    collection: "pages",
    id: page.id,
    locale: "id",
    draft: true,
    user: editor,
    overrideAccess: false,
    data: { title: "Private revision" },
  });
  assert.equal(
    (
      await payload.findByID({
        collection: "pages",
        id: page.id,
        locale: "id",
        overrideAccess: false,
        draft: false,
      })
    ).title,
    "ID sample",
  );
  await assert.rejects(
    payload.findByID({
      collection: "pages",
      id: page.id,
      locale: "id",
      overrideAccess: false,
      draft: true,
    }),
    { status: 404 },
  );
  await assert.rejects(
    payload.find({ collection: "auditEvents", overrideAccess: false }),
  );
  await assert.rejects(
    payload.findVersions({ collection: "pages", overrideAccess: false }),
  );
  await assert.rejects(
    payload.updateGlobal({
      slug: "companyProfile",
      user: editor,
      overrideAccess: false,
      data: { legalName: "Denied" },
    }),
  );
  await payload.updateGlobal({
    slug: "companyProfile",
    user: admin,
    overrideAccess: false,
    draft: true,
    data: { legalName: "Test draft only" },
  });
  await assert.rejects(
    payload.findGlobal({ slug: "companyProfile", overrideAccess: false }),
  );
  const audit = await payload.find({
    collection: "auditEvents",
    user: admin,
    overrideAccess: false,
  });
  assert.ok(audit.totalDocs > 0);
  await assert.rejects(
    payload.create({
      collection: "auditEvents",
      user: admin,
      overrideAccess: false,
      data: {
        action: "forge",
        actorIdSnapshot: "forged",
        actorRoleSnapshot: "forged",
        resource: "users",
        resourceId: "1",
      },
    }),
  );
  console.log(
    "PASS: RBAC, draft isolation, shared reorder with localized preservation, publication, globals and audit controls",
  );
} finally {
  await payload.destroy();
}
