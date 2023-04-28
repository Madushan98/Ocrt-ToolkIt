export interface OptionType {
    label: string;
    value: string;
  };

export interface uploadeChanger{
    onOptionChange:(value:string)=>void
    onUpload:()=>void
}

export interface closeButton{
    closeClick:()=>void
}