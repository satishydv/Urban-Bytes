import { LoginUser, SignUpUser, UserByToken, LogOut,VerifyEmail } from "../controllers/User.controller.js";
import { UploadeImage } from "../controllers/Product.controller.js";


async function routes(fastify, options) {
  fastify.post("/signup", SignUpUser);
  fastify.post("/login", LoginUser);
  fastify.get("/bytoken", UserByToken);
  fastify.get("/logout", LogOut);
  fastify.post("/upload-image", UploadeImage);
  fastify.get("/verify-email",VerifyEmail)
}

//ESM
export default routes;
