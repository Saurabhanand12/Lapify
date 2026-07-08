import re
from pathlib import Path

import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


BASE_DIR = Path(__file__).resolve().parent
DATA_PATH = BASE_DIR / "laptop_data.csv"

app = FastAPI(title="Laptop Comparison API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

df = pd.read_csv(DATA_PATH)
df.columns = df.columns.str.strip()
df.drop(columns=["Unnamed: 0"], inplace=True, errors="ignore")

df["RamGB"] = df["Ram"].astype(str).str.extract(r"(\d+)").astype(int)


def processor_score(cpu):
    cpu_text = str(cpu).lower()
    score = 0

    processor_ranks = [
        ("ryzen 9", 95),
        ("intel core i9", 95),
        ("ryzen 7", 85),
        ("intel core i7", 85),
        ("ryzen 5", 75),
        ("intel core i5", 75),
        ("ryzen 3", 65),
        ("intel core i3", 65),
        ("amd fx", 55),
        ("amd a12", 50),
        ("amd a10", 45),
        ("amd a9", 40),
        ("amd a6", 35),
        ("amd e-series", 25),
        ("intel pentium", 25),
        ("intel celeron", 20),
        ("intel atom", 15),
    ]

    for processor_name, rank in processor_ranks:
        if processor_name in cpu_text:
            score = rank
            break

    if score == 0:
        score = 30 if "intel" in cpu_text or "amd" in cpu_text else 10

    ghz_match = re.search(r"(\d+(?:\.\d+)?)\s*ghz", cpu_text)
    if ghz_match:
        score += float(ghz_match.group(1))

    return score


def screen_score(screen_resolution):
    screen_text = str(screen_resolution).lower()
    resolution = re.search(r"(\d+)x(\d+)", screen_text)
    score = 0

    if resolution:
        width = int(resolution.group(1))
        height = int(resolution.group(2))
        score += width * height

    if "ips" in screen_text:
        score += 250000

    if "touchscreen" in screen_text:
        score += 100000

    return score


def storage_to_gb(memory):
    total = 0

    for size, unit in re.findall(r"(\d+(?:\.\d+)?)\s*(TB|GB)", str(memory), re.I):
        value = float(size)
        total += int(value * 1000) if unit.upper() == "TB" else int(value)

    return total


df["StorageGB"] = df["Memory"].apply(storage_to_gb)
df["ProcessorScore"] = df["Cpu"].apply(processor_score)
df["ScreenScore"] = df["ScreenResolution"].apply(screen_score)
search_columns = [
    "Company",
    "TypeName",
    "Inches",
    "ScreenResolution",
    "Cpu",
    "Ram",
    "Memory",
    "Gpu",
    "OpSys",
    "Weight",
]
df["SearchText"] = (
    df[search_columns].fillna("").astype(str).agg(" ".join, axis=1).str.lower()
)


class CompareRequest(BaseModel):
    laptop1: str
    laptop2: str


@app.get("/")
def home():
    return {"message": "Laptop Comparison API Running"}


@app.post("/compare")
def compare_laptops(data: CompareRequest):

    def normalize(value):
        return re.sub(r"[^a-z0-9.]+", " ", value.lower()).strip()

    def query_terms(query):
        normalized = normalize(query)
        terms = [term for term in normalized.split() if len(term) > 1]

        aliases = {
            "tuf": ["gaming"],
            "a15": ["15.6"],
            "15s": ["15.6", "notebook"],
            "ryzen": ["amd", "ryzen"],
            "asus": ["asus"],
            "hp": ["hp"],
        }

        expanded_terms = terms.copy()

        for term in terms:
            expanded_terms.extend(aliases.get(term, []))

        return list(dict.fromkeys(expanded_terms))

    def search(query):
        terms = query_terms(query)

        if not terms:
            raise HTTPException(
                status_code=400,
                detail="Laptop search text is empty"
            )

        scores = pd.Series(0, index=df.index)

        for term in terms:
            scores += df["SearchText"].str.contains(
                re.escape(term),
                na=False
            ).astype(int)

        best_score = int(scores.max())

        if best_score == 0:
            return df.iloc[0:0]

        return df[scores == best_score].copy()

    laptop1 = search(data.laptop1)
    laptop2 = search(data.laptop2)

    if laptop1.empty or laptop2.empty:
        raise HTTPException(
            status_code=404,
            detail="Laptop not found"
        )

    l1 = laptop1.iloc[0]
    l2 = laptop2.iloc[0]

    laptop1_name = (
        f"{l1['Company']} "
        f"{l1['TypeName']} "
        f"{l1['Cpu']}"
    )

    laptop2_name = (
        f"{l2['Company']} "
        f"{l2['TypeName']} "
        f"{l2['Cpu']}"
    )

    laptop1_score = 0
    laptop2_score = 0

    # RAM
    if l1["RamGB"] > l2["RamGB"]:
        laptop1_score += 1
        better_ram = l1["Company"]
    elif l2["RamGB"] > l1["RamGB"]:
        laptop2_score += 1
        better_ram = l2["Company"]
    else:
        better_ram = "Tie"

    # Storage
    if l1["StorageGB"] > l2["StorageGB"]:
        laptop1_score += 1
        better_storage = l1["Company"]
    elif l2["StorageGB"] > l1["StorageGB"]:
        laptop2_score += 1
        better_storage = l2["Company"]
    else:
        better_storage = "Tie"

    # Processor
    if l1["ProcessorScore"] > l2["ProcessorScore"]:
        laptop1_score += 1
        better_processor = l1["Company"]
    elif l2["ProcessorScore"] > l1["ProcessorScore"]:
        laptop2_score += 1
        better_processor = l2["Company"]
    else:
        better_processor = "Tie"

    # Screen
    if l1["ScreenScore"] > l2["ScreenScore"]:
        laptop1_score += 1
        better_screen = l1["Company"]
    elif l2["ScreenScore"] > l1["ScreenScore"]:
        laptop2_score += 1
        better_screen = l2["Company"]
    else:
        better_screen = "Tie"

    # Price (lower is better)
    if l1["Price"] < l2["Price"]:
        laptop1_score += 1
        better_price = l1["Company"]
    elif l2["Price"] < l1["Price"]:
        laptop2_score += 1
        better_price = l2["Company"]
    else:
        better_price = "Tie"

    # Final Winner
    if laptop1_score > laptop2_score:
        final_best = l1["Company"]
        final_best_match = laptop1_name

    elif laptop2_score > laptop1_score:
        final_best = l2["Company"]
        final_best_match = laptop2_name

    else:
        final_best = "Tie"
        final_best_match = "Both laptops are similarly matched"

    return {
        "laptop1": l1.to_dict(),
        "laptop2": l2.to_dict(),

        "matched_laptop1": laptop1_name,
        "matched_laptop2": laptop2_name,

        "better_ram": better_ram,
        "better_storage": better_storage,
        "better_processor": better_processor,
        "better_screen": better_screen,
        "better_price": better_price,

        "battery_comparison":
            "Battery data is not available in laptop_data.csv",

        "score": {
            "laptop1": laptop1_score,
            "laptop2": laptop2_score
        },

        "final_best_laptop": final_best,
        "final_best_match": final_best_match
    }