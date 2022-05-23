import axios, { AxiosResponse } from "axios";

export type User = {
    id: number;
    username: string;
    name: string;
    email: string;
    phone: string;
    website: string;
    company: {
        name: string;
        bs: string;
    }
    address: {
        city: string;
    }
}

export type OGetAllUsers = User[]

export const getAllUsers = (): Promise<OGetAllUsers> => {
    return axios.get<any, AxiosResponse<OGetAllUsers>>(`${process.env.REACT_APP_API_BASE}/users`).then(res => res.data || []);
}

export type OGetUser = User

export const getUser = async (id: User['id'] | undefined): Promise<OGetUser | undefined> => {
    if (id === undefined) return
    return axios.get<any, AxiosResponse<OGetUser>>(`${process.env.REACT_APP_API_BASE}/users/${id}`).then(res => res.data);
}

