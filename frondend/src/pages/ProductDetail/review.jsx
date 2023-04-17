/* eslint-disable */
import {useRef,useState} from 'react'
import { AiFillStar } from 'react-icons/ai'

function Review() {
  const reviewMsgRef = useRef();
  const [ rating, setRating ] = useState(null);
  const handleSubmit = e => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
    alert(rating)
  }
  return (
    <div className='mt-4 rounded-lg  p-8 border border-gray-300 '>
        <h4 className='mb-12'>Reviews( reviews)</h4>
        <form onSubmit={ handleSubmit }>
          <div className='flex align-items-center gap-4 mb-4 cursor-pointer'>
          <span className='text-base flex items-center text-yellow-500' onClick={() => setRating(1)}>1</span><AiFillStar />
          <span className='text-base flex items-center' onClick={() => setRating(2)}>2</span> <AiFillStar />
          <span className='text-base flex items-center'>3</span> <AiFillStar />
          <span className='text-base flex items-center'>4</span> <AiFillStar />
          <span className='text-base flex items-center'>5</span> <AiFillStar />        
          </div>
          <div className='flex items-center justify-between w-full p-2 rounded-2xl border border-yellow-100'>
            <input className='w-full py-2 border-0 focus:outline-none' type='text' ref={reviewMsgRef} placeholder='share your thoughts' required/>
            <button className='bg-blue-400' type='submit'> submit</button>
          </div>
        </form>
        {/* review map  */}

    </div>
  )
}

export default Review;
