import IsAdminAuthMD from "../middlewares/IsAdminAuth.js"
import { SendAllCustomers, SendRiders,UpdateUserRole,DeleteUser } from "../controllers/Customer.controller.js"



async function routes(fastify, option) {
    fastify.get("/all", { preHanlder: IsAdminAuthMD }, SendAllCustomers);
    fastify.get("/riders", { preHandler: IsAdminAuthMD }, SendRiders);
    fastify.post("/update-role/:id", { preHandler: IsAdminAuthMD }, UpdateUserRole);
    fastify.get("/delete/:id", { preHandler: IsAdminAuthMD }, DeleteUser);

}

export default routes;