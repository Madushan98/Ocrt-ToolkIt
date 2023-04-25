import cv2
from matplotlib import pyplot as plt
import numpy as np
import pytesseract
from PIL import Image



def display(im_path):
    dpi = 80
    im_data = plt.imread(im_path)

    height, width = im_data.shape[:2]

    # What size does the figure need to be in inches to fit the image?
    figsize = width / float(dpi), height / float(dpi)

    # Create a figure of the right size with one axes that takes up the full figure
    fig = plt.figure(figsize=figsize)
    ax = fig.add_axes([0, 0, 1, 1])

    # Hide spines, ticks, etc.
    ax.axis('off')

    # Display the image.
    ax.imshow(im_data, cmap='gray')

    plt.show()


def grey_scale(img):
    return cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)


def binarize_image(gray_image, th1=210, th2=230):
    thresh, im_bw = cv2.threshold(gray_image, th1, th2, cv2.THRESH_BINARY)
    return im_bw


def nosie_remove(image):
    kernal = np.ones((1, 1), np.uint8)
    kernel = np.ones((1, 1), np.uint8)
    image = cv2.dilate(image, kernel, iterations=1)
    kernel = np.ones((1, 1), np.uint8)
    image = cv2.erode(image, kernel, iterations=1)
    image = cv2.morphologyEx(image, cv2.MORPH_CLOSE, kernel)
    image = cv2.medianBlur(image, 3)
    return image

def noise_remove_total(imge_path,th1=210, th2=230,save_path="results/result.jpg"):
    img = cv2.imread(imge_path)
    img = grey_scale(img)
    img = binarize_image(img, th1, th2)
    img = nosie_remove(img)
    cv2.imwrite(save_path, img)
    return img