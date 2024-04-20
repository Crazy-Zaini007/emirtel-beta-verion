import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    allProducts: []
}

export const allProductSlice = createSlice({
    name: 'allProductSlice',
    initialState,
    reducers: {
        //1- products Reducers
        // a- getting getproduct
        getApprovedProducts: (state, action) => {
        state.allProducts = action.payload
        }
    },
})


// Action creators are generated for each case reducer function
export const { getApprovedProducts } = allProductSlice.actions

export default allProductSlice.reducer