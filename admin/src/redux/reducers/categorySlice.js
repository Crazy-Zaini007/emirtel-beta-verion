import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categories: []
}

export const categorySlice = createSlice({
    name: 'categorySlice',
    initialState,
    reducers: {
        //1- categories Reducers
        // a- getting getCategory
        getCategory: (state, action) => {
            state.categories = action.payload
        },

        //b- adding Category
        addCategory: (state, action) => {
            state.categories.push(action.payload);
        },

        // c- deleting a single Category
        deleteCategory: (state, action) => {
            state.categories = state.categories.filter((c) => c._id !== action.payload._id);
        },

        // d- Updating a single Category
        updateCategory: (state, action) => {
            state.categories = state.categories.map((category) => {
                if (category._id === action.payload._id) {
                    // If the Category ID matches the payload ID, update the Category
                    return action.payload;
                } else {
                    // Otherwise, return the Category unchanged
                    return category;
                }
            });
        },
      

    },
})


// Action creators are generated for each case reducer function
export const { getCategory, addCategory, deleteCategory, updateCategory } = categorySlice.actions

export default categorySlice.reducer