import { connectToDatabase } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { Post } from "../../models/post";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const db = await connectToDatabase();
    const collection = db.collection("posts");
    const documents = await collection.find({}).toArray();

    const posts: Post[] = [];

    for (const doc of documents) {
      // docがPost型と互換性があるかチェック
      if ("title" in doc && "content" in doc) {
        posts.push(doc as Post);
      } else {
        console.error("Incompatible document:", doc);
      }
    }

    res.status(200).json({ posts });
  } else {
    res.status(405).json({ message: "We only support GET" });
  }
};
