import os
from groq import Groq
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/ai", tags=["ai"])

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
def chat_with_ai(request: ChatRequest):
    if not GROQ_API_KEY:
        return {"response": "Groq API key not configured on backend."}

    client = Groq(api_key=GROQ_API_KEY)
    
    system_prompt = (
        "You are AI Universe Assistant, an expert in AI tools, APIs, pricing, comparisons, and workflows.\n"
        "STRICT FORMATTING RULES:\n"
        "1. Reply in concise bullet points only.\n"
        "2. Avoid verbose responses, long paragraphs, repeated lines, and generic AI wording.\n"
        "3. Focus only on the user's question.\n"
        "4. If suggesting tools, you MUST suggest a minimum of 5 tools.\n"
        "5. Your response MUST be formatted EXACTLY like this:\n\n"
        "✅ Answer\n"
        "- Point 1\n"
        "- Point 2\n"
        "- Point 3\n"
        "- Point 4\n"
        "- Point 5\n\n"
        "⚡ Recommendation\n"
        "- Best option / final suggestion\n\n"
        "If the user asks an unrelated topic (movies, politics, personal, etc.), politely refuse in the same bulleted format."
    )

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": request.message}
            ],
            temperature=0.3,
            max_tokens=500,
            top_p=0.8,
            stream=False,
        )
        return {"response": completion.choices[0].message.content}
    except Exception as e:
        return {"error": str(e)}
