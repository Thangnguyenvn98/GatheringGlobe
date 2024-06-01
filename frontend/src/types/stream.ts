export interface Stream {
  _id: string;
  name: string;
  ingressId?: string;
  serverUrl?: string;
  streamKey?: string;
  thumbnailUrl?: string;
  isLive: boolean;
  userId: string;
  eventId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
