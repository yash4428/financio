def route_query(query: str):
    q = query.lower()

    if any(word in q for word in ["otp", "fraud", "scam", "link", "kyc"]):
        return "fraud"

    if any(word in q for word in ["scheme", "government", "yojana", "pm"]):
        return "scheme"

    return "literacy"
