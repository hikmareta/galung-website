import assert from "node:assert/strict";
import { randomBytes, createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { getPayload } from "payload";
import config from "../../src/payload.config";
import { assertIsolatedDatabase } from "../helpers/isolated-database";
assertIsolatedDatabase();
const payload = await getPayload({ config });
const prefix = `closure-${randomBytes(6).toString("hex")}`;
const png = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=",
  "base64",
);
const file = (name: string) => ({
  name,
  data: png,
  size: png.length,
  mimetype: "image/png",
});
try {
  const actors = [];
  for (const role of ["super-admin", "publisher", "editor"] as const) {
    const user = await payload.create({
      collection: "users",
      context: { bootstrapAdmin: true },
      data: {
        name: role,
        email: `${prefix}-${role}@example.invalid`,
        password: randomBytes(24).toString("hex"),
        role,
        active: true,
      },
    });
    actors.push({ ...user, collection: "users" as const });
  }
  const [admin, publisher, editor] = actors;
  await assert.rejects(
    payload.create({
      collection: "media",
      user: publisher,
      overrideAccess: false,
      data: {
        alt: "Only ID",
        attribution: "Synthetic fixture",
        approved: true,
      },
      file: file(`${prefix}-reject.png`),
    }),
    { status: 400 },
  );
  const media = await payload.create({
    collection: "media",
    user: editor,
    overrideAccess: false,
    locale: "id",
    data: { alt: "ID test pixel", attribution: "Synthetic fixture" },
    file: file(`${prefix}-approved.png`),
  });
  await assert.rejects(
    payload.update({
      collection: "media",
      id: media.id,
      user: publisher,
      overrideAccess: false,
      data: { approved: true },
    }),
    { status: 400 },
  );
  await payload.update({
    collection: "media",
    id: media.id,
    user: editor,
    overrideAccess: false,
    locale: "en",
    data: { alt: "EN test pixel" },
  });
  await payload.update({
    collection: "media",
    id: media.id,
    user: publisher,
    overrideAccess: false,
    data: { approved: true },
  });
  const mediaDir = path.resolve("media", process.env.GALUNG_TEST_DATABASE!);
  const original = path.resolve(mediaDir, media.filename!);
  const digest = () =>
    createHash("sha256").update(readFileSync(original)).digest("hex");
  const before = digest();
  const names = readdirSync(mediaDir).sort();
  for (const user of [editor, publisher, admin]) {
    await assert.rejects(
      payload.update({
        collection: "media",
        id: media.id,
        user,
        overrideAccess: false,
        data: { alt: "Invalid replacement" },
        file: file(`${prefix}-replacement.png`),
      }),
      { status: 403 },
    );
    assert.equal(existsSync(original), true);
    assert.equal(digest(), before);
    assert.deepEqual(
      readdirSync(mediaDir).sort(),
      names,
      "Rejected write must not create orphan files",
    );
  }
  await assert.rejects(
    payload.update({
      collection: "media",
      id: media.id,
      user: editor,
      overrideAccess: false,
      data: { caption: "Denied approved edit" },
    }),
    { status: 403 },
  );
  await assert.rejects(
    payload.update({
      collection: "media",
      id: media.id,
      user: publisher,
      overrideAccess: false,
      locale: "en",
      data: { alt: "" },
    }),
    { status: 400 },
  );
  await assert.rejects(
    payload.update({
      collection: "media",
      id: media.id,
      user: publisher,
      overrideAccess: false,
      req: { query: { uploadEdits: { widthInPixels: 1 } } },
      data: { alt: "Crop attempt" },
    }),
    { status: 403 },
  );
  assert.equal(digest(), before);
  const enMedia = await payload.findByID({
    collection: "media",
    id: media.id,
    locale: "en",
    fallbackLocale: false,
    overrideAccess: false,
  });
  assert.equal(enMedia.alt, "EN test pixel");
  console.log(
    "PASS R1/R3: file rejection preserves hash/directory; public approval requires both alt locales",
  );
  const pending = await payload.create({
    collection: "media",
    user: editor,
    overrideAccess: false,
    data: { alt: "Pending ID", attribution: "Synthetic fixture" },
    file: file(`${prefix}-pending.png`),
  });
  const page = await payload.create({
    collection: "pages",
    user: editor,
    overrideAccess: false,
    locale: "id",
    draft: true,
    data: {
      key: prefix,
      title: "ID page",
      slug: prefix,
      layout: [
        {
          blockType: "hero",
          headline: "ID hero",
          media: pending.id,
          items: [{ title: "ID item", media: pending.id }],
        },
      ],
    },
  });
  await payload.update({
    collection: "pages",
    id: page.id,
    user: editor,
    overrideAccess: false,
    locale: "en",
    draft: true,
    data: {
      title: "EN page",
      slug: prefix,
      layout: page.layout!.map((block) => ({
        ...block,
        headline: "EN hero",
        media: pending.id,
        items: block.items?.map((item) => ({ ...item, title: "EN item" })),
      })),
    },
  });
  await assert.rejects(
    payload.update({
      collection: "pages",
      id: page.id,
      user: publisher,
      overrideAccess: false,
      data: { _status: "published", reviewedLocales: ["id", "en"] },
    }),
    { status: 400 },
  );
  await assert.rejects(
    payload.findByID({
      collection: "pages",
      id: page.id,
      overrideAccess: false,
    }),
    { status: 404 },
  );
  await payload.update({
    collection: "media",
    id: pending.id,
    user: editor,
    overrideAccess: false,
    locale: "en",
    data: { alt: "Pending EN" },
  });
  await payload.update({
    collection: "media",
    id: pending.id,
    user: publisher,
    overrideAccess: false,
    data: { approved: true },
  });
  await payload.update({
    collection: "pages",
    id: page.id,
    user: publisher,
    overrideAccess: false,
    data: { _status: "published", reviewedLocales: ["id", "en"] },
  });
  for (const locale of ["id", "en"] as const) {
    const published = await payload.findByID({
      collection: "pages",
      id: page.id,
      locale,
      fallbackLocale: false,
      overrideAccess: false,
      depth: 1,
    });
    const image = published.layout![0].media;
    assert.ok(typeof image === "object" && image?.url && image.alt);
  }
  const usage = await payload.findByID({
    collection: "media",
    id: pending.id,
    user: editor,
    overrideAccess: false,
  });
  assert.match(usage.usage || "", /pages/i);
  await assert.rejects(
    payload.delete({
      collection: "media",
      id: pending.id,
      user: admin,
      overrideAccess: false,
    }),
    { status: 409 },
  );
  await assert.rejects(
    payload.update({
      collection: "media",
      id: pending.id,
      user: publisher,
      overrideAccess: false,
      data: { approved: false },
    }),
    { status: 409 },
  );
  // Retained drafts/versions must protect a file even after current references change.
  const latest = await payload.findByID({
    collection: "pages",
    id: page.id,
    user: editor,
    overrideAccess: false,
    draft: true,
  });
  await payload.update({
    collection: "pages",
    id: page.id,
    user: editor,
    overrideAccess: false,
    draft: true,
    data: {
      layout: latest.layout!.map((block) => ({
        ...block,
        media: null,
        items: [],
      })),
    },
  });
  await assert.rejects(
    payload.delete({
      collection: "media",
      id: pending.id,
      user: admin,
      overrideAccess: false,
    }),
    { status: 409 },
  );
  console.log(
    "PASS R2: pending publication denied; approved images populate in ID/EN; usage and retained versions protect files",
  );
  const publishedVersion = (
    await payload.findVersions({
      collection: "pages",
      user: publisher,
      overrideAccess: false,
      locale: "id",
      where: {
        and: [
          { parent: { equals: page.id } },
          { "version._status": { equals: "published" } },
        ],
      },
      limit: 1,
    })
  ).docs[0];
  assert.ok(publishedVersion);
  await assert.rejects(
    payload.restoreVersion({
      collection: "pages",
      id: String(publishedVersion.id),
      user: editor,
      overrideAccess: false,
    }),
    { status: 403 },
  );
  await payload.restoreVersion({
    collection: "pages",
    id: String(publishedVersion.id),
    user: publisher,
    overrideAccess: false,
    locale: "id",
  });
  const restored = await payload.findByID({
    collection: "pages",
    id: page.id,
    overrideAccess: false,
    locale: "id",
  });
  assert.equal(restored.title, "ID page");
  const event = (
    await payload.find({
      collection: "auditEvents",
      user: admin,
      overrideAccess: false,
      where: {
        and: [
          { actor: { equals: publisher.id } },
          { resource: { equals: "pages" } },
          { action: { equals: "publish" } },
        ],
      },
    })
  ).docs[0];
  assert.ok(event);
  await payload.delete({
    collection: "users",
    id: publisher.id,
    user: admin,
    overrideAccess: false,
  });
  const history = await payload.findByID({
    collection: "auditEvents",
    id: event.id,
    user: admin,
    overrideAccess: false,
  });
  assert.equal(history.actor, null);
  assert.equal(history.actorIdSnapshot, String(publisher.id));
  assert.equal(history.actorRoleSnapshot, "publisher");
  await assert.rejects(
    payload.update({
      collection: "auditEvents",
      id: event.id,
      user: admin,
      overrideAccess: false,
      data: { actorIdSnapshot: "forged" },
    }),
    { status: 403 },
  );
  await payload.updateGlobal({
    slug: "companyProfile",
    user: admin,
    overrideAccess: false,
    draft: true,
    data: { legalName: "Private fixture legal name" },
  });
  const legalEvent = (
    await payload.find({
      collection: "auditEvents",
      user: admin,
      overrideAccess: false,
      where: { resource: { equals: "companyProfile" } },
    })
  ).docs[0];
  assert.equal(legalEvent.actorIdSnapshot, String(admin.id));
  assert.equal(legalEvent.resourceId, "companyProfile");
  for (const collection of [
    "softwareReleases",
    "releaseAssets",
    "contactSubmissions",
    "downloadEvents",
  ] as const) {
    await assert.rejects(payload.find({ collection, overrideAccess: false }), {
      status: 403,
    });
    await assert.rejects(
      payload.find({ collection, user: editor, overrideAccess: false }),
      { status: 403 },
    );
  }
  const rich = {
    root: {
      type: "root",
      version: 1,
      direction: null,
      format: "" as const,
      indent: 0,
      children: [
        {
          type: "paragraph",
          version: 1,
          direction: null,
          format: "",
          indent: 0,
          children: [
            {
              type: "text",
              version: 1,
              text: "Unreviewed rich-text fixture",
              format: 1,
              detail: 0,
              mode: "normal",
              style: "",
            },
          ],
        },
      ],
    },
  };
  const post = await payload.create({
    collection: "posts",
    user: editor,
    overrideAccess: false,
    draft: true,
    data: {
      key: `${prefix}-post`,
      title: "Post fixture",
      slug: `${prefix}-post`,
      content: rich,
      publishAt: "2026-10-26T00:00:00.000Z",
    },
  });
  assert.equal(post.publishAt, "2026-10-26T00:00:00.000Z");
  assert.match(JSON.stringify(post.content), /Unreviewed rich-text fixture/);
  await assert.rejects(
    payload.update({
      collection: "posts",
      id: post.id,
      user: editor,
      overrideAccess: false,
      draft: true,
      data: {
        content: {
          ...rich,
          root: {
            ...rich.root,
            children: [
              { type: "html", version: 1, html: "<script>alert(1)</script>" },
            ],
          },
        },
      },
    }),
    { status: 400 },
  );
  const portfolio = await payload.create({
    collection: "portfolioProjects",
    user: editor,
    overrideAccess: false,
    draft: true,
    data: {
      key: `${prefix}-project`,
      title: "Project fixture",
      slug: `${prefix}-project`,
      description: "Unreviewed fixture",
      caseStudy: rich,
      featured: true,
      gallery: [{ image: media.id }],
    },
  });
  assert.equal(portfolio.featured, true);
  assert.equal(portfolio.gallery?.length, 1);
  await assert.rejects(
    payload.create({
      collection: "products",
      user: editor,
      overrideAccess: false,
      draft: true,
      data: { key: "another-product", title: "Rejected", slug: "rejected" },
    }),
    { status: 400 },
  );
  const product = await payload.create({
    collection: "products",
    user: editor,
    overrideAccess: false,
    draft: true,
    data: { key: "galung", title: "Single product sample", slug: "galung" },
  });
  await assert.rejects(
    payload.create({
      collection: "softwareReleases",
      user: admin,
      overrideAccess: false,
      data: { product: product.id, version: "1.0.0-01", channel: "stable" },
    }),
    { status: 400 },
  );
  const release = await payload.create({
    collection: "softwareReleases",
    user: admin,
    overrideAccess: false,
    draft: true,
    data: { product: product.id, version: "1.0.0", channel: "stable" },
  });
  await assert.rejects(
    payload.update({
      collection: "softwareReleases",
      id: release.id,
      user: admin,
      overrideAccess: false,
      data: { _status: "published" },
    }),
    { status: 400 },
  );
  await assert.rejects(
    payload.create({
      collection: "releaseAssets",
      user: admin,
      overrideAccess: false,
      data: {
        release: release.id,
        os: "windows",
        sha256: "bad",
        visibility: "private",
        uploadStatus: "pending",
      },
    }),
    { status: 400 },
  );
  await assert.rejects(
    payload.create({
      collection: "contactSubmissions",
      user: admin,
      overrideAccess: false,
      data: {
        name: "Sample",
        email: "sample@example.invalid",
        message: "Not a live form",
        locale: "id",
        status: "new",
      },
    }),
    { status: 403 },
  );
  await payload.updateGlobal({
    slug: "siteSettings",
    user: admin,
    overrideAccess: false,
    draft: true,
    locale: "id",
    data: {
      socialLinks: [{ label: "Sample link", url: "https://example.invalid" }],
      seo: { title: "Sample SEO", description: "Unreviewed sample" },
    },
  });
  const site = await payload.findGlobal({
    slug: "siteSettings",
    user: admin,
    overrideAccess: false,
    locale: "id",
    draft: true,
  });
  assert.equal(site.seo?.title, "Sample SEO");
  assert.equal(site.socialLinks?.[0].label, "Sample link");
  console.log(
    "PASS R5: operational models remain private/inactive; semantic metadata and site SEO/social fields validated",
  );
  console.log(
    "PASS R4: audit actor snapshot survives deletion and cannot be forged; company identity event attributed",
  );
} finally {
  await payload.destroy();
}
