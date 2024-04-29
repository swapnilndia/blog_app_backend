import jwt from "jsonwebtoken";

export const isTokenExpired = (expiryTime) => {
  const currentTime = Math.ceil(new Date().getTime() / 1000);
  console.log(currentTime);
  console.log(expiryTime);
  if (currentTime > expiryTime) {
    return true;
  } else {
    return false;
  }
};

export const generateAccessToken = (email, userId, userRole) => {
  const acces_token_secret = process.env.ACCESS_TOKEN_SECRET_KEY;
  const access_Token = jwt.sign(
    {
      email,
      userId,
      userRole,
    },
    acces_token_secret,
    {
      expiresIn: 60 * 60,
    }
  );
  return access_Token;
};

export const generateRefreshToken = (email, userId, userRole) => {
  const refresh_token_secret = process.env.REFRESH_TOKEN_SECRET_KEY;
  const refresh_token = jwt.sign(
    {
      email,
      userId,
      userRole,
    },
    refresh_token_secret,
    {
      expiresIn: 60 * 60 * 24,
    }
  );
  return refresh_token;
};
