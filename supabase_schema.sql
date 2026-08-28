-- ==============================================================================
-- Joseph & Thea Wedding Invitation - Supabase Database Setup Script
-- ==============================================================================
-- Run this SQL in your Supabase Dashboard -> SQL Editor

-- 1. Create the RSVPs table
CREATE TABLE IF NOT EXISTS public.rsvps (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    phone VARCHAR(50) NOT NULL,
    attending BOOLEAN NOT NULL DEFAULT TRUE,
    guest_count INT DEFAULT 1,
    dietary_notes TEXT,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- 3. Allow anyone to submit an RSVP (Insert / Upsert)
CREATE POLICY "Allow public RSVP submission"
    ON public.rsvps
    FOR INSERT
    TO public
    WITH CHECK (true);

-- 4. Allow updates if matching email (upsert)
CREATE POLICY "Allow public RSVP update"
    ON public.rsvps
    FOR UPDATE
    TO public
    USING (true);

-- 5. Allow reading RSVPs for the Admin Dashboard
CREATE POLICY "Allow public reading of RSVPs"
    ON public.rsvps
    FOR SELECT
    TO public
    USING (true);

-- Optional: Insert a sample guest record
INSERT INTO public.rsvps (name, email, phone, attending, guest_count, dietary_notes, message)
VALUES ('Joseph & Thea Special Guest', 'guest@example.com', '+256 700 000 000', true, 2, 'None', 'Congratulations Joseph and Thea! Excited to celebrate!')
ON CONFLICT (email) DO NOTHING;
