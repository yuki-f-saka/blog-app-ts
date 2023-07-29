import { connectToDatabase } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { Post } from "../../models/post";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const db = await connectToDatabase();
    const collection = db.collection("posts");
    const newPost: Post = req.body;
    await collection.insertOne(newPost);
    res.status(200).json({ post: newPost });
  } else {
    res.status(405).json({ message: "We only support POST" });
  }
};
