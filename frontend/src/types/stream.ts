export interface Stream {
  _id: string;
  name: string;
  ingressId?: string;
  serverUrl?: string;
  streamKey?: string;
  thumbnailUrl?: string;
  isLive: boolean;
  userId: string | CustomUser;
  eventId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  usedOBS: boolean;
}

interface CustomUser {
  _id: string;
  username: string;
  email: string;
  imageUrl?: string;
  bio?: string;
}
