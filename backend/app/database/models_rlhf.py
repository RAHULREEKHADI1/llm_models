from sqlalchemy import Column, Integer, Text, DateTime
from datetime import datetime
from app.database.db import Base

class PreferenceLog(Base):
    __tablename__ = "rlhf_preferences"

    id = Column(Integer, primary_key=True, index=True)
    prompt = Column(Text, nullable=False)
    response = Column(Text, nullable=False)
    rank = Column(Integer, nullable=False)     # 1 = best
    reward = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
