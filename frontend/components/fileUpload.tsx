'use client';
import { url } from 'inspector';
import { useState, createContext, useContext, useEffect } from 'react'
import FilePreview from './filePreview';
import { FileContext, ThresholdContext } from '../app/context';
import { OptionType, uploadeChanger } from '../model/model';
import { Options } from '../enums/enums';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const FileUpload = ({ onOptionChange, onUpload }: uploadeChanger) => {
  const fileContext = useContext(FileContext)
  const thresholdContext = useContext(ThresholdContext)
  const [selectedOption, setSelectedOption] = useState<Options>(Options.get_result);


  useEffect(() => {
    onOptionChange(selectedOption);
  }, [selectedOption]);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value as Options);
  };

  const handleUpload = () => {
    onUpload()
  }

  const setThreshold1 = (value: number) => {
    thresholdContext?.setTh1(value);
  }

  

  const setThreshold2 = (value: number) => {
    thresholdContext?.setTh2(value);
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
      {selectedOption === Options.noise_remove && (
        <div className='px-4'>
          <label>Threshold 1: {thresholdContext?.th1}</label>
          <Slider
            min={0}
            max={255}
            //@ts-ignore
            value={thresholdContext?.th1}
            //@ts-ignore
            onChange={value => setThreshold1(value)}
          />
          <label>Threshold 2: {thresholdContext?.th2}</label>
          <Slider
            min={0}
            max={255}
            //@ts-ignore
            value={thresholdContext?.th2}
            //@ts-ignore
            onChange={value => setThreshold2(value)}
          />
        </div>
      )}
    </div>

  )
}

export default FileUpload