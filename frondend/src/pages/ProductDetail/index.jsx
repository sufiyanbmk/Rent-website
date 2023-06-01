/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useFetchAxios from "../../hooks/useFetchAxios";
import MultipleImage from "./multipleImg";
import Review from "./review";
import calcultateRating from "../../utils/avgRating";
import Star from "../../components/Star";
import Report from "./reportModal";
import { socket, connectSocket } from "../../utils/socket";
import { useDispatch, useSelector } from "react-redux";
import ChatWithSocket from "./chatWithSocket";
import {
  UpdateDirectConversation,
  AddDirectConversation,
  SelectConversation,
  AddDirectMessage,
} from "../../redux/actions/conversation";
import toast, { Toaster } from "react-hot-toast";
import Skeleton from "./skeleton";

function productDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, isLoading, error, refetch } = useFetchAxios(
    `/products/product-detail/${id}`
  );
  const product = data;
  const [isShowMessage, setIsShowMessage] = useState(false);
  const { authData } = useSelector((state) => state.userLogin);
  const { conversations, current_conversation } = useSelector(
    (state) => state.conversation?.direct_chat
  );

  function removeSocketEventListeners() {
    socket?.off("start_chat");
    socket?.off("new_message");
  }
  useEffect(() => {
    console.log(socket, "sokee");
    if (!socket) {
      connectSocket(authData.token);
      console.log(
        socket,
        "sdsdfssfddsfdsdfdsfssdfdffdfddsfssdfsfsdfdsfssfdfsfs"
      );
    }
    socket?.on("new_message", (data) => {
      const message = data.message;
      // console.log(message, 'hllmessagsdfsdfe');
      // check if msg we got is from currently selected conversation
      // console.log(current_conversation,data.message.conversation_id,'check')
      if (current_conversation?.id === data.message.conversation_id) {
        dispatch(
          AddDirectMessage({
            id: message._id,
            type: "msg",
            subtype: message.type,
            message: message.text,
            incoming: message.to === authData._id,
            outgoing: message.from === authData._id,
          })
        );
      }
    });
    socket?.on("start_chat", (data) => {
      console.log(conversations, "data._id");
      // console.log(data,'start chat');
      // add / update to conversation list
      const existing_conversation = conversations.find(
        (el) => el?.id === data._id
      );
      console.log(existing_conversation, "existing");
      if (existing_conversation) {
        dispatch(
          UpdateDirectConversation({
            conversation: data,
            user_id: authData._id,
          })
        );
        // update direct conversation
        // console.log(data,'data,int he staert')
      } else {
        // add direct conversation
        dispatch(
          AddDirectConversation({ conversation: data, user_id: authData._id })
        );
      }
      dispatch(SelectConversation({ room_id: data._id }));
    });

    return () => {
      removeSocketEventListeners();
    };
  }, [socket, current_conversation]);

  const review = product?.reviews;
  let avgRating = "";
  if (review) {
    avgRating = calcultateRating(review);
  }
  const handleChat = () => {
    if (isShowMessage) {
      setIsShowMessage(false);
    } else {
      setIsShowMessage(true);
      if (!authData) {
        toast.error("Please Login");
        return;
      }
    }
    socket?.emit("start_conversation", {
      to: product?.user._id,
      from: authData.id,
    });
  };
  if (isLoading) {
    return (
      <div className="container mx-auto min-h-[800px]">
        <Skeleton /> {/* Render your skeleton loader component */}
      </div>
    );
  }
  return (
    <section className="px-4 mt-10 py-10 lg:px-16 lg:py-28">
      <div className="container mx-auto min-h-[800px] mb-14">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-4 lg:mb-0">
            <h2 className="text-2xl font-semibold text-center lg:text-left text-gray-900 mb-4 uppercase">
              {product?.productName}
            </h2>
            {review ? <Star stars={avgRating} reviews={review.length} /> : ""}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row item-start md:px-48 gap-8 lg:flex">
          <div className="w-3/5 py-6">
            {product?.link ? <MultipleImage imagesUrl={product?.link} /> : ""}
            <div className="mt-6 text-gray-700 text-lg">
              Catagory: {product?.catagory}
            </div>

            <div className="mt-6 text-gray-700 text-lg">
              Address: {product?.address},{product?.city},{product?.state}
            </div>
            <div className="mt-6 text-gray-700 text-lg">
              Description: {product?.description}
            </div>
            <div className="flex gap-3">
              {/* {product?.documents.map((doc) => (
                <div key={doc.id} className="bg-white p-4 rounded-lg shadow">
                  <p className="text-gray-500">{doc.text}</p>
                </div>
              ))} */}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="card md:w-96 bg-gray-400 text-primary-content">
              <div className="card-body">
                <h2 className="card-title text-black">Price:${product?.price}/Day</h2>
              </div>
            </div>
          {authData.id !== product.userId ? (
            <div className="flex-1 bg-white-100 mt-6 lg:mb-0 border h-3/4  border-gray-300 dark:bg-gray-600 rounded-lg px-6 py-8">
              <div className="flex flex-col lg:flex-row items-center gap-x-4 mb-8">
                <div className="w-20 h-20 p-1 border border-gray-300 rounded-full">
                  <img
                    className="object-cover w-full h-full rounded-full"
                    src={product?.user?.image}
                    alt="user picture"
                  />
                </div>
                <div className="text-center lg:text-left">
                  <div className="font-bold text-lg text-white uppercase">
                    {product?.user?.userName}
                  </div>
                  <Link to="" className="text-violet-500 text-sm">
                    View Profile
                  </Link>
                </div>
              </div>
              {/* form  */}
              {/* <form className='flex flex-col gap-y-4'>
              <input className='border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm' type='text' placeholder='Name' />
              <input className='border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm' type='text' placeholder='Email' />
              <input className='border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm' type='text' placeholder='Phone' />
              <textarea className='border border-gray-300 focus:border-violet-300 outline-none resize-none rounded w-full p-4 h-36 text-sm text-gray-400' placeholder='Message' defaultValue='HEllo I am Interested ' /> */}
              {isShowMessage ? <ChatWithSocket /> : ""}

              {/* {isShowMessage ? ( */}

              <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-x-2">
                <button
                  onClick={handleChat}
                  className="bg-blue-700 hover:bg-blue-900 rounded text-white p-4 text-sm w-full lg:w-auto transition"
                >
                  {isShowMessage ? "Back" : "Send Message"}
                </button>
                <button className="bg-black text-white hover:border-violet-500 hover:text-violet-500 rounded p-4 text-sm w-full lg:w-auto transition">
                  Call
                </button>
              </div>

              {/* </form> */}
            </div>
          ) : (
            ""
          )}
          </div>
        </div>
        <div>
          <Report id={id} />
        </div>
        <Review id={id} reviews={product?.reviews} refetch={refetch} />
      </div>
      <Toaster />
    </section>
  );
}

export default productDetail;
