import { io } from "../../server.js";

const onHangup = async (data) => {
  //   console.log("dData", data);
  let socketIdToEmitTo;

  if (data.ongoingCall.participants.caller.userId === data.userHangingupId) {
    socketIdToEmitTo = data.ongoingCall.participants.receiver.socketId;
  } else {
    socketIdToEmitTo = data.ongoingCall.participants.caller.socketId;
  }
  //   console.log("dEmitTo", socketIdToEmitTo);
  if (socketIdToEmitTo) {
    io.to(socketIdToEmitTo).emit("hangup", data);
  }
};

export default onHangup;
