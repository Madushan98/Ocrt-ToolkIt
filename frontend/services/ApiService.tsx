import { Options } from "../enums/enums";
import { PreProcessDataResult } from "../types/result";

    
    export const getDataService = async (option:Options, image:File)=>{
        const result = await getService(image,option);
        return result;
    }
    
    export const uploadDataService = async (option:Options, image:File)=>{
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


    export const preProcessDataService = async (option:Options): Promise<PreProcessDataResult>=>{
        const endpoint = getEndpoint(option);
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`)
                        .then((response) => response.json()) as PreProcessDataResult;
        return result;
    }

    const getService = (image: any,option: Options) => {
        switch(option){
            case Options.get_result:
                return uploadDataService(option,image);
            case Options.noise_remove:
                return preProcessDataService(option);
            case Options.dilation:
                return preProcessDataService(option);
            case Options.erosion:
                return preProcessDataService(option);
            case "upload":
                return uploadDataService(option,image);
            default:
                return uploadDataService(option,image);
        }
    }


    const getEndpoint = (option:Options)=>{
        switch(option){
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