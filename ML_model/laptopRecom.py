from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import re
from pathlib import Path

app = FastAPI(title="Laptop Recommendation API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent
DATA_PATH = BASE_DIR / "laptop_data.csv"

# Load CSV
df = pd.read_csv(DATA_PATH)

# Convert RAM
df["Ram"] = df["Ram"].str.replace("GB", "").astype(int)

# Convert Storage
def storage_to_gb(memory):

    total = 0

    for size, unit in re.findall(
        r"(\d+(?:\.\d+)?)\s*(TB|GB)",
        str(memory),
        re.I
    ):

        value = float(size)

        if unit.upper() == "TB":
            total += int(value * 1000)

        else:
            total += int(value)

    return total

df["Rom"] = df["Memory"].apply(storage_to_gb)

# Request Model
class RecommendationRequest(BaseModel):

    min_price: int
    max_price: int
    ram: int = 0
    rom: int = 0
    company: str = ""
    type_name: str = ""
    cpu: str = ""

# Home Route
@app.get("/")
def home():

    return {
        "message": "Laptop Recommendation API Running"
    }

# Filter Options
@app.get("/options")
def options():

    return {
        "min_price": int(df["Price"].min()),

        "max_price": int(df["Price"].max()),

        "ram_options": sorted(
            df["Ram"].unique().tolist()
        ),

        "company_options": sorted(
            df["Company"].dropna().unique().tolist()
        ),

        "type_options": sorted(
            df["TypeName"].dropna().unique().tolist()
        )
    }

# Recommendation API
@app.post("/recommend")
def recommend(data: RecommendationRequest):

    filtered = df[
        (df["Price"] >= data.min_price)
        & (df["Price"] <= data.max_price)
        & (df["Ram"] >= data.ram)
        & (df["Rom"] >= data.rom)
        & (
            df["Company"].str.contains(
                data.company,
                case=False,
                na=False
            )
        )
        & (
            df["TypeName"].str.contains(
                data.type_name,
                case=False,
                na=False
            )
        )
        & (
            df["Cpu"].str.contains(
                data.cpu,
                case=False,
                na=False
            )
        )
    ]

    columns = [
        "Company",
        "TypeName",
        "Inches",
        "ScreenResolution",
        "Cpu",
        "Ram",
        "Memory",
        "Rom",
        "Gpu",
        "OpSys",
        "Weight",
        "Price"
    ]

    result = filtered[columns].head(30).copy()

    return result.fillna("").to_dict(orient="records")