import Peer from "simple-peer";

export type SocketUser = {
  userId: string;
  socketId: string;
};

export type Participants = {
  caller: string;
  receiver: string;
  callerName?: string;
  callerImage?: string;
  callerPhone?: string;
  callerOrganization?: string;
  receiverName?: string;
  receiverImage?: string;
  receiverFcmToken?: string;
};

export type OngoingCall = {
  participants: Participants;
  id: string;
  agoraChannel: any;
  isVideoCall: number;
  isRinging: boolean;
  callReached: boolean;
};

export type PeerData = {
  peerConnection: Peer.Instance;
  stream: MediaStream | undefined;
  participantUser: SocketUser | undefined;
};
