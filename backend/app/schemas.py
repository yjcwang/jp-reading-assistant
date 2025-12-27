from pydantic import BaseModel, Field
from typing import List, Optional

# define Request and Response structure with pydantic model

class AnalyzeRequest(BaseModel):
    text: str = Field(..., min_length=1, description="Japanese text to analyze")
    level: Optional[str] = Field(default=None, description="e.g., N5-N1 or beginner/intermediate") # equal with: str | None

class VocabItem(BaseModel):
    surface: str
    reading: Optional[str] = None
    meaning_en: str
    why: str = Field(..., description="Why this word is worth learning (context-based)")

class GrammarItem(BaseModel):
    pattern: str
    explanation_en: str
    example_from_text: str
    notes: Optional[str] = None

class AnalyzeResponse(BaseModel):
    vocab: List[VocabItem]
    grammar: List[GrammarItem]
