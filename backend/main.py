from fastapi import Depends, FastAPI, File, UploadFile
import pytesseract
import shutil
import os
from internal.ocr_process import easyOcr_reader, easyOcr_text_only
from routers import preprocess
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"


pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(preprocess.router)

uploaded_path = "uploads"
result_path = "results"

# New folder to save ocr images
if os.path.isdir("result"):
    pass
else:
    os.mkdir("result")


@app.get("/")
async def root():
    if os.name == 'posix':
        # The OS is Linux or macOS
        if os.path.isdir(uploaded_path):
            os.system('rm -rf ' + file_path)
        if os.path.isdir(result_path):
            os.system('rm -rf ' + result_path)
        print('Linux or macOS detected')
    elif os.name == 'nt':
        # The OS is Windows
        if os.path.isdir(uploaded_path):
            os.system(f'rmdir /s /q "{uploaded_path}"')
        if os.path.isdir(result_path):
            os.system(f'rmdir /s /q "{result_path}"')
    return {"message": "Wellcome to OcRT API"}


@app.post("/get-result")
async def getResult(file: UploadFile = File(...)):
    if os.path.isdir(uploaded_path):
        pass
    else:
        os.mkdir(uploaded_path)
    filename = f"uploads/{file.filename}"
    with open(filename, "wb") as f:
        shutil.copyfileobj(file.file, f)

    # output from tesseract and easyocr
    op_easyocr = easyOcr_text_only(filename)
    op_tesseract = pytesseract.image_to_string(filename)

    # # Getting bounding boxes from easyocr
    # cord_ocr = op_easyocr[-1][0]
    # x_min, y_min = [min(idx) for idx in zip(*cord_ocr)]  # min cord
    # x_max, y_max = [max(idx) for idx in zip(*cord_ocr)]  # max cord

    # img_ocr = cv2.imread(filename)
    # cv2.rectangle(img_ocr, (x_min, y_min), (x_max, y_max), (0, 0, 255), 2) # get the bounding box on image
    # cv2.imwrite("result/easyocr.png", img_ocr) # save the image

    # # Getting bounding boxes from tesseract
    # img_tesseract = cv2.imread(filename)  # read image
    # d = pytesseract.image_to_data(Image.open(filename), output_type=Output.DICT) # dict-form boundary
    # n_boxes = len(d['level']) # find the text box

    # for i in range(n_boxes):
    #     (x, y, w, h) = (d['left'][i], d['top'][i],
    #                     d['width'][i], d['height'][i])
    #     cv2.rectangle(img_tesseract, (x, y), (x + w, y + h), (0, 255, 0), 2)

    # cv2.imwrite('result/tesseract.png', img_tesseract)

    return {
        "Tesseract": op_tesseract,
        "EasyOcr": op_easyocr
    }


@app.post("/upload")
async def uploadImage(file: UploadFile = File(...)):
    if os.path.isdir(uploaded_path):
        pass
    else:
        os.mkdir(uploaded_path)
    filename = f"uploads/upload.{file.filename.split('.')[-1]}"
    with open(filename, "wb") as f:
        shutil.copyfileobj(file.file, f)


@app.post("/pre-process")
async def preProcessImage():
    # todo: add preprocess image
    pass
