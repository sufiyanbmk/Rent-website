/* eslint-disable */
import { useRef, useState,useEffect } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { useSelector } from 'react-redux';
import { sendReview } from '../../api/api';
import axios from '../../Axios/axios';
import Star from '../../components/Star';
import user from '../../assets/images/user.png'
import toast ,{Toaster} from 'react-hot-toast';

function Review({ id, reviews }) {
  const LoggedInUser = useSelector((state) => state.userLogin)
  const userInfo = LoggedInUser.authData
  const reviewMsgRef = useRef();
  const [rating, setRating] = useState(0);
  const [err, setErr] = useState(null);
  const [reloadReviews, setReloadReviews] = useState(false);
  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
    try {
      const reviewObj = {
        userId: userInfo.id,
        username: userInfo.userName,
        productId: id,
        reviewText,
        rating,
      }
      const {data} = await sendReview(reviewObj)
      console.log(data)
      if(data.status === "success"){
        toast.success('Reported SuccessFully')
        setReloadReviews(true);
      }else{
        toast.error('You Already Reviewed')
      }
    } catch (err) {
      toast.error('Error occured,try again')
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
      {[1, 2, 3, 4, 5].map((index) => (
            <AiFillStar
              key={index}
              className={`text-yellow-500 cursor-pointer ${index <= rating ? 'bg-yellow-200' : ''}`}
              onClick={() => handleStarClick(index)}
            />
            ))}
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
  </div>
  )
}

export default Review;
