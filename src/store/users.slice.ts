import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllUsers, User } from "../api/users";
import { StoreSliceEnum } from "../types/store";
import { generateThunkName } from "../utils/functions/generators";

enum UserAsyncActionsEnum {
    FETCH_ALL = 'fetchAll'
}

type UserReducerType = {
    totalCount: number,
    all: User[],
    filters: {
        byId: Record<User['id'], User>
    },
}

export const setAll = (state: UserReducerType, data: User[]) => {
    state.all = data;
    state.totalCount = data.length
    state.filters.byId = data.reduce((accum, user) => ({
        ...accum,
        [user.id]: user
    }), {})
}

export const fetchAll = createAsyncThunk(
    generateThunkName(StoreSliceEnum.USERS, UserAsyncActionsEnum.FETCH_ALL),
    async () => {
        const data = await getAllUsers()
        return data;
    }
)

const initialState: UserReducerType = {
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
        }

    }
})

export default userSlice;