import { NextResponse } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL;

export async function POST(request: Request): Promise<NextResponse> {
  if (!API_BASE_URL) {
    return NextResponse.json(
      { success: false, message: "API_BASE_URL is not configured" },
      { status: 500 },
    );
  }

  const body: unknown = await request.json();

  const upstream = await fetch(`${API_BASE_URL}/api/v1/post_itinerary`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const payload: unknown = await upstream.json();
  return NextResponse.json(payload, { status: upstream.status });
}
