import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllUsers, getUser, User } from "../api/users";
import { StoreSliceEnum } from "../types/store";
import { generateThunkName } from "../utils/functions/generators";

enum UserAsyncActionsEnum {
    FETCH_ALL = 'fetchAll',
    FETCH_BY_ID = 'fetchById',
}

type UsersReducerType = {
    totalCount: number,
    all: User[],
    filters: {
        byId: Record<User['id'], User>
    },
}

export const setAll = (state: UsersReducerType, data: User[]) => {
    state.all = data;
    state.totalCount = data.length
    state.filters.byId = data.reduce((accum, user) => ({
        ...accum,
        [user.id]: user
    }), {})
}

export const setUser = (state: UsersReducerType, data: User) => {
    state.filters.byId = data;
}

export const fetchAll = createAsyncThunk(
    generateThunkName(StoreSliceEnum.USERS, UserAsyncActionsEnum.FETCH_ALL),
    async () => {
        const data = await getAllUsers()
        return data;
    }
)

export const fetchById = createAsyncThunk(
    generateThunkName(StoreSliceEnum.USERS, UserAsyncActionsEnum.FETCH_BY_ID),
    async (userId: User['id'] | undefined, thunkApi) => {
        const data = await getUser(userId);
        thunkApi.fulfillWithValue(data);
        return data;
    }
)

const initialState: UsersReducerType = {
    totalCount: 0,
    all: [],
    filters: {
        byId: {}
    }
}

const userSlice = createSlice({
    name: StoreSliceEnum.USERS,
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAll.fulfilled.type]: (state, action: PayloadAction<User[]>) => {
            setAll(state, action.payload);
        },
        [fetchAll.rejected.type]: (state) => {
            setAll(state, [])
        },
        
        [fetchById.fulfilled.type]: (state, action: PayloadAction<User>) => {
            setUser(state, action.payload)
        },
    }
})

export default userSlice;