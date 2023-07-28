import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "../../../utils/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const db = await connectToDatabase();
    const { email, password } = req.body;

    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPsswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPsswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign({ email, id: user._id }, jwtSecret, {
      expiresIn: "1h",
    });

    return res.status(200).json({ token });
  }

  return res.status(405).json({ message: "Method not allowed" });
};
