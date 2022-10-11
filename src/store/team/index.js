import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    listTeam: [
        {
            key: '1',
            id: 1,
            name: 'Newji VR',
        },
        {
            key: '2',
            id: 2,
            name: 'Air Circle',
        },
        {
            key: '3',
            id: 3,
            name: 'CIMB',
        },
        {
            key: '4',
            id: 4,
            name: '2nd B@r',
        },
    ],
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