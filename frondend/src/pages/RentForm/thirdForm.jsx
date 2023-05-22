/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useDropzone } from 'react-dropzone';
import Error from "./error";
import addFileIcon from '../../assets/images/addFileIcon.svg';

const ThirdForm = ({ onChange, formValues, image, errors }) => {
  const [files, setFiles] = useState([]);
  console.log(formValues.link)

  const handleUpload = (acceptedFiles) => {
    console.log(acceptedFiles.length, 'accept ------------------')
    const file = acceptedFiles[0]
    setFiles(
      acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }))
    );
    console.log(files,'sdfsdfdssss')
    
  };
  useEffect(()=>{
    image(files)
  },[files])

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
            <input {...getInputProps({ required: true })}
              name='image'
            />
            <img className=' mx-auto h-28 ' src={addFileIcon} alt="addfile" />
            <p className='text-xl font-semibold'>Drop a file here</p>
          </div>

          <div className="flex justify-center flex-wrap ">
            {formValues.link &&
              formValues.link.map((imageLink) => (
                <div className="image-preview m-2 p-4 w-40 h-40 ">
                  <img src={imageLink} alt="thumnail"
                    className='w-auto h-full rounded-md'
                  />
                </div>
              ))
            }{files &&
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
            {errors.image && <p className='text-red-700'>{errors.image}</p>}
            {
              acceptedFiles[0] ? <p className='text-green-500 text-2xl'>🙂 Files accepted </p> : ''
            }

          </div>


          <div className="fileNotAccepted">
            {
              fileRejections[0] ? <Error errorM={fileRejections[0].errors[0]} /> : ''
            }

          </div>
          {errors.image && <p className='text-red-700'>{errors.image}</p>}
        </section>

        <div className="flex items-center">    
          <input
            name="terms"
            value={formValues.terms}
            onChange={onChange}
            className="shadow cursor-pointer border rounded"
            type="checkbox"
            required
          />
          <label
            className="block text-gray-700 px-3 mt-2  text-sm font-bold mb-2"
            htmlFor="Terms"
          >
            I agree all the Terms &amp; condition
          </label>
          {errors.terms && <p className='text-red-700'>{errors.terms}</p>}
        </div>
        <div className="flex items-center justify-between"></div>
      </form>
    </div>
  );
};

export default ThirdForm;