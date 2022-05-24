import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment, createComment, getComments, ICreateComment } from "../api/comments";
import { Post } from "../api/posts";
import { StoreSliceEnum } from "../types/store";
import { generateThunkName } from "../utils/functions/generators";

enum PostCommentAsyncActionsEnum {
    FETCH_BY_POST_ID = 'fetchByPostId',
    CREATE = 'create'
}

type PostCommentsReducerType = {
    filters: {
        byPostId: Record<Post['id'], {
            totalCount: number,
            data: Comment[]
        }>
    }
}

export const setAll = (state: PostCommentsReducerType, postId: Post['id'], data: Comment[]) => {
    data.forEach((comment) => {
        if (!state.filters.byPostId[postId]) {
            state.filters.byPostId[postId] = {
                totalCount: 0,
                data: []
            }
        } 
        state.filters.byPostId[postId].totalCount = state.filters.byPostId[postId].totalCount + 1;
        state.filters.byPostId[postId].data.push(comment);
    })
}

export const addOne = (state: PostCommentsReducerType, data: Comment) => {
    if (!state.filters.byPostId[data.postId]) {
        state.filters.byPostId[data.postId] = {
            totalCount: 0,
            data: []
        }
    } 
    state.filters.byPostId[data.postId].totalCount = state.filters.byPostId[data.postId].totalCount + 1;
    state.filters.byPostId[data.postId].data.push(data);
}


export const fetchByPostId = createAsyncThunk(
    generateThunkName(StoreSliceEnum.POST_COMMENTS, PostCommentAsyncActionsEnum.FETCH_BY_POST_ID),
    async (postId: Post['id'] | undefined) => {
        const data = await getComments(postId)
        return {
            postId,
            data
        };
    }
)

export const create = createAsyncThunk(
    generateThunkName(StoreSliceEnum.POST_COMMENTS, PostCommentAsyncActionsEnum.CREATE),
    async (input: {
        postId: Post['id'] | undefined,
        data: ICreateComment
    }, thunkApi) => {
        const response = await createComment(input.postId, input.data)
        
        if (!response) return thunkApi.rejectWithValue('Comment creation failed')
        
        return thunkApi.fulfillWithValue({
            id: response.id,
            postId: response.postId,
            ...response.data
        })
    }
)

const initialState:PostCommentsReducerType = {
    filters: {
        byPostId: {}
    }
}

const postCommentSlice = createSlice({
    name: StoreSliceEnum.POST_COMMENTS,
    initialState,
    reducers: {},
    extraReducers: {
        [fetchByPostId.fulfilled.type]: (state, action: PayloadAction<{
            postId: Post['id'],
            data: Comment[]
        }>) => {
            setAll(state, action.payload.postId, action.payload.data);
        },
        [fetchByPostId.rejected.type]: (state, action: PayloadAction<Post['id']>) => {
            setAll(state, action.payload, [])
        },

        [create.fulfilled.type]: (state, action: PayloadAction<Comment>) => {
            addOne(state, action.payload);
        }
    }
})

export default postCommentSlice;