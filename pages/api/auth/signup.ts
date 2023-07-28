import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "../../../utils/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // === は厳密等価演算子と言って、==に比べると型まで含めて比較してくれる
  if (req.method === "POST") {
    const db = await connectToDatabase();
    const { email, password } = req.body;

    const user = await db.collection("users").findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection("users").insertOne({
      email,
      password: hashedPassword,
    });

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign({ email, id: result.insertedId }, jwtSecret, {
      expiresIn: "1h",
    });

    return res.status(201).json({ token });
  }

  return res.status(405).json({ message: "Method not allowed" });
};
