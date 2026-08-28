# Joseph & Thea Wedding Invitation Website 💍

A luxury digital wedding invitation and RSVP platform inspired by *thedigitalinvite.com*, built with **Next.js (React / Tailwind CSS / Framer Motion)** and a **Python (FastAPI / SQLite / SQLAlchemy)** backend.

---

## 🌟 Features Included

1. **Animated Envelope Unfolding Hero (Page 1)**: Interactive gold wax seal stamped with "JT" monogram that unfolds into the romantic portrait of Joseph & Thea.
2. **Church Announcement Statement (Page 2)**: Crisp luxury white card featuring:
   > *"Joseph and Thea are getting married at Kampala Baptist church in Uganda and would be honoured to have you celebrate with them."*
3. **Live Countdown Timer (Page 3)**:
   - Heading: *"Counting the days."*
   - Subtitle: *"to the most special day of our lives"*
   - Live Days, Hours, Minutes, Seconds countdown to September 3, 2027.
4. **Our Journey / Story (Page 4)**:
   - Heading: *"Our Journey"*, H2: *"Our Story ❤️"*
   - 4 Chapter story cards:
     - **How We Met**: Karting track on 29th birthday.
     - **Our Love Story**: First dates, roadtrips, late-night calls & shared prayers.
     - **The Proposal**: Beach at golden hour.
     - **The Next Chapter**: Packing families and suitcases to Uganda.
5. **Day Program (Page 5)**:
   - H1: *"Day Program"*, Subtitle: *"What we have planned for you"*
   - Complete 8-part schedule from 11:00 AM Wedding Service to 10:00 PM Dancing.
6. **Moments Gallery (Page 6)**:
   - H1: *"Moments"*, Subtitle: *"Glimpse of Us"*
   - Interactive photo carousel and full-screen lightbox modal.
7. **Event Details (Page 7)**:
   - Ceremony at 4:30 PM
   - Location: Oguzulu Resort Beach, Mukono
   - Embedded Google Map preview + "Open in Maps" button
   - "Add to Calendar" button (Google Calendar sync + `.ics` iCalendar download for September 3, 2027).
8. **Dress Code (Page 8)**:
   - H1: *"Dress Code"*
   - Artistic sketch illustration of Black wedding guests dressed elegantly and formally.
   - H3: *"Elegant and Formal Attire"*
   - Body: *"Guests are encouraged to dress to impress refined and polished, Black tie not required."*
   - Color palette swatch guides.
9. **Interactive RSVP Form (Page 9)**:
   - H2: *"BE OUR GUEST"*, H1: *"RSVP"*
   - H3: *"Please let us know if you'll be joining us by August 1st 2027"*
   - Inputs: Full Name, Email address, WhatsApp Phone, Joyfully Accept / Regretfully Decline toggle, Guest Count, and Message for the couple.
   - Confetti celebratory animation upon submission.
10. **Admin RSVP Dashboard (`/admin`)**:
    - Passcode protected (`2027`)
    - Real-time guest response metrics, search & filters
    - Downloadable CSV spreadsheet export.

---

## 🗄️ Database Guidance & Architecture

You requested guidance on storing and saving the RSVP responses. Here is the recommended database strategy:

### 1. Local Development & Simple Hosting: SQLite (Already Set Up & Pre-configured!)
- **What it is**: SQLite is a zero-configuration, serverless database that stores all data directly inside a single file (`backend/wedding_rsvp.db`).
- **Why it's great**:
  - Requires **zero external database installations** or configuration.
  - Automatically creates and manages the database tables on first run.
  - Fully persistent on your local computer or VPS server.
  - Can be easily backed up or opened with tools like [DB Browser for SQLite](https://sqlitebrowser.org/).

### 2. Cloud Production Deployment: PostgreSQL / Supabase / Neon
When you are ready to host the website online (e.g. on Vercel + Render, Railway, or Fly.io):
- Simply create a free database on **Supabase** or **Neon**.
- Copy your PostgreSQL connection string into an environment variable:
  ```env
  DATABASE_URL=postgresql://user:password@host:5432/wedding_db
  ```
- The backend (`backend/database.py`) will automatically detect the connection string and switch from SQLite to PostgreSQL without modifying a single line of Python code!

---

## 🚀 How to Run Locally

### Option A: One-Click Runner (PowerShell)
In your terminal, simply run:
```powershell
.\run_servers.ps1
```

### Option B: Manual Execution

#### 1. Start the Python FastAPI Backend
```bash
python -m uvicorn main:app --app-dir backend --host 127.0.0.1 --port 8000 --reload
```
The API and automatic SQLite database will be active at `http://127.0.0.1:8000`. You can also explore interactive API docs at `http://127.0.0.1:8000/docs`.

#### 2. Start the Next.js Frontend
```bash
cd frontend
npm run dev
```
Open your browser and navigate to:
- **Wedding Invitation**: [http://localhost:3000](http://localhost:3000)
- **Admin RSVP Dashboard**: [http://localhost:3000/admin](http://localhost:3000/admin) *(Passcode: `2027`)*

---

## 🖼️ How to Change Photos
All photos are located in `frontend/public/images/`:
- `couple_hero.jpg`: Cover portrait of Joseph & Thea
- `dress_code.jpg`: Dress code illustration
- `moment_proposal.jpg`: Beach proposal photo
- `moment_roadtrip.jpg`: Roadtrip photo
- `wax_seal.jpg`: Gold monogram wax seal

Simply place your own photos with the same file names in that folder to customize!
