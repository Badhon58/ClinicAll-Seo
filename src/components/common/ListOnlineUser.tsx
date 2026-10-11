// import { useSocket } from "@/context/SocketContext";
// import useUser from "@/hooks/UseUser";
// import React from "react";

// const ListOnlineUser = () => {
//   const { user } = useUser();
//   const { onlineUsers, handleCall } = useSocket();
//   console.log("online users", onlineUsers);
//   return (
//     <div>
//       {onlineUsers &&
//         onlineUsers.map((onlineUser, index) => {
//           if (onlineUser.userId == null) return null;
//           if (onlineUser.userId === user._id) return null;
//           return (
//             <div
//               key={index}
//               onClick={() => handleCall(onlineUser)}
//               className="p-4 shadow-md rounded cursor-pointer"
//             >
//               <div>{onlineUser.userId}</div>
//             </div>
//           );
//         })}
//     </div>
//   );
// };

// export default ListOnlineUser;
