import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

COMPARE_URL = "http://127.0.0.1:8004/compare"
PREDICT_URL = "http://127.0.0.1:8001/predict"
RECOMMEND_URL = "http://127.0.0.1:8002/recommend"


def Cpu_brand(cpu_name):
    if "Intel i3" in cpu_name:
        return "Intel Core i3"
    if "Intel i5" in cpu_name:
        return "Intel Core i5"
    if "Intel i7" in cpu_name:
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


def predict_payload(laptop_data):
    screen = str(laptop_data["ScreenResolution"])
    resolution = screen.split()[-1].split("x") if "x" in screen else ["1920", "1080"]
    width, height = float(resolution[0]), float(resolution[1])
    inches = float(laptop_data["Inches"])

    return {
        "Company": laptop_data["Company"],
        "TypeName": laptop_data["TypeName"],
        "Ram": int(str(laptop_data["Ram"]).replace("GB", "")),
        "Weight": float(str(laptop_data["Weight"]).replace("kg", "")),
        "Touchscreen": 1 if "Touchscreen" in screen else 0,
        "Ips": 1 if "IPS" in screen else 0,
        "ppi": ((width**2 + height**2) ** 0.5) / inches,
        "Cpu_brand": Cpu_brand(str(laptop_data["Cpu"])),
        "HDD": extract_storage(laptop_data["Memory"], "HDD"),
        "SSD": extract_storage(laptop_data["Memory"], "SSD"),
        "Gpu_brand": str(laptop_data["Gpu"]).split()[0],
        "os": os_category(laptop_data["OpSys"]),
    }


@app.get("/laptop/{laptop}")
def full_system(laptop: str):
    compare_res = requests.post(
        COMPARE_URL,
        json={"laptop1": laptop, "laptop2": "hp"},
    ).json()

    laptop_data = compare_res["laptop1"]

    price_res = requests.post(
        PREDICT_URL,
        json=predict_payload(laptop_data),
    ).json()

    predicted_price = int(price_res["Predicted Price"])
    recommend_res = requests.post(
        RECOMMEND_URL,
        json={
            "min_price": max(0, predicted_price - 20000),
            "max_price": predicted_price + 20000,
        },
    ).json()

    return {
        "laptop": laptop_data,
        "predicted_price": price_res,
        "recommendations": recommend_res,
    }
