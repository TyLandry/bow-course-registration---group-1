import jsonwebtoken from 'jsonwebtoken';
import { json } from 'stream/consumers';

export default function requireAuth(req, res, next) {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    req.user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
}