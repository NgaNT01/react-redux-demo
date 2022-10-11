import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    listUser: [],
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setListUser: (state, action) => {
            state.listUser = action.payload;
        },
        updateUser: (state, action) => {
            const oldUser = state.listUser;
            const updateIndex = oldUser.findIndex(user => user.id === action.payload.id);
            oldUser[updateIndex] = action.payload;
            state.listUser = oldUser;
        }
    }
});