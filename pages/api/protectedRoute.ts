import { NextApiRequest, NextApiResponse } from "next";
import auth from "../../utils/auth";

const protectedRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  // このコードはユーザーが認証済みの場合のみ実行される
  res.status(200).json({ message: "Welcome to the protected route!" });
};

export default auth(protectedRoute);
