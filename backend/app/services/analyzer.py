import json
from app.schemas import AnalyzeRequest, AnalyzeResponse
from app.services.llm import call_llm_json

import json

def extract_json(raw: str) -> dict:
    # make sure valid json extracted
    if not raw or not raw.strip():
        raise ValueError("LLM returned empty output")

    s = raw.strip()

    # remove ```json ``` 
    if s.startswith("```"):
        s = s.strip("`")

    start = s.find("{")
    end = s.rfind("}")

    if start == -1 or end == -1 or end <= start:
        raise ValueError(f"No JSON object found in LLM output:\n{s}")

    return json.loads(s[start:end+1])


def analyze_text(req: AnalyzeRequest) -> AnalyzeResponse:
    prompt = f"""
You are an AI Japanese reading tutor.
Extract only the most worth-learning vocabulary and grammar from the given text.
Return ONLY valid JSON with this shape:
{{
  "vocab": [{{"surface": "...", "reading": "...", "meaning_en": "...", "why": "..."}}],
  "grammar": [{{"pattern": "...", "explanation_en": "...", "example_from_text": "...", "notes": "..."}}]
}}

Text:
{req.text}
"""
    raw = call_llm_json(prompt)
    print("=== RAW FROM LLM START ===")
    print(raw)
    print("=== RAW FROM LLM END ===")


    data = extract_json(raw) 
    return AnalyzeResponse(**data)
