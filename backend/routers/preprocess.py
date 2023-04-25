from fastapi import APIRouter
from pydantic import BaseModel
import os
from internal.noise_remove import noise_remove_total
from pathlib import Path

router = APIRouter()
BASE_DIR = Path(__file__).resolve(strict=True).parent

file_path = f'{BASE_DIR}/uploads/page1.png'  # actual path to your folder
file_path = os.path.join(os.path.dirname(os.getcwd()),
                         "backend\\uploads", "page1.png")

save_path = os.path.join(os.path.dirname(os.getcwd()),"backend\\results", "result.png")

@router.get("/pre-process/noise-remove")
async def removeNoise():
    print(file_path)
    noise_remove_total(file_path,save_path, th1=210, th2=230)
    return "success"
