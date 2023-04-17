/* eslint-disable */
import React, { useState } from 'react'

const MultipleImage = () => {


  const [images, setImages] = useState({
    img1: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:f5f5f5/3396ee3c-08cc-4ada-baa9-655af12e3120/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
    img2: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/e44d151a-e27a-4f7b-8650-68bc2e8cd37e/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
    img3: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/44fc74b6-0553-4eef-a0cc-db4f815c9450/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
    img4: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/d3eb254d-0901-4158-956a-4610180545e5/scarpa-da-running-su-strada-invincible-3-xk5gLh.png"
  })

  const [activeImg, setActiveImage] = useState(images.img1)

  const [amount, setAmount] = useState(1);

  return (
    <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center'>
      <div className='flex flex-col gap-6 lg:w-2/4'>
        <img src={activeImg} alt="" className='w-full h-full aspect-square object-cover rounded-xl' />
        <div className='flex flex-row justify-between h-24'>
          <img src={images.img1} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img1)} />
          <img src={images.img2} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img2)} />
          <img src={images.img3} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img3)} />
          <img src={images.img4} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img4)} />
        </div>
      </div>
    </div>
  )
}
export default MultipleImage