import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    approvals: []
}

export const approvalSlice = createSlice({
    name: 'approvalSlice',
    initialState,
    reducers: {
        //1- products Reducers
        // a- getting getproduct
        getAllProducts: (state, action) => {
            state.approvals = action.payload
        }

    }
})


// Action creators are generated for each case reducer function
export const { getAllProducts } = approvalSlice.actions

export default approvalSlice.reducer