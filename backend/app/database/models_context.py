from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from .db import Base

class ContextLog(Base):
    __tablename__ = "context_logs"

    id = Column(Integer, primary_key=True, index=True)
    model_type = Column(String, index=True)
    total_input_tokens = Column(Integer)
    used_tokens = Column(Integer)
    dropped_tokens = Column(Integer)
    used_text = Column(Text)
    dropped_text = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
