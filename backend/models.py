from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, Text, DateTime
from database import Base

class RSVP(Base):
    __tablename__ = "rsvps"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    email = Column(String(200), nullable=False, index=True)
    phone = Column(String(50), nullable=False)
    attending = Column(Boolean, nullable=False) # True = Joyfully Accept, False = Regretfully Decline
    guest_count = Column(Integer, default=1)
    dietary_notes = Column(String(300), nullable=True)
    message = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
