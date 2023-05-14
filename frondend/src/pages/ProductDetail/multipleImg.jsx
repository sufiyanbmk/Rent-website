/* eslint-disable */
import React, { useState } from 'react'

const MultipleImage = ({imagesUrl}) => {

  const [images, setImages] = useState({
    img1: imagesUrl[0],
    img2: imagesUrl[1],
    img3: imagesUrl[2],
    img4: imagesUrl[3]
  })

  const [activeImg, setActiveImage] = useState(images.img1)

  const [amount, setAmount] = useState(1);

  return (
    <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center'>
    <div className='flex flex-col gap-6 lg:w-2/4 max-w-lg'>
      <img src={activeImg} alt="" className='w-full max-w-full md:w-screen h-full aspect-square rounded-xl lg:aspect-none'/>
      <div className='flex flex-row justify-between lg:justify-start lg:w-full h-24 gap-4'>
        <img src={imagesUrl[0]} alt="" className='w-16 h-16 lg:w-20 lg:h-20 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img1)} />
        <img src={images.img2} alt="" className='w-16 h-16 lg:w-20 lg:h-20 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img2)} />
        <img src={images.img3} alt="" className='w-16 h-16 lg:w-20 lg:h-20 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img3)} />
        <img src={images.img4} alt="" className='w-16 h-16 lg:w-20 lg:h-20 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img4)} />
      </div>
    </div>
  </div>
  )
}
export default MultipleImage