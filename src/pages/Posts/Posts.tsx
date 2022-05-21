import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Container from '../../utils/components/Container'
import classes from './Posts.module.scss';
import { getPosts, Post } from '../../api/posts';
import { Comment, createComment, getComments, ICreateComment } from '../../api/comments';
import PostCard from '../../components/PostCard';

type IParams = {
    id: string;
}

const Posts = () => {
    const { id } = useParams<IParams>();
    const [postCommentsDict, setPostCommentsDict] = useState<Record<number, Comment[]>>({})
    const [posts, setPosts] = useState<Post[]>([])

    const handleCreateComment = useCallback((postId: number) => (data: ICreateComment) => {
        console.log(data);
        createComment(postId, data)
    }, [])
    useEffect(() => {
        getPosts(id).then(res => setPosts(res))
    }, [id])
    useEffect(() => {
        Promise.all(posts.map((post) => getComments(post.id))).then((data) => {
            setPostCommentsDict(
                data.reduce((accum, commentList, postIndex) => ({
                    ...accum, 
                    [posts[postIndex].id]: commentList
                }),{})
            )
        })
    }, [posts])
    return (
        <Container className={classes.root}>
            <h1>Все посты</h1>
            <p>Найдено: {posts.length}</p>
            <div className={classes.content}>                
                {
                    posts.map((post) => (
                        <PostCard 
                            post={post} 
                            comments={postCommentsDict[post.id] || []} 
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