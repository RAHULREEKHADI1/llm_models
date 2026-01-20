from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.architectures import router as architecture_router
from app.routes.generate import router as generate_router
from app.routes.context import router as context_router
from app.routes.sampling import router as sampling_router
from app.routes.evaluation import router as evaluation_router
from app.routes.rlhf import router as rlhf_router
from app.routes.comparison import router as comparison_router
from app.routes import tuning
from app.routes.tuning import router as tuning_router

app = FastAPI(title="LLM Architecture Lab")

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(rlhf_router)
app.include_router(architecture_router)
app.include_router(generate_router)
app.include_router(context_router)
app.include_router(sampling_router)
app.include_router(evaluation_router)
app.include_router(comparison_router)
app.include_router(tuning.router)
