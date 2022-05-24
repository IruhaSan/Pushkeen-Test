import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Post } from "./posts";

export type Comment = {
    id: number;
    name: string;
    email: string;
    body: string;
    postId: Post['id']
}

export type OGetComments = Comment[]

export const getComments = async (postId: Post['id'] | undefined): Promise<OGetComments> => {
    if (postId === undefined) return [];
    return axios.get<any, AxiosResponse<OGetComments>>(`${process.env.REACT_APP_API_BASE}/comments?postId=${postId}`).then(res => res.data);
}


export type ICreateComment = Omit<Comment, 'id' | `postId`>
export type OCreateComment = {
    id: Comment['id'],
    postId: Post['id'],
    data: Omit<Comment, 'id' | `postId`>
}

export const createComment = async (postId: number | undefined, data: ICreateComment): Promise<OCreateComment | undefined> => {
    if (postId === undefined) return;
    return axios.post<any, AxiosResponse<OCreateComment>, AxiosRequestConfig<ICreateComment>>(
        `${process.env.REACT_APP_API_BASE}/posts/${postId}/comments`, 
        {
            data
        }
    ).then(res => res.data)
}