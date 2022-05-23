import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPosts, Post } from "../api/posts";
import { User } from "../api/users";
import { StoreSliceEnum } from "../types/store";
import { generateThunkName } from "../utils/functions/generators";

enum PostAsyncActionsEnum {
    FETCH_BY_USER_ID = 'fetchByUserId'
}


type PostsReducerType = {
    filters: {
        byUserId: Record<User['id'], {
            totalCount: number,
            data: Post[]
        }>
    }
}

export const fetchByUserId = createAsyncThunk(
    generateThunkName(StoreSliceEnum.POSTS, PostAsyncActionsEnum.FETCH_BY_USER_ID),
    async (userId: User['id'] | undefined, thunkApi) => {
        const data = await getPosts(userId);
        if (!data || !data.length) return thunkApi.rejectWithValue(userId)
        return {
            userId,
            data
        };
    }
)

export const setPostsByUserId = (state: PostsReducerType, userId: User['id'], data: Post[]) => {
    console.log(data)
    state.filters.byUserId[userId] = {
        totalCount: data.length,
        data
    }
}

const initialState: PostsReducerType = {
    filters: {
        byUserId: {}
    }
}

const postsSlice = createSlice({
    name: StoreSliceEnum.POSTS,
    initialState,
    reducers: {},
    extraReducers: {
        [fetchByUserId.fulfilled.type]: (state, action: PayloadAction<{
            userId: User['id'],
            data: Post[]
        }>) => {
            setPostsByUserId(state, action.payload.userId, action.payload.data);
        },
        [fetchByUserId.rejected.type]: (state, action: PayloadAction<User['id']>) => {
            setPostsByUserId(state, action.payload, [])
        }
    }
})

export default postsSlice;