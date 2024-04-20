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
        getCategories: (state, action) => {
            state.categories = action.payload
        },

    },
})


// Action creators are generated for each case reducer function
export const { getCategories } = categorySlice.actions

export default categorySlice.reducer