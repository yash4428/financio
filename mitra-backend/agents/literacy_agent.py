from services.llm import ask_llm

def handle_literacy(query):
    system_prompt = """
    You are Mitra, a rural financial assistant.
    Explain concepts in very simple language.
    Use step-by-step explanations.
    Avoid English jargon.
    """

    return ask_llm(system_prompt, query)
