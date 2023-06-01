/* eslint-disable */
import { useContext, useState } from 'react'
import stepperContext from '../../context/stepperContext'
import { useParams } from 'react-router-dom';

export default function StepChoose() {
  const { data, setData } = useContext(stepperContext);
  const [selectedPlan, setSelectedPlan] = useState();
  const { id } = useParams()

  const handlePlanChange = (planId,price) => {
    setSelectedPlan(planId)
    setData({proID:id,plan:planId,price:price})
  };
  const plans = [
    {
      id: 1,
      name: 'Hobby',
      price: 5,
      description: '1 GB storage',
    },
    {
      id: 3,
      name: 'Basic',
      price: 10,
      description: '5 GB storage',
    },
    {
      id: 6,
      name: 'Pro',
      price: 20,
      description: '10 GB storage',
    },
    {
      id: 12,
      name: 'Enterprise',
      price: 50,
      description: 'Unlimited storage',
    },
  ];
  return (
    <div className='flex flex-col'>
      <div className="p-4 flex items-center justify-center bg-gray-100">
        <form className="w-full max-w-screen-md mx-auto">
          <fieldset className="space-y-6">
            <div className="flex items-center justify-between py-4 border-b border-gray-300">
              <legend className="text-2xl text-gray-700 mr-4">Change Plan</legend>
              <a href="#" className="font-medium text-gray-500 hover:text-gray-700">
                Cancel your plan
              </a>
            </div>
            <div className="grid sm:grid-cols-4 gap-6">
              {plans.map((plan) => (
                <label
                  key={plan.id}
                  htmlFor={`plan-${plan.id}`}
                  className="relative flex flex-col bg-white p-5 rounded-lg shadow-md cursor-pointer"
                >
                  {/* <span className="font-semibold text-gray-500 leading-tight uppercase mb-3">{plan.name}</span> */}
                  <span className="font-bold text-gray-900">
                    <span className="text-4xl">{plan.id}</span>
                    <span className="text-2xl uppercase">Month</span>
                  </span>
                  <span>
                    <span className="text-xl font-bold text-gray-500">$</span>
                    <span className="text-xl font-bold text-gray-900 ml-1">{plan.price}</span>
                  </span>
                  <input
                    type="radio"
                    name="plan"
                    id={`plan-${plan.id}`}
                    value={plan.id}
                    className="absolute h-0 w-0 appearance-none"
                    checked={selectedPlan === plan.id}
                    onChange={() => handlePlanChange(plan.id, plan.price)}
                  />
                  <span
                    aria-hidden="true"
                    className={`${selectedPlan === plan.id ? "block" : "hidden"
                      } absolute inset-0 border-2 border-green-500 bg-green-200 bg-opacity-10 rounded-lg`}
                  >
                    <span className="absolute top-4 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-green-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5 text-green-600"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </span>
                </label>
              ))}

            </div>
          </fieldset>
        </form>
      </div>
    </div>
  )
}
