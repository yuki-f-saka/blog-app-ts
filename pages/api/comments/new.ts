import { connectToDatabase } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { ClientComment } from "../../models/clientComment";
import { Comment } from "../../models/comment";
import { ObjectId } from "mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const clientComment: ClientComment = req.body;
    const newComment: Comment = {
      ...clientComment,
      postId: new ObjectId(clientComment.postId),
      createdAt: new Date(),
    };
    const db = await connectToDatabase();
    const collection = db.collection("comments");
    await collection.insertOne(newComment);
    res.status(200).json({ comment: newComment });
  } else {
    res.status(405).json({ message: "We only support POST" });
  }
};
