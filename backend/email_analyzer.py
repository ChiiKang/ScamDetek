import re
import random
from typing import Dict, Any
from urllib.parse import urlparse
import joblib
import phonenumbers

# === Config ===
THREAT_KEYWORDS = [
    "urgent",
    "immediate action required",
    "account suspension",
    "account suspended",
    "security alert",
    "unusual activity",
    "verify your account",
    "legal action",
    "final notice",
    "unauthorized login",
    "your account has been compromised",
    "fraudulent activity detected",
    "pay now",
    "act immediately",
    "your service will be terminated",
    "login attempt detected",
    "security breach",
    "confirm identity",
    "access restricted",
    "action required",
    "emergency",
    "you are in violation",
    "locked account",
    "final warning",
    "report to authority",
    "criminal charges",
    "your device is infected",
]

SENSITIVE_KEYWORDS = [
    "otp",
    "password",
    "passcode",
    "ic number",
    "bank account",
    "credit card",
    "login",
    "verify",
    "security question",
    "ssn",
    "cvv",
    "nric",
    "identity card",
    "account number",
    "pin",
    "sort code",
    "routing number",
    "dob",
    "mother's maiden name",
    "social security",
    "personal info",
    "credentials",
    "2fa code",
    "mobile number",
    "transaction pin",
    "verification code",
]

URL_SHORTENERS = [
    "bit.ly",
    "t.co",
    "goo.gl",
    "tinyurl.com",
    "ow.ly",
    "buff.ly",
    "is.gd",
    "cutt.ly",
    "rb.gy",
    "rebrand.ly",
    "shorte.st",
    "adf.ly",
    "bl.ink",
    "lnkd.in",
    "chilp.it",
    "soo.gd",
    "trib.al",
    "tiny.cc",
    "shorturl.at",
    "clicky.me",
    "vur.me",
    "snip.ly",
]
SUSPICIOUS_TLDS = [
    ".tk",
    ".ml",
    ".ga",
    ".ru",
    ".cn",
    ".xyz",
    ".top",
    ".loan",
    ".click",
    ".gq",
    ".cf",
    ".work",
    ".support",
    ".zip",
    ".cam",
    ".men",
    ".mom",
    ".party",
    ".review",
    ".accountant",
    ".science",
    ".stream",
    ".win",
    ".info",
    ".biz",
    ".rest",
    ".country",
    ".download",
    ".racing",
    ".faith",
    ".date",
    ".cricket",
    ".link",
    ".hosting",
    ".porn",
    ".sex",
    ".exe",
]

FREE_PROVIDERS = {"gmail.com", "yahoo.com", "hotmail.com", "outlook.com"}
SUSPICIOUS_TLDS = [".ru", ".cn", ".xyz", ".top", ".loan", ".zip", ".gq", ".tk"]
BRAND_KEYWORDS = ["paypal", "apple", "amazon", "bank", "microsoft", "netflix"]


def analyze_sender_email(sender_email):
    result = {
        "is_valid_format": False,
        "suspicious_tld": False,
        "spoofing_brand": False,
        "free_provider_impersonating_brand": False,
        "too_many_subdomains": False,
    }

    # Basic format check
    if not re.match(r"[^@]+@[^@]+\.[^@]+", sender_email):
        return result  # Invalid email format

    result["is_valid_format"] = True
    domain = sender_email.split("@")[1].lower()
    domain_parts = domain.split(".")

    # Suspicious TLD check
    for tld in SUSPICIOUS_TLDS:
        if domain.endswith(tld):
            result["suspicious_tld"] = True
            break

    # Brand impersonation check
    if any(brand in domain for brand in BRAND_KEYWORDS):
        result["spoofing_brand"] = True
        if domain in FREE_PROVIDERS:
            result["free_provider_impersonating_brand"] = True

    # Subdomain abuse
    if len(domain_parts) > 3:
        result["too_many_subdomains"] = True

    return result


