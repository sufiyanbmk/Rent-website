/* eslint-disable */
import React, { useState } from "react";
import { useDropzone } from 'react-dropzone';
import Error from "./error";
import addFileIcon from '../../assets/images/addFileIcon.svg';

const ThirdForm = ({ onChange, formValues, }) => {
  const [files, setFiles] = useState([]);
  const handleUpload = (acceptedFiles) => {
    const file = acceptedFiles[0]
    console.log(file)
    setFiles(
      acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }))
    );
    
    // Trigger onChange event with updated files state
    onChange(file);
  };

  const { getRootProps, getInputProps, acceptedFiles, fileRejections } = useDropzone(
    {
      maxFiles: 4,
      accept: {
        "image/png": [".png", ".jpg", '.jpeg',]
      },

      onDrop: handleUpload

    }
  )
  return (
    <div className="w-full">
      <form className="bg-white shadow-md rounded px-24 pt-16 pb-10 mb-8 ">
        <div className="grid gap-4 place-content-center items-center">
          <h1 className="text-gray-700 pb-8 font-bold text-2xl">Image Info</h1>
        </div>
        <div className="h-auto">

        </div>

        <section className="text-center my-5 ">

          <div {...getRootProps(
            { className: "text-center cursor-pointer" }
          )}>
            <input {...getInputProps()} 
            name='image'
            />
            <img className=' mx-auto h-28 ' src={addFileIcon} alt="addfile" />
            <p className='text-xl font-semibold'>Drop a file here</p>
          </div>

          <div className="flex justify-center flex-wrap ">
            {
              files.map((file) => (
                <div className="image-preview m-2 p-4 w-40 h-40 " key={file.name}>
                  <img src={file.preview} alt="thumnail"
                    className='w-auto h-full rounded-md'
                    onLoad={
                      () => {
                        URL.revokeObjectURL(file.preview)
                      }
                    }
                  />
                </div>
              ))
            }
          </div>

          <div className="filesAccepted">
            {
              acceptedFiles[0] ? <p className='text-green-500 text-2xl'>🙂 Files accepted </p> : ''
            }
            
          </div>


          <div className="fileNotAccepted">
            {
              fileRejections[0] ? <Error errorM={fileRejections[0].errors[0]} /> : ''
            }

          </div>

        </section>


        <div className="flex justify-items-center content-center items-center">
          <label
            className="block text-gray-700 px-2  text-sm font-bold mb-2"
            htmlFor="Terms"
          >
            Terms
          </label>
          <input
            name="terms"
            value={formValues.terms}
            onChange={onChange}
            className="shadow cursor-pointer border rounded"
            type="checkbox"
          ></input>
        </div>
        <div className="flex items-center justify-between"></div>
      </form>
    </div>
  );
};

export default ThirdForm;