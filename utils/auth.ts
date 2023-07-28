import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const auth =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    const cookiesAuth = req.cookies.auth;
    if (!cookiesAuth) {
      throw new Error("req.cookies.auth is not defined");
    }
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined");
    }

    jwt.verify(cookiesAuth, jwtSecret, async function (err: any, decoded: any) {
      if (!err && decoded) {
        return await fn(req, res);
      }

      res.status(401).json({ message: "Sorry you are not authenticated" });
    });
  };

export default auth;
