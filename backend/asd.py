from internal.ocr_process import easyOcr_reader, easyOcr_text_only
import pytesseract

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

op_tesseract = pytesseract.image_to_string("uploads/image.jpg")

print(op_tesseract)