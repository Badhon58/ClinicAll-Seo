// "use client";
import useUser from "@/hooks/UseUser";
import { OngoingCall, Participants, PeerData, SocketUser } from "@/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { compressString, generateRandomString } from "@/lib/healper";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import { useRouter } from "next/navigation";
import useCookieUser from "@/hooks/CookieUser";

interface iSocketContext {
  socketRef: any;
  onlineUsers: SocketUser[] | null;
  ongoingCall: OngoingCall | null;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  peer: PeerData | null;
  // peerConnection: RTCPeerConnection | null;
  isCallEnded: boolean;
  isRinging: boolean;
  isAnswered: boolean;
  isRejected: boolean;
  isEnded: boolean;
  isCallActive: boolean;
  isCaller: boolean;
  userVideoRef: any;
  remoteVideoRef: any;
  incomingCall: any;
  timeoutRef: any;
  availableDrInfo: any;
  setAvailableDrInfo: (doctor: any) => void;
  // handleCall: (user: SocketUser) => void;
  // handleJoinCall: (OngoingCall: OngoingCall) => void;
  // handleHangup: (data: {
  //   ongoingCall?: OngoingCall;
  //   isEmitHangup?: boolean;
  // }) => void;
  handleSocketLogin: (user_id: string) => void;
  handleSocketLogout: (user_id: string) => void;
  makeCall: (receiver_id: string, receiver_fcm_token?: string) => void;
  answerCall: (ongoingCall: OngoingCall) => void;
  micOn: boolean;
  setMic: React.Dispatch<React.SetStateAction<boolean>>;
  cameraOn: boolean;
  setCamera: React.Dispatch<React.SetStateAction<boolean>>;
  // localMicrophoneTrack: any;
  // localCameraTrack: any;
  makeAgoraCall: (
    receiverId: string,
    historyId: string,
    receiverFcmToken?: string
  ) => void;
  makeMicroAgoraCall: (
    callerId: string,
    callerName: string,
    callerImage: string,
    phone: string,
    receiverId: string,
    historyId: string,
    isVideo: boolean,
    receiverFcmToken?: string
  ) => void;
  answerAgoraCall: (ongoingCall: OngoingCall) => void;
  endCall: () => void;
  rejectCall: () => void;
  cancellCall: () => void;
  setIsCallEnded: (vlue: boolean) => void;
  addToQueue: (userId: any) => void;
  removeFromQueue: (userId: any) => void;
}

export const SocketContext = createContext<iSocketContext | null>(null);

