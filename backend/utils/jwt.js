import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const createTokens = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
  };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });

  return { accessToken, refreshToken };
};

export const verifyJWT = (token, JWT_SECRET, opts) => {
  return jwt.verify(token, JWT_SECRET, opts);
};

export const convertExpiryToMilliseconds = (expiry) => {
  const timeUnitMap = {
    s: 1000, // seconds to milliseconds
    m: 60 * 1000, // minutes to milliseconds
    h: 60 * 60 * 1000, // hours to milliseconds
    d: 24 * 60 * 60 * 1000, // days to milliseconds
    w: 7 * 24 * 60 * 60 * 1000, // weeks to milliseconds
  };

  const match = expiry.match(/^(\d+)([smhdw])$/);
  if (!match) {
    throw new Error(`Invalid expiry format: ${expiry}`);
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  return value * timeUnitMap[unit];
};

export const setTokenCookies = (res, { accessToken, refreshToken }) => {
    const accessTokenExpiresMS = convertExpiryToMilliseconds(
      process.env.JWT_EXPIRES_IN,
    );
    const refreshTokenRefreshExpiresMS = convertExpiryToMilliseconds(
      process.env.JWT_REFRESH_EXPIRES_IN,
    );
  
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: accessTokenExpiresMS,
    });
  
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/login/refresh", 
      maxAge: refreshTokenRefreshExpiresMS,
    });
  };
  
  export const refresh = async (req, res) => {
    try {
      const token = req.cookies.refreshToken;
  
      if (!token) {
        return res.status(401).json({ message: "No refresh token provided" });
      }
  
      const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  
      const user = await User.findById(decoded.id);
  
      if (!user || user.refreshToken !== token) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }
  
      const tokens = createTokens(user);
  
      user.refreshToken = tokens.refreshToken;
      await user.save();
  
      setTokenCookies(res, tokens);
  
      res.status(200).json({
        accessToken: tokens.accessToken,
      });
    } catch (error) {
      console.error(error);
      return res.status(403).json({ message: "Failed to refresh token" });
    }
  };