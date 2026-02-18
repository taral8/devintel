from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.das import router as das_router

app = FastAPI(
    title="CivRoda API",
    description="Council Planning Intelligence — DA data for Parramatta, Blacktown & Hornsby",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://civroda.ai"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(das_router)


@app.get("/")
def health():
    return {"status": "ok", "service": "civroda-api"}
