import jwt from "jsonwebtoken";
export const currentUser = (req, res, next) => {
  const authenticationHeaders =
    req.headers.authorization || req.headers.Authorization;
  if (!authenticationHeaders) next();
  else {
    try {
      const token = authenticationHeaders.split(" ")[1];
      const payload = jwt.verify(token, "secret_key");
      req.currentUser = payload;
    } catch (error) {
      throw new BadRequestError("invalid token");
    }
    next();
  }
};