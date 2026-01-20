from .db import engine, Base
from .models_rlhf import PreferenceLog
from .models_context import ContextLog

Base.metadata.create_all(bind=engine)
print("Database and tables created successfully!")
