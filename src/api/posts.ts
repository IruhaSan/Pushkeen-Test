import axios, { AxiosResponse } from "axios";

export type Post = {
    title: string;
    body: string;
    id: number;
}

export type OGetPosts = Post[];


export const getPosts = async (userId: string | undefined): Promise<OGetPosts> => {
    if (userId === undefined) return [];
    return axios.get<any, AxiosResponse<OGetPosts>>(`${ process.env.REACT_APP_API_BASE }/posts?userId=${userId}`).then(res => res.data);
}
