import { CreateDirectMessage, sendAllDMs } from "../controllers/DirectMessage.controller.js"
import IsAdminAuthMD from "../middlewares/IsAdminAuth.js"
const routes = (fastify, options) => {
    fastify.post("/create", CreateDirectMessage);
    fastify.get("/all", { preHandler: IsAdminAuthMD }, sendAllDMs)
}

export default routes;