def classify_phone_number_robust(number: str) -> str:
    # Remove all non-numeric characters
    clean = re.sub(r"[^\d]", "", number)

    # Check basic validity
    if not clean or len(clean) < 4 or not clean.isdigit():
        return "invalid"

    # Shortcodes: typically 4–6 digits, used by SMS gateways
    if 4 <= len(clean) <= 6:
        return "shortcode"

    # Toll-free numbers (common: 1800, 1300 in MY, SG)
    if clean.startswith("1800") or clean.startswith("1300"):
        return "toll_free"

    # Premium-rate numbers (common scam: 600, 609, 905)
    if clean.startswith(("600", "609", "905")):
        return "premium"

    # Mobile numbers (Malaysia/Singapore patterns: 01X-XXXXXXXX or XXXXXXXXXX)
    if re.match(r"^01[0-9]{8,9}$", clean):
        return "mobile"

    # Landline (Malaysia: 03-XXXXXXX, 04-XXXXXXX, etc.)
    if re.match(r"^0[3-9][0-9]{7,8}$", clean):
        return "landline"

    # If no match, fallback
    return "invalid"


# === Helper Functions ===
def get_links_from_text(text):
    url_pattern = re.compile(r"https?://\S+|www\.\S+")
    return url_pattern.findall(text)


def extract_domain(url):
    try:
        parsed = urlparse(url)
        return parsed.netloc.lower()
    except:
        return ""


def has_suspicious_tld(domain):
    return any(domain.endswith(tld) for tld in SUSPICIOUS_TLDS)


def uses_url_shortener(domain):
    return domain in URL_SHORTENERS


def simulate_ml_prediction():
    return random.uniform(0, 1)


# === Email Analysis ===
def analyze_email(content: str, sender: str = "") -> Dict[str, Any]:
    lines = content.strip().split("\n")
    subject = next((line for line in lines if line.strip()), "No Subject")
    body = content
    links = get_links_from_text(body)
    text_lower = body.lower()
    words = re.findall(r"\b\w+\b", text_lower)

    # New suspicious file extensions list
    SUSPICIOUS_EXTENSIONS = [".exe", ".scr", ".docm", ".zip"]

    # Detect file extensions mentioned in content
    suspicious_extensions_found = [
        ext for ext in SUSPICIOUS_EXTENSIONS if ext in text_lower
    ]

    flags = {
        "grammar_errors": len(words) > 100 and random.random() > 0.7,
        "has_threatening_language": any(kw in text_lower for kw in THREAT_KEYWORDS),
        "asks_sensitive_info": any(kw in text_lower for kw in SENSITIVE_KEYWORDS),
        "suspicious_links": False,
        "url_mismatch": False,
        "contains_links": len(links) > 0,
        "creates_urgency": any(
            word in text_lower
            for word in [
                "urgent",
                "immediately",
                "warning",
                "alert",
                "now",
                "quick",
                "fast",
            ]
        ),
        "no_personal_greeting": not any(
            line.lower().startswith(greeting)
            for greeting in ["dear", "hi", "hello", "greetings"]
            for line in lines[:5]
        ),
        "suspicious_attachments": len(suspicious_extensions_found) > 0,
    }

    for url in links:
        domain = extract_domain(url)
        if has_suspicious_tld(domain) or uses_url_shortener(domain):
            flags["suspicious_links"] = True

    ml_score = simulate_ml_prediction()
    risk_percentage = int(ml_score * 100)
    num_flags = sum(1 for v in flags.values() if v)

    risk_level = (
        "High"
        if risk_percentage > 70 or num_flags >= 4
        else "Medium" if risk_percentage > 40 or num_flags >= 2 else "Low"
    )

    sensitive_found = [kw for kw in SENSITIVE_KEYWORDS if kw in text_lower]
    threat_found = [kw for kw in THREAT_KEYWORDS if kw in text_lower]
    suspicious_domains = [
        extract_domain(url)
        for url in links
        if has_suspicious_tld(extract_domain(url))
        or uses_url_shortener(extract_domain(url))
    ]

    metadata = {
        "subject": subject,
        "word_count": len(words),
        "link_count": len(links),
        "suspicious_domains": suspicious_domains or None,
        "sensitive_keywords_found": sensitive_found or None,
        "threat_keywords_found": threat_found or None,
        "suspicious_extensions_found": suspicious_extensions_found or None,
    }

    explanations = {}
    if flags["has_threatening_language"] and threat_found:
        explanations["has_threatening_language"] = (
            f"Detected threatening keyword(s): {', '.join(threat_found)}."
        )
    if flags["asks_sensitive_info"] and sensitive_found:
        explanations["asks_sensitive_info"] = (
            f"Sensitive keyword(s) found: {', '.join(sensitive_found)}."
        )
    if flags["creates_urgency"]:
        explanations["creates_urgency"] = (
            "Message contains urgency phrases like 'urgent', 'now', or 'immediately'."
        )
    if flags["no_personal_greeting"]:
        explanations["no_personal_greeting"] = (
            "Greeting is generic like 'Dear user' instead of using your name."
        )
    if flags["suspicious_links"] and suspicious_domains:
        explanations["suspicious_links"] = (
            f"Suspicious domain(s): {', '.join(suspicious_domains)}."
        )
    if flags["grammar_errors"]:
        explanations["grammar_errors"] = (
            "Message may contain grammar issues due to word count or structure."
        )
    if flags["contains_links"]:
        explanations["contains_links"] = (
            f"The message contains {len(links)} link(s), which may be used for phishing."
        )
    if flags["suspicious_attachments"] and suspicious_extensions_found:
        explanations["suspicious_attachments"] = (
            f"Suspicious file extension(s) mentioned: {', '.join(suspicious_extensions_found)}."
        )

    if sender:
        sender_info = analyze_sender_email(sender)
        metadata["sender_email"] = sender
        metadata["sender_analysis"] = sender_info

        if (
            sender_info["suspicious_tld"]
            or sender_info["spoofing_brand"]
            or sender_info["too_many_subdomains"]
        ):
            flags["suspicious_sender"] = True
            explanations["suspicious_sender"] = (
                "Sender email looks suspicious based on domain and branding."
            )

    return {
        "risk_level": risk_level,
        "risk_percentage": risk_percentage,
        "flags": flags,
        "metadata": metadata,
        "ml_confidence": round(ml_score, 2),
        "explanations": explanations,
    }


def classify_phone_number_robust(phone_number):
    try:
        parsed = phonenumbers.parse(phone_number, "MY")
        if phonenumbers.is_possible_number(parsed) and phonenumbers.is_valid_number(
            parsed
        ):
            if phonenumbers.number_type(parsed) == phonenumbers.PhoneNumberType.MOBILE:
                return "Mobile"
            elif (
                phonenumbers.number_type(parsed)
                == phonenumbers.PhoneNumberType.FIXED_LINE
            ):
                return "Landline"
            elif (
                phonenumbers.number_type(parsed)
                == phonenumbers.PhoneNumberType.TOLL_FREE
            ):
                return "Toll-Free"
            elif (
                phonenumbers.number_type(parsed)
                == phonenumbers.PhoneNumberType.SHORT_CODE
            ):
                return "Short Code"
            else:
                return "Other"
        else:
            return "Invalid"
    except:
        return "Unknown"


def analyze_sender_phone(sender_phone):
    phone_type = classify_phone_number_robust(sender_phone)
    try:
        parsed = phonenumbers.parse(sender_phone, None)
        is_valid = phonenumbers.is_valid_number(parsed)
    except:
        is_valid = False

    result = {
        "phone_type": phone_type,
        "is_valid_format": is_valid,
        "is_short_code": len(re.sub(r"[^\d]", "", sender_phone)) <= 6,
    }
    return result


