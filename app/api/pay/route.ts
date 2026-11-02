import { NextResponse } from "next/server";
import { normalizePhone } from "@/lib/phone";
import { plans } from "@/lib/site";

/**
 * SIMULATED: no money moves and no internet access is granted.
 * Replace the marked block with the real payment gateway, and activate the
 * hotspot session only from the gateway's confirmed callback.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const plan = plans.find((p) => p.id === body?.planId);
  const phone = typeof body?.phone === "string" ? normalizePhone(body.phone) : null;

  if (!plan) return NextResponse.json({ error: "Please choose a valid plan." }, { status: 400 });
  if (!phone) return NextResponse.json({ error: "Enter a valid phone number, e.g. 0712345678." }, { status: 400 });

  // Off in production unless explicitly enabled, so a deploy cannot fake payments.
  const simulate = process.env.NODE_ENV !== "production" || process.env.PAYMENT_SIMULATION === "true";
  if (!simulate) {
    return NextResponse.json({ error: "Payments are temporarily unavailable." }, { status: 503 });
  }

  // --- gateway integration goes here ---
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return NextResponse.json({ status: "paid", planId: plan.id });
}
