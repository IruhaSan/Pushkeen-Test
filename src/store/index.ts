import { configureStore } from "@reduxjs/toolkit";
import { StoreSliceEnum } from "../types/store";
import postCommentsSlice from "./postComments.slice";
import postsSlice from "./posts.slice";
import userSlice from "./users.slice";

const store = configureStore({
    devTools: process.env.NODE_ENV === 'development',
    reducer: {
        [StoreSliceEnum.USERS]: userSlice.reducer,
        [StoreSliceEnum.POSTS]: postsSlice.reducer,
        [StoreSliceEnum.POST_COMMENTS]: postCommentsSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;