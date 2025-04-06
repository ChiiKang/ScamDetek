
# # ##1 
# import pandas as pd
# import joblib
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
# import matplotlib.pyplot as plt
# import seaborn as sns
# import chardet

# # 自动检测编码并读取 CSV
# def read_csv_auto_encoding(file_path):
    
#     # 检测文件编码
#     with open(file_path, 'rb') as f:
#         raw_data = f.read(10000)
#         detected = chardet.detect(raw_data)
#         encoding = detected['encoding']
#         print(f" 检测到文件编码: {encoding}")

#     try:
#         df = pd.read_csv(file_path, encoding=encoding)
#         print(" 使用检测编码加载成功")
#         return df
#     except UnicodeDecodeError:
#         print(f" 使用 {encoding} 加载失败，尝试使用 latin1 重新加载...")
#         try:
#             df = pd.read_csv(file_path, encoding='latin1')
#             print(" fallback 使用 latin1 加载成功")
#             return df
#         except Exception as e:
#             print(" fallback 也失败了:", e)
#             raise

# def load_and_preprocess_test_data(test_file_path, vectorizer):
#     """
#     加载并预处理测试数据
#     :param test_file_path: 测试集CSV文件路径
#     :param vectorizer: 已训练好的TF-IDF向量化器
#     :return: 处理后的特征矩阵和标签
#     """
#     # 加载测试数据（使用与训练数据相同的编码检测逻辑）
#     test_df = read_csv_auto_encoding(test_file_path)
    
#     # 检查数据质量
#     print("\n测试集原始统计:")
#     print(f"总样本数: {len(test_df)}")
#     print(f"空值数量 - body: {test_df['combined'].isna().sum()}, label: {test_df['label'].isna().sum()}")
    
#     # 清理数据
#     test_df = test_df.dropna(subset=['combined', 'label'])
#     test_df['combined'] = test_df['combined'].astype(str)
    
#     # 预处理标签（使用与训练集相同的逻辑）
#     test_y = test_df['label'].astype(str)
#     valid_labels = ['0', '1']
#     mask = test_y.isin(valid_labels)
#     test_df = test_df[mask]
#     test_y = test_y[mask]
#     test_y = test_y.replace({'0': 0, '1': 1}).astype(int)
    
#     # 特征提取（使用训练时相同的vectorizer）
#     test_X = vectorizer.transform(test_df['combined'])
    
#     print("\n测试集有效样本统计:")
#     print(f"有效样本数: {len(test_df)}")
#     print("标签分布:\n", test_y.value_counts())
    
#     return test_X, test_y

# def evaluate_model(model, X_test, y_test):
#     """
#     评估模型性能
#     """
#     # 预测
#     y_pred = model.predict(X_test)
    
#     # 计算指标
#     accuracy = accuracy_score(y_test, y_pred)
#     print(f"\n模型准确率: {accuracy:.2%}")
#     print("\n分类报告:")
#     print(classification_report(y_test, y_pred, target_names=["正常邮件(0)", "垃圾邮件(1)"]))
    
#     # 混淆矩阵可视化
#     cm = confusion_matrix(y_test, y_pred)
#     plt.figure(figsize=(6, 4))
#     sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', 
#                 xticklabels=["预测 0", "预测 1"], 
#                 yticklabels=["实际 0", "实际 1"])
#     plt.title('混淆矩阵')
#     plt.ylabel('真实标签')
#     plt.xlabel('预测标签')
#     plt.show()

# def test_model(model_path, vectorizer_path, test_data_path):
#     """
#     主测试函数
#     :param model_path: 模型文件路径(.pkl或.joblib)
#     :param vectorizer_path: TF-IDF向量化器文件路径
#     :param test_data_path: 测试集CSV路径
#     """
#     # 加载模型和向量化器
#     print("加载已训练模型...")
#     model = joblib.load(model_path)
#     vectorizer = joblib.load(vectorizer_path)
    
#     # 加载和预处理测试数据
#     print("\n加载和预处理测试数据...")
#     X_test, y_test = load_and_preprocess_test_data(test_data_path, vectorizer)
    
#     # 评估模型
#     print("\n评估模型性能...")
#     evaluate_model(model, X_test, y_test)

# # 使用示例（替换为你的实际路径）
# if __name__ == "__main__":
#     # 假设这些文件已经保存（需要在训练代码中添加保存逻辑）
#     MODEL_PATH = r"F:\2025s1\FIT5120\ScamDetek\scamdetek\backend\email_classifier_xgb.joblib"
#     VECTORIZER_PATH = r"F:\2025s1\FIT5120\ScamDetek\scamdetek\backend\tfidf_vectorizer.joblib"
#     TEST_DATA_PATH = r"F:\2025s1\FIT5120\ScamDetek\scamdetek\backend\cleaned_dataset\emailtest.csv"
    
#     test_model(MODEL_PATH, VECTORIZER_PATH, TEST_DATA_PATH)




#2

import joblib
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer

def predict_email(text, model, vectorizer):
    """
    :param text
    :param model
    :param vectorizer
    :return: (ham_prob, spam_prob)
    """
    
    text_processed = pd.Series([str(text)])
    
    
    X = vectorizer.transform(text_processed)
    
    # predict
    proba = model.predict_proba(X)[0]
    
    
    return proba[0], proba[1] 

def load_model_and_vectorizer(model_path, vectorizer_path):
    
    model = joblib.load(model_path)
    vectorizer = joblib.load(vectorizer_path)
    return model, vectorizer

def interactive_predictor():
    
   
    MODEL_PATH = r"F:\2025s1\FIT5120\ScamDetek\backend\xgb_model\email_classifier_xgb.joblib"
    VECTORIZER_PATH =  r"F:\2025s1\FIT5120\ScamDetek\backend\xgb_model\tfidf_vectorizer.joblib"
    
    print("loading model...")
    model, vectorizer = load_model_and_vectorizer(MODEL_PATH, VECTORIZER_PATH)
    print("load success")
    
    while True:
        print("\n" + "="*50)
        print("Please enter email text (type 'quit' to exit):")
        email_text = input()
        
        if email_text.lower() == 'quit':
            break
            
        if not email_text.strip():
            print("Input cannot be empty!")
            continue
            
        ham_prob, scam_prob = predict_email(email_text, model, vectorizer)
        
        print("\npredict result:")
        print(f"Ham: {ham_prob:.2%}")
        print(f"Scam: {scam_prob:.2%}")
        
        if scam_prob > 0.8:
            print("WARNING: This is most likely a scam email!")
        elif scam_prob > 0.6:
            print("Note: This may be scam")
        else:
            print("This is probably a normal email")

if __name__ == "__main__":
    interactive_predictor()