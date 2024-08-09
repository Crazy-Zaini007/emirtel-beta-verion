import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    contentImages: []
}

export const  contentSlice = createSlice({
    name: 'contentSlice',
    initialState,
    reducers: {
        //1- contents Reducers
        // a- getting content images
        getContent: (state, action) => {
            state.contentImages = action.payload
        }
    },
})


// Action creators are generated for each case reducer function
export const { getContent } = contentSlice.actions

export default contentSlice.reducer