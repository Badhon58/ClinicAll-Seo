import { io } from "../../server.js";

const onCall = async (participants) => {
  if (participants.receiver.socketId) {
    io.to(participants.receiver.socketId).emit("incommingCall", participants);
  }
};

export default onCall;
