/* eslint-disable */
import { useRef, useState,useEffect } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { useSelector } from 'react-redux';
import axios from '../../Axios/axios';
import Star from '../../components/Star';
import user from '../../assets/images/user.png'
import toast ,{Toaster} from 'react-hot-toast';

function Review({ id, reviews }) {
  const LoggedInUser = useSelector((state) => state.userLogin)
  const userInfo = LoggedInUser.authData
  const reviewMsgRef = useRef();
  const [rating, setRating] = useState(null);
  const [err, setErr] = useState(null);
  const [reloadReviews, setReloadReviews] = useState(false);
  const handleSubmit = async e => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
    try {
      const reviewObj = {
        userId: userInfo._id,
        username: userInfo.username,
        productId: id,
        reviewText,
        rating,
      }
      const {data} = await axios.post(`/review/${id}`, reviewObj)
      if(data.success){
        toast.success('Reported SuccessFully')
        setReloadReviews(true);
      }else{
        toast.error('You Already Reported')
      }
      console.log(res)

    } catch (err) {
      toast.error('You Already Reported')
      setErr(err.response.data)
    }
  }
  useEffect(() => {
    if (reloadReviews) {
      // load the reviews again here
      setReloadReviews(false); // set the state to false to prevent infinite loop
    }
  }, [reloadReviews]);

  return (
    <div className='mt-4 rounded-lg p-8 border border-gray-300'>
    <h4 className='mb-12'>Reviews ({reviews?.length})</h4>
    {err && <h3 className='text-red-500'>{err.message}</h3>}
    <form onSubmit={handleSubmit}>
      <div className='flex align-items-center gap-4 mb-4 cursor-pointer'>
        <AiFillStar className='text-yellow-500 cursor-pointer' onClick={() => setRating(1)} />
        <AiFillStar className='text-yellow-500 cursor-pointer' onClick={() => setRating(2)} />
        <AiFillStar className='text-yellow-500 cursor-pointer' onClick={() => setRating(3)} />
        <AiFillStar className='text-yellow-500 cursor-pointer' onClick={() => setRating(4)} />
        <AiFillStar className='text-yellow-500 cursor-pointer' onClick={() => setRating(5)} />
      </div>
      <div className='flex items-center justify-between w-full p-2 rounded-2xl border border-yellow-100'>
        <input className='w-full py-2 border-0 focus:outline-none' type='text' ref={reviewMsgRef} placeholder='Share your thoughts' required />
        <button className='bg-blue-800 text-white w-full max-w-xs rounded-lg' type='submit'>Submit</button>
      </div>
    </form>
    {/* review map  */}
    <div className='flex flex-col py-5'>
      {reviews?.map((review, index) => (
        <div key={index} className='flex flex-row items-center mt-5'>
          <img src={user} className='w-20 h-20 rounded-full mr-4' alt='User profile' />
          <div className='text-lg'>
            <p className='font-bold'>{review.username}</p>
            <p className='text-gray-600'>{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <Star stars={review.rating} />
            <p className='text-gray-700'>{review.reviewText}</p>
          </div>
        </div>
      ))}
    </div>
    <Toaster />
  </div>
  )
}

export default Review;
