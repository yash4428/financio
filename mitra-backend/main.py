from fastapi import FastAPI
from pydantic import BaseModel

from agents.router import route_query
from agents.literacy_agent import handle_literacy
from agents.scheme_agent import handle_scheme
from agents.fraud_agent import handle_fraud

app = FastAPI()

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(req: ChatRequest):
    agent = route_query(req.message)

    if agent == "fraud":
        reply = handle_fraud(req.message)
    elif agent == "scheme":
        reply = handle_scheme(req.message)
    else:
        reply = handle_literacy(req.message)

    return {
        "agent": agent,
        "reply": reply
    }
