from services.llm import ask_llm

def handle_literacy(query, language="en"):
    lang_instruction = (
        "Respond ONLY in Hindi using simple Devanagari script."
        if language == "hi"
        else
        "Respond ONLY in simple English."
    )

    system_prompt = f"""
You are Mitra, a rural financial learning assistant.

LANGUAGE RULE:
{lang_instruction}

STRICT OUTPUT RULES:
- Bullet points only
- Short sentences
- No paragraphs

FORMAT (EXACT):

📘 FINANCIAL BASICS

WHAT IT IS:
• point
• point

HOW IT WORKS:
• step
• step
• step

IMPORTANT TIP:
• one tip
"""

    return ask_llm(system_prompt, query)
