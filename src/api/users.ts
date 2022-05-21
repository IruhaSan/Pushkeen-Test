import axios from "axios";

export type User = {
    id: number;
    name: string;
    surname?: string;
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

export type UserPost = {
    title: string;
    body: string;
    id: number;
}

export type Comment = {
    id?: number;
    name: string;
    email: string;
    body: string;
}

export const fetchAllUsers = () => {
    return axios.get('https://jsonplaceholder.typicode.com/users').then(res => res.data);
}

export const fetchUser = (id: string | undefined) => {
    return axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then(res => res.data);
}

export const fetchUserPosts = (id: string | undefined) => {
    return axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`).then(res => res.data);
}

export const fetchPostComments = (id: string | undefined) => {
    return axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`).then(res => res.data);
}