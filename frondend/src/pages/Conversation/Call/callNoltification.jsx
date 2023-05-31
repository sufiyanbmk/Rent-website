/* eslint-disable */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../../utils/socket";
import {
  ResetAudioCallQueue,
  UpdateAudioCallDialog,
} from "../../../redux/actions/audioCall";
import image from '../../../assets/images/profileAvator.jpg';


function CallNotification({ open, handleClose }) {
  const dispatch = useDispatch();
  const { authData } = useSelector((state) => state.userLogin);
  const [call_details] = useSelector((state) => state.call.call_queue);

  const handleAccept = () => {
    socket.emit("audio_call_accepted", { ...call_details });
    dispatch(UpdateAudioCallDialog({ state: true }));
  };

  const handleDeny = () => {
    //
    socket.emit("audio_call_denied", { ...call_details });
    dispatch(ResetAudioCallQueue());
    handleClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center ${
          open ? "" : "hidden"
        }`}
      >
        <div className="bg-white rounded-lg w-96">
          <div className="p-4 flex space-x-24">
            <div className="space-y-2">
              <div className="avatar">
                <div className="w-24 rounded-xl">
                  <img src={image} />
                </div>
              </div>
              {/* <div
              className="bg-gray-300 rounded-full h-24 w-24 bg-no-repeat bg-cover"
              style={{
                backgroundImage: `url(https://${S3_BUCKET_NAME}.s3.${AWS_S3_REGION}.amazonaws.com/${call_details?.from_user?.avatar})`,
              }}
            ></div> */}
              {/* <audio id="local-audio" controls={false} className="w-full" /> */}
            </div>
            <div className="space-y-2">
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <img src={image} />
                </div>
              </div>
              {/* <div
              className="bg-gray-300 rounded-full h-24 w-24 bg-no-repeat bg-cover"
              style={{
                backgroundImage: `url(https://${S3_BUCKET_NAME}.s3.${AWS_S3_REGION}.amazonaws.com/${user?.avatar})`,
              }}
            ></div>
            <audio id="remote-audio" controls={false} className="w-full" /> */}
            </div>
          </div>
          <div className="p-4 flex justify-end">
            <button
              onClick={handleAccept}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Accept
            </button>
            <button
              onClick={handleDeny}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Deny
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CallNotification;
