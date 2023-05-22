/* eslint-disable */
import { useState } from 'react'
import stepperContex from '../../context/stepperContext';
import Stepper from './stepper';
import StepperControl from './stepperControl';
import StepChoose from './stepChoose';
import StepPayment from './stepPayment';
import StepSuccess from './stepSuccess';
import { cancelIncompletePyment } from '../../api/api'
import toast, { Toaster } from 'react-hot-toast';

function AdsBooster() {
  const [currentStep, setCurrentStep ] = useState(1);
  const [data, setData] = useState('')
  const [ paymentID, setPaymentId ] = useState('')
  const steps = [
    "start",
    "center",
    "end"
  ]
  console.log(paymentID,'datre')
  const displayStep = (step) => {
    switch(step) {
      case 1:
        return <StepChoose />
      case 2:
        return <StepPayment />
      case 3:
        return <StepSuccess />
      default:
    }
  }

  const handleClick = (direction ) => {
    let newStep = currentStep;
    if(direction === undefined){
      cancelIncompletePyment(paymentID).then((res) => {
        toast.error('failed to complete the Payment')
      })
    }
    direction === 'next' ? newStep++:newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep)
  }
  return (
<div className='h-full md:h-screen px-4 sm:px-6 lg:px-8 py-12 md:py-24 lg:w-2/3 xl:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white'>
  <div className='container horizontal mt-5'>
    <Stepper 
      steps={steps}
      currentStep={currentStep}
    />
    <div className='my-10 p-4 sm:p-6 lg:p-10'> 
      <stepperContex.Provider value={{
        data,
        setData,
        paymentID,
        setPaymentId,
        handleClick
      }}>
        {displayStep(currentStep)}
      </stepperContex.Provider>
    </div>
  </div>
  <StepperControl 
    handleClick={handleClick}
    currentStep={currentStep}
    steps={steps}
  />
  <Toaster />
</div>
  )
}

export default AdsBooster;