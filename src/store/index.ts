import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./posts.slice";
import userSlice from "./users.slice";

const store = configureStore({
    devTools: process.env.NODE_ENV === 'development',
    reducer: {
        users: userSlice.reducer,
        posts: postsSlice.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;