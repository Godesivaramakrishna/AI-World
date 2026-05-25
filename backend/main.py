from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, Base, get_db
import models
import auth
import groq_service
from tools_data import SAMPLE_TOOLS

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Universe API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(groq_service.router)

@app.on_event("startup")
def seed_db():
    db = next(get_db())
    # Check if tools exist
    if db.query(models.Tool).first() is None:
        for tool_data in SAMPLE_TOOLS:
            db.add(models.Tool(**tool_data))
        db.commit()

@app.get("/tools")
def get_tools(db: Session = Depends(get_db)):
    return db.query(models.Tool).all()

@app.get("/categories")
def get_categories(db: Session = Depends(get_db)):
    tools = db.query(models.Tool).all()
    categories = {}
    for t in tools:
        if t.category not in categories:
            categories[t.category] = 0
        categories[t.category] += 1
    
    result = [{"name": k, "count": v} for k, v in categories.items()]
    return result

@app.get("/tools/compare")
def compare_tools(ids: str, db: Session = Depends(get_db)):
    tool_ids = [int(i) for i in ids.split(",") if i.isdigit()]
    return db.query(models.Tool).filter(models.Tool.id.in_(tool_ids)).all()
