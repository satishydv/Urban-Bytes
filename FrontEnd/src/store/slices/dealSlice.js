import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    deals: [],
    loading: true,
    isError: false,
};

const DealSlice = createSlice({
    name: "deals",
    initialState,
    reducers: {
        allDeals: (state, action) => {
            state.loading = false;
            state.isError = action.payload.isError;
            state.deals = action.payload.deals;
        },
        updateDealStatus: (state, action) => {
            const { id, status } = action.payload;
            const deal = state.deals.find((item) => item._id === id);
            if (deal) {
                deal.isActive = status;
            }
        },
        deleteDeal: (state, action) => {
            const { id } = action.payload
            const deals = state.deals.filter((item) => item._id !== id)
            state.deals = deals
        },
        updateDeal: (state, action) => {
            const { id, title, description, price, isActive } = action.payload
            const deal = state.deals.find((item) => item._id === id);
            if (deal) {
                deal.title = title,
                    deal.description = description,
                    deal.price = price,
                    deal.isActive = isActive
            }
        }
    },
});

export const { allDeals, updateDealStatus, deleteDeal,updateDeal } = DealSlice.actions;
export default DealSlice.reducer;
