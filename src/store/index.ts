import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./users.slice";

const store = configureStore({
    devTools: process.env.NODE_ENV === 'development',
    reducer: {
        users: userSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;