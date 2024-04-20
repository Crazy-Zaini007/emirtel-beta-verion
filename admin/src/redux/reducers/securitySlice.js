import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    securityCode: []
}

export const securitySlice = createSlice({
    name: 'securitySlice',
    initialState,
    reducers: {
        //1- products Reducers
        // a- getting getproduct
        getSecurityCode: (state, action) => {
            state.securityCode = action.payload
        }

    }
})


// Action creators are generated for each case reducer function
export const { getSecurityCode } = securitySlice.actions

export default securitySlice.reducer