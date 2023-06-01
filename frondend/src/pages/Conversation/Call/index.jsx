/* eslint-disable */
import React, { useRef,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";
import { generateZegoToken } from '../../../api/api'
import { socket } from "../../../utils/socket";
import { ResetAudioCallQueue } from '../../../redux/actions/audioCall'

function callDialog({ open, handleClose }) {
  const dispatch = useDispatch();
  const {authData } = useSelector((state) => state.userLogin) 
  const [call_details] = useSelector((state) => state.call.call_queue);
  const {incoming} = useSelector((state) => state.call);
  const audioStreamRef = useRef(null);
  const appID = 271562548 * 1
  const server = "wss://webliveroom271562548-api.coolzcloud.com/ws"
  const roomID = call_details?.roomID;
  const userID = call_details?.userID;
  const userName = call_details?.userName;
  const zg = new ZegoExpressEngine(appID, server);
  const streamID = call_details?.streamID;

  const handleDisconnect = (event, reason) => {
    if (reason && reason === "backdropClick") {
      return;
    } else {
      dispatch(ResetAudioCallQueue());

      // clean up event listners
      socket?.off("audio_call_accepted");
      socket?.off("audio_call_denied");
      socket?.off("audio_call_missed");

      // stop publishing local audio stream to remote users, call the stopPublishingStream method with the corresponding stream ID passed to the streamID parameter.
      zg.stopPublishingStream(streamID);
      // stop playing a remote audio
      zg.stopPlayingStream(userID);
      // destroy stream 
      zg.destroyStream(audioStreamRef.current);
      // log out of the room
      zg.logoutRoom(roomID);

      // handle Call Disconnection => this will be handled as cleanup when this dialog unmounts

      // at the end call handleClose Dialog
      handleClose();
    }
  };

  useEffect(() => {
  //   // TODO => emit audio_call event

  //   // create a job to decline call automatically after 30 sec if not picked

    const timer = setTimeout(() => {
      // TODO => You can play an audio indicating missed call at this line at sender's end

      socket.emit(
        "audio_call_not_picked",
        { to: streamID, from: userID },
        () => {
          // TODO abort call => Call verdict will be marked as Missed
        }
      );
    }, 30 * 1000);

    socket?.on("audio_call_missed", () => {
      // TODO => You can play an audio indicating call is missed at receiver's end
      // Abort call
      handleDisconnect();
    });

    socket.on("audio_call_accepted", () => {
      // TODO => You can play an audio indicating call is started
      // clear timeout for "audio_call_not_picked"
      clearTimeout(timer);
    });

    if (!incoming) {
      socket.emit("start_audio_call", {
        to: streamID,
        from: userID,
        roomID,
      });
    }

    socket.on("audio_call_denied", () => {
      // TODO => You can play an audio indicating call is denined
      // ABORT CALL
      handleDisconnect();
    });

  //   // make a POST API call to server & fetch token

    let this_token;

    async function fetchToken() {
      // You can await here
      const response = await generateZegoToken({userID:userID,roomID:roomID})
      console.log(response, "TOKEN RESPONSE");
      this_token = response.data.token;
      // ...
    }
    fetchToken();

  //   // Step 2 => Check browser compatibility

    zg.checkSystemRequirements()
      .then((result) => {
  //       // The [result] indicates whether it is compatible. It indicates WebRTC is supported when the [webRTC] is [true]. For more results, see the API documents.

  //       // {
  //       //   webRTC: true,
  //       //   customCapture: true,
  //       //   camera: true,
  //       //   microphone: true,
  //       //   videoCodec: { H264: true, H265: false, VP8: true, VP9: true },
  //       //   screenSharing: true,
  //       //   errInfo: {}
  //       // }
        console.log(result);

        const { webRTC, microphone } = result;

        if (webRTC && microphone) {
          zg.loginRoom(
            roomID,
            this_token,
            { userID, userName },
            { userUpdate: true }
          )
            .then(async (result) => {
              console.log(result);

              // After calling the CreateStream method, you need to wait for the ZEGOCLOUD server to return the local stream object before any further operation.
             const localStream = await zg.createStream({
                camera: { audio: true, video: false },
              });

              audioStreamRef.current = localStream;

              // Get the audio tag.
              const localAudio = document.getElementById("local-audio");
              // The local stream is a MediaStream object. You can render audio by assigning the local stream to the srcObject property of video or audio.
              localAudio.srcObject = localStream;

              // localStream is the MediaStream object created by calling creatStream in the previous step.
              zg.startPublishingStream(streamID, localStream);

              zg.on("publisherStateUpdate", (result) => {
                // Callback for updates on stream publishing status.
                // ...
                console.log(result);
                // * we can use this info to show connection status
              });

              zg.on("publishQualityUpdate", (streamID, stats) => {
                // Callback for reporting stream publishing quality.
                // ...
                // console.log(streamID, stats);
                // * we can use this info to show local audio stream quality
              });
            })
            .catch((error) => {
              console.log(error);
            });

          // Callback for updates on the current user's room connection status.
          zg.on("roomStateUpdate", (roomID, state, errorCode, extendedData) => {
            if (state === "DISCONNECTED") {
              // Disconnected from the room
              // * Can be used to show disconnected status for a user (especially useful in a group call)
            }

            if (state === "CONNECTING") {
              // Connecting to the room
              // * Can be used to show connecting status for a user (especially useful in a group call)
            }

            if (state === "CONNECTED") {
              // Connected to the room
              // * Can be used to show connected status for a user (especially useful in a group call)
            }
          });

          // Callback for updates on the status of ther users in the room.
          zg.on("roomUserUpdate", async (roomID, updateType, userList) => {
            console.warn(
              `roomUserUpdate: room ${roomID}, user ${
                updateType === "ADD" ? "added" : "left"
              } `,
              JSON.stringify(userList)
            );
            if (updateType !== "ADD") {
            
              handleDisconnect();
            } else {
              // const current_users = JSON.stringify(userList);
              // * We can use current_users_list to build dynamic UI in a group call
              const remoteStream = await zg.startPlayingStream(userID);

              // Get the audio tag.
              const remoteAudio = document.getElementById("remote-audio");
              // The local stream is a MediaStream object. You can render audio by assigning the local stream to the srcObject property of video or audio.

              remoteAudio.srcObject = remoteStream;
              remoteAudio.play();
            }
          });

          // Callback for updates on the status of the streams in the room.
          zg.on(
            "roomStreamUpdate",
            async (roomID, updateType, streamList, extendedData) => {
              if (updateType === "ADD") {
                // New stream added, start playing the stream.
                console.log(
                  "ADD",
                  roomID,
                  updateType,
                  streamList,
                  extendedData
                );

                // * It would be quite useful to create and play multiple audio streams in a group call
              } else if (updateType === "DELETE") {
                // Stream deleted, stop playing the stream.
                console.log(
                  "DELETE",
                  roomID,
                  updateType,
                  streamList,
                  extendedData
                );

                // * Can be used to drop audio streams (more useful in a group call)
              }
            }
          );

          zg.on("playerStateUpdate", (result) => {
            // Callback for updates on stream playing status.
            // ...
            // * Can be used to display realtime status of a remote audio stream (Connecting, connected & Disconnected)
          });

          zg.on("playQualityUpdate", (streamID, stats) => {
            // Callback for reporting stream playing quality.
            // * Can be used to display realtime quality of a remote audio stream
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center ${open ? "" : "hidden"
          }`}
      >
        <div className="bg-white rounded-lg w-96">
          <div className="p-4 flex space-x-24">
            <div className="space-y-2">
              {/* <div
                className="bg-gray-300 rounded-full h-24 w-24 bg-no-repeat bg-cover"
                style={{
                  backgroundImage: `url(https://${S3_BUCKET_NAME}.s3.${AWS_S3_REGION}.amazonaws.com/${call_details?.from_user?.avatar})`,
                }}
              ></div> */}
              {/* <audio id="local-audio" controls={false} className="w-full" /> */}
            </div>
            <div className="space-y-2">
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
              onClick={handleDisconnect}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              End Call
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default callDialog;