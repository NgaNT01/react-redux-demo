import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    listUser: [
        {
            id: 1,
            name: 'Tấn Ngà',
            birthDay: '01/06/2001',
            teamId: 1,
        },
        {
            id: 2,
            name: 'Hiếu Ngô',
            birthDay: '31/12/1998',
            teamId: 1,
        },
        {
            id: 3,
            name: 'Hải Triệu',
            birthDay: '03/04/1992',
            teamId: 3,
        },
        {
            id: 4,
            name: 'Định Thái',
            birthDay: '04/03/1992',
            teamId: 4,
        },
        {
            id: 5,
            name: 'Hồng Minh',
            birthDay: '03/12/1998',
            teamId: 1,
        },
    ],
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
        },
        addUser: (state, action) => {
            state.listUser.push(action.payload);
        },
        deleteUser: (state, action) => {
            state.listUser = state.listUser.filter(user => user.id !== action.payload.id);
        }
    }
});

export const { setListUser, updateUser, addUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;