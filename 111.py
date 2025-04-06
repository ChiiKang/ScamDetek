import sys
import joblib
import pandas as pd
import re

#############################
# 1. Feature extraction logic
#############################

def count_abnormal_upper(msg):
    abnormal_count = 0
    lines = msg.split('\n')
    for line in lines:
        words = line.strip().split()
        for i, word in enumerate(words):
            clean_word = re.sub(r'\W+', '', word)
            if not clean_word:
                continue
            # skip if it's the first word in line
            if i == 0:
                continue
            # skip normal capitalized patterns
            if re.match(r'^[A-Z][a-z]+$', clean_word):
                continue
            # if there's uppercase among other letters
            if any(c.isupper() for c in clean_word[1:]):
                abnormal_count += 1
    return abnormal_count

def extract_stronger_numeric_features(msg):
    has_weird = 0
    words = msg.split()
    for w in words:
        if re.search(r'[A-Za-z]+[^A-Za-z0-9\s]+[A-Za-z]+', w):
            has_weird = 1
            break
        if re.search(r'[A-Za-z]+\d+[A-Za-z]+', w):
            has_weird = 1
            break
    num_symbols = sum(not c.isalnum() and not c.isspace() for c in msg)
    msg_len = len(msg)
    num_abnormal_upper = count_abnormal_upper(msg)
    return pd.Series({
        "has_weird_spelling": has_weird,
        "num_symbols": num_symbols,
        "message_length": msg_len,
        "abnormal_uppercase": num_abnormal_upper
    })

def get_risk_level(spam_prob):
    if spam_prob >= 0.75:
        return "🔴 High Risk"
    elif spam_prob >= 0.5:
        return "🟠 Medium Risk"
    elif spam_prob >= 0.25:
        return "🟡 Risk Controlled"
    else:
        return "🟢 Almost NO Risk"

#############################
# 2. Predict function
#############################

def load_model(model_path="final_version_sms_model.pkl"):
    return joblib.load(model_path)

def predict_sms(model, message):
    df = pd.DataFrame({"Message": [message]})
    features = df["Message"].apply(extract_stronger_numeric_features)
    df = pd.concat([df, features], axis=1)

    prob_array = model.predict_proba(df)[0]
    spam_prob = prob_array[0]
    label_num = model.predict(df)[0]
    label_str = "SPAM" if label_num == 0 else "HAM"
    risk = get_risk_level(spam_prob)

    print("\n================= Prediction =================")
    print(f"Message         : {message}")
    print(f"Predicted Label : {label_str}")
    print(f"SPAM Probability: {spam_prob*100:.2f}%")
    print(f"Risk Level      : {risk}")
    print("==============================================\n")

#############################
# 3. Main entry
#############################

def main():
    model = load_model("final_version_sms_model.pkl")

    print("📩 Multi-line SMS Spam Prediction\n")
    print("Paste your entire multi-line message below.")
    print("After you're done typing/pasting, press:")
    print("  Ctrl+D (Mac/Linux) or Ctrl+Z + Enter (Windows).")
    print("----------------------------------------------\n")

    # sys.stdin.read() will read everything until EOF
    user_message = sys.stdin.read().rstrip('\n')

    if not user_message.strip():
        print("No message entered.")
        return

    # Now predict
    predict_sms(model, user_message)

if __name__ == "__main__":
    main()
