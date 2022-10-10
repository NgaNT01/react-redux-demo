import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    listTeam: [],
};

export const teamSlice = createSlice({
    name: "team",
    initialState,
    reducers: {
        setListTeam: (state, action) => {
            state.listTeam = action.payload;
        },
        updateTeam: (state, action) => {
            const oldTeam = state.listTeam;
            const updateIndex = oldTeam.findIndex(team => team.id === action.payload.id);
            oldTeam[updateIndex] = action.payload;
            state.listTeam = oldTeam;
        }
    }
});

export const { setListTeam, updateTeam } = teamSlice.actions;

export default teamSlice.reducer;