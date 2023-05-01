import cv2
from .dilate_erode import thin_font, thick_font
from .noise_remove import grey_scale, binarize_image, nosie_remove, noise_remove_img_array


def noise_remove_total(imge_path, save_path, th1=210, th2=230):
    img = cv2.imread(imge_path)
    img = grey_scale(img)
    img = binarize_image(img, th1, th2)
    img = nosie_remove(img)
    cv2.imwrite(save_path, img)
    return save_path


def erote_total(imge_path, save_path):
    no_noise = noise_remove_img_array(imge_path, save_path)
    img = thin_font(no_noise)
    cv2.imwrite(save_path, img)
    return img


def dilate_total(imge_path, save_path):
    no_noise = noise_remove_img_array(imge_path, save_path)
    img = thick_font(no_noise)
    cv2.imwrite(save_path, img)
    return img
