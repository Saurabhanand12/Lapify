from pathlib import Path
from typing import Optional

import numpy as np
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from xgboost import XGBRegressor

BASE_DIR = Path(__file__).resolve().parent
DATA_PATH = BASE_DIR / "laptop_data.csv"

app = FastAPI(title="Laptop Price Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------ DATA PREP ------------------

def cpu_brand(cpu_name):
    if "Intel Core i3" in cpu_name:
        return "Intel Core i3"
    if "Intel Core i5" in cpu_name:
        return "Intel Core i5"
    if "Intel Core i7" in cpu_name:
        return "Intel Core i7"
    if "Intel" in cpu_name:
        return "Other Intel Processor"
    return "AMD Processor"


def os_category(os_name):
    if os_name in ["macOS", "Mac OS X"]:
        return "Mac"
    if os_name in ["Windows 10", "Windows 7", "Windows 10 S"]:
        return "Windows"
    return "Others/No OS/Linux"


def extract_storage(memory, storage_type):
    total = 0
    memory = str(memory).replace(".0", "").replace("GB", "").replace("TB", "000")

    for part in memory.split("+"):
        part = part.strip()
        if storage_type in part:
            total += int(part.split()[0])

    return total


def load_data():
    df = pd.read_csv(DATA_PATH)
    df.drop(columns=["Unnamed: 0"], inplace=True, errors="ignore")

    df["Ram"] = df["Ram"].str.replace("GB", "", regex=False).astype(int)
    df["Weight"] = df["Weight"].str.replace("kg", "", regex=False).astype(float)

    df["Touchscreen"] = df["ScreenResolution"].apply(lambda x: 1 if "Touchscreen" in x else 0)
    df["Ips"] = df["ScreenResolution"].apply(lambda x: 1 if "IPS" in x else 0)

    res = df["ScreenResolution"].str.extract(r"(\d+)x(\d+)").astype(float)
    df["ppi"] = ((res[0]**2 + res[1]**2) ** 0.5) / df["Inches"]

    df["Cpu brand"] = df["Cpu"].apply(cpu_brand)
    df["HDD"] = df["Memory"].apply(lambda x: extract_storage(x, "HDD"))
    df["SSD"] = df["Memory"].apply(lambda x: extract_storage(x, "SSD"))
    df["Gpu brand"] = df["Gpu"].str.split().str[0]
    df = df[df["Gpu brand"] != "ARM"]
    df["os"] = df["OpSys"].apply(os_category)

    df.drop(columns=[
        "ScreenResolution", "Inches", "Cpu", "Memory",
        "Gpu", "OpSys"
    ], inplace=True)

    return df


# ------------------ TRAIN MODEL ------------------

training_df = load_data()
DEFAULT_PPI = float(training_df["ppi"].median())


def train_model(df):
    X = df.drop(columns=["Price"])
    y = np.log(df["Price"])

    cat_cols = X.select_dtypes(include=["object"]).columns
    num_cols = X.select_dtypes(exclude=["object"]).columns

    preprocessor = ColumnTransformer([
        ("cat", OneHotEncoder(handle_unknown="ignore"), cat_cols),
        ("num", StandardScaler(), num_cols)
    ])

    model = Pipeline([
        ("preprocessor", preprocessor),
        ("model", XGBRegressor(
            n_estimators=150,
            random_state=42,
            objective="reg:squarederror"
        ))
    ])

    model.fit(X, y)
    return model


model = train_model(training_df)

# ------------------ API INPUT ------------------

class LaptopModel(BaseModel):
    Company: str
    TypeName: str
    Ram: int
    Weight: float
    Touchscreen: int
    Ips: int
    ppi: Optional[float] = None
    Cpu_brand: str
    HDD: int
    SSD: int
    Gpu_brand: str
    os: str


# ------------------ ROUTES ------------------

@app.get("/")
def home():
    return {"message": "Laptop Price Prediction API Running 🚀"}


@app.post("/predict")
def predict(data: LaptopModel):

    
    input_dict = {
        "Company": data.Company,
        "TypeName": data.TypeName,
        "Ram": data.Ram,
        "Weight": data.Weight,
        "Touchscreen": data.Touchscreen,
        "Ips": data.Ips,
        "ppi": data.ppi if data.ppi is not None else DEFAULT_PPI,
        "Cpu brand": data.Cpu_brand,
        "HDD": data.HDD,
        "SSD": data.SSD,
        "Gpu brand": data.Gpu_brand,
        "os": data.os,
    }

    input_df = pd.DataFrame([input_dict])

    prediction_log = model.predict(input_df)[0]
    price = np.exp(prediction_log)

    return {
        "Predicted Price": round(float(price), 2)
    }
