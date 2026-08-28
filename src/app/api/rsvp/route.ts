import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { RSVPFormData } from "@/types";

// In-memory fallback for testing before Supabase credentials are plugged in
const localRSVPs: Array<RSVPFormData & { id: number; created_at: string }> = [
  {
    id: 1,
    name: "Sample Wedding Guest",
    email: "guest@example.com",
    phone: "+256 700 000 000",
    attending: true,
    guest_count: 2,
    dietary_notes: "None",
    message: "So thrilled for Joseph and Thea! Counting down the days!",
    created_at: new Date().toISOString(),
  }
];

export async function POST(req: NextRequest) {
  try {
    const body: RSVPFormData = await req.json();

    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json(
        { detail: "Please provide your name, email, and phone number." },
        { status: 400 }
      );
    }

    // 1. If Supabase is connected, save directly to Supabase cloud table `rsvps`
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("rsvps")
        .upsert(
          {
            name: body.name.trim(),
            email: body.email.trim().toLowerCase(),
            phone: body.phone.trim(),
            attending: body.attending,
            guest_count: body.attending ? (body.guest_count || 1) : 0,
            dietary_notes: body.dietary_notes || "",
            message: body.message || "",
            created_at: new Date().toISOString(),
          },
          { onConflict: "email" }
        )
        .select()
        .single();

      if (error) {
        console.error("Supabase RSVP Error:", error);
        // If table doesn't exist yet, fallback to return clean response
      } else if (data) {
        return NextResponse.json(data, { status: 201 });
      }
    }

    // 2. Also forward to local Python FastAPI backend if it's running locally
    try {
      const pyRes = await fetch("http://127.0.0.1:8000/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(1500),
      });
      if (pyRes.ok) {
        const pyData = await pyRes.json();
        return NextResponse.json(pyData, { status: 201 });
      }
    } catch {
      // Local FastAPI is optional
    }

    // 3. Fallback response for instant testing
    const newRecord = {
      id: localRSVPs.length + 1,
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      attending: body.attending,
      guest_count: body.attending ? (body.guest_count || 1) : 0,
      dietary_notes: body.dietary_notes || "",
      message: body.message || "",
      created_at: new Date().toISOString(),
    };
    localRSVPs.unshift(newRecord);

    return NextResponse.json(newRecord, { status: 201 });
  } catch (err: unknown) {
    console.error("RSVP Submission Error:", err);
    return NextResponse.json(
      { detail: "Failed to submit RSVP. Please try again." },
      { status: 500 }
    );
  }
}
