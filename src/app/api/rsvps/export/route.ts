import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function GET() {
  let rsvps: Array<{
    id: number;
    name: string;
    email: string;
    phone: string;
    attending: boolean;
    guest_count: number;
    dietary_notes?: string;
    message?: string;
    created_at: string;
  }> = [];

  // Try Supabase first
  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase.from("rsvps").select("*").order("created_at", { ascending: false });
    if (data) rsvps = data;
  }

  // If no Supabase data, try local FastAPI
  if (rsvps.length === 0) {
    try {
      const pyRes = await fetch("http://127.0.0.1:8000/api/rsvps", { signal: AbortSignal.timeout(1500) });
      if (pyRes.ok) {
        const pyData = await pyRes.json();
        rsvps = pyData.rsvps || [];
      }
    } catch {
      // ignore
    }
  }

  // Format CSV
  const headers = ["ID", "Name", "Email", "Phone", "Attending", "Guest Count", "Dietary Notes", "Message", "Submitted At"];
  const rows = rsvps.map((r) => [
    r.id,
    `"${(r.name || "").replace(/"/g, '""')}"`,
    `"${(r.email || "").replace(/"/g, '""')}"`,
    `"${(r.phone || "").replace(/"/g, '""')}"`,
    r.attending ? "Joyfully Accepts" : "Regretfully Declines",
    r.guest_count || (r.attending ? 1 : 0),
    `"${(r.dietary_notes || "None").replace(/"/g, '""')}"`,
    `"${(r.message || "None").replace(/"/g, '""')}"`,
    r.created_at,
  ]);

  const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=joseph_and_thea_wedding_rsvps.csv",
    },
  });
}
