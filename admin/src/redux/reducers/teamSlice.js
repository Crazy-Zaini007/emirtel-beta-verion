import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    teams: []
}

export const teamSlice = createSlice({
    name: 'teamSlice',
    initialState,
    reducers: {
        //1- teams Reducers
        // a- getting teams
        getTeams: (state, action) => {
            state.teams = action.payload
        },

     
      

    },
})


// Action creators are generated for each case reducer function
export const { getTeams} = teamSlice.actions

export default teamSlice.reducer