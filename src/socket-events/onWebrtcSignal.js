import { io } from "../../server.js";

const onWebrtcSignal = async (data) => {
  console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
  if (data.ongoingCall) {
    if (data.isCaller) {
      if (data.ongoingCall.participants.receiver.socketId) {
        io.to(data.ongoingCall.participants.receiver.socketId).emit(
          "webrtcSignal",
          data
        );
      }
    } else {
      if (data.ongoingCall.participants.caller.socketId) {
        io.to(data.ongoingCall.participants.caller.socketId).emit(
          "webrtcSignal",
          data
        );
      }
    }
  } else {
    return;
  }
};

export default onWebrtcSignal;
