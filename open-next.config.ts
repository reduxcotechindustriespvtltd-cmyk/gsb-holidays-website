import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";

// Without this, Cloudflare Workers Builds regenerates a fresh, cache-less
// OpenNext config on every single deploy (no committed wrangler.jsonc/
// open-next.config.ts means it runs `@opennextjs/cloudflare migrate` from
// scratch each build) — every page view, even ISR-eligible ones like "/" and
// "/packages/[slug]", then hits the CRM live instead of serving from cache.
// This KV-backed cache makes `fetch(..., { next: { revalidate: 60 } })` in
// lib/cms.ts (and full-page ISR) actually persist between requests.
export default defineCloudflareConfig({
	incrementalCache: kvIncrementalCache,
	// Without a queue, OpenNext falls back to a no-op that silently drops every
	// background ISR revalidation — a prerendered page that goes stale once can
	// never refresh again. /packages/karjat-farmhouse-family-room was stuck
	// serving `x-nextjs-cache: STALE` forever, pointing at a package image that
	// had since been re-uploaded (and the old file deleted) in the CRM, so it
	// 404'd at /_next/image. The Durable Object queue actually runs the
	// revalidation so stale pages regenerate.
	queue: doQueue,
});
