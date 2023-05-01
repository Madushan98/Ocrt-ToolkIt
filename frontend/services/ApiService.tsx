import { Options } from "../enums/enums";
import { PreProcessDataResult } from "../types/result";


export const getDataService = async (option: Options, image: File, data: Map<string, number> | null = null) => {
    const result = await getService(image, option,data);
    return result;
}

export const uploadDataService = async (option: Options, image: File) => {
    const endpoint = getEndpoint(option);
    const formData = new FormData();
    formData.append('file', image);
    const options = {
        method: 'POST',
        body: formData,
    };

    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, options)
        .then((response) => response.json());
    return result;
};

export const preProcessDataService = async (option: Options, data: Map<string, number> | null = null): Promise<PreProcessDataResult> => {
    const endpoint = getEndpoint(option);
    let url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;
    if (option === Options.noise_remove && data !== null) {
        url += `/${data.get('th1')}/${data.get('th2')}`;
    }
    const result = await fetch(url)
        .then((response) => response.json()) as PreProcessDataResult;
    return result;
}

const getService = (image: any, option: Options,data: Map<string, number> | null = null) => {
    switch (option) {
        case Options.get_result:
            return uploadDataService(option, image);
        case Options.noise_remove:
            return preProcessDataService(option,data);
        case Options.dilation:
            return preProcessDataService(option);
        case Options.erosion:
            return preProcessDataService(option);
        case "upload":
            return uploadDataService(option, image);
        default:
            return uploadDataService(option, image);
    }
}


const getEndpoint = (option: Options) => {
    switch (option) {
        case Options.get_result:
            return "get-result";
        case Options.noise_remove:
            return "pre-process/noise-remove";
        case Options.upload:
            return "upload";
        case Options.dilation:
            return "pre-process/dilation";
        case Options.erosion:
            return "pre-process/erosion";
        default:
            return "get-result";
    }
}