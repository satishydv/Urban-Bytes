import { createSlice } from "@reduxjs/toolkit"


const orderSlice = createSlice({
    name: "order",
    initialState: {},
    reducers: {
        allOrders: (state, action) => {
            state.orders = action.payload.orders
        },
        updateOrderStatus: (state, action) => {
            const { id, paymentStatus, orderStatus } = action.payload;
            const order = state.orders.find((item) => item._id === id);
            if (order) {
                order.paymentStatus = paymentStatus;
                order.orderStatus = orderStatus;
            }
        },
        updateAssignToRider: (state, action) => {
            const { id, riderId } = action.payload;
            const order = state.orders.find((item) => item._id === id);
            if (order) {
                order.orderAssignTo = riderId;
            }
        },
        deleteOrder: (state, action) => {
            const id = action.payload.id;
            state.orders = state.orders.filter((item) => item._id !== id);


        }
    }
});

export const { allOrders, updateOrderStatus, updateAssignToRider, deleteOrder } = orderSlice.actions
export default orderSlice.reducer;