import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";

// Without this, Cloudflare Workers Builds regenerates a fresh, cache-less
// OpenNext config on every single deploy (no committed wrangler.jsonc/
// open-next.config.ts means it runs `@opennextjs/cloudflare migrate` from
// scratch each build) — every page view, even ISR-eligible ones like "/" and
// "/packages/[slug]", then hits the CRM live instead of serving from cache.
// This KV-backed cache makes `fetch(..., { next: { revalidate: 60 } })` in
// lib/cms.ts (and full-page ISR) actually persist between requests.
export default defineCloudflareConfig({
	incrementalCache: kvIncrementalCache,
});
