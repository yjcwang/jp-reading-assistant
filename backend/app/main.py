from fastapi import FastAPI
from app.api.routes import router
from fastapi.middleware.cors import CORSMiddleware


# create FastAPI instance and include router

app = FastAPI(title="JP Reading Assistant API", version="0.1.0")

# CORS preflight, 3000 on frontend, 8000 on backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api", tags=["API"]) # prefix controlled here

@app.get("/health")
def health():
    return {"status": "ok"}
