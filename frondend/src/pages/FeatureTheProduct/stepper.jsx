/* eslint-disable */
import { useEffect ,useState, useRef } from 'react'

export default function Stepper({steps, currentStep}) {
  const [newStep, setNewStep ] = useState([])
  const stepRef = useRef()
  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps]
    let count = 0;
    while(count <newSteps.length){
      if(count === stepNumber){
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selcted:true,
          completed: true,
        };
        count++;
      }
      else if(count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selcted:true,
          completed: true,
        };
        count++;
      }
      else{
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selcted:false,
          completed: false,
        };
        count++;
      }
    }
    return newSteps;
  }
  useEffect(() => {
    const stepsState = steps.map((step,index) =>
      Object.assign({}, {
        description: step,
        completed: false,
        highlighted:index === 0 ? true: false,
        selcted: index === 0 ? true : false,
      })
    )
    stepRef.current = stepsState;
    const current = updateStep(currentStep -1, stepRef.current)
    setNewStep(current)
  }, [steps, currentStep])
  const displaySteps = newStep.map((step,index) => {
    return(
      <div key={index} className={index !== newStep.length - 1 ? 'w-full flex items-center' : 'flex items-center'}>
      <div className="relative flex flex-col items-center text-teal-600">
        <div
          className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3 ${
            step.selcted ? 'bg-green-600 text-white font-bold border border-green-600' : ''
          }`}
        >
          {step.completed ? (
            <span className="text-white font-bold text-xl">&#10003;</span>
          ) : (
            <span className="text-center font-bold">
              {index + 1}
            </span>
          )}
        </div>
        <div
          className={`absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase ${
            step?.highlighted ? 'text-gray-900' : 'text-gray-400'
          }`}
        >
          {step.description}
        </div>
      </div>
      <div
        className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
          step.completed ? 'border-green-600' : 'border-gray-300'
        }`}
      ></div>
    </div>
    )
  }
    
  )
  return (
    <div className='mx-4 flex justify-between items-center'>
      {displaySteps}
    </div>
  )
}
