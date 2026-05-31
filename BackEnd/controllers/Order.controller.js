import orderModel from "../models/Order.models.js";
import userModel from "../models/User.models.js";
import productModel from "../models/Product.models.js";
import dealsModel from "../models/Deals.models.js";
import sendEmail from "../utils/sendEmails.js";
import orderEmailBody from "../utils/orderEmailTem.js";

// Remove: import sendNotification from "../utils/sendNotification.js";
import { sendToAdmins, sendToUser, sendToRider } from "../utils/sseManager.js";



const SendAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find().sort({ createdAt: -1 }).populate({
            path: "orderBy orderAssignTo",
            select: "-password",
        });;
        if (!orders) {
            return res.send({
                success: false,
                message: "error in fetching data",
            });
        }
        return res.send({
            success: true,
            message: "Find From DB",
            data: orders,
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
};

// only logged User can order and who's email is verified
const createOrder = async (req, res) => {
    try {
        const {
            items,
            paymentMethod,
            deliveryAddress,
            contactNumber,
            totalPrice,
            orderStreet,
            orderCity,
        } = req.body;
        if (
            !items ||
            !paymentMethod ||
            !deliveryAddress ||
            !contactNumber ||
            !totalPrice
        ) {
            return res.send({
                success: false,
                message: "Please provide all fields",
            });
        }
        const userId = req.user?._id;
        if (!userId) {
            return res.send({
                success: false,
                message: "User not found",
            });
        }
        // check if items is in in stock state or not In Stock" for product and isActive true for deal
        for (let item of items) {
            // check in products
            const product = await productModel.findById({ _id: item.id });
            if (product) {
                if (product.stockStatus !== "In Stock") {
                    return res.send({
                        success: false,
                        message: `${product.name} is currently ${product.stockStatus}`,
                    });
                }
            } else {
                // check in deals
                const deal = await dealsModel.findById({ _id: item.id });

                if (!deal || !deal.isActive) {
                    return res.send({
                        success: false,
                        message: `${item.name} is not available right now`,
                    });
                }
            }
        }

        const order = await orderModel.create({
            orderBy: userId,
            items,
            paymentMethod,
            deliveryAddress,
            street: orderStreet,
            city: orderCity,
            contactNumber,
            totalPrice,
        });
        if (!order) {
            return res.send({
                success: false,
                message: "Error in creating order",
            });
        }

        const user = await userModel.findOneAndUpdate(
            {
                _id: userId,
            },
            {
                phone: contactNumber,
                address: deliveryAddress,
            },
            {
                new: true,
            },
        );

        sendToAdmins("new_order", {
            message: `New order placed by ${req.user?.name}`,
            orderId: order._id,
        });
        return res.send({
            success: true,
            message: "Order Created Successfully",
            data: order,
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
};

const MyOrders = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.send({
                success: false,
                message: "User not found",
            });
        }

        const allOrders = await orderModel
            .find({ orderBy: userId })
            .sort({ createdAt: -1 }).populate({ path: "orderAssignTo", select: "-password" });
        if (!allOrders) {
            return res.send({
                success: false,
                message: "Error in fetching data",
            });
        }

        return res.send({
            success: true,
            message: "Find From DB",
            data: allOrders,
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
};

const CancelOrder = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.send({
                success: false,
                message: "Please provide id",
            });
        }
        const cenceledOrder = await orderModel.findOneAndUpdate(
            { _id: id },
            {
                orderStatus: "cancelled",
            },
            {
                new: true,
            },
        );
        if (!cenceledOrder) {
            return res.send({
                success: false,
                message: "Error in cenceling order",
            });
        }
        return res.send({
            success: true,
            message: "Order cencel successfully",
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
};

// admin controller to update payment and order status
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { orderStatus } = req.body;
        if (!id) {
            return res.send({
                success: false,
                message: "Please provide id",
            });
        }

        const updateOrder = await orderModel.findOneAndUpdate(
            {
                _id: id,
            },
            {
                orderStatus,
            },
            {
                new: true,
            },
        ).populate({ path: "orderBy orderAssignTo", select: "-password" });
        if (!updateOrder) {
            return res.send({
                success: false,
                message: "Error in updating order",
            });
        }
        // here we will inform user about his order later
        sendToUser(updateOrder.orderBy.email, "order_status", {
            orderId: updateOrder._id,
            status: orderStatus,
        });

        return res.send({
            success: true,
            message: "Order Updated Successfully",
            data: updateOrder,
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
};

const updateOrderPaymentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { paymentStatus } = req.body;
        if (!id) {
            return res.send({
                success: false,
                message: "Please provide id",
            });
        }

        const updateOrder = await orderModel.findOneAndUpdate(
            {
                _id: id,
            },
            {
                paymentStatus,
            },
            {
                new: true,
            },
        );

        if (!updateOrder) {
            return res.send({
                success: false,
                message: "Error in updating order",
            });
        }

        sendToUser(updateOrder.orderBy.email, "payment_status", {
            orderId: id,
            status: paymentStatus,
        });

        return res.send({
            success: true,
            message: "Order Updated Successfully",
            data: updateOrder,
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
};

const AssignRiderToOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { riderId } = req.body;

        if (!id || !riderId) {
            return res.send({
                success: false,
                message: "Please provide all fields",
            });
        }

        // ✅ Single update with populate
        const order = await orderModel
            .findByIdAndUpdate(
                id,
                { orderAssignTo: riderId },
                { new: true }
            )
            .populate("orderAssignTo", "-password")
            .populate("orderBy", "-password");

        if (!order) {
            return res.send({
                success: false,
                message: "Order not found",
            });
        }

        const riderEmail = order.orderAssignTo?.email;

        sendToRider(riderEmail, "order_assigned", {
            orderId: order._id,
            status: "A new order has been assigned to you",
        });




        return res.send({
            success: true,
            message: "Order assigned successfully",
            data: order,
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
};

const ridersOrder = async (req, res) => {
    try {
        const riderId = req.user?._id;
        if (!riderId) {
            return res.send({
                success: false,
                message: "Rider not found",
            });
        }
        const orders = await orderModel.find({ orderAssignTo: riderId }).sort({ createdAt: -1 }).populate({ path: "orderAssignTo", select: "-password" });
        if (!orders) {
            return res.send({
                success: false,
                message: "Not Found Any Orders"
            })
        }

        return res.send({
            success: true,
            message: "Your Orders Assigned To You",
            data: orders
        })

    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
}

const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.send({
                success: false,
                message: "Please provide id",
            });
        }

        const deletedOrder = await orderModel.findByIdAndDelete(id);

        if (!deletedOrder) {
            return res.send({
                success: false,
                message: "Order not found",
            });
        }

        return res.send({
            success: true,
            message: "Order deleted successfully",
            data: deletedOrder
        });

    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
}

export {
    SendAllOrders,
    createOrder,
    MyOrders,
    CancelOrder,
    updateOrderStatus,
    updateOrderPaymentStatus,
    AssignRiderToOrder,
    ridersOrder,
    deleteOrder
};
