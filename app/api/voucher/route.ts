import { NextResponse } from "next/server";

/** Not connected: wire this to the hotspot's voucher login. */
export async function POST() {
  return NextResponse.json({ error: "Voucher login is not available yet. Please contact support." }, { status: 503 });
}
