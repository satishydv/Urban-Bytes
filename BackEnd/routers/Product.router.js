import {
  SendAllProduct,
  CreateNewProduct,
  DeleteProduct,
  UpdatePrductStatus,
  UploadeImage,
  sendSingleProduct,
  UpdateWholeProduct
} from "../controllers/Product.controller.js";
import IsAdminAuthMD from "../middlewares/IsAdminAuth.js";

function productRotues(fastify, options) {
  fastify.get("/all", SendAllProduct);
  fastify.post("/upload-image", {
    preHandler: IsAdminAuthMD,
  }, UploadeImage);
  fastify.post(
    "/create",
    {
      preHandler: IsAdminAuthMD,
    },
    CreateNewProduct,
  );
  fastify.post(
    "/update-status",
    { preHandler: IsAdminAuthMD },
    UpdatePrductStatus,
  );
  fastify.post("/:id", { preHandler: IsAdminAuthMD }, DeleteProduct);
  fastify.get("/single/:id", { preHandler: IsAdminAuthMD }, sendSingleProduct);
  fastify.post("/update/:id", { preHandler: IsAdminAuthMD }, UpdateWholeProduct)
};

export default productRotues;
