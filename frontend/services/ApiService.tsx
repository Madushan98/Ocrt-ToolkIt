import { PreProcessDataResult } from "../types/result";

    
    export const getDataService = async (option:string, image:File)=>{
        const result = await getService(image,option);
        return result;
    }
    
    export const uploadDataService = async (option:string, image:File)=>{
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


    export const preProcessDataService = async (option:string): Promise<PreProcessDataResult>=>{
        const endpoint = getEndpoint(option);
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`)
                        .then((response) => response.json()) as PreProcessDataResult;
        return result;
    }

    const getService = (image: any,option: string) => {
        switch(option){
            case "get-result":
                return uploadDataService(option,image);
            case "option2":
                return preProcessDataService(option);
            case "upload":
                return uploadDataService(option,image);
            default:
                return uploadDataService(option,image);
        }
    }


    const getEndpoint = (option:string)=>{
        switch(option){
            case "get-result":
                return "get-result";
            case "option2":
                return "pre-process/noise-remove";
            case "upload":
                return "upload";
            default:
                return "get-result";
        }
    }