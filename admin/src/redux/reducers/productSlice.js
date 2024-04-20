import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: []
}

export const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        //1- products Reducers
        // a- getting getproduct
        getProduct: (state, action) => {
            state.products = action.payload
        },

        //b- adding product
        addProduct: (state, action) => {
            state.products.push(action.payload);
        },

        // c- deleting a single product
        deleteProduct: (state, action) => {
            state.products = state.products.filter((c) => c._id !== action.payload._id);
        },

        // d- Updating a single product
        updateProduct: (state, action) => {
            state.products = state.products.map((product) => {
                if (product._id === action.payload._id) {
                    // If the product ID matches the payload ID, update the product
                    return action.payload;
                } else {
                    // Otherwise, return the product unchanged
                    return product;
                }
            });
        },
      

    },
})


// Action creators are generated for each case reducer function
export const { getProduct, addProduct, deleteProduct, updateProduct } = productSlice.actions

export default productSlice.reducer