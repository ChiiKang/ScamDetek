import re
from typing import Dict, List, Any, Optional
from pydantic import BaseModel
from bs4 import BeautifulSoup
from urllib.parse import urlparse
import random

# === Config ===
THREAT_KEYWORDS = [
    "urgent", "immediate action required", "account suspension", "account suspended",
    "security alert", "unusual activity", "verify your account", "legal action", "final notice"
]

SENSITIVE_KEYWORDS = [
    "otp", "password", "ic number", "bank account", "credit card", "login", "verify",
    "security question", "ssn", "cvv", "nric", "identity card"
]

URL_SHORTENERS = ['bit.ly', 't.co', 'goo.gl', 'tinyurl.com', 'ow.ly', 'buff.ly', 'is.gd', 'cutt.ly']
SUSPICIOUS_TLDS = ['.tk', '.ml', '.ga', '.ru', '.cn', '.xyz', '.top', '.loan']
SCAM_KEYWORDS = ["prize", "congratulations", "you won", "claim now", "free", "offer", "bet", "win big", "cash", "lottery"]

# === Helper Functions ===
def get_links_from_text(text):
    # Simple regex to extract URLs
    url_pattern = re.compile(r'https?://\S+|www\.\S+')
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
    """Simulate a machine learning model prediction for demo purposes"""
    return random.uniform(0, 1)

# === Analysis Functions ===
def analyze_email(content: str) -> Dict[str, Any]:
    """Analyze email content for potential scams"""
    # Extract potential subject line (first non-empty line)
    lines = content.strip().split('\n')
    subject = next((line for line in lines if line.strip()), "No Subject")
    body = content
    
    # Extract links from text
    links = get_links_from_text(body)
    text_lower = body.lower()

    # --- Flags ---
    flags = {}

    # Grammar errors (simplified)
    words = re.findall(r'\b\w+\b', text_lower)
    flags['grammar_errors'] = len(words) > 100 and random.random() > 0.7  # Simplified check

    # Threat & sensitive language
    flags['has_threatening_language'] = any(kw in text_lower for kw in THREAT_KEYWORDS)
    flags['asks_sensitive_info'] = any(kw in text_lower for kw in SENSITIVE_KEYWORDS)

    # Link analysis
    flags['suspicious_links'] = False
    flags['url_mismatch'] = False
    for url in links:
        domain = extract_domain(url)
        if has_suspicious_tld(domain) or uses_url_shortener(domain):
            flags['suspicious_links'] = True

    # Check for urgency
    urgency_words = ['urgent', 'immediately', 'warning', 'alert', 'now', 'quick', 'fast']
    flags['creates_urgency'] = any(word in text_lower for word in urgency_words)

    # Check for personal greeting
    flags['no_personal_greeting'] = not any(line.lower().startswith(greeting) for greeting in ['dear', 'hi', 'hello', 'greetings'] for line in lines[:5])

    # --- ML Prediction (simulated) ---
    ml_score = simulate_ml_prediction()
    risk_percentage = int(ml_score * 100)
    
    # Determine risk level based on score and flags
    num_flags = sum(1 for flag in flags.values() if flag)
    if risk_percentage > 70 or num_flags >= 4:
        risk_level = "High"
    elif risk_percentage > 40 or num_flags >= 2:
        risk_level = "Medium"
    else:
        risk_level = "Low"

    # --- Metadata ---
    suspicious_domains = [extract_domain(url) for url in links if has_suspicious_tld(extract_domain(url)) or uses_url_shortener(extract_domain(url))]
    
    metadata = {
        "subject": subject,
        "word_count": len(words),
        "link_count": len(links),
        "suspicious_domains": suspicious_domains or None,
        "sensitive_keywords_found": [kw for kw in SENSITIVE_KEYWORDS if kw in text_lower] or None,
        "threat_keywords_found": [kw for kw in THREAT_KEYWORDS if kw in text_lower] or None,
    }
    print("HELLO")
    return {
        "risk_level": risk_level,
        "risk_percentage": risk_percentage,
        "flags": flags,
        "metadata": metadata,
        "ml_confidence": round(ml_score, 2)
    }

def analyze_sms(content: str) -> Dict[str, Any]:
    """Analyze SMS content for potential scams"""
    # Similar to email but simplified for SMS
    text_lower = content.lower()
    
    # --- Flags ---
    flags = {}
    flags['has_threatening_language'] = any(kw in text_lower for kw in THREAT_KEYWORDS)
    flags['asks_sensitive_info'] = any(kw in text_lower for kw in SENSITIVE_KEYWORDS)
    
    # Check for links
    links = get_links_from_text(content)
    flags['contains_links'] = len(links) > 0
    flags['suspicious_links'] = any(has_suspicious_tld(extract_domain(url)) or uses_url_shortener(extract_domain(url)) for url in links)
    
    # Urgency check
    urgency_words = ['urgent', 'immediately', 'warning', 'alert', 'now', 'quick', 'fast']
    flags['creates_urgency'] = any(word in text_lower for word in urgency_words)
    
    # --- ML Prediction (simulated) ---
    ml_score = simulate_ml_prediction()
    risk_percentage = int(ml_score * 100)
    
    # Determine risk level
    num_flags = sum(1 for flag in flags.values() if flag)
    if risk_percentage > 70 or num_flags >= 3:
        risk_level = "High"
    elif risk_percentage > 40 or num_flags >= 1:
        risk_level = "Medium"
    else:
        risk_level = "Low"
    
    # --- Metadata ---
    metadata = {
        "character_count": len(content),
        "link_count": len(links),
        "suspicious_domains": [extract_domain(url) for url in links if has_suspicious_tld(extract_domain(url)) or uses_url_shortener(extract_domain(url))] or None,
        "sensitive_keywords_found": [kw for kw in SENSITIVE_KEYWORDS if kw in text_lower] or None,
        "threat_keywords_found": [kw for kw in THREAT_KEYWORDS if kw in text_lower] or None,
    }
    
    return {
        "risk_level": risk_level,
        "risk_percentage": risk_percentage,
        "flags": flags,
        "metadata": metadata,
        "ml_confidence": round(ml_score, 2)
    }

def analyze_url(url: str) -> Dict[str, Any]:
    """Analyze URL for potential phishing"""
    domain = extract_domain(url)
    
    # --- Flags ---
    flags = {}
    flags['suspicious_tld'] = has_suspicious_tld(domain)
    flags['is_url_shortener'] = uses_url_shortener(domain)
    flags['contains_suspicious_keywords'] = any(kw in url.lower() for kw in ['secure', 'login', 'verify', 'bank', 'account', 'update', 'confirm'])
    flags['excessive_subdomains'] = domain.count('.') > 2
    
    # --- ML Prediction (simulated) ---
    ml_score = simulate_ml_prediction()
    risk_percentage = int(ml_score * 100)
    
    # Determine risk level
    num_flags = sum(1 for flag in flags.values() if flag)
    if risk_percentage > 70 or num_flags >= 2:
        risk_level = "High"
    elif risk_percentage > 40 or num_flags >= 1:
        risk_level = "Medium"
    else:
        risk_level = "Low"
    
    # --- Metadata ---
    metadata = {
        "domain": domain,
        "path_length": len(urlparse(url).path),
        "query_parameters": len(urlparse(url).query) > 0,
        "uses_https": url.startswith("https://"),
    }
    print("HELLO")
    return {
        "risk_level": risk_level,
        "risk_percentage": risk_percentage,
        "flags": flags,
        "metadata": metadata,
        "ml_confidence": round(ml_score, 2)
    }
