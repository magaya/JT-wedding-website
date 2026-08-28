import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const search = searchParams.get("search")?.toLowerCase() || "";
  const filterAttending = searchParams.get("filter_attending");

  // 1. Try fetching from Supabase if configured
  if (isSupabaseConfigured && supabase) {
    let query = supabase.from("rsvps").select("*").order("created_at", { ascending: false });

    if (filterAttending !== null && filterAttending !== undefined && filterAttending !== "") {
      query = query.eq("attending", filterAttending === "true");
    }

    const { data: rsvps, error } = await query;

    if (!error && rsvps) {
      let filtered = rsvps;
      if (search) {
        filtered = filtered.filter(
          (r) =>
            r.name?.toLowerCase().includes(search) ||
            r.email?.toLowerCase().includes(search) ||
            r.phone?.toLowerCase().includes(search)
        );
      }

      const total_responses = rsvps.length;
      const total_attending = rsvps.filter((r) => r.attending).length;
      const total_declined = total_responses - total_attending;
      const total_guests_expected = rsvps
        .filter((r) => r.attending)
        .reduce((sum, r) => sum + (r.guest_count || 1), 0);

      return NextResponse.json({
        total_responses,
        total_attending,
        total_declined,
        total_guests_expected,
        rsvps: filtered,
      });
    }
  }

  // 2. Try fetching from Python FastAPI backend if running locally
  try {
    const pyUrl = new URL("http://127.0.0.1:8000/api/rsvps");
    if (search) pyUrl.searchParams.set("search", search);
    if (filterAttending) pyUrl.searchParams.set("filter_attending", filterAttending);

    const pyRes = await fetch(pyUrl.toString(), {
      method: "GET",
      cache: "no-store",
      signal: AbortSignal.timeout(1500),
    });

    if (pyRes.ok) {
      const pyData = await pyRes.json();
      return NextResponse.json(pyData);
    }
  } catch {
    // FastAPI is optional
  }

  // 3. Fallback response
  return NextResponse.json({
    total_responses: 1,
    total_attending: 1,
    total_declined: 0,
    total_guests_expected: 2,
    rsvps: [
      {
        id: 1,
        name: "Sample Guest (Demo Mode)",
        email: "guest@example.com",
        phone: "+256 700 000 000",
        attending: true,
        guest_count: 2,
        dietary_notes: "None",
        message: "Congratulations Joseph and Thea!",
        created_at: new Date().toISOString(),
      },
    ],
  });
}
