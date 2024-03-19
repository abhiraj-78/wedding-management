// import { request, response } from "express";
// import { JwtHeader } from "jsonwebtoken"; 
// export const verifyToken = async (request, response, next) => {
//    try {
//       let token = request.headers.authorization;
//       token = token.split(" ")[1];
//       JwtHeader.verify(token, "xyzabcInfoWM");
//       next();
//    } catch (err) {
//       return response.status(401).json({ error: "Unautorized Access..." });
//    }
// }