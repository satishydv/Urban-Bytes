import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: true,
    items: [],
    isError: false,
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        fetchAllProducts: (state, action) => {
            state.loading = false;
            state.items = action.payload.result;
            state.isError = action.payload.isError
        },
        updateProductStatus: (state, action) => {
            const { id, status } = action.payload;
            const product = state.items.find((item) => item._id === id);
            if (product) {
                product.stockStatus = status;
            }
        },
        deleteProductStatus: (state, action) => {
            const RemaningItems = state.items.filter((item) => item._id !== action.payload.id);
            state.items = RemaningItems;
        },
    }
})

export const { fetchAllProducts, updateProductStatus, deleteProductStatus } = productSlice.actions
export default productSlice.reducer;