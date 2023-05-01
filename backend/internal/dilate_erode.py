from fastapi import APIRouter
from .noise_remove import noise_remove_total
import cv2

# apply erotion to images


def thin_font(image):
    import numpy as np
    image = cv2.bitwise_not(image)
    kernel = np.ones((2, 2), np.uint8)
    image = cv2.erode(image, kernel, iterations=1)
    image = cv2.bitwise_not(image)
    return (image)

# apply dilation to image


def thick_font(image):
    import numpy as np
    image = cv2.bitwise_not(image)
    kernel = np.ones((2, 2), np.uint8)
    image = cv2.dilate(image, kernel, iterations=1)
    image = cv2.bitwise_not(image)
    return (image)


def erote_total(imge_path, save_path):
    img = cv2.imread(imge_path)
    no_noise = noise_remove_total(img)
    img = thin_font(no_noise)
    cv2.imwrite(save_path, img)
    return img


def dilate_total(imge_path, save_path):
    img = cv2.imread(imge_path)
    no_noise = noise_remove_total(img)
    img = thick_font(no_noise)
    cv2.imwrite(save_path, img)
    return img
