import cloudinary from "../configs/Cloudinary.js";
import ProductModel from "../models/Product.models.js";
import fs from "fs";
import { pipeline } from "stream/promises";

const cachedData = {};
let cacheTime = null;
const CACHE_DURATION = 60 * 60 * 24 * 1000;

const SendAllProduct = async (req, res) => {
  try {
    if (cachedData.products && Date.now() - cacheTime < CACHE_DURATION) {
      return res.send({
        success: true,
        message: "Find From Cache",
        data: cachedData.products,
      });
    }
    const ProductData = await ProductModel.find().sort({ createdAt: -1 });
    if (!ProductData.length) {
      return res.send({
        success: false,
        message: "error in fetching data",
      });
    }
    cachedData.products = ProductData;
    cacheTime = Date.now();
    return res.send({
      success: true,
      message: "Find From DB",
      data: ProductData,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: "Something Wents Wrong..",
    });
  }
};

const CreateNewProduct = async (req, res) => {
  const { name, desc, category, prices, stockStatus, url, ImageId } = req.body;
  console.log(name, desc, category, prices, stockStatus, url, ImageId);
  if (
    !name ||
    !desc ||
    !category ||
    !prices ||
    !stockStatus ||
    !url ||
    !ImageId
  ) {
    return res.send({
      success: false,
      message: "Please provide all fields",
    });
  }

  const newProduct = await ProductModel.create({
    name,
    desc,
    category,
    prices,
    url,
    ImageId,
    stockStatus,
  });
  if (!newProduct) {
    return res.send({
      success: false,
      message: "Error in creating product",
    });
  }
  cachedData.products = {};
  cacheTime = null;
  return res.send({
    success: true,
    message: "Created Successfully",
  });

  try {
    return res.send({
      success: true,
      message: "Created Successfully",
      data: {
        name,
        desc,
        category,
      },
    });
  } catch (error) {
    return res.send({
      success: false,
      message: "Something worng on server",
    });
  }
};

const DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.send({
        success: false,
        message: "Please provide id",
      });
    }
    const delPro = await ProductModel.findOneAndDelete({ _id: id });
    if (!delPro) {
      return res.send({
        success: false,
        message: "Error While Deleting..",
      });
    }
    cachedData.products = {};
    cacheTime = null;
    return res.send({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

const UpdatePrductStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    console.log(id, status);
    if (!id || !status) {
      return res.send({
        success: false,
        message: "Please provide all fields",
      });
    }
    const Update = await ProductModel.findOneAndUpdate(
      { _id: id },
      {
        stockStatus: status,
      },
      {
        new: true,
      },
    );
    if (!Update) {
      return res.send({
        success: false,
        message: "Error While Updating",
      });
    }

    cachedData.products = {};
    cacheTime = null;
    return res.send({
      success: true,
      message: "Successfully Updated",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

const sendSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.send({
        success: false,
        message: "Please provide Id",
      });
    }
    const product = await ProductModel.findOne({ _id: id });
    if (!product) {
      return res.send({
        success: false,
        message: "Product not found",
      });
    }
    return res.send({
      success: true,
      message: "Product Founded..",
      data: product,
    });
  } catch (error) {
    return res.send({
      success: false,
      massage: error.message,
    });
  }
};

const UploadeImage = async (req, res) => {
  try {
    const data = await req.file();
    if (!data) {
      return res.status(400).send({ error: "No file provided" });
    }
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "PPCLUpload",
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );
      data.file.pipe(uploadStream);
      data.file.on("error", reject);
      uploadStream.on("error", reject);
    });
    return res.send({
      success: true,
      url: result.secure_url,
      ImageId: result.public_id,
      message: "Image Uploaded Successfully",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

const UpdateWholeProduct = async (req, res) => {
  try {
    const { name, desc, category, prices, stockStatus, url } =
      req.body;
    console.log(req.body)
    const { id } = req.params;
    if (!id) {
      return res.send({
        success: false,
        message: "Please provide id",
      });
    }
    if (
      !name ||
      !desc ||
      !category ||
      !prices ||
      !stockStatus ||
      !url
    ) {
      return res.send({
        success: false,
        message: "Please provide all fields",
      });
    }

    const product = await ProductModel.findOneAndUpdate(
      { _id: id },
      {
        name,
        desc,
        category,
        prices,
        stockStatus,
        url,
      }, {
      returnDocument: 'after'
    }
    );

    if (!product) {
      return res.send({
        success: false,
        message: "Error While Updating",
      });
    }
    cachedData.products = {};
    cacheTime = null;

    return res.send({
      success: true,
      message: "Successfully Updated",
    })


  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export {
  SendAllProduct,
  CreateNewProduct,
  DeleteProduct,
  UpdatePrductStatus,
  sendSingleProduct,
  UploadeImage,
  UpdateWholeProduct
};
