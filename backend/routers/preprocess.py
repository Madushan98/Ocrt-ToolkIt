from fastapi import APIRouter
import os
from pathlib import Path
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from typing import List
from fastapi.responses import JSONResponse
from internal.pre_process import noise_remove_total, dilate_total, erote_total

router = APIRouter()
BASE_DIR = Path(__file__).resolve(strict=True).parent

file_path = f'{BASE_DIR}/uploads/page1.png'  # actual path to your folder
file_path = os.path.join(os.path.dirname(os.getcwd()),
                         "backend\\static\\uploads", "page1.png")

resultPath = "backend\\static\\results"

save_path = os.path.join(os.path.dirname(os.getcwd()),
                         resultPath, "")


@router.get("/pre-process/noise-remove/{th1}/{th2}")
async def removeNoise(th1: int, th2: int):
    save_path = os.path.join(os.path.dirname(
        os.getcwd()), resultPath, f"noise-remove{th1}{th2}.png")
    noise_remove_total(file_path, save_path, th1=th1, th2=th2)
    url = f"http://localhost:8000/static/results/noise-remove{th1}{th2}.png"

    # Return a JSON response with the image URL
    return JSONResponse({"url": url})


@router.get("/pre-process/dilation")
async def dilation():
    save_path = os.path.join(os.path.dirname(
        os.getcwd()), resultPath, "dilation.png")
    dilate_total(file_path, save_path)
    url = f"http://localhost:8000/static/results/dilation.png"

    # Return a JSON response with the image URL
    return JSONResponse({"url": url})


@router.get("/pre-process/erosion")
async def erosion():
    save_path = os.path.join(os.path.dirname(
        os.getcwd()), resultPath, "erosion.png")
    erote_total(file_path, save_path)
    url = f"http://localhost:8000/static/results/erosion.png"

    # Return a JSON response with the image URL
    return JSONResponse({"url": url})
