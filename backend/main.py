import io
import csv
from datetime import datetime
from typing import List, Optional
from fastapi import FastAPI, Depends, HTTPException, status, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from sqlalchemy import desc

from database import engine, Base, get_db
import models
import schemas

# Create database tables automatically
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Joseph & Thea Wedding RSVP API",
    description="Backend API for Joseph & Thea's Wedding Invitation and RSVP Management",
    version="1.0.0",
)

# Enable CORS for frontend Next.js app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for easy development and deployment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "couple": "Joseph & Thea",
        "wedding_date": "2027-09-03",
        "timestamp": datetime.utcnow().isoformat()
    }

@app.post("/api/rsvp", response_model=schemas.RSVPOut, status_code=status.HTTP_201_CREATED)
def submit_rsvp(rsvp_in: schemas.RSVPCreate, db: Session = Depends(get_db)):
    """
    Submits a new RSVP or updates existing submission if same email is used.
    """
    existing_rsvp = db.query(models.RSVP).filter(models.RSVP.email.ilike(rsvp_in.email.strip())).first()
    
    if existing_rsvp:
        # Update existing RSVP
        existing_rsvp.name = rsvp_in.name.strip()
        existing_rsvp.phone = rsvp_in.phone.strip()
        existing_rsvp.attending = rsvp_in.attending
        existing_rsvp.guest_count = rsvp_in.guest_count if rsvp_in.attending else 0
        existing_rsvp.dietary_notes = rsvp_in.dietary_notes.strip() if rsvp_in.dietary_notes else ""
        existing_rsvp.message = rsvp_in.message.strip() if rsvp_in.message else ""
        existing_rsvp.created_at = datetime.utcnow()
        db.commit()
        db.refresh(existing_rsvp)
        return existing_rsvp
    
    # Create new RSVP record
    db_rsvp = models.RSVP(
        name=rsvp_in.name.strip(),
        email=rsvp_in.email.strip(),
        phone=rsvp_in.phone.strip(),
        attending=rsvp_in.attending,
        guest_count=rsvp_in.guest_count if rsvp_in.attending else 0,
        dietary_notes=rsvp_in.dietary_notes.strip() if rsvp_in.dietary_notes else "",
        message=rsvp_in.message.strip() if rsvp_in.message else "",
        created_at=datetime.utcnow()
    )
    db.add(db_rsvp)
    db.commit()
    db.refresh(db_rsvp)
    return db_rsvp

@app.get("/api/rsvps", response_model=schemas.RSVPSummary)
def get_all_rsvps(
    search: Optional[str] = None,
    filter_attending: Optional[bool] = None,
    db: Session = Depends(get_db)
):
    """
    Get all RSVPs with summary metrics for the Admin Dashboard.
    """
    query = db.query(models.RSVP)
    
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            (models.RSVP.name.ilike(search_term)) | 
            (models.RSVP.email.ilike(search_term)) | 
            (models.RSVP.phone.ilike(search_term))
        )
    
    if filter_attending is not None:
        query = query.filter(models.RSVP.attending == filter_attending)
    
    all_rsvps = db.query(models.RSVP).all()
    total_responses = len(all_rsvps)
    total_attending = sum(1 for r in all_rsvps if r.attending)
    total_declined = total_responses - total_attending
    total_guests_expected = sum(r.guest_count for r in all_rsvps if r.attending)
    
    filtered_rsvps = query.order_by(desc(models.RSVP.created_at)).all()
    
    return schemas.RSVPSummary(
        total_responses=total_responses,
        total_attending=total_attending,
        total_declined=total_declined,
        total_guests_expected=total_guests_expected,
        rsvps=filtered_rsvps
    )

@app.get("/api/rsvps/export")
def export_rsvps_csv(db: Session = Depends(get_db)):
    """
    Export all RSVPs as a downloadable CSV spreadsheet.
    """
    rsvps = db.query(models.RSVP).order_by(models.RSVP.created_at.desc()).all()
    
    output = io.StringIO()
    writer = csv.writer(output)
    
    # Write CSV Header
    writer.writerow([
        "ID", "Name", "Email", "Phone (WhatsApp)", "Attendance",
        "Guest Count", "Dietary Requirements", "Message for Couple", "Date Submitted (UTC)"
    ])
    
    for r in rsvps:
        writer.writerow([
            r.id,
            r.name,
            r.email,
            r.phone,
            "Joyfully Accepts" if r.attending else "Regretfully Declines",
            r.guest_count,
            r.dietary_notes or "None",
            r.message or "None",
            r.created_at.strftime("%Y-%m-%d %H:%M:%S")
        ])
    
    output.seek(0)
    
    response = StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv"
    )
    response.headers["Content-Disposition"] = "attachment; filename=joseph_and_thea_rsvps.csv"
    return response

@app.delete("/api/rsvps/{rsvp_id}", status_code=status.HTTP_200_OK)
def delete_rsvp(rsvp_id: int, db: Session = Depends(get_db)):
    rsvp = db.query(models.RSVP).filter(models.RSVP.id == rsvp_id).first()
    if not rsvp:
        raise HTTPException(status_code=404, detail="RSVP record not found")
    db.delete(rsvp)
    db.commit()
    return {"message": f"RSVP for {rsvp.name} deleted successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
