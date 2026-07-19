import assert from "node:assert/strict";
import { stat } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the public homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Demian Reidel — Physicist\. Economist\. Builder\.<\/title>/i);
  assert.match(html, /Physicist\. Economist\. Builder\./i);
  assert.doesNotMatch(html, /Your site is taking shape|Codex is working/i);
});

test("server-renders the canonical paper page", async () => {
  const response = await render("/Public/PaperJMDR");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Minimum Viable Scale and First-Passage Bellman Barriers<\/title>/i);
  assert.match(html, /rel="canonical" href="https:\/\/demianreidel\.com\/Public\/PaperJMDR"/i);
  assert.match(html, /https:\/\/demianreidel\.com\/PaperJMDR\/paper-og\.png/i);
  assert.match(html, /Submitted to Econometrica/i);
  assert.match(html, /Physical viability and optimal preservation are different thresholds\./i);
  assert.match(html, /Four cases cover every feasible lifetime history\./i);
  assert.match(html, /href="\/PaperJMDR\/Minimum_Viable_Scale_Main\.pdf"/i);
  assert.doesNotMatch(html, /<canvas\b|particle|electric|glow/i);
});

test("ships the paper and its publication assets", async () => {
  const files = [
    new URL("../public/PaperJMDR/Minimum_Viable_Scale_Main.pdf", import.meta.url),
    new URL("../public/PaperJMDR/Minimum_Viable_Scale_First_Page.png", import.meta.url),
    new URL("../public/PaperJMDR/paper-og.png", import.meta.url),
  ];

  const sizes = await Promise.all(files.map(async (file) => (await stat(file)).size));
  for (const size of sizes) assert.ok(size > 10_000);
});
