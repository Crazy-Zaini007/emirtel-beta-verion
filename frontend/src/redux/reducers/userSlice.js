import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userProfile: []
}
export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        //1- categories Reducers
        // a- getting getCategory
        getUserProfile: (state, action) => {
            state.userProfile = action.payload
        },

    },
})


// Action creators are generated for each case reducer function
export const { getUserProfile } = userSlice.actions

export default userSlice.reducer