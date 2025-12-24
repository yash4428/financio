from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from agents.router import route_query
from agents.literacy_agent import handle_literacy
from agents.scheme_agent import handle_scheme
from agents.fraud_agent import handle_fraud

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        # allow all origins (hackathon-safe)
    allow_credentials=True,
    allow_methods=["*"],        # allows POST, OPTIONS, etc.
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    language: str = "en"

@app.post("/chat")
def chat(req: ChatRequest):
    try:
        agent = route_query(req.message)

        if agent == "fraud":
            reply = handle_fraud(req.message, req.language)
        elif agent == "scheme":
            reply = handle_scheme(req.message, req.language)
        else:
            reply = handle_literacy(req.message, req.language)

        return {
            "agent": agent,
            "reply": reply
        }

    except Exception as e:
        return {"error": str(e)}

