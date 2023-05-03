import cv2
from matplotlib import pyplot as plt
import numpy as np
from .noise_remove import noise_remove_img_array

def remove_borders(image):
    contours, heiarchy = cv2.findContours(image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cntsSorted = sorted(contours, key=lambda x:cv2.contourArea(x))
    cnt = cntsSorted[-1]
    x, y, w, h = cv2.boundingRect(cnt)
    crop = image[y:y+h, x:x+w]
    return (crop)


def remove_borders_total(imge_path, save_path):
 #   img = cv2.imread(imge_path)
    no_noise= noise_remove_img_array(imge_path, save_path)
    no_borders = remove_borders(no_noise)
    cv2.imwrite(save_path, no_borders)
    return no_borders
