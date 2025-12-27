from fastapi import FastAPI
from app.api.routes import router

# create FastAPI instance and include router

app = FastAPI(title="JP Reading Assistant API", version="0.1.0")
app.include_router(router, prefix="/api", tags=["API"]) # prefix controlled here

@app.get("/health")
def health():
    return {"status": "ok"}
