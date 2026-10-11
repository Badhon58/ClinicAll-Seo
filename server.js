import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import onCall from "./src/socket-events/onCall.js";
import onWebrtcSignal from "./src/socket-events/onWebrtcSignal.js";
import onHangup from "./src/socket-events/onHangup.js";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

export let io;

app.prepare().then(() => {
  const httpServer = createServer(handler);

  io = new Server(httpServer);
  let onlineUsers = [];

  io.on("connection", (socket) => {
    socket.on("addNewUser", (loggedInUser) => {
      // console.log("Add New User Called", loggedInUser);
      if (
        loggedInUser &&
        loggedInUser._id != null &&
        !onlineUsers.some((user) => user.userId === loggedInUser._id)
      ) {
        onlineUsers.push({
          userId: loggedInUser._id,
          socketId: socket.id,
        });
      }

      io.emit("getUsers", onlineUsers);
    });

    socket.on("disconnect", () => {
      console.log("Disconnect");
      onlineUsers = onlineUsers.filter((user) => user.socketId != socket.id);
      io.emit("getUsers", onlineUsers);
    });

    socket.on("userLogin", (user_id) => {
      console.log("User login  in server");
      if (!onlineUsers.some((u) => u._id === user_id)) {
        onlineUsers.push({
          userId: user_id,
          socketId: socket.id,
        });
      }
      io.emit("getUsers", onlineUsers); // Send updated users list to all clients
    });

    socket.on("userLogout", (user_id) => {
      onlineUsers = onlineUsers.filter((u) => u.userId !== user_id);
      // console.log("Online users", onlineUsers);
      io.emit("getUsers", onlineUsers);
    });

    // Call events

    socket.on("call", onCall);
    socket.on("webrtcSignal", onWebrtcSignal);
    socket.on("hangup", onHangup);
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
