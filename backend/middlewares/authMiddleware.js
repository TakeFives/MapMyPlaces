import { verifyJWT } from "../utils/jwt.js";

const auth = (req, res, next) => {
  console.log(`Any cookies coming?`);
  console.log(req.cookies);
  console.log(`Any header Auth coming?`);
  console.log(req.header);
  const bearer = req.header("authorization");
  const token = bearer?.split(" ").pop();

  if (!token) {
    return res.status(401).json({
      message: "Auth denied",
    });
  }

  try {
    const payload = verifyJWT(token, process.env.JWT_SECRET, {
      complete: false,
    });

    req.user = payload;

    next();
  } catch (error) {
    res.status(403).json({
      message: "Auth denied - invalid token",
    });
  }
};

export { auth };
