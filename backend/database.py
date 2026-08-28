import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Default to SQLite local file, or use DATABASE_URL env var if deployed with PostgreSQL/Supabase
DATABASE_URL = os.getenv("postgresql://postgres:[HNEijJ-B8tE-VcD]@db.ayumsusendbwzumlcflg.supabase.co:5432/postgres", "sqlite:///./wedding_rsvp.db")

# For SQLite, check_same_thread needs to be False for FastAPI concurrent requests
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
