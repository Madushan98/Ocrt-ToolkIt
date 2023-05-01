'use client';
import { url } from 'inspector';
import { useState, createContext, useContext, useEffect } from 'react'
import FilePreview from './filePreview';
import { FileContext } from '../app/context';
import { OptionType, uploadeChanger } from '../model/model';
import { Options } from '../enums/enums';

const FileUpload = ({onOptionChange,onUpload}:uploadeChanger) => {
  const fileContext = useContext(FileContext)
  const [selectedOption, setSelectedOption] = useState<Options>(Options.get_result);

  useEffect(() => {
    onOptionChange(selectedOption);
  },[selectedOption]);

 const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value as Options);
  };

  const handleUpload = () => {
    onUpload()
  }

  return (
    <div className="max-w-sm mx-auto mt-6 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-8 flex w-full justify-between items-end">
          <div className='flex-col w-4/5 '>
            <label className='tracking-wide text-sm text-indigo-500 font-semibold' htmlFor="">Choose your option</label>
              <select onChange={handleSelect} className="border-2 rounded-md p-2 w-full">
                 {Object.values(Options).map((option) => (
                  <option key={option} value={option}>{option}</option>
                  ))}
              </select>
          </div>
          <button
            className="bg-indigo-500 h-11 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  )
}

export default FileUpload