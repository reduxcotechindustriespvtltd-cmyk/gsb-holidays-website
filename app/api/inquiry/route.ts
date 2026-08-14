import { NextResponse } from "next/server";
import { validateInquiry } from "@/lib/validation";

type InquiryPayload = {
  name?: string;
  email?: string;
  phone?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  guestsAdults?: string;
  guestsKids?: string;
  guestsInfants?: string;
  package?: string;
  message?: string;
  turnstileToken?: string | null;
};

function generateInquiryId() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `GSB-${timestamp}${random}`;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// No-ops (passes) until TURNSTILE_SECRET_KEY is configured — the CAPTCHA
// ships disabled rather than either blocking every real inquiry or shipping
// with Cloudflare's public "always pass" test keys baked into production.
async function verifyTurnstile(token: string | null | undefined, remoteIp: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token, ...(remoteIp ? { remoteip: remoteIp } : {}) }),
    });
    const data = await res.json().catch(() => ({}));
    return data?.success === true;
  } catch (error) {
    console.error("Turnstile verification errored:", error);
    return false;
  }
}

// Forwards a validated inquiry to the GSB CRM so it shows up as a Lead
// (source: WEBSITE) at /dashboard/leads. Best-effort: if the CRM is
// unreachable or not yet configured (CRM_API_URL unset — e.g. local dev,
// or before the CRM has a real deployed domain), the guest's inquiry still
// succeeds; the sync failure is only logged server-side, never surfaced to
// the visitor. Retries transient failures (network errors, 5xx) a couple of
// times with backoff — a single blip on the CRM shouldn't silently drop a
// real inquiry. A 401 (bad/missing API key) is a config problem, not a
// transient one, so it fails fast instead of retrying.
//
// Returns the CRM-issued sequential invoice number (the CRM owns that
// counter — see gsb/admin_crm's generateInvoiceNumber), or null if the CRM
// is unreachable/unconfigured/rejected the request — callers fall back to
// a locally generated reference id in that case so the thank-you page never
// breaks over a CRM hiccup.
async function forwardToCrm(body: InquiryPayload, inquiryId: string): Promise<string | null> {
  const crmUrl = process.env.CRM_API_URL;
  const apiKey = process.env.CRM_API_KEY;
  if (!crmUrl || !apiKey) {
    console.warn("CRM_API_URL/CRM_API_KEY not configured — skipping CRM sync for inquiry");
    return null;
  }

  const payload = JSON.stringify({
    inquiryId,
    name: body.name,
    phone: body.phone,
    email: body.email,
    checkIn: body.checkIn,
    checkOut: body.checkOut,
    guests: body.guests,
    guestsAdults: body.guestsAdults,
    guestsKids: body.guestsKids,
    guestsInfants: body.guestsInfants,
    package: body.package,
    message: body.message,
  });

  const maxAttempts = 3;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetch(`${crmUrl}/api/public/website-leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": apiKey },
        body: payload,
      });
      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        return typeof data.invoiceNumber === "string" ? data.invoiceNumber : null;
      }

      const text = await res.text().catch(() => "");
      if (res.status === 401 || res.status === 400) {
        console.error(`CRM lead sync rejected (inquiry ${inquiryId}):`, res.status, text);
        return null;
      }
      console.error(
        `CRM lead sync failed, attempt ${attempt}/${maxAttempts} (inquiry ${inquiryId}):`,
        res.status,
        text,
      );
    } catch (error) {
      console.error(
        `CRM lead sync errored, attempt ${attempt}/${maxAttempts} (inquiry ${inquiryId}):`,
        error,
      );
    }
    if (attempt < maxAttempts) await sleep(attempt * 500);
  }
  console.error(`CRM lead sync gave up after ${maxAttempts} attempts (inquiry ${inquiryId}).`);
  return null;
}

export async function POST(request: Request) {
  const body: InquiryPayload = await request.json();

  const errors = validateInquiry(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const remoteIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  const captchaOk = await verifyTurnstile(body.turnstileToken, remoteIp);
  if (!captchaOk) {
    return NextResponse.json(
      { errors: { captcha: "Verification failed — please try again." } },
      { status: 400 },
    );
  }

  const inquiryId = generateInquiryId();
  const submittedAt = new Date().toISOString();

  console.log("New GSB Holidays inquiry:", inquiryId, body);
  const crmInvoiceNumber = await forwardToCrm(body, inquiryId);
  // Fall back to the local reference id if the CRM (which owns the real
  // sequential invoice numbering) is unreachable or unconfigured.
  const invoiceNumber = crmInvoiceNumber ?? inquiryId;

  return NextResponse.json({ success: true, invoiceNumber, submittedAt });
}
