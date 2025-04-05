import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import accuracy_score, classification_report

import xgboost as xgb

def load_data():
    """
    Reads the CSV file, maps Label=SPAM->0, HAM->1.
    Returns X (messages) and y (labels).
    """
    df = pd.read_csv("/Users/zhangyuxuan/Desktop/cleaned_SMS.csv")  
    df["Label"] = df["Label"].map({"SPAM": 0, "HAM": 1})
    return df["Message"], df["Label"]

def build_pipeline():
    """
    Builds the Pipeline with TF-IDF + XGBoost.
    You can hardcode your best params here.
    """
    pipeline = Pipeline([
        ('tfidf', TfidfVectorizer(
            max_df=0.8,
            min_df=2,
            max_features=3000,
            ngram_range=(1,1)
        )),
        ('xgb', xgb.XGBClassifier(
            colsample_bytree=1.0,
            learning_rate=0.3,
            max_depth=6,
            n_estimators=200,
            subsample=1.0,
            use_label_encoder=False,
            eval_metric='mlogloss'
        ))
    ])
    return pipeline

def main():
    # Load data
    X, y = load_data()

    # Split train/test
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Build pipeline
    model = build_pipeline()
    model.fit(X_train, y_train)

    # Predict and Evaluate
    y_pred = model.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    report = classification_report(y_test, y_pred, target_names=["SPAM", "HAM"])

    print(f"Test Accuracy: {acc * 100:.2f}%")
    print(report)

    # save model
    joblib.dump(model, "sms_model.pkl")
    print("Model saved to sms_model.pkl")

if __name__ == "__main__":
    main()
