from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, JSON
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)

class Tool(Base):
    __tablename__ = "tools"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    category = Column(String, index=True)
    pricing = Column(String)
    price_num = Column(Integer, default=0) # Base monthly price for charting
    speed_score = Column(Integer, default=80) # 0-100 score for charting
    context_length = Column(Integer, default=8000) # context window for charting
    reasoning_score = Column(Integer, default=80) # 0-100 score
    creativity_score = Column(Integer, default=80) # 0-100 score
    api_available = Column(Boolean, default=False)
    rating = Column(Float)
    description = Column(String)

class SavedTool(Base):
    __tablename__ = "saved_tools"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    tool_id = Column(Integer, ForeignKey("tools.id"))
