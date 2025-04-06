import pandas as pd
from sklearn.model_selection import train_test_split, RandomizedSearchCV, GridSearchCV
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import accuracy_score, classification_report
import xgboost as xgb
import chardet
from scipy.stats import uniform, randint
from sklearn.model_selection import StratifiedKFold
# 自动检测编码并读取 CSV
def read_csv_auto_encoding(file_path):
    
    # 检测文件编码
    with open(file_path, 'rb') as f:
        raw_data = f.read(10000)
        detected = chardet.detect(raw_data)
        encoding = detected['encoding']
        print(f" 检测到文件编码: {encoding}")

    try:
        df = pd.read_csv(file_path, encoding=encoding)
        print(" 使用检测编码加载成功")
        return df
    except UnicodeDecodeError:
        print(f" 使用 {encoding} 加载失败，尝试使用 latin1 重新加载...")
        try:
            df = pd.read_csv(file_path, encoding='latin1')
            print(" fallback 使用 latin1 加载成功")
            return df
        except Exception as e:
            print(" fallback 也失败了:", e)
            raise

# train data
df = read_csv_auto_encoding(r"F:\2025s1\FIT5120\cleaned_dataset\emailtrain.csv")  
# 添加空值检查
print(f"空值数量: {df['combined'].isna().sum()}")
# 删除空值行
df = df.dropna(subset=['combined'])
df = df.dropna(subset=['label'])
# 确保所有内容都是字符串类型
df['combined'] = df['combined'].astype(str)


X = df["combined"]   
y = df["label"]    

# 检查标签类型分布
print("标签类型统计:\n", y.apply(type).value_counts())
# 强制转换为字符串
y = y.astype(str)

# Keep only rows where label is '0', '1'
valid_labels = ['0', '1']
mask = y.isin(valid_labels)

# Filter X and y
X = X[mask] # 保留有效标签对应的特征数据
y = y[mask] # 保留有效标签

# Convert to binary integers (0/1)
y = y.replace({'0': 0, '1': 1})
y = y.astype(int)


# 检查转换后结果
print("标签唯一值:", y.unique())
print("标签类型:", y.dtype)  # 应显示 int/float 或 object(字符串)


# TF-IDF 
#   - stop_words="english" eg: "the", "and" 
vectorizer = TfidfVectorizer(stop_words="english", 
                             max_features=3000,
                             decode_error='replace',  # 自动处理编码异常字符
                            analyzer='word'          # 明确指定分析粒度
                            )
X_tfidf = vectorizer.fit_transform(X)
X_train, X_test, y_train, y_test = train_test_split(X_tfidf, y, test_size=0.1, random_state=42)


# define and train XGBoost classifier
model = xgb.XGBClassifier(eval_metric='logloss', 
                          use_label_encoder=False,
                          max_depth=6,           
                          n_estimators=100
                          )
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print("Accuracy: {:.2f}%".format(accuracy * 100))
# (precision, recall, f1-score)
print(classification_report(y_test, y_pred, target_names=["1", "0"]))



# 保存模型和向量化器
import joblib

# 确保这些目录存在或修改为你想要的路径
model_save_path = r".\xgb_model\email_classifier_xgb.joblib"
vectorizer_save_path = r".\xgb_model\tfidf_vectorizer.joblib"

joblib.dump(model, model_save_path)
joblib.dump(vectorizer, vectorizer_save_path)

print(f"\n模型已保存到: {model_save_path}")
print(f"TF-IDF向量化器已保存到: {vectorizer_save_path}")

#基于特征重要性提取关键词​
import numpy as np

def get_top_keywords(model, vectorizer, n=10):

    # 获取特征重要性
    importance = model.feature_importances_
    
    # 获取特征名称（词汇表）
    feature_names = vectorizer.get_feature_names_out()
    
    # 按重要性排序
    indices = np.argsort(importance)[::-1]
    
    # 提取最重要的关键词
    top_keywords = [feature_names[i] for i in indices[:n]]
    
    return top_keywords

# 使用示例
top_keywords = get_top_keywords(model, vectorizer, n=10)
print("最重要的关键词:", top_keywords)