export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // console.log("Page reload");
  const { user } = useUser();
  const { cookieUser } = useCookieUser();
  const socketRef = useRef<any>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<SocketUser[] | null>(null);
  const [ongoingCall, setOngoingCall] = useState<OngoingCall | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [peer, setPeer] = useState<PeerData | null>(null);
  const [peerConnection, setPeerConnection] =
    useState<RTCPeerConnection | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const [iceCandidates, setIceCandidates] = useState<any[]>([]);
  const [isCallEnded, setIsCallEnded] = useState(false);
  const [incomingCall, setIncomingCall] = useState<any>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isRinging, setIsRinging] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [isEnded, setIsEned] = useState(false);
  const [isCaller, setIsCaller] = useState(true);
  const [availableDrInfo, setAvailableDrInfo] = useState(null);
  // const [agoraChannel, setAgoraChannel] = useState(true);
  const [isCallActive, setIsCallActive] = useState(false);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const userVideoRef = useRef<HTMLVideoElement | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isCallRunning = useRef(false);

  const [micOn, setMic] = useState(true);
  const [cameraOn, setCamera] = useState(true);

  // const localMicrophoneTrack = useLocalMicrophoneTrack(micOn);
  // const localCameraTrack = useLocalCameraTrack(cameraOn);

  // const [micTrack, setMicTrack] = useState<any>(null);
  // const [cameraTrack, setCameraTrack] = useState<any>(null);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setMicTrack(localMicrophoneTrack);
  //     setCameraTrack(localCameraTrack);
  //   }
  // }, []);

  // const [localMicrophoneTrack, setLocalMicrophoneTrack] = useState<any>(null);
  // const [localCameraTrack, setLocalCameraTrack] = useState<any>(null);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  //     setLocalMicrophoneTrack(localMicrophoneTrack);
  //     const { localCameraTrack } = useLocalCameraTrack(cameraOn);
  //     setLocalCameraTrack(localCameraTrack);
  //   }
  // }, []);

  // const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  // const { localCameraTrack } = useLocalCameraTrack(cameraOn);

  const router = useRouter();

  // const currentSocketUser = onlineUsers?.find(
  //   (onlineUser) => onlineUser.userId === user?._id
  // );

  //Get Media Stream
  const getMediaStream = useCallback(
    async (faceMode?: string) => {
      if (localStream) {
        return localStream;
      }

      try {
        const device = await navigator.mediaDevices.enumerateDevices();
        // const device = await navigator.mediaDevices.getUserMedia()
        const videoDevices = device.filter(
          (device) => device.kind === "videoinput"
        );

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: {
            width: { min: 640, ideal: 1280, max: 1920 },
            height: { min: 360, ideal: 720, max: 1080 },
            frameRate: { min: 16, ideal: 30, max: 30 },
            facingMode: videoDevices.length > 0 ? faceMode : undefined,
          },
        });
        setLocalStream(stream);
        if (userVideoRef.current) {
          userVideoRef.current.srcObject = stream;
        }
        return stream;
      } catch (error) {
        console.log("Failed to get stream", error);
        setLocalStream(null);
        return null;
      }
    },
    [localStream]
  );

  //   Handle call
  // const handleCall = useCallback(
  //   async (user: SocketUser) => {
  //     setIsCallEnded(false);
  //     if (!currentSocketUser || !socket) return;

  //     const stream = await getMediaStream();

  //     if (!stream) {
  //       console.log("No stream in handle call");
  //       return;
  //     }

  //     const participants = { caller: currentSocketUser, receiver: user };
  //     // setOngoingCall({
  //     //   participants,
  //     //   isRinging: false,
  //     // });
  //     socket.emit("call", participants);
  //   },
  //   [socket, currentSocketUser, ongoingCall]
  // );

  //   On Incomming call
  // const onIncommingCall = useCallback(
  //   (participants: Participants) => {
  //     setOngoingCall({
  //       participants,
  //       isRinging: true,
  //     });
  //   },
  //   [socket, user, ongoingCall]
  // );

  // Handle Hangup
  // const handleHangup = useCallback(
  //   (data: { ongoingCall?: OngoingCall | null; isEmitHangup?: boolean }) => {
  //     console.log("DData", data);
  //     if (socket && user && data.ongoingCall && data.isEmitHangup) {
  //       socket.emit("hangup", {
  //         ongoingCall: data.ongoingCall,
  //         userHangingupId: user._id,
  //       });
  //     }
  //     setOngoingCall(null);
  //     setPeer(null);
  //     if (localStream) {
  //       localStream.getTracks().forEach((track) => track.stop());
  //       setLocalStream(null);
  //     }
  //     setIsCallEnded(true);
  //   },
  //   [socket, user, localStream]
  // );

  // Create Peer
  const createPeerConnection = (stream: MediaStream) => {
    const rtcConnection = new RTCPeerConnection({
      iceServers: [
        // {
        //   urls: [
        //     "stun:stun1.l.google.com:19302",
        //     "stun:stun2.l.google.com:19302",
        //   ],
        // },
        {
          urls: "turn:relay1.expressturn.com:3478",
          username: "efHMFLMBSOAD5QKJUU",
          credential: "rMT63pF8mkTaobPM",
        },
      ],
      iceTransportPolicy: "relay",
    });

    stream.getTracks().forEach((track) => {
      rtcConnection.addTrack(track, stream);
    });

    rtcConnection.ontrack = (event: RTCTrackEvent) => {
      if (event.streams.length > 0 && remoteVideoRef.current) {
        setRemoteStream(event.streams[0]);
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };
    setPeerConnection(rtcConnection);
    return rtcConnection;
  };

  // Complete Peer Connection
  // const completePeerConnection = useCallback(
  //   async (connectionData: {
  //     sdp: SignalData;
  //     ongoingCall: OngoingCall;
  //     isCaller: boolean;
  //   }) => {
  //     if (!localStream) {
  //       console.log("Missing the localStream");
  //       return;
  //     }
  //     if (peer) {
  //       peer.peerConnection?.signal(connectionData.sdp);
  //       return;
  //     }

  //     const newPeer = createPeer(localStream, true);

  //     // setPeer({
  //     //   peerConnection: newPeer,
  //     //   participantUser: connectionData.ongoingCall.participants.receiver,
  //     //   stream: undefined,
  //     // });

  //     newPeer.on("signal", async (data: SignalData) => {
  //       console.log("Data in Complete Peer", data);
  //       if (socket) {
  //         // emmit offer
  //         socket.emit("webrtcSignal", {
  //           sdp: data,
  //           ongoingCall,
  //           isCaller: true,
  //         });
  //       }
  //     });
  //   },
  //   [localStream, createPeer, peer, ongoingCall]
  // );

  // Receive Call
  // const handleJoinCall = useCallback(
  //   async (ongoingCall: OngoingCall) => {
  //     // console.log("running Call", runningCall);
  //     setIsCallEnded(false);
  //     setOngoingCall((prev) => {
  //       if (prev) {
  //         return { ...prev, isRinging: false };
  //       }
  //       return prev;
  //     });
  //     const stream = await getMediaStream();
  //     if (!stream) {
  //       console.log("Could not get stream in handleJoinCall");
  //       return;
  //     }

  //     const newPeer = createPeer(stream, true);
  //     // setPeer({
  //     //   peerConnection: newPeer,
  //     //   participantUser: ongoingCall.participants.caller,
  //     //   stream: undefined,
  //     // });

  //     newPeer.on("signal", async (data: SignalData) => {
  //       console.log("Data in join call", data);
  //       if (socket) {
  //         socket.emit("webrtcSignal", {
  //           sdp: data,
  //           ongoingCall: ongoingCall,
  //           isCaller: false,
  //         });
  //       }
  //     });
  //   },
  //   [socket, currentSocketUser]
  // );

  // Add user when login
  const handleSocketLogin = (user_id: string) => {
    // console.log("UseR: ", user_id);
    if (socket) {
      socket.emit("userLogin", user_id);
    }
  };

  // Remove user when login
  const handleSocketLogout = (user_id: string) => {
    // console.log("UseR: ", user_id);
    if (socket) {
      socket.emit("userLogout", user_id);
    }
  };

  // Make new call
  // const makeCall = async (receiver_id: string) => {
  //   // console.log("Make call method");
  //   const rtcConnection = await initWebRTC();
  //   if (rtcConnection) {
  //     const offer = await rtcConnection.createOffer();
  //     await rtcConnection?.setLocalDescription(offer);

  //     console.log("Before create ice");
  //     // Set Ice-Candidates on creation
  //     rtcConnection.onicecandidate = (event) => {
  //       console.log("Candidates", event.candidate);
  //       if (event.candidate) {
  //         setIceCandidates((prevCandidates) => {
  //           return [...prevCandidates, event.candidate];
  //         });
  //       }
  //     };

  //     peerConnectionRef.current = rtcConnection;
  //     // setPeerConnection(rtcConnection);

  //     const participants: Participants = {
  //       caller: user._id,
  //       receiver: receiver_id,
  //       callerName: user.name,
  //       callerImage: user.image,
  //     };
  //     setOngoingCall({
  //       participants,
  //       id: "djhfskhdfsh",
  //       isRinging: false,
  //     });

  //     if (!localStream) {
  //       console.log("Missing the localStream");
  //       return;
  //     }

  //     socketRef.current.emit("make-call", {
  //       callerId: user._id,
  //       receiverId: receiver_id,
  //       offer: offer,
  //       callerName: user.name,
  //       callerImage: user.image,
  //       isVideo: 1,
  //     });
  //   }
  // };

  const makeCall = useCallback(
    async (receiver_id: string, receiver_fcm_token?: string) => {
      console.log("Socket", socketRef.current);
      const stream = await getMediaStream();
      if (!stream) return;

      // const rtcConnection = await initWebRTC();

      const rtcConnection = createPeerConnection(stream);
      if (rtcConnection) {
        const offer = await rtcConnection.createOffer();
        await rtcConnection?.setLocalDescription(offer);

        rtcConnection.onicecandidate = (event) => {
          if (event.candidate) {
            setIceCandidates((prevCandidates) => [
              ...prevCandidates,
              event.candidate,
            ]);
          }
        };
        console.log("When call", rtcConnection);
        peerConnectionRef.current = rtcConnection;

        const participants: Participants = {
          caller: user._id,
          receiver: receiver_id,
          callerName: user.name,
          callerImage: user.image,
        };
        setOngoingCall({
          participants,
          id: "djhfskhdfsh",
          agoraChannel: "werwr",
          isVideoCall: 1,
          isRinging: false,
          callReached: false,
        });
        // console.log("USER", user, offer);
        socketRef.current.emit("make-call", {
          callerId: user._id,
          receiverId: receiver_id,
          offer: offer,
          pushOffer: compressString(offer.sdp),
          callerName: user.name,
          callerImage: user.image,
          token: receiver_fcm_token,
          id: "sdjkfskljdf",
          isVideo: 1,
        });
      }
    },
    [localStream, user]
  );

  const makeAgoraCall = (
    receiverId: string,
    historyId: string,
    receiverFcmToken?: string
  ) => {
    const channel = generateRandomString(10);
    const participants: Participants = {
      caller: user._id,
      receiver: receiverId,
      callerName: user.name,
      callerImage: user.image,
    };
    setOngoingCall({
      participants,
      id: historyId,
      agoraChannel: channel,
      isVideoCall: 1,
      isRinging: false,
      callReached: false,
    });
    socketRef.current.emit("make-call", {
      callerId: user._id,
      receiverId: receiverId,
      offer: {},
      pushOffer: compressString({}),
      agoraChannel: channel,
      phone: "01710000000",
      callerName: user.name,
      callerImage: user.image,
      token: receiverFcmToken,
      id: historyId,
      isVideo: 1,
    });

    router.push(`/consultation?channel=${channel}`);
  };

  const makeMicroAgoraCall = async (
    callerId: string,
    callerName: string,
    callerImage: string,
    phone: string,
    receiverId: string,
    historyId: string,
    isVideo: boolean,
    receiverFcmToken?: string
  ) => {
    const channel = generateRandomString(10);
    const participants: Participants = {
      caller: callerId,
      receiver: receiverId,
      callerName: callerName,
      callerImage: callerImage,
      callerPhone: phone,
    };
    // setAvailableDrInfo(data);
    setOngoingCall({
      participants,
      id: historyId,
      agoraChannel: channel,
      isVideoCall: isVideo ? 1 : 0,
      isRinging: false,
      callReached: false,
    });
    socketRef.current.emit("make-call", {
      callerId: callerId,
      receiverId: receiverId,
      offer: {},
      pushOffer: compressString({}),
      agoraChannel: channel,
      dialCode: "880",
      phone: phone,
      callerName: callerName,
      callerImage: callerImage,
      token: receiverFcmToken || "",
      id: historyId,
      isVideo: isVideo ? 1 : 0,
    });

    return channel;
  };

  // Answer the call
  // const answerCall = async (ongoingCall: OngoingCall) => {
  //   setIsCallEnded(false);
  //   setOngoingCall((prev) => {
  //     if (prev) {
  //       return { ...prev, isRinging: false };
  //     }
  //     return prev;
  //   });
  //   const rtcConnection = await initWebRTC();
  //   if (rtcConnection) {
  //     await rtcConnection.setRemoteDescription(incomingCall?.offer);
  //     const answer = await rtcConnection.createAnswer();
  //     await rtcConnection.setLocalDescription(answer);
  //     // setPeerConnection(rtcConnection);
  //     peerConnectionRef.current = rtcConnection;
  //     socketRef.current.emit("answer-call", {
  //       callerId: ongoingCall.participants.caller,
  //       id: incomingCall.id,
  //       sdpAnswer: answer,
  //     });
  //   }
  // };

  const answerCall = async (ongoingCall: OngoingCall) => {
    console.log("Ongoing call before call receive", ongoingCall);
    setIsCallEnded(false);
    setOngoingCall((prev) => {
      if (prev) {
        console.log("return with isRinging False");
        return { ...prev, isRinging: false };
      }
      console.log("return with isRinging True");
      return prev;
    });

    const stream = await getMediaStream();
    if (!stream) return;

    const rtcConnection = createPeerConnection(stream);

    if (rtcConnection) {
      await rtcConnection?.setRemoteDescription(incomingCall?.offer);
      const answer = await rtcConnection.createAnswer();
      await rtcConnection?.setLocalDescription(answer);
      peerConnectionRef.current = rtcConnection;
      socketRef.current.emit("answer-call", {
        callerId: ongoingCall.participants.caller,
        id: incomingCall.id,
        sdpAnswer: answer,
      });
    }
    isCallRunning.current = true;
    console.log("Ongoing call after call receive", ongoingCall);
  };

  const answerAgoraCall = (ongoingCall: OngoingCall) => {
    // console.log("Ongoing Call", ongoingCall);
    setIsCallEnded(false);
    setOngoingCall((prev) => {
      if (prev) {
        // console.log("return with isRinging False");
        return { ...prev, isRinging: false };
      }
      // console.log("return with isRinging True");
      return prev;
    });
    setMic(true);
    ongoingCall.isVideoCall ? setCamera(true) : setCamera(false);
    // setCamera(true);
    isCallRunning.current = true;
    router.push(`/consultation?channel=${ongoingCall.agoraChannel}`);
  };

  // Close call utility
  const closeCall = () => {
    console.log("Call closing...");
    const userRole = localStorage.getItem("role");
    const userID = localStorage.getItem("userID");
    if (userRole != undefined && userRole == "inhouse_doctor") {
      apiCall(Methods.PATCH, EndPoint.DOCTOR_UPDATE_BY_ID + "/" + userID, {
        isAvailable: true,
      })
        .then((resp: any) => {
          console.log(resp);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
    // if (peerConnectionRef.current) {
    //   peerConnectionRef.current?.close();
    // }
    setPeerConnection(null);
    setIsCallActive(false);
    setRemoteStream(null);
    setOngoingCall(null);
    setIsCallEnded(true);
    // if (localStream) {
    //   localStream.getTracks().forEach((track) => track.stop());
    //   setLocalStream(null);
    // }
    isCallRunning.current = false;

    setMic(false);
    setCamera(false);
  };

  // End the call
  const endCall = () => {
    console.log("Call ended9999");
    socketRef.current.emit("end-call", {
      callerId: ongoingCall?.participants.caller,
      id: ongoingCall?.id,
      receiverId: ongoingCall?.participants.receiver,
    });
    closeCall();
    // console.log("Is User", user.isUser);
    // if (user.isUser) {
    //   window.location.href = "/account/prevappointment";
    // } else {
    //   window.location.href = "/doctoraccount/myappointment";
    // }
  };

  // Reject the call
  const rejectCall = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current?.close();
    }
    setPeerConnection(null);
    setIsCallActive(false);
    setRemoteStream(null);
    // console.log("RRRRRRR", ongoingCall);
    socketRef.current.emit("reject-call", {
      callerId: ongoingCall?.participants.caller,
      id: ongoingCall?.id,
      receiverId: ongoingCall?.participants.receiver,
    });
    closeCall();
    setOngoingCall(null);
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    }
    setIsCallEnded(true);
    console.log("Is User", user.isUser);
    // return;
    if (user.isUser) {
      // redirect("/account/prevappointment");
      window.location.href = "/account/prevappointment";
    } else {
      // redirect("/doctoraccount/myappointment");
      window.location.href = "/doctoraccount/myappointment";
    }
  };

  // Reject the call
  const cancellCall = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current?.close();
    }
    setPeerConnection(null);
    setIsCallActive(false);
    setRemoteStream(null);
    socketRef.current.emit("cancell-call", {
      callerId: ongoingCall?.participants.caller,
      id: ongoingCall?.id,
      receiverId: ongoingCall?.participants.receiver,
    });
    closeCall();
    setOngoingCall(null);
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    }
    setIsCallEnded(true);
    console.log("Is User", user.isUser);

    // if (user.isUser) {
    //   window.location.href = "/account/prevappointment";
    // } else {
    //   window.location.href = "/doctoraccount/myappointment";
    // }
  };

  const addToQueue = (userId: any) => {
    socketRef.current.emit("add-to-queue", {
      userId,
    });
  };

  const removeFromQueue = (userId: any) => {
    socketRef.current.emit("remove-from-queue", {
      userId,
    });
  };

  useEffect(() => {
    console.log("Ongoing call-1", ongoingCall);
    socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL);
    // socketRef.current = io("ws://103.191.178.151:5006");
  }, []);

  useEffect(() => {
    // console.log("WWWWWWW", cookieUser);
    if (user && user._id && socketRef.current) {
      socketRef.current.emit("register", user._id);
    } else {
      socketRef.current.emit("register", cookieUser._id);
    }
  }, [user]);

  useEffect(() => {
    // console.log("Use effect calll when answer");

    socketRef.current.on("call-answered", async (data: any) => {
      console.log("Answered222222");
      setIsAnswered(true);
      // if (!peerConnectionRef.current) return;
      // if (peerConnectionRef.current.signalingState !== "stable") {
      //   peerConnectionRef.current?.setRemoteDescription(data.sdpAnswer);
      //   if (iceCandidates.length > 0) {
      //     iceCandidates.forEach((candidate) => {
      //       socketRef.current.emit("ice-candidate", {
      //         receiverId: ongoingCall?.participants.receiver,
      //         iceCandidate: candidate,
      //       });
      //     });
      //   }
      // }
    });

    socketRef.current.on("new-call", async (data: any) => {
      if (isCallRunning.current) {
        socketRef.current.emit("waiting-call", {
          callerId: data?.callerId,
          id: data?.id,
        });
        return;
      } else {
        console.log("Inside else", data.callerOrganization);
        setIsCaller(false);
        setIsCallActive(true);
        setIncomingCall(data);

        setOngoingCall({
          participants: {
            caller: data.callerId,
            receiver: data.receiverId,
            callerName: data.callerName,
            callerImage: data.callerImage,
            callerOrganization: data.callerOrganization,
            callerPhone: data.dialCode + data.phone,
          },
          id: data.id,
          agoraChannel: data.agoraChannel,
          isVideoCall: data.isVideo,
          isRinging: true,
          callReached: true,
        });

        socketRef.current.emit("ringing-call", {
          callerId: data?.callerId,
          id: data?.id,
        });
      }

      // initWebRTC(false, data);
    });

    socketRef.current.on("call-ringing", async (data: any) => {
      setIsRinging(true);
      apiCall(Methods.PATCH, EndPoint.CALL_HISTORY_UPDATE + "/" + data.id, {
        callReached: true,
      })
        .then((resp: any) => {
          console.log("history update resp", resp);
        })
        .catch((error: any) => {
          console.log("History create error", error);
        });
    });

    socketRef.current.on("ice-candidate", async (data: any) => {
      // console.log("Data in icecandidaTE", data);
      // console.log("PEER CONNECTION", peerConnection);
      // if (peerConnection) {
      //   await peerConnection?.addIceCandidate(data.iceCandidate);
      // }
      // console.log("Peer conn222", peerConnectionRef.current);
      peerConnectionRef.current?.addIceCandidate(data.iceCandidate);
    });

    socketRef.current.on("call-cancelled", async (data: any) => {
      apiCall(Methods.PATCH, EndPoint.CALL_HISTORY_UPDATE + "/" + data.id, {
        callCancelled: true,
      })
        .then((resp: any) => {
          console.log("history reject update resp", resp);
          closeCall();
        })
        .catch((error: any) => {
          console.log("History create error", error);
        });

      // if (user.isUser) {
      //   window.location.href = "/account/prevappointment";
      // } else {
      //   window.location.href = "/doctoraccount/myappointment";
      // }
    });

    socketRef.current.on("call-ended", async (data: any) => {
      setIsEned(true);

      apiCall(Methods.PATCH, EndPoint.CALL_HISTORY_UPDATE + "/" + data.id, {
        duration: 30,
      })
        .then((resp: any) => {
          console.log("history reject update resp", resp);
          closeCall();
        })
        .catch((error: any) => {
          console.log("History create error", error);
        });

      // if (user.isUser) {
      //   window.location.href = "/account/prevappointment";
      // } else {
      //   window.location.href = "/doctoraccount/myappointment";
      // }
    });

    socketRef.current.on("available-doctor", async (data: any) => {
      console.log("Available triggeredddddddSSSS", data);
      setAvailableDrInfo(data.doctor);
    });

    socketRef.current.on("call-rejected", async (data: any) => {
      setIsRejected(true);
      console.log("Reject Data", data);
      closeCall();
      apiCall(Methods.PATCH, EndPoint.CALL_HISTORY_UPDATE + "/" + data.id, {
        callRejected: true,
      })
        .then((resp: any) => {
          console.log("history reject update resp", resp);
        })
        .catch((error: any) => {
          console.log("History create error", error);
        });

      // if (user.isUser) {
      //   window.location.href = "/account/prevappointment";
      // } else {
      //   window.location.href = "/doctoraccount/myappointment";
      // }
    });

    // return () => {
    //   socketRef.current.disconnect();
    // };
  }, [iceCandidates, peerConnectionRef.current, ongoingCall]);

  // useEffect(() => {
  //   if (socket === null) return;

  //   if (socket.connected) {
  //     console.log("SOCKET CONNECTED");
  //     onConnect();
  //   }

  //   function onConnect() {
  //     setSocketConnected(true);
  //   }
  //   function onDisconnect() {
  //     setSocketConnected(false);
  //   }

  //   socket.on("connect", onConnect);
  //   socket.on("disconnect", onDisconnect);

  //   return () => {
  //     socket.off("connect", onConnect);
  //     socket.off("disconnect", onDisconnect);
  //   };
  // }, [socket]);

  // useEffect(() => {
  //   if (!socket || !socketConnected) return;
  //   socket.emit("addNewUser", user);
  //   socket.on("getUsers", (res) => {
  //     setOnlineUsers(res);
  //   });

  //   return () => {
  //     socket.off("getUsers", (res) => {
  //       setOnlineUsers(res);
  //     });
  //   };
  // }, [socket, socketConnected, user]);

  //   Calls
  // useEffect(() => {
  //   if (!socket || !socketConnected) return;
  //   socket.on("incommingCall", onIncommingCall);
  //   socket.on("webrtcSignal", completePeerConnection);
  //   socket.on("hangup", handleHangup);
  //   return () => {
  //     socket.off("incommingCall", onIncommingCall);
  //     socket.off("webrtcSignal", completePeerConnection);
  //     socket.off("hangup", handleHangup);
  //   };
  // }, [socket, socketConnected, user, onIncommingCall, completePeerConnection]);

  // Call end timeout
  useEffect(() => {
    if (isCallEnded) {
      timeoutRef.current = setTimeout(() => {
        setIsCallEnded(false);
      }, 2000);
    }

    // return () => clearTimeout(timeoutRef);
  }, [isCallEnded]);

  // console.log("Local Stream 2", localStream);

  return (
    <SocketContext.Provider
      value={{
        socketRef,
        onlineUsers,
        ongoingCall,
        localStream,
        remoteStream,
        peer,
        // peerConnection,
        isCallEnded,
        isRinging,
        isAnswered,
        isRejected,
        isEnded,
        isCallActive,
        isCaller,
        userVideoRef,
        remoteVideoRef,
        incomingCall,
        timeoutRef,
        availableDrInfo,
        setAvailableDrInfo,
        // handleCall,
        // handleJoinCall,
        // handleHangup,
        handleSocketLogin,
        handleSocketLogout,
        makeCall,
        answerCall,
        micOn,
        setMic,
        cameraOn,
        setCamera,
        // localMicrophoneTrack,
        // localCameraTrack,
        makeAgoraCall,
        makeMicroAgoraCall,
        answerAgoraCall,
        endCall,
        rejectCall,
        cancellCall,
        setIsCallEnded,
        addToQueue,
        removeFromQueue,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);

  if (context === null) {
    throw new Error("useSocket must be used  within  a SocketContextProvider");
  }
  return context;
};
