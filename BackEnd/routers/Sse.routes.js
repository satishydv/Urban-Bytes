import ProtectAuth from "../middlewares/ProtectAuth.js";
import { sseConnect } from "../controllers/Sse.controller.js";
async function routes(fastify, option) {
    fastify.get("/", { preHandler: ProtectAuth }, sseConnect);
}

export default routes;