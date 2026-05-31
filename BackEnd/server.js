import fastify from "fastify";
import dotenv from "dotenv";
import compression from "compression";
import multipart from "@fastify/multipart";
import { createServer } from "node:http"

import connectToDB from "./configs/ConnectDB.js";
import userRoute from "./routers/User.router.js";
import productRoute from "./routers/Product.router.js";
import dealRoute from "./routers/Deals.router.js"
import orderRoute from "./routers/Order.router.js"
import customerRouter from "./routers/Customer.router.js"
import DmRoutes from "./routers/DirectMessage.router.js"
import sseRoutes from "./routers/Sse.routes.js";


// middlewares
dotenv.config();
connectToDB();

const app = fastify();






const PORT = process.env.PORT || 5000;

app.register(compression());
app.register(multipart, {
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

app.register(import("@fastify/cors"), {
  origin: "*", // exact frontend origin
  credentials: true,
});

app.register(import('@fastify/formbody'))

await app.register(import('@fastify/rate-limit'), {
  max: 100,
  timeWindow: '1 minute'
})

// Home Route for checking API is working...
app.get("/", () => {
  return {
    success: true,
    message: "Punjab Pizza APIs Working Well",
  };
});

// User Auth Routes
app.register(userRoute, { prefix: "/api/auth" });

// Product Routes
app.register(productRoute, { prefix: "/api/products" });

// Deals Routes
app.register(dealRoute, { prefix: "/api/deals" });

// Orders Routes
app.register(orderRoute, { prefix: "/api/orders" });

// Customers Routes
app.register(customerRouter, { prefix: "/api/customers" });

// SSE Routes
app.register(sseRoutes, { prefix: "/api/sse" });

// Direct Messages 
app.register(DmRoutes, { prefix: "/api/dm" })

app.listen({ port: PORT, host: "0.0.0.0" }, function (err, address) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening on ${address}`);
});

