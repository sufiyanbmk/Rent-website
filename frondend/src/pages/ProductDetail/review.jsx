/* eslint-disable */
import { useRef, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { useSelector } from 'react-redux';
import axios from '../../Axios/axios';
import Star from '../../components/Star';
import user from '../../assets/images/user.png'

function Review({ id, reviews }) {
  const LoggedInUser = useSelector((state) => state.userLogin)
  const userInfo = LoggedInUser.authData
  const reviewMsgRef = useRef();
  const [rating, setRating] = useState(null);
  const [err, setErr] = useState(null);
  const handleSubmit = async e => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
    try {
      const reviewObj = {
        userId: userInfo._id,
        username: userInfo.username,
        proId : id,
        reviewText,
        rating,
      }
      const res = await axios.post(`/review/${id}`, reviewObj)
      console.log(res)

    } catch (err) {
      setErr(err.response.data)
      console.log(err)
    }
  }
  return (
    <div className='mt-4 rounded-lg  p-8 border border-gray-300 '>
      <h4 className='mb-12'>Reviews( reviews)</h4>
      {err && <h3 className='text-red-500'>{err.message}</h3>}
      <form onSubmit={handleSubmit}>
        <div className='flex align-items-center gap-4 mb-4 cursor-pointer'>
          <span className='text-base flex items-center text-yellow-500' onClick={() => setRating(1)}>1</span><AiFillStar className='text-yellow-500 cursor-pointer mt-1' />
          <span className='text-base flex items-center text-yellow-500' onClick={() => setRating(2)}>2</span> <AiFillStar className='text-yellow-500 cursor-pointer mt-1'/>
          <span className='text-base flex items-center text-yellow-500' onClick={() => setRating(3)}>3</span> <AiFillStar className='text-yellow-500 cursor-pointer mt-1'/>
          <span className='text-base flex items-center text-yellow-500' onClick={() => setRating(4)}>4</span> <AiFillStar className='text-yellow-500 cursor-pointer mt-1'/>
          <span className='text-base flex items-center text-yellow-500' onClick={() => setRating(5)}>5</span> <AiFillStar className='text-yellow-500 cursor-pointer mt-1'/>
        </div>
        <div className='flex items-center justify-between w-full p-2 rounded-2xl border border-yellow-100'>
          <input className='w-full py-2 border-0 focus:outline-none' type='text' ref={reviewMsgRef} placeholder='share your thoughts' required />
          <button className='bg-blue-800 text-white w-full max-w-xs rounded-lg' type='submit '> submit</button>
        </div>
      </form>
      {/* review map  */}
      <div className="flex flex-col py-5">
        {reviews?.map((review) => (
          <div className="flex flex-row items-center mt-5">
            <img src={user} className="w-20 h-20 rounded-full mr-4" />
            <div className="text-lg">
              <p className="font-bold">{review.username}</p>
              <p className="text-gray-600">April 18, 2023</p>
              <Star stars={review.rating} />
              <p className="text-gray-700">{review.reviewText}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Review;
