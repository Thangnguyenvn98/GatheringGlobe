import { Stream } from "./stream";

export interface User {
  _id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  stream?: Stream;
  imageUrl?: string;
  bio?: string;
}
