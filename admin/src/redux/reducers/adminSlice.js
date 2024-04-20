import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    admins: []
}

export const adminSlice = createSlice({
    name: 'adminSlice',
    initialState,
    reducers: {
        //1- admins Reducers
        // a- getting getproduct
        getAdmins: (state, action) => {
            state.admins = action.payload
        },

        //b- adding product
        addAdmin: (state, action) => {
            state.admins.push(action.payload);
        },

        // c- deleting a single product
        deleteAdmin: (state, action) => {
            state.admins = state.admins.filter((a) => a._id !== action.payload._id);
        },

        // d- Updating a single product
        updateAdmin: (state, action) => {
            state.admins = state.admins.map((admin) => {
                if (admin._id === action.payload._id) {
                    // If the product ID matches the payload ID, update the product
                    return action.payload;
                } else {
                    // Otherwise, return the product unchanged
                    return admin;
                }
            });
        }
      

    },
})


// Action creators are generated for each case reducer function
export const { getAdmins, addAdmin, deleteAdmin, updateAdmins } = adminSlice.actions

export default adminSlice.reducer