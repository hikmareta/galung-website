import type { PayloadRequest } from "payload";
import {
  semanticVersion,
  validateAuthoredContent,
} from "../../src/services/content/metadata-validation.ts";
import assert from "node:assert/strict";
import test from "node:test";
import {
  mediaReferences,
  childRequest,
} from "../../src/services/content/media-references.ts";
import { safeRichText } from "../../src/services/content/rich-text.ts";
test("media reference traversal includes shared arrays and both localized values without matching plain IDs", () => {
  const refs = mediaReferences({
    id: 90,
    heroMedia: { id: 1, en: 2 },
    layout: [{ media: { id: 3, alt: "sample" }, items: [{ media: 4 }] }],
    gallery: [{ image: 5 }],
  });
  assert.deepEqual(refs.map((ref) => ref.id).sort(), [1, 2, 3, 4, 5]);
});
test("rich text rejects HTML, scripts, custom node types and unsafe headings", () => {
  assert.equal(
    safeRichText({
      root: {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              { type: "text", text: "<script>text remains text</script>" },
            ],
          },
        ],
      },
    }),
    true,
  );
  for (const node of [
    { type: "html", html: "<script/>" },
    { type: "link", fields: { url: "javascript:alert(1)" } },
    { type: "heading", tag: "script", children: [] },
  ])
    assert.notEqual(
      safeRichText({ root: { type: "root", children: [node] } }),
      true,
    );
});

test("locale validation does not share a relation loader bound to the write request", () => {
  const original = {
    locale: "id",
    query: { locale: "id" },
    context: {},
    payloadDataLoader: { boundToParent: true },
  } as unknown as PayloadRequest;
  const child = childRequest(original);
  assert.equal(child.payloadDataLoader, undefined);
  child.locale = "en";
  child.query!.locale = "en";
  assert.equal(original.locale, "id");
  assert.equal(original.query.locale, "id");
});
test("release metadata semantic version validation handles prerelease rules", () => {
  for (const value of ["1.0.0", "0.0.1", "1.0.0-alpha.1+build.123", "1.0.0-0"])
    assert.equal(semanticVersion(value), true);
  for (const value of [
    "1.0",
    "01.0.0",
    "1.0.0-01",
    "1.0.0-..",
    "v1.0.0",
    "1.0.0+",
  ])
    assert.notEqual(semanticVersion(value), true);
});

test("draft and preview authored data reject active links and unsupported rich-text nodes", () => {
  assert.notEqual(
    validateAuthoredContent({ layout: [{ link: "javascript:alert(1)" }] }),
    true,
  );
  assert.notEqual(
    validateAuthoredContent({ links: [{ href: "/\n/evil.invalid" }] }),
    true,
  );
  assert.notEqual(
    validateAuthoredContent({
      content: { root: { type: "root", children: [{ type: "html" }] } },
    }),
    true,
  );
  assert.equal(
    validateAuthoredContent({
      media: {
        id: 1,
        mimeType: "image/png",
        filename: "sample.png",
        url: "http://127.0.0.1/api/media/file/sample.png",
      },
    }),
    true,
  );
});
