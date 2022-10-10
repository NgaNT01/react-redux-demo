import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    listUser: [
        {
            key: '1',
            id: 1,
            name: 'Tấn Ngà',
            birthDay: '01/06/2001',
            teamId: '3',
        },
        {
            key: '2',
            id: 2,
            name: 'Hiếu Ngô',
            birthDay: '31/12/1998',
            teamId: '3',
        },
        {
            key: '3',
            id: 3,
            name: 'Hải Triệu',
            birthDay: '03/04/1992',
            teamId: '2',
        },
        {
            key: '4',
            id: 4,
            name: 'Định Thái',
            birthDay: '04/03/1992',
            teamId: '1',
        },
        {
            key: '5',
            id: 5,
            name: 'Hồng Minh',
            birthDay: '03/12/1998',
            teamId: '2',
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
        addUser: (state, action) => {
            state.listUser.push(action.payload);
        },
        updateUser: (state, action) => {
            const oldUser = state.listUser;
            const updateIndex = oldUser.findIndex(user => user.id === action.payload.id);
            oldUser[updateIndex] = action.payload;
            state.listUser = oldUser;
        }
    }
});

export const { setListUser, addUser, updateUser } = userSlice.actions;

// export const selectListUser = (state) => { state?.user?.listUser };

export default userSlice.reducer;