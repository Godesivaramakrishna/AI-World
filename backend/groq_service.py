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
        "You are AI Universe Assistant.\n\n"
        "You ONLY answer questions related to:\n"
        "- AI tools\n"
        "- AI APIs\n"
        "- AI pricing\n"
        "- AI comparisons\n"
        "- AI recommendations\n"
        "- AI workflows\n"
        "- AI development\n"
        "- AI integrations\n\n"
        "If user asks unrelated topics like:\n"
        "- movies\n"
        "- politics\n"
        "- jokes\n"
        "- games\n"
        "- personal topics\n"
        "- entertainment\n\n"
        "politely refuse and redirect back to AI-related discussions.\n\n"
        "You may greet users with hello/hi.\n"
        "Keep responses concise, professional and helpful."
    )

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": request.message}
            ],
            temperature=0.3,
            max_tokens=1024,
            top_p=1,
            stream=False,
        )
        return {"response": completion.choices[0].message.content}
    except Exception as e:
        return {"error": str(e)}
