import { test, describe, before } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Eleventy from "@11ty/eleventy";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const OUTPUT_DIR = path.join(__dirname, "../_test-site");

let results;

before(async () => {
  const elev = new Eleventy("src", OUTPUT_DIR, {
    configPath: path.join(__dirname, "../eleventy.config.js"),
    quietMode: true,
  });
  await elev.init();
  results = await elev.toJSON();
});

function getByUrl(url) {
  return results.find((r) => r.url === url);
}

function getByUrlPrefix(prefix) {
  return results.filter((r) => r.url.startsWith(prefix));
}

describe("Collections", () => {
  test("blog posts appear at /blog/[slug]/", () => {
    const posts = getByUrlPrefix("/blog/").filter(
      (r) => r.url !== "/blog/" && !r.url.startsWith("/blog/page/")
    );
    assert.ok(posts.length > 0, "expected at least one blog post");
    for (const post of posts) {
      assert.match(post.url, /^\/blog\/[^/]+\/$/);
    }
  });

  test("notes appear at /notes/[slug]/", () => {
    const notes = getByUrlPrefix("/notes/").filter(
      (r) => r.url !== "/notes/" && !r.url.startsWith("/notes/page/")
    );
    assert.ok(notes.length > 0, "expected at least one note");
    for (const note of notes) {
      assert.match(note.url, /^\/notes\/[^/]+\/$/);
    }
  });

  test("TIL posts appear at /til/[slug]/", () => {
    const tils = getByUrlPrefix("/til/").filter(
      (r) => r.url !== "/til/" && !r.url.startsWith("/til/page/")
    );
    assert.ok(tils.length > 0, "expected at least one TIL");
    for (const til of tils) {
      assert.match(til.url, /^\/til\/[^/]+\/$/);
    }
  });
});

describe("Draft exclusion", () => {
  test("draft post is present in dev build", () => {
    const draftPost = getByUrl("/blog/draft-post/");
    assert.ok(draftPost, "draft post should be present when NODE_ENV is not production");
  });

  test("draft post content contains expected text", () => {
    const draftPost = getByUrl("/blog/draft-post/");
    assert.ok(draftPost, "draft post should exist");
    assert.ok(
      draftPost.content.includes("draft"),
      "draft post content should mention 'draft'"
    );
  });
});

describe("Permalink patterns", () => {
  test("blog index exists at /blog/", () => {
    assert.ok(getByUrl("/blog/"), "blog index missing");
  });

  test("notes index exists at /notes/", () => {
    assert.ok(getByUrl("/notes/"), "notes index missing");
  });

  test("til index exists at /til/", () => {
    assert.ok(getByUrl("/til/"), "TIL index missing");
  });

  test("writing hub exists at /writing/", () => {
    assert.ok(getByUrl("/writing/"), "writing hub missing");
  });

  test("tags index exists at /tags/", () => {
    assert.ok(getByUrl("/tags/"), "tags index missing");
  });

  test("tag pages are generated at /tags/[tag]/", () => {
    const tagPages = getByUrlPrefix("/tags/").filter((r) => r.url !== "/tags/");
    assert.ok(tagPages.length > 0, "expected at least one tag page");
    for (const page of tagPages) {
      assert.match(page.url, /^\/tags\/[^/]+\/$/);
    }
  });
});

describe("RSS feed", () => {
  test("feed.xml is generated", () => {
    assert.ok(getByUrl("/feed.xml"), "feed.xml missing");
  });

  test("feed.xml is valid Atom XML", () => {
    const feed = getByUrl("/feed.xml");
    assert.ok(feed.content.includes('xmlns="http://www.w3.org/2005/Atom"'));
    assert.ok(feed.content.includes("<entry>"));
  });

  test("feed entries contain absolute URLs", () => {
    const feed = getByUrl("/feed.xml");
    const links = [...feed.content.matchAll(/<link href="([^"]+)"/g)].map(
      (m) => m[1]
    );
    for (const link of links) {
      assert.ok(
        link.startsWith("https://joelcarr.co.uk"),
        `expected absolute URL, got: ${link}`
      );
    }
  });
});

describe("Tag list", () => {
  test("/tags/note/ is not generated (notes excluded from tagList)", () => {
    const noteTagPage = getByUrl("/tags/note/");
    assert.ok(!noteTagPage, "/tags/note/ should not be generated");
  });
});
