import { ObjectId } from "mongodb";

export interface Comment {
  _id?: ObjectId;
  postId: ObjectId;
  userId: string;
  content: string;
  createdAt: Date;
}
