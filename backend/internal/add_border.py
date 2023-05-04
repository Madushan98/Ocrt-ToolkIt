import cv2
from matplotlib import pyplot as plt
import numpy as np
from .noise_remove import noise_remove_img_array

def add_border(imge):
    color = [255, 255, 255]
    top, bottom, left, right = [150]*4
    image_with_border = cv2.copyMakeBorder(imge, top, bottom, left, right, cv2.BORDER_CONSTANT, value=color)
    return (image_with_border)

def add_border_total(imge_path, save_path):
    no_noise= noise_remove_img_array(imge_path, save_path)
    add_borders = add_border(no_noise)
    cv2.imwrite(save_path, add_borders)
    return (add_borders)