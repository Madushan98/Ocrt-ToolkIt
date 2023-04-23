# The io module provides Python’s main facilities for dealing with various types of I/O.
import io
# JSON (JavaScript Object Notation) is a lightweight data-interchange format
import json
import cv2  # cv2.imread(), cv2.imshow() , cv2.imwrite()
# create a NumPy array, use broadcasting, access values, manipulate arrays, and much more
import numpy as np
import requests  # Make a request to a web page, and print the response text
# Matplotlib is a comprehensive library  visualizations in Python.
import matplotlib.pyplot as plt
import easyocr  # OCR engine.
from PIL import Image, ImageDraw, ImageFont


def easyOcr_reader(image_path):

    # Read image
    image = Image.fromarray(image_path)
    img_pil = image
    MAX_SIZE = 2000
    # Resize image
    if img_pil.height > MAX_SIZE or img_pil.width > MAX_SIZE:
        scale = max(img_pil.height / MAX_SIZE, img_pil.width / MAX_SIZE)

        new_width = int(img_pil.width / scale + 0.5)
        new_height = int(img_pil.height / scale + 0.5)
        img_pil = img_pil.resize((new_width, new_height), Image.BICUBIC)

    print(img_pil.width, img_pil.height)

    # create easyocr reader
    reader = easyocr.Reader(['ch_sim', 'en'], gpu=False)
    result = reader.readtext(image_path, detail=1)

    # convert image to grey scale
    gray_pil = img_pil.convert("L")
    img_draw = ImageDraw.Draw(gray_pil)
    colors = ['red', 'green', 'blue', "yellow", "pink"]

    # draw bounding box
    for i, rect in enumerate(result):
        bottomX, bottomY, topX, topY = rect[0]
        x, y, w, h = bottomX[0], bottomX[1], bottomY[0] - \
            bottomX[0], topX[1] - bottomX[1]
        img_draw.rectangle(
            (x, y, x + w, y + h),
            outline=colors[i % len(colors)],
            width=4)

    blank_pil = Image.new("L", img_pil.size, 255)
    blank_draw = ImageDraw.Draw(blank_pil)

    # draw text
    for line in result:
        bottomX, bottomY, topX, topY = line[0]
        x, y, w, h = bottomX[0], bottomX[1], bottomY[0] - \
            bottomX[0], topX[1] - bottomX[1]
        txt = line[1]
        font = ImageFont.truetype("arial.ttf", max(int(h * 0.6), 12))
        blank_draw.text(xy=(x, y), text=txt, font=font)

    blank_pil

    return gray_pil, blank_pil


def easyOcr_text_only(image_path):
    reader = easyocr.Reader(['ch_sim', 'en'], gpu=True)

    # Use the reader to extract text from the image
    text = reader.readtext(image_path)

    # Print the extracted text
    result = ""

    for r in text:
        result += r[1]

    return result
