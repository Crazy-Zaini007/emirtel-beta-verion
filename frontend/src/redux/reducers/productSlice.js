import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    allProducts: [],
    latestProducts:[],
    userAllProducts:[],
    userAllLatestProducts:[]

}

export const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        //1- Products Reducers
        // a- getting allProducts
        getAllProducts: (state, action) => {
            state.allProducts = action.payload
        },
        getLatestProducts: (state, action) => {
            state.latestProducts = action.payload
        },
        getUserAllProducts: (state, action) => {
            state.userAllProducts = action.payload
        },
        getUserLatestProducts: (state, action) => {
            state.userAllLatestProducts = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { getAllProducts,getLatestProducts,getUserAllProducts,getUserLatestProducts } = productSlice.actions

export default productSlice.reducer