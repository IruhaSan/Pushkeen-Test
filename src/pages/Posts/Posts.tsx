import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Container from '../../utils/components/Container'
import classes from './Posts.module.scss';
import { Post } from '../../api/posts';
import { ICreateComment } from '../../api/comments';
import PostCard from '../../components/PostCard';
import useAppSelector from '../../utils/hooks/useAppSelector';
import { fetchByUserId as fetchPostsByUserId } from '../../store/posts.slice';
import useAppDispatch from '../../utils/hooks/useAppDispatch';
import { create as createComment } from '../../store/postComments.slice';

type IParams = {
    id: string;
}

const Posts = () => {
    const { id } = useParams<IParams>();
    const [posts, setPosts] = useState<Post[]>([])
    const storePosts = useAppSelector<Post[] | undefined>((state) => id ? state.posts.filters.byUserId[+id]?.data : undefined)

    const dispatch = useAppDispatch();

    const handleCreateComment = useCallback((postId: number) => async (data: ICreateComment) => {
        return dispatch(createComment({
            postId,
            data
        })).unwrap()
    }, [dispatch])

    useEffect(() => {
        if (!id) return;
        if (storePosts) setPosts(storePosts)
        else dispatch(fetchPostsByUserId(+id))
    }, [dispatch, id, storePosts])

    return (
        <Container className={classes.root}>
            <h1>Все посты</h1>
            <p>Найдено: {posts.length}</p>
            <div className={classes.content}>                
                {
                    posts.map((post) => (
                        <PostCard 
                            data={post} 
                            onCommentSubmit={handleCreateComment(post.id)} 
                            key={post.id}
                        />
                    ))
                }
            </div>
        </Container>
    )
}

export default Posts