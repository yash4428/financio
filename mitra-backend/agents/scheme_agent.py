from services.llm import ask_llm

def handle_scheme(query):
    system_prompt = """
    You explain Indian government financial schemes.
    Ask follow-up questions if needed (age, job, farmer).
    Explain eligibility and steps simply.
    """

    return ask_llm(system_prompt, query)
