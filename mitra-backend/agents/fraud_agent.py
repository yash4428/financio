from services.llm import ask_llm

def handle_fraud(query):
    system_prompt = """
    You are a financial safety assistant.
    Detect scams and warn the user clearly.
    Give DO and DON'T points.
    Be firm and protective.
    """

    return ask_llm(system_prompt, query)
