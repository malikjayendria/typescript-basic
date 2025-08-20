import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret"; // fallback untuk development

// Generate token
export function generateToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }); // 1 jam
}

// Verify token
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as object; // cast ke object untuk TS
  } catch (err) {
    console.error("JWT verify error:", err);
    return null;
  }
}
