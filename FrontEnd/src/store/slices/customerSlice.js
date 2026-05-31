import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
    name: "customer",
    initialState: {},
    reducers: {
        allUser: (state, action) => {
            state.users = action.payload.data;
        },
        updateRole: (state, action) => {
            const { id, role } = action.payload;
            const user = state.users.find((item) => item._id === id)
            if (user) {
                user.role = role
            }
        },
        deleteCustomer: (state, action) => {
            const { id } = action.payload;
            const users = state.users.filter((item) => item._id !== id);
            state.users = users;
        }
    }

})

export const { allUser, updateRole,deleteCustomer } = customerSlice.actions
export default customerSlice.reducer;