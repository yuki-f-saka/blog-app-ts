import { connectToDatabase } from "@/utils/db";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { postId } = req.query;
    const db = await connectToDatabase();
    const collection = db.collection("comments");

    const comments = await collection
      .find({ postId: new ObjectId(postId as string) })
      .toArray();
    res.status(200).json({ comments });
  } else {
    res.status(405).json({ message: "We only support GET" });
  }
};
