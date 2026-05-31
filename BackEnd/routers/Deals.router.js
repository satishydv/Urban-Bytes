import { createDeal, sendAllDeals, updateDealStatus, deleteDeal, updateWholeDeal, sendSingleDeal } from "../controllers/Deals.controller.js";
import IsAdminAuthMD from "../middlewares/IsAdminAuth.js"
async function routes(fastify, option) {
    fastify.get("/all", sendAllDeals);
    fastify.get("/single/:id", { preHandler: IsAdminAuthMD }, sendSingleDeal);
    fastify.post("/create", { preHandler: IsAdminAuthMD }, createDeal);
    fastify.post("/update-status/:id", { preHandler: IsAdminAuthMD }, updateDealStatus);
    fastify.get("/delete/:id", { preHandler: IsAdminAuthMD }, deleteDeal);
    fastify.post("/update/:id", { preHandler: IsAdminAuthMD }, updateWholeDeal);

}

export default routes;