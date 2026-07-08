import { NextResponse } from "next/server";

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

// Forwards a validated inquiry to the GSB CRM so it shows up as a Lead
// (source: WEBSITE) at /dashboard/leads. Best-effort: if the CRM is
// unreachable or not yet configured (CRM_API_URL unset — e.g. local dev,
// or before the CRM has a real deployed domain), the guest's inquiry still
// succeeds; the sync failure is only logged server-side, never surfaced to
// the visitor.
async function forwardToCrm(body: InquiryPayload) {
  const crmUrl = process.env.CRM_API_URL;
  const apiKey = process.env.CRM_API_KEY;
  if (!crmUrl || !apiKey) {
    console.warn("CRM_API_URL/CRM_API_KEY not configured — skipping CRM sync for inquiry");
    return;
  }

  try {
    const res = await fetch(`${crmUrl}/api/public/website-leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey },
      body: JSON.stringify({
        name: body.name,
        phone: body.phone,
        email: body.email,
        checkIn: body.checkIn,
        checkOut: body.checkOut,
        guests: body.guests,
        package: body.package,
        message: body.message,
      }),
    });
    if (!res.ok) {
      console.error("CRM lead sync failed:", res.status, await res.text().catch(() => ""));
    }
  } catch (error) {
    console.error("CRM lead sync failed:", error);
  }
}

export async function POST(request: Request) {
  const body: InquiryPayload = await request.json();

  if (!body.name || !body.email || !body.phone) {
    return NextResponse.json(
      { error: "Name, email and phone are required." },
      { status: 400 },
    );
  }

  console.log("New GSB Holidays inquiry:", body);
  await forwardToCrm(body);

  return NextResponse.json({ success: true });
}
