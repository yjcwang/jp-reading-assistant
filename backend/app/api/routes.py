from fastapi import APIRouter
from app.schemas import AnalyzeRequest, AnalyzeResponse
from app.services.analyzer import analyze_text

# controller layer, engage service

router = APIRouter()

# AnalyzeRequest, AnalyzeResponse are two Pydantic objects defined in schemas, to constraint in- and output format
@router.post("/analyze", response_model=AnalyzeResponse)
def analyze(req: AnalyzeRequest):
    return analyze_text(req)
