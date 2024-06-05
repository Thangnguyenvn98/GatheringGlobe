// src/utils/livekit/livekit.ts

import {
  AccessToken,
  IngressAudioEncodingPreset,
  IngressClient,
  IngressInput,
  IngressVideoEncodingPreset,
  RoomServiceClient,
  type CreateIngressOptions,
} from "livekit-server-sdk";

import { TrackSource } from "livekit-server-sdk/dist/proto/livekit_models";
import Stream from "../../models/stream";

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!);

export async function createStreamerToken(hostIdentity: string, name: string) {
  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    {
      identity: hostIdentity,
      name: name,
    }
  );

  token.addGrant({
    room: hostIdentity as string,
    roomJoin: true,
    canPublish: true,
    canPublishData: true,
  });

  return await Promise.resolve(token.toJwt());
}

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export async function createIngress(
  userId: string,
  ingressType: IngressInput,
  username: string
) {
  await resetIngresses(userId);
  const options: CreateIngressOptions = {
    name: username,
    roomName: userId,
    participantName: username,
    participantIdentity: userId,
  };

  if (ingressType === IngressInput.WHIP_INPUT) {
    // https://docs.livekit.io/egress-ingress/ingress/overview/#bypass-transcoding-for-whip-sessions
    options.bypassTranscoding = true;
  } else {
    options.video = {
      source: TrackSource.CAMERA,
      preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
    };
    options.audio = {
      source: TrackSource.MICROPHONE,
      preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
    };
  }

  const ingress = await ingressClient.createIngress(ingressType, options);
  if (!ingress || !ingress.url || !ingress.streamKey) {
    throw new Error("Failed to create ingress");
  }
  await Stream.findOneAndUpdate(
    { userId },
    {
      serverUrl: ingress.url,
      streamKey: ingress.streamKey,
      ingressId: ingress.ingressId,
    }
  );

  return ingress;
}

export const resetIngresses = async (hostIdentity: string) => {
  const ingresses = await ingressClient.listIngress({
    roomName: hostIdentity,
  });

  const rooms = await roomService.listRooms([hostIdentity]);

  for (const room of rooms) {
    await roomService.deleteRoom(room.name);
  }

  for (const ingress of ingresses) {
    if (ingress.ingressId) {
      await ingressClient.deleteIngress(ingress.ingressId);
    }
  }
};
