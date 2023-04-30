from fastapi import APIRouter
import os
from internal.noise_remove import noise_remove_total
from internal.dilate_erode import dilate_total, erote_total
from pathlib import Path
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from typing import List
from fastapi.responses import JSONResponse

router = APIRouter()
BASE_DIR = Path(__file__).resolve(strict=True).parent

file_path = f'{BASE_DIR}/uploads/page1.png'  # actual path to your folder
file_path = os.path.join(os.path.dirname(os.getcwd()),
                         "backend\\static\\uploads", "page1.png")

resultFlename = "result.png"

save_path = os.path.join(os.path.dirname(os.getcwd()),
                         "backend\\static\\results", "result.png")


@router.get("/pre-process/noise-remove")
async def removeNoise():
    noise_remove_total(file_path, save_path, th1=210, th2=230)
    url = f"http://localhost:8000/static/results/{resultFlename}"

    # Return a JSON response with the image URL
    return JSONResponse({"url": url})


@router.get("/pre-process/noise-remove")
async def dilation():
    dilate_total(file_path, save_path)
    url = f"http://localhost:8000/static/results/{resultFlename}"

    # Return a JSON response with the image URL
    return JSONResponse({"url": url})
    