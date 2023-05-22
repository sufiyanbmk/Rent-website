/* eslint-disable */
import React from 'react'

export default function StepperControl({handleClick,currentStep, steps}) {

  return (
    <div className='container flex justify-around mt-4 mb-8'>
      <button onClick={() => handleClick()} 
       className={`bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out first-letter first-letter 
       ${currentStep === 2 ?"": `opacity-50 cursor-not-allowed hidden`}
       `}>
        Back
      </button>

      <button onClick={() => handleClick("next")}
        className={`bg-green-500 text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out
        ${currentStep === 2 ?"hidden": ``}`}>
        {currentStep === steps.length - 1 ? 'next' : 'next'}
      </button>
    
    </div>
  )
}
