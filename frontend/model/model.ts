import { Options } from "../enums/enums";

export interface OptionType {
    label: string;
    value: string;
  };

export interface uploadeChanger{
    onOptionChange:(value:Options)=>void
    onUpload:()=>void
}

export interface closeButton{
    closeClick:()=>void
}