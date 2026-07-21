import { NextResponse } from "next/server";
import { validateInquiry } from "@/lib/validation";

type InquiryPayload = {
  name?: string;
  email?: string;
  phone?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  package?: string;
  message?: string;
};

function generateInquiryId() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `GSB-${timestamp}${random}`;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
async function forwardToCrm(body: InquiryPayload, inquiryId: string) {
  const crmUrl = process.env.CRM_API_URL;
  const apiKey = process.env.CRM_API_KEY;
  if (!crmUrl || !apiKey) {
    console.warn("CRM_API_URL/CRM_API_KEY not configured — skipping CRM sync for inquiry");
    return;
  }

  const payload = JSON.stringify({
    inquiryId,
    name: body.name,
    phone: body.phone,
    email: body.email,
    checkIn: body.checkIn,
    checkOut: body.checkOut,
    guests: body.guests,
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
      if (res.ok) return;

      const text = await res.text().catch(() => "");
      if (res.status === 401 || res.status === 400) {
        console.error(`CRM lead sync rejected (inquiry ${inquiryId}):`, res.status, text);
        return;
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
}

export async function POST(request: Request) {
  const body: InquiryPayload = await request.json();

  const errors = validateInquiry(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const inquiryId = generateInquiryId();
  const submittedAt = new Date().toISOString();

  console.log("New GSB Holidays inquiry:", inquiryId, body);
  await forwardToCrm(body, inquiryId);

  return NextResponse.json({ success: true, inquiryId, submittedAt });
}