# === SMS Analysis ===
def analyze_sms(content: str, sender: str = "") -> Dict[str, Any]:
    text_lower = content.lower()
    links = get_links_from_text(content)
    phone_type = classify_phone_number_robust(sender) if sender else None
    flags = {
        "has_threatening_language": any(kw in text_lower for kw in THREAT_KEYWORDS),
        "asks_sensitive_info": any(kw in text_lower for kw in SENSITIVE_KEYWORDS),
        "contains_links": len(links) > 0,
        "suspicious_links": any(
            has_suspicious_tld(extract_domain(url))
            or uses_url_shortener(extract_domain(url))
            for url in links
        ),
        "creates_urgency": any(
            word in text_lower
            for word in [
                "urgent",
                "immediately",
                "warning",
                "alert",
                "now",
                "quick",
                "fast",
            ]
        ),
    }

    ml_score = simulate_ml_prediction()
    risk_percentage = int(ml_score * 100)
    num_flags = sum(1 for v in flags.values() if v)

    risk_level = (
        "High"
        if risk_percentage > 70 or num_flags >= 3
        else "Medium" if risk_percentage > 40 or num_flags >= 1 else "Low"
    )

    sensitive_found = [kw for kw in SENSITIVE_KEYWORDS if kw in text_lower]
    threat_found = [kw for kw in THREAT_KEYWORDS if kw in text_lower]
    suspicious_domains = [
        extract_domain(url)
        for url in links
        if has_suspicious_tld(extract_domain(url))
        or uses_url_shortener(extract_domain(url))
    ]

    metadata = {
        "character_count": len(content),
        "link_count": len(links),
        "suspicious_domains": suspicious_domains or None,
        "sensitive_keywords_found": sensitive_found or None,
        "threat_keywords_found": threat_found or None,
    }

    explanations = {}
    if flags["has_threatening_language"] and threat_found:
        explanations["has_threatening_language"] = (
            f"Detected threatening keyword(s): {', '.join(threat_found)}."
        )
    if flags["asks_sensitive_info"] and sensitive_found:
        explanations["asks_sensitive_info"] = (
            f"Sensitive keyword(s) found: {', '.join(sensitive_found)}."
        )
    if flags["creates_urgency"]:
        explanations["creates_urgency"] = "Message uses urgency-related language."
    if flags["suspicious_links"] and suspicious_domains:
        explanations["suspicious_links"] = (
            f"Suspicious domain(s): {', '.join(suspicious_domains)}."
        )

    if sender:
        sender_info = analyze_sender_phone(sender)
        metadata["sender_number"] = sender
        metadata["sender_analysis"] = sender_info

        if sender_info["phone_type"].lower() in ["premium", "shortcode", "invalid"]:
            flags["suspicious_sender"] = True
            explanations["suspicious_sender"] = (
                f"Sender number type '{sender_info['phone_type']}' is commonly used in scams."
            )

    return {
        "risk_level": risk_level,
        "risk_percentage": risk_percentage,
        "flags": flags,
        "metadata": metadata,
        "ml_confidence": round(ml_score, 2),
        "explanations": explanations,
    }


# === URL Analysis ===
def analyze_url(url: str) -> Dict[str, Any]:
    domain = extract_domain(url)
    flags = {
        "suspicious_tld": has_suspicious_tld(domain),
        "is_url_shortener": uses_url_shortener(domain),
        "contains_suspicious_keywords": any(
            kw in url.lower()
            for kw in [
                "secure",
                "login",
                "verify",
                "bank",
                "account",
                "update",
                "confirm",
            ]
        ),
        "excessive_subdomains": domain.count(".") > 2,
    }

    ml_score = simulate_ml_prediction()
    risk_percentage = int(ml_score * 100)
    num_flags = sum(1 for v in flags.values() if v)

    risk_level = (
        "High"
        if risk_percentage > 70 or num_flags >= 2
        else "Medium" if risk_percentage > 40 or num_flags >= 1 else "Low"
    )

    metadata = {
        "domain": domain,
        "path_length": len(urlparse(url).path),
        "query_parameters": bool(urlparse(url).query),
        "uses_https": url.startswith("https://"),
    }

    explanations = {}
    if flags["suspicious_tld"]:
        explanations["suspicious_tld"] = (
            f"The domain ends with a suspicious TLD like {domain[-4:]}."
        )
    if flags["is_url_shortener"]:
        explanations["is_url_shortener"] = (
            f"The domain '{domain}' is a known URL shortener."
        )
    if flags["contains_suspicious_keywords"]:
        explanations["contains_suspicious_keywords"] = (
            "The URL contains keywords like 'login', 'bank', or 'verify'."
        )
    if flags["excessive_subdomains"]:
        explanations["excessive_subdomains"] = (
            "The domain has many subdomains which may indicate phishing."
        )

    return {
        "risk_level": risk_level,
        "risk_percentage": risk_percentage,
        "flags": flags,
        "metadata": metadata,
        "ml_confidence": round(ml_score, 2),
        "explanations": explanations,
    }


# # Load once (global to avoid reloading on every request)
# SMS_MODEL = joblib.load("sms_model.pkl")

# def predict_sms_spam_probability(message: str) -> float:
#     """Returns probability the SMS is spam (0.0 to 1.0)"""
#     prob_array = SMS_MODEL.predict_proba([message])[0]
#     spam_prob = prob_array[0]  # Adjust if needed based on how model is trained
#     return spam_prob
