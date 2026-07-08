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

export async function POST(request: Request) {
  const body: InquiryPayload = await request.json();

  if (!body.name || !body.email || !body.phone) {
    return NextResponse.json(
      { error: "Name, email and phone are required." },
      { status: 400 },
    );
  }

  // TODO: wire this up to email/CRM/booking backend once available.
  console.log("New GSB Holidays inquiry:", body);

  return NextResponse.json({ success: true });
}
