import json
from openai import OpenAI
from app.config import settings
import httpx

def _mock_json_output(prompt: str) -> str:
    return json.dumps({
        "vocab": [
            {"surface": "練習", "reading": "れんしゅう", "meaning_en": "practice", "why": "Appears in study contexts; high frequency."},
            {"surface": "助言", "reading": "じょげん", "meaning_en": "advice", "why": "Common in academic/work settings."}
        ],
        "grammar": [
            {"pattern": "〜てみる", "explanation_en": "Try doing something.", "example_from_text": "（例）やってみる", "notes": "Often used for attempts."}
        ]
    }, ensure_ascii=False)

def _call_ollama(prompt: str) -> str:
    model = settings.OLLAMA_MODEL
    url = "http://127.0.0.1:11434/api/generate"

    payload = {
        "model": model,
        "prompt": prompt,
        "stream": False,
        "options": {"temperature": 0.2}
    }

    r = httpx.post(url, json=payload, timeout=120)
    r.raise_for_status()
    data = r.json()
    return data["response"]


def call_llm_json(prompt: str) -> str:
    provider = settings.LLM_PROVIDER # donot use os.getenv

    if provider == "mock":
        return _mock_json_output(prompt)
    
    if provider == "ollama":
        return _call_ollama(prompt)

    if provider == "openai":
        client = OpenAI(api_key=settings.OPENAI_API_KEY)
        resp = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.2,
        )
        return resp.choices[0].message.content

    raise ValueError(f"Unknown LLM_PROVIDER: {provider}")
