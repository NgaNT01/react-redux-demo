import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user';
import teamReducer from './team';

const rootReducer = combineReducers({
    user: userReducer,
    team: teamReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});