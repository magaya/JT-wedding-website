from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field

class RSVPCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=200, description="Full Name of the guest")
    email: str = Field(..., description="Email address for confirmation")
    phone: str = Field(..., min_length=5, max_length=50, description="Phone number (WhatsApp preferred)")
    attending: bool = Field(..., description="True if Joyfully accepting, False if Regretfully declining")
    guest_count: int = Field(default=1, ge=1, le=10, description="Number of people attending (including guest)")
    dietary_notes: Optional[str] = Field(default="", max_length=300, description="Dietary requirements / allergies")
    message: Optional[str] = Field(default="", max_length=2000, description="Message for Joseph and Thea")

class RSVPOut(BaseModel):
    id: int
    name: str
    email: str
    phone: str
    attending: bool
    guest_count: int
    dietary_notes: Optional[str]
    message: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

class RSVPSummary(BaseModel):
    total_responses: int
    total_attending: int
    total_declined: int
    total_guests_expected: int
    rsvps: List[RSVPOut